import { NextResponse, NextRequest } from "next/server";
import { createJsonResponse, ResponseUtil } from "@/lib/response";
import { verifyToken } from "@/utils/jwt";
import prisma from "@/lib/prisma";
import { generateComment } from "@/utils/commentGenerator";


export const dynamic = "force-dynamic"





export async function POST(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        if (!user) {
            return createJsonResponse(
                ResponseUtil.error('未授权访问'),
                { status: 401 }
            );
        }
        // 额外保证：token对应的用户必须存在（避免数据库重置后token失效导致外键错误）
        // const dbUser = await prisma.user.findUnique({ where: { id: user.userId } })
        // if (!dbUser) {
        //     return createJsonResponse(
        //         ResponseUtil.error('用户不存在或已失效，请重新登录'),
        //         { status: 401 }
        //     );
        // }
        /**
         * 生成评论:
         * @param categoryName 分类名称
         * @param categoryId 分类ID
         * @param words 评论字数（50-800）
         * @param reference 参考文案（可选）
         * @param tone 语气风格（可选）
         */
        const { categoryName, categoryId, words, reference, tone } = await request.json();
        if (!categoryName || !categoryId || !words || typeof categoryName !== 'string' || typeof categoryId !== 'number' || typeof words !== 'number') {
            return createJsonResponse(
                ResponseUtil.error('参数错误'),
                { status: 400 }
            );
        }

        try {
            const result = await generateComment({
                userId: user.userId,
                categoryId: categoryId,
                categoryName: categoryName,
                words: words,
                reference: reference,
                tone: tone
            });

            return createJsonResponse(ResponseUtil.success({ text: result.content }, '生成成功'));
        } catch (error) {
            console.error('生成评论失败:', error);
            return createJsonResponse(
                ResponseUtil.error(error instanceof Error ? error.message : '生成评论失败'),
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('获取支出记录失败:', error);
        return createJsonResponse(
            ResponseUtil.error('服务器内部错误'),
            { status: 500 }
        );
    }
}


export async function GET(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        if (!user) {
            return createJsonResponse(
                ResponseUtil.error('未授权访问'),
                { status: 401 }
            );
        }
        const dbUser = await prisma.user.findUnique({ where: { id: user.userId } })
        if (!dbUser) {
            return createJsonResponse(
                ResponseUtil.error('用户不存在或已失效，请重新登录'),
                { status: 401 }
            );
        }
        const template = request.nextUrl.searchParams.get('template')
        const _where = template === 'true' ? { isTemplate: true } : {}
        // 查询用户的好评记录，按创建时间倒序
        const records = await prisma.goodComment.findMany({
            where: {
                userId: user.userId,
                ..._where
            },
            select: {
                id: true,
                category: true,
                categoryName: true,
                limit: true,
                content: true,
                createdAt: true,
                isTemplate: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return createJsonResponse(
            ResponseUtil.success({ records }, '查询成功')
        );
    } catch (error) {
        console.error('获取支出记录失败:', error);
        return createJsonResponse(
            ResponseUtil.error('服务器内部错误'),
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        if (!user) {
            return createJsonResponse(
                ResponseUtil.error('未授权访问'),
                { status: 401 }
            );
        }
        const { id } = await request.json();
        if (!id || typeof id !== 'number' || !Number.isFinite(id)) {
            return createJsonResponse(
                ResponseUtil.error('参数错误'),
                { status: 400 }
            );
        }
        // 删除用户的好评记录
        const record = await prisma.goodComment.delete({
            where: {
                id,
                userId: user.userId,
            },
        });
        return createJsonResponse(
            ResponseUtil.success({ record }, '删除成功')
        );
    } catch (error) {
        console.error('删除好评记录失败:', error);
        return createJsonResponse(
            ResponseUtil.error('服务器内部错误'),
            { status: 500 }
        );
    }
}


export async function PUT(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        if (!user) {
            return createJsonResponse(
                ResponseUtil.error('未授权访问'),
                { status: 401 }
            );
        }
        const dbUser = await prisma.user.findUnique({ where: { id: user.userId } })
        if (!dbUser) {
            return createJsonResponse(
                ResponseUtil.error('用户不存在或已失效，请重新登录'),
                { status: 401 }
            );
        }
        const { id, isTemplate } = await request.json();
        if (!id || typeof id !== 'number' || !Number.isFinite(id) || typeof isTemplate !== 'boolean') {
            return createJsonResponse(
                ResponseUtil.error('参数错误'),
                { status: 400 }
            );
        }
        // 更新用户的好评记录
        const record = await prisma.goodComment.update({
            where: {
                id,
                userId: user.userId,
            },
            data: {
                isTemplate: isTemplate ? false : true
            }
        });
        return createJsonResponse(
            ResponseUtil.success({ record }, '更新成功')
        );
    } catch (error) {
        console.error('更新好评记录失败:', error);
        return createJsonResponse(
            ResponseUtil.error('服务器内部错误'),
            { status: 500 }
        );
    }
}