import { NextRequest } from "next/server";
import { verifyTokenAllowExpired, refreshToken } from "@/utils/jwt";
import { createJsonResponse, ResponseUtil } from "@/lib/response";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // 提取当前 token 字符串（Authorization: Bearer 或 Cookie: token）
    let token: string | null = null;
    const authHeader = request.headers.get('authorization') || '';
    if (/^Bearer\s+/i.test(authHeader)) {
      token = authHeader.replace(/^Bearer\s+/i, '');
    }
    if (!token) {
      const cookieToken = request.cookies?.get?.('token')?.value;
      if (cookieToken) token = cookieToken;
    }

    if (!token) {
      return createJsonResponse(
        ResponseUtil.error("缺少 token"),
        { status: 400 }
      );
    }

    // 校验签名（忽略过期），获取载荷
    const decoded = verifyTokenAllowExpired(token);
    if (!decoded) {
      return createJsonResponse(
        ResponseUtil.unauthorized("未授权访问"),
        { status: 401 }
      );
    }

    // 仅当 access token 已过期才刷新；未过期直接返回原 token（也可改为 400 提示无需刷新）
    const now = Math.floor(Date.now() / 1000);
    if (typeof decoded.exp === 'number' && decoded.exp > now) {
      return createJsonResponse(
        ResponseUtil.success({ token }, "Token 未过期，无需刷新")
      );
    }

    // 可选：保证用户仍存在，避免为已删除账户签发新 token
    const dbUser = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!dbUser) {
      return createJsonResponse(
        ResponseUtil.unauthorized("用户不存在或已失效，请重新登录"),
        { status: 401 }
      );
    }

    // 生成新 token（基于已验证签名且可能过期的旧 token）
    const newToken = refreshToken(token);
    if (!newToken) {
      return createJsonResponse(
        ResponseUtil.unauthorized("Token 无效或已过期"),
        { status: 401 }
      );
    }

    return createJsonResponse(
      ResponseUtil.success({ token: newToken }, "Token 刷新成功")
    );
  } catch (error) {
    console.error("刷新 token 失败:", error);
    return createJsonResponse(
      ResponseUtil.error("服务器内部错误"),
      { status: 500 }
    );
  }
}