import { NextRequest } from "next/server";
import { createJsonResponse, ResponseUtil } from "@/lib/response";
import { verifyToken } from "@/utils/jwt";
import prisma from "@/lib/prisma";
import {
  analyzeFoodImageWithHunyuan,
  FoodEnvAnalysis,
} from "@/utils/hunyuanVision";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. 校验登录 & 用户有效性
    const user = await verifyToken(request);
    if (!user) {
      return createJsonResponse(
        ResponseUtil.error("未授权访问"),
        { status: 401 },
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
    });
    if (!dbUser) {
      return createJsonResponse(
        ResponseUtil.error("用户不存在或已失效，请重新登录"),
        { status: 401 },
      );
    }

    // 2. 解析参数
    const body = await request.json();
    const { images, keyword } = body as {
      images?: string[];
      keyword?: string;
    };

    if (
      (!images || !Array.isArray(images) || images.length === 0) &&
      (!keyword || typeof keyword !== "string" || keyword.trim() === "")
    ) {
      return createJsonResponse(
        ResponseUtil.error("图片URL或关键词不能为空"),
        { status: 400 },
      );
    }

    // 3. 调用腾讯混元多模态，分析每一张图片
    let imageResults: {
      image: string;
      analysis: FoodEnvAnalysis | null;
    }[] = [];

    if (images && Array.isArray(images) && images.length > 0) {
      const imagePromises = images.map(async (imageUrl: string) => {
        let analysis: FoodEnvAnalysis | null = null;
        try {
          analysis = await analyzeFoodImageWithHunyuan(imageUrl);
        } catch (e) {
          console.error("调用腾讯混元分析图片失败:", e);
        }

        return {
          image: imageUrl,
          analysis,
        };
      });

      imageResults = await Promise.all(imagePromises);
      console.log("腾讯混元图片分析结果:", imageResults);
    }

    // 4. 汇总识别到的菜名（方便前端直接展示 / 继续生成好评用）
    const dishes = imageResults
      .map((item) => item.analysis?.dishName)
      .filter((name): name is string => !!name);

    // 这里先只做“分析图片”，不直接生成好评文案：
    // - 你可以在前端拿到 imageResults + dishes + keyword，
    //   然后再调用你已有的 /api/good-comment 去让 DeepSeek 写好评。
    // - 或者后面我们可以在这个接口里顺带调用 DeepSeek 拼成一条链路。

    return createJsonResponse(
      ResponseUtil.success(
        {
          images: imageResults,
          dishes,
          keyword: keyword || null,
        },
        "图片分析成功",
      ),
    );
  } catch (error) {
    console.error("分析图片失败:", error);
    return createJsonResponse(
      ResponseUtil.error("服务器内部错误"),
      { status: 500 },
    );
  }
}
