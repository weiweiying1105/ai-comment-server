import { createJsonResponse, ResponseUtil } from "@/lib/response"
import { verifyToken } from "@/utils/jwt"
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
async function analyzeImage(imageUrl?: string): Promise<string | null> {
  if (!imageUrl) return null

  const openaiKey = process.env.OPENAI_API_KEY
  if (!openaiKey) {
    console.warn('未配置 OPENAI_API_KEY，跳过图片分析')
    return null
  }

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `这是一张大众点评场景相关的图片，请用中文帮我分析图片里和“写好评”相关的信息，用 3～6 条要点的形式给我：
1. 环境、氛围
2. 服务感觉
3. 菜品或产品整体感觉
4. 适合的人群或场景

只输出「要点」描述，不要客套开头/结尾，不要加标题。`,
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl },
              },
            ],
          },
        ],
        temperature: 0.5,
        max_tokens: 512,
      }),
    })

    if (!resp.ok) {
      const text = await resp.text()
      console.error('图片分析失败', resp.status, text)
      return null
    }

    const data = await resp.json()
    const content: string =
      data?.choices?.[0]?.message?.content?.trim() || ''
    return content || null
  } catch (e) {
    console.error('调用 OpenAI 进行图片分析异常', e)
    return null
  }
}


export async function POST(request: NextRequest) {
    try{
         const user = await verifyToken(request);
        if (!user) {
            return createJsonResponse(
                ResponseUtil.error('未授权访问'),
                { status: 401 }
            );
        }
        // 额外保证：token对应的用户必须存在（避免数据库重置后token失效导致外键错误）
        const dbUser = await prisma.user.findUnique({ where: { id: user.userId } })
        if (!dbUser) {
            return createJsonResponse(
                ResponseUtil.error('用户不存在或已失效，请重新登录'),
                { status: 401 }
            );
        }
        // 解析参数     words: limit, tone: toneLabel,
        const {images,keyword} = await request.json();
        if (!images && !keyword) {
            return createJsonResponse(
                ResponseUtil.error('图片URL或关键词不能为空'),
                { status: 400 }
            );
        }
        if(images.length){
            const imagePromises = images.map(async (image: string) => {
                const analysis = await analyzeImage(image);
                return { image, analysis };
            });
            const imageResults = await Promise.all(imagePromises);
            console.log('图片分析结果:', imageResults);
        }
      } catch (error) {
        console.error('获取支出记录失败:', error);
        return createJsonResponse(
            ResponseUtil.error('服务器内部错误'),
            { status: 500 }
        );
    }
}