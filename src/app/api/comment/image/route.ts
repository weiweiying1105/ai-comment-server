import { NextRequest, NextResponse } from "next/server";
import { createJsonResponse, ResponseUtil } from "@/lib/response";
import { verifyToken } from "@/utils/jwt";
import prisma from "@/lib/prisma";
import { recognizeDishFromUrl, recognizeDishFromBuffer } from "@/utils/baiduDish";

// 可选：将来如果你有代理能访问 OpenAI，可以开启这个图片环境分析
// async function analyzeImage(imageUrl?: string): Promise<string | null> {
//   if (!imageUrl) return null;

//   const openaiKey = process.env.OPENAI_API_KEY;
//   if (!openaiKey) {
//     console.warn("未配置 OPENAI_API_KEY，跳过图片分析");
//     return null;
//   }

//   try {
//     const resp = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${openaiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-4.1-mini",
//         messages: [
//           {
//             role: "user",
//             content: [
//               {
//                 type: "text",
//                 text: `这是一张大众点评场景相关的图片，请用中文帮我分析图片里和“写好评”相关的信息，用 3～6 条要点的形式给我：
// 1. 环境、氛围
// 2. 服务感觉
// 3. 菜品或产品整体感觉
// 4. 适合的人群或场景

// 只输出「要点」描述，不要客套开头/结尾，不要加标题。`,
//               },
//               {
//                 type: "image_url",
//                 image_url: { url: imageUrl },
//               },
//             ],
//           },
//         ],
//         temperature: 0.5,
//         max_tokens: 512,
//       }),
//     });

//     if (!resp.ok) {
//       const text = await resp.text();
//       console.error("图片分析失败", resp.status, text);
//       return null;
//     }

//     const data = await resp.json();
//     const content: string = data?.choices?.[0]?.message?.content?.trim() || "";
//     return content || null;
//   } catch (e) {
//     console.error("调用 OpenAI 进行图片分析异常", e);
//     // 当前环境连不上 OpenAI 时直接吞掉，避免影响主流程
//     return null;
//   }
// }

// 如果你希望这个接口支持频繁调用，可以加上这一句
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. 校验登录 & 用户有效性
    const user = await verifyToken(request);
    if (!user) {
      return createJsonResponse(
        ResponseUtil.error("未授权访问"),
        { status: 401 }
      );
    }

    const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });
    if (!dbUser) {
      return createJsonResponse(
        ResponseUtil.error("用户不存在或已失效，请重新登录"),
        { status: 401 }
      );
    }

    const formData = await request.formData();
      const file = formData.get('file') as File;
      if (!file || !(file instanceof File)) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
      }
    
      // 读取内容
      const arrayBuffer = await file.arrayBuffer();// 转换为 ArrayBuffer
      const buffer = Buffer.from(arrayBuffer); 
      const res = await recognizeDishFromBuffer(buffer);

    // 2. 解析参数
    //   你原来的注释：words: limit, tone: toneLabel，
    //   这里先只用 images + keyword，如果后面需要可以再加 words / tone
    // const body = await request.json();
    // const { images, keyword } = body as {
    //   images?: string[];
    //   keyword?: string;
    // };

    // if (
    //   (!images || !Array.isArray(images) || images.length === 0) &&
    //   (!keyword || typeof keyword !== "string" || keyword.trim() === "")
    // ) {
    //   return createJsonResponse(
    //     ResponseUtil.error("图片URL或关键词不能为空"),
    //     { status: 400 }
    //   );
    // }

    // // 3. 处理图片：用百度菜品识别识别出菜名
    // let imageResults: {
    //   image: string;
    //   dishName: string | null;
    //   // envAnalysis?: string | null; // 如果以后要用 analyzeImage，可以开这个字段
    // }[] = [];

    // if (images && Array.isArray(images) && images.length > 0) {
    //   const imagePromises = images.map(async (imageUrl: string) => {
    //     // 识别菜名（百度菜品识别）
    //     let dishName: string | null = null;
    //     try {
    //       dishName = await recognizeDishFromUrl(imageUrl);
    //     } catch (e) {
    //       console.error("调用百度菜品识别失败：", e);
    //     }

    //     // 如果以后有代理能访问 OpenAI，可以顺便做一个环境分析：
    //     // const envAnalysis = await analyzeImage(imageUrl);

    //     return {
    //       image: imageUrl,
    //       dishName,
    //       // envAnalysis,
    //     };
    //   });

    //   imageResults = await Promise.all(imagePromises);
    //   console.log("图片菜品识别结果:", imageResults);
    // }

    // // 4. 汇总识别到的菜名（便于前端展示或后续生成好评用）
    // const dishes = imageResults
    //   .map((item) => item.dishName)
    //   .filter((name): name is string => !!name);

    // 这里先不直接调用 DeepSeek 生成好评：
    // - 你可以在前端拿到 dishes + keyword，再调用你已有的「生成好评」接口
    // - 或者以后在这个接口里继续加一段 DeepSeek 生成文案的逻辑

    return createJsonResponse(
      ResponseUtil.success(
        { 
        res
        },
        "图片分析成功"
      )
    );
  } catch (error) {
    console.error("分析图片失败:", error);
    return createJsonResponse(
      ResponseUtil.error("服务器内部错误"),
      { status: 500 }
    );
  }
}
