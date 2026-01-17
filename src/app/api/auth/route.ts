import { NextRequest } from "next/server";
import { createJsonResponse, ResponseUtil } from "@/lib/response";

// 认证相关的通用API端点
// 这个文件可以包含认证相关的其他功能，如刷新token、登出等

export async function GET(request: NextRequest) {
    return createJsonResponse(
        ResponseUtil.error('请使用具体的认证端点，如 /api/auth/login'),
        { status: 400 }
    )
}

export async function POST(request: NextRequest) {
    return createJsonResponse(
        ResponseUtil.error('请使用具体的认证端点，如 /api/auth/login'),
        { status: 400 }
    )
}