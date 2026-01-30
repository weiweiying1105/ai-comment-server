import { NextRequest } from "next/server";
import { verifyToken, refreshToken } from "@/utils/jwt";
import { createJsonResponse, ResponseUtil } from "@/lib/response";

export async function POST(request: NextRequest) {
  try {
    // 验证当前 token
    const user = await verifyToken(request);
    
    if (!user) {
      return createJsonResponse(
        ResponseUtil.error("未授权访问"),
        { status: 401 }
      );
    }

    // 获取当前 token 字符串
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

    // 生成新 token
    const newToken = refreshToken(token);
    
    if (!newToken) {
      return createJsonResponse(
        ResponseUtil.error("Token 无效或已过期"),
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