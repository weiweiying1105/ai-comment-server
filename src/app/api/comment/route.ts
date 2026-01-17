import { NextResponse, NextRequest } from "next/server";
import { createJsonResponse, ResponseUtil } from "@/lib/response";
import { verifyToken } from "@/utils/jwt";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic"

function buildPrompt(categoryName: string, words: number, reference?: string,tone?:string): string {
    return `请根据以下信息写一段大众点评风格的走心好评文案，约 ${words} 字左右。
- 关键词/主题/分类：${categoryName}
- 语气要求：${tone || '正常'}
- 重中之重：必须严格遵循指定语气！不要写具体的产品。多模拟客户感受，可以多写服务，环境，口味，性价比等。内容要完整，不要省略和缺失。
- 要求：要贴地气，语言自然真实、包含具体细节（环境/服务/口味/性价比）， 如果关键词是大分类，就不要生成具体产品的内容了。就写的通用一点。不使用Emoji，避免夸张词与空洞形容。
- 比如：1) 场景与店铺亮点; 2) 具体体验细节; 3) 推荐菜/项目与理由; 4) 适合人群与小建议; 5) 温暖结尾与轻微召唤。等等，取一部分或者都取。
- 参考文案：${reference || '无'}
只输出成品文案。`
}


export async function POST(request: NextRequest) {
    try {
        const user = await verifyToken(request);
        if (!user) {
            return createJsonResponse(
                ResponseUtil.error('未授权访问'),
                { status: 401 }
            );
        }
        const { categoryName, categoryId, words, reference,tone } = await request.json();
        if (!categoryName || !categoryId || !words || typeof categoryName !== 'string' || typeof categoryId !== 'number' || typeof words !== 'number') {
            return createJsonResponse(
                ResponseUtil.error('参数错误'),
                { status: 400 }
            );
        }
        const targetWords =
            typeof words === 'number' && Number.isFinite(words) && words >= 50 && words <= 800
                ? Math.round(words)
                : 120

        const apiKey = process.env.DEEPSEEK_API_KEY
        if (!apiKey) {
            return createJsonResponse(ResponseUtil.error('未配置 DEEPSEEK_API_KEY'), { status: 500 })
        }

        const body = {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content:
                        '你是资深大众点评文案策划，擅长写真实、具体、有温度的好评文案，能够根据不同需求调整语气风格。输出纯文本，不要解释，不要加前后引号。',
                },
                { role: 'user', content: buildPrompt(categoryName, targetWords, reference ?? '',tone??'') },
            ],
            temperature: 0.85, // 增加温度值以获得更有创意和多样化的语气表达
            // 将“字数”近似为 token 数上限；中文字符与 token 接近，英文粗略按 2 倍处理
            max_tokens: Math.min(2048, Math.max(128, Math.round(targetWords * 2))),
        }

        const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        if (!resp.ok) {
            const errText = await resp.text()
            return createJsonResponse(
                ResponseUtil.error(`DeepSeek 请求失败: ${resp.status} ${errText}`),
                { status: 500 },
            )
        }

        const data = await resp.json()
        const content: string = data?.choices?.[0]?.message?.content?.trim() ?? '';
        // 事务
        const result = await prisma.$transaction([
            // 创建评论
            prisma.goodComment.create({
                data: {
                    userId: user.userId,
                    category: categoryId,
                    categoryName: categoryName,
                    content,
                    limit: targetWords,
                    isTemplate: false
                }
            }),
            // 生成评论记录
            prisma.category.update({
                where: {
                    id: categoryId,
                },
                data: {
                    use_count: { increment: 1 }
                }
            }),

        ])

        return createJsonResponse(ResponseUtil.success({ text: result[0].content }, '生成成功'))

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