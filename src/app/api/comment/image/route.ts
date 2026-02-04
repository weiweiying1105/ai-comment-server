import { NextRequest, NextResponse } from "next/server";
import { createJsonResponse, ResponseUtil } from "@/lib/response";
import { verifyToken } from "@/utils/jwt";
import prisma from "@/lib/prisma";
import { recognizeDishFromBuffer } from "@/utils/baiduDish";

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

    // 验证用户（添加错误处理）
    try {
      const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });
      if (!dbUser) {
        return createJsonResponse(
          ResponseUtil.error("用户不存在或已失效，请重新登录"),
          { status: 401 }
        );
      }
    } catch (dbError) {
      console.error("数据库查询失败（用户验证）:", dbError);
      // 数据库连接失败时，仍然允许继续处理，因为菜品识别是核心功能
      console.warn("数据库连接失败，跳过用户验证，继续处理图片");
    }

    // 2. 解析参数
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const keyword = formData.get('keyword') as string || '';
    const words = parseInt(formData.get('words') as string) || 100;
    const tone = formData.get('tone') as string || "正常";

    if (!files || files.length === 0) {
      return createJsonResponse(
        ResponseUtil.error("图片不能为空"),
        { status: 200 }
      );
    }

    // 3. 处理图片：先识别菜品，再异步上传
    let recognizedDishes: string[] = [];
    let filesToUpload: Array<{ file: File; buffer: Buffer }> = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      // 读取文件内容
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 先识别菜品
      let dishName = await recognizeDishFromBuffer(buffer);
      console.log("识别菜品结果:", dishName);

      if (!dishName || dishName === "非菜") {
        continue;
      }

      recognizedDishes.push(dishName);
      filesToUpload.push({ file, buffer });
    }

    // 4. 异步上传识别到菜品的图片
    if (filesToUpload.length > 0) {
      // 在后台异步上传，不阻塞响应
      (async () => {
        for (const { file, buffer } of filesToUpload) {
          try {
            // 创建 FormData 调用上传接口
            const uploadFormData = new FormData();
           // 将Buffer转换为普通数组
// 将Buffer转换为Uint8Array
uploadFormData.append('file', new Blob([new Uint8Array(buffer)], { type: file.type }), file.name);
            // 调用上传接口
            const uploadResponse = await fetch(`${process.env.BASE_URL || 'http://localhost:3000'}/api/upload`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${request.headers.get('authorization')?.replace('Bearer ', '') || ''}`
              },
              body: uploadFormData
            });

            if (uploadResponse.ok) {
              const uploadData = await uploadResponse.json();
              if (uploadData.code === 200 && uploadData.data && uploadData.data.url) {
                console.log("图片上传成功:", uploadData.data.url);
                // 这里可以将上传结果存储起来，供后续使用
              }
            } else {
              console.error("调用上传接口失败:", uploadResponse.status, await uploadResponse.text());
            }

          } catch (uploadError) {
            console.error("上传图片失败:", uploadError);
          }
        }
      })();
    }

    // 检查是否识别到菜品
    if (recognizedDishes.length === 0) {
      return createJsonResponse(
        ResponseUtil.error("未识别到菜品", 501),
        { status: 200 }
      );
    }

    console.log("汇总识别到的菜名:", recognizedDishes);

    // 4. 查询美食分类的实际ID（添加错误处理）
    let categoryId = 1;
    let categoryName = "美食";

    try {
      const foodCategory = await prisma.category.findFirst({
        where: {
          OR: [
            { name: "美食" },
            { keyword: "food" }
          ]
        },
        select: { id: true, name: true }
      });
      
      if (foodCategory) {
        categoryId = foodCategory.id;
        categoryName = foodCategory.name;
        console.log("使用美食分类:", { id: categoryId, name: categoryName });
      } else {
        console.warn("未找到美食分类，使用默认值");
      }
    } catch (dbError) {
      console.error("数据库查询失败（分类查询）:", dbError);
      console.warn("数据库连接失败，使用默认分类值");
    }

    return createJsonResponse(
      ResponseUtil.success(
        { 
          dishes: recognizedDishes,
          categoryId,
          categoryName
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
