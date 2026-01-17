import prisma from '@/lib/prisma'
import { createJsonResponse, ResponseUtil } from '@/lib/response'
import { verifyToken } from '@/utils/jwt'
import { NextRequest, NextResponse } from 'next/server'



export async function GET(request: NextRequest) {
    try {
       const user = await verifyToken(request)
       if (!user) {
           return createJsonResponse(ResponseUtil.error('未授权访问'),
                           { status: 401 })
       }
       const userInfo =await prisma.user.findUnique({
           where: {
               id: user?.userId
           },
           select: { // 仅返回指定字段
               id: true,
               nickName: true,
               avatarUrl: true,
           }
       })
       return createJsonResponse(ResponseUtil.success({...userInfo }))
    } catch (error) {
       return createJsonResponse(
            ResponseUtil.error('服务器内部错误'),
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
       const user = await verifyToken(request)
       if (!user) {
           return createJsonResponse(ResponseUtil.error('未授权访问'),
                           { status: 401 })
       }
       const { nickName, avatarUrl } = await request.json()
       if (!nickName && !avatarUrl) {
           return createJsonResponse(ResponseUtil.error('nickName或avatarUrl不能为空'),
                           { status: 400 })
       }
       const updatedUser = await prisma.user.update({
           where: {
               id: user?.userId
           },
           data: {
               nickName,
               avatarUrl,
           }
       })
       return createJsonResponse(ResponseUtil.success({...updatedUser }))
    } catch (error) {
       return createJsonResponse(
            ResponseUtil.error('服务器内部错误'),
            { status: 500 }
        );
    }
}