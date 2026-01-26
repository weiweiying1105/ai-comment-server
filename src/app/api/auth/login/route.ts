import { NextRequest } from "next/server";
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import prisma from '@/lib/prisma'
import { createJsonResponse, ResponseUtil } from "@/lib/response";

// 小程序相关配置
const WECHAT_CONFIG = {
    // 兼容两种环境变量命名：WECHAT_APP_ID / WECHAT_APPID；WECHAT_APP_SECRET / WECHAT_APPSECRET
    appid: process.env.WECHAT_APP_ID,
    appSecret: process.env.WECHAT_APP_SECRET,
    grantType: 'authorization_code',
}

const JWT_SECRET = process.env.JWT_SECRET || '';
interface WechatLoginResponse {
    openid: string
    session_key: string
    unionid?: string
    errcode?: number
    errmsg?: string
}

interface LoginRequest {
    code: string
    nickName?: string
    avatarUrl?: string
}

export async function POST(request: NextRequest) {
    try {
        // 校验服务端必要配置
        if (!WECHAT_CONFIG.appid || !WECHAT_CONFIG.appSecret) {
            return createJsonResponse(
                ResponseUtil.error('服务端未配置微信AppID或AppSecret'),
                { status: 500 }
            )
        }
        if (!JWT_SECRET) {
            return createJsonResponse(
                ResponseUtil.error('服务端未配置JWT_SECRET'),
                { status: 500 }
            )
        }

        // 从请求体或查询参数获取 code
        let body: LoginRequest = { code: '' };
        let code: string | null = null;
        try {
            body = await request.json();
            code = body.code;
        } catch (error) {
            code = request.nextUrl.searchParams.get('code')
        }
        if (!code) {
            return createJsonResponse(ResponseUtil.error('code不能为空'), { status: 400 })
        }

        // 1）用 code 交换 openid/session_key
        const wechatUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${WECHAT_CONFIG.appid}&secret=${WECHAT_CONFIG.appSecret}&js_code=${encodeURIComponent(code)}&grant_type=${WECHAT_CONFIG.grantType}`
        const wxResponse = await fetch(wechatUrl);
        const wxData: WechatLoginResponse = await wxResponse.json();
        // console.log('微信登录响应', wxData)
        if (wxData.errcode) {
            return createJsonResponse(
                ResponseUtil.error(`微信登录失败: ${wxData.errmsg}`),
                { status: 400 }
            )
        }
        const { openid } = wxData;

        // 2）查找或创建用户
        let user = await prisma.user.findUnique({
            where: { openId: openid }
        })
        if (!user) {
            user = await prisma.user.create({
                data: { openId: openid }
            })
        } else {
            user = await prisma.user.update({
                where: { openId: openid },
                data: { lastLoginAt: new Date() }
            })
        }

        // 3）签发 JWT
        const tokenPayload = {
            userId: user.id,
            openId: user.openId,
            iat: Math.floor(Date.now() / 1000),
        }
        const expiresInConfig = process.env.JWT_EXPIRES_IN
        const expiresIn: number | string = expiresInConfig && /^\d+$/.test(expiresInConfig)
            ? Number(expiresInConfig)
            : (expiresInConfig || '7d')
        const signOptions: SignOptions = {
            expiresIn: expiresIn as any,
        }
        const token = jwt.sign(tokenPayload, JWT_SECRET as Secret, signOptions as any)

        const responseData = {
            token,
            userId: user.id,
            userInfo: {
                id: user.id,
                nickName: user.nickName,
                avatarUrl: user.avatarUrl,
            }
        }
        return createJsonResponse(
            ResponseUtil.success(responseData, '登录成功')
        )
    } catch (error) {
        return createJsonResponse(
            ResponseUtil.error('服务器内部错误'),
            { status: 500 }
        )
    }
}