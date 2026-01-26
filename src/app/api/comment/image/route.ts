import { NextRequest, NextResponse } from "next/server";
import { createJsonResponse, ResponseUtil } from "@/lib/response";
import { verifyToken } from "@/utils/jwt";
import prisma from "@/lib/prisma";
import { recognizeDishFromUrl, recognizeDishFromBuffer } from "@/utils/baiduDish";
import { generateComment } from "@/utils/commentGenerator";
import { getCache, setCache } from '@/lib/cache'
// 在生产环境启用 60s 缓存
const CACHE_KEY = 'categories:list'
const CACHE_TTL_MS = 60 * 1000 * 60 * 24 * 30;// 缓存 30 天


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


    // 2. 解析参数
    //   你原来的注释：words: limit, tone: toneLabel，
    //   这里先只用 images + keyword，如果后面需要可以再加 words / tone
    const body = await request.json();
    const { images, keyword, words = 100, tone = "正常" } = body as {
      images?: string[];
      keyword?: string;
      words?: number;
      tone?: string;
    };

    if (
      (!images || !Array.isArray(images) || images.length === 0) &&
      (!keyword || typeof keyword !== "string" || keyword.trim() === "")
    ) {
      return createJsonResponse(
        ResponseUtil.error("图片URL或关键词不能为空"),
        { status: 400 }
      );
    }

    // 3. 处理图片：用百度菜品识别识别出菜名
    let imageResults: {
      image: string;
      dishName: string | null;
      // envAnalysis?: string | null; // 如果以后要用 analyzeImage，可以开这个字段
    }[] = [];
    let dishes: string[] = [];
    if (images && Array.isArray(images) && images.length > 0) {
      const imagePromises = images.map(async (imageUrl: string) => {
        // 识别菜名（百度菜品识别）
        let dishName: string | null = null;
        try {
          dishName = await recognizeDishFromUrl(imageUrl);
        } catch (e) {
          console.error("调用百度菜品识别失败：", e);
        }

        // 如果以后有代理能访问 OpenAI，可以顺便做一个环境分析：
        // const envAnalysis = await analyzeImage(imageUrl);

        return {
          image: imageUrl,
          dishName,
          // envAnalysis,
        };
      });

      imageResults = await Promise.all(imagePromises);
      console.log("图片菜品识别结果:", imageResults);
       dishes = imageResults
      .map((item) => item.dishName)
      .filter((name): name is string => !!name);
    console.log("汇总识别到的菜名:", dishes);
    
    // 检查是否识别到菜品
    if (dishes.length == 0 || dishes.every(dish => dish === "非菜")) {
      return createJsonResponse(
        ResponseUtil.error("未识别到菜品，请上传包含菜品的图片"),
        { status: 400 }
      );
    }
    }

    // 4. 汇总识别到的菜名（便于前端展示或后续生成好评用）
    
    // 查询美食分类的实际ID
    const foodCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: "美食" },
          { keyword: "food" }
        ]
      },
      select: { id: true, name: true }
    });
    
    if (!foodCategory) {
      console.error("未找到美食分类");
      return createJsonResponse(
        ResponseUtil.error("系统配置错误：未找到美食分类"),
        { status: 500 }
      );
    }
    
    const { id: categoryId, name: categoryName } = foodCategory;
    console.log("使用美食分类:", { id: categoryId, name: categoryName });

    // 7. 生成好评
    let generatedComment = null;
    
    if (dishes.length > 0 || keyword) {
        try {
            const result = await generateComment({
                userId: user.userId,
                categoryId: categoryId,
                categoryName: categoryName,
                words: words,
                reference: dishes.length > 0 ? `推荐菜品：${dishes.join('、')}、关键词：${keyword}` : `关键词：${keyword}`,
                tone: tone
            });
            generatedComment = result.content;
        } catch (error) {
            console.error("生成评论失败:", error);
        }
    }

    return createJsonResponse(
      ResponseUtil.success(
        { 
          dishes,
          categoryId,
          categoryName,
          comment: generatedComment
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
