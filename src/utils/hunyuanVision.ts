// src/utils/hunyuanVision.ts

export type FoodEnvAnalysis = {
  dishName: string | null;   // 识别到的主要菜名
  envSummary: string;        // 环境/氛围简述
  scenes: string;            // 适合人群或场景
  raw: string;               // 原始模型输出（便于 debug）
};

/**
 * 用腾讯混元视觉模型（多模态）分析美食图片：
 * - 猜菜名
 * - 概括环境/氛围
 * - 适合什么场景
 */
export async function analyzeFoodImageWithHunyuan(
  imageUrl: string,
): Promise<FoodEnvAnalysis | null> {
  if (!imageUrl) return null;

  const apiKey = process.env.HUNYUAN_API_KEY;
  if (!apiKey) {
    console.warn("未配置 HUNYUAN_API_KEY，跳过混元图片分析");
    return null;
  }

  // 注意：模型名要去腾讯混元控制台确认
  // 示例：hunyuan-t1-vision / hunyuan-t1-vision-20250916 等
  const model = process.env.HUNYUAN_VISION_MODEL || "hunyuan-t1-vision";

  const endpoint = "https://api.hunyuan.cloud.tencent.com/v1/chat/completions";

  const prompt = `
你是一名大众点评美食图片分析助手。我会给你一张餐饮相关的图片，请你根据图片，严格输出一段 JSON，包含以下字段：

- dishName: 图片里最主要的菜品名称（例如"西红柿炒蛋"、"宫保鸡丁"、"寿司拼盘"等，若无法判断请填 null）
- envSummary: 用一两句话概括就餐环境和氛围，比如"家常小馆，光线明亮，桌面比较干净"、"商场里的日料店，偏精致安静"
- scenes: 适合的人群或场景，比如"适合朋友聚餐"、"适合情侣约会"、"适合一家人周末来吃"

要求：
1. 可以做合理推断，但不要凭空编造明显不存在的细节。
2. 严格输出 JSON，不要在 JSON 前后添加任何多余文字、注释或解释。
3. 字段名必须是 dishName、envSummary、scenes。
`;

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
          ],
        },
      ],
      temperature: 0.3,
      max_tokens: 512,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("Hunyuan 图片分析请求失败:", resp.status, text);
    return null;
  }

  const data = (await resp.json()) as any;
  const content: string =
    data?.choices?.[0]?.message?.content?.trim() || "";

  if (!content) return null;

  try {
    const json = JSON.parse(content);
    const result: FoodEnvAnalysis = {
      dishName:
        json.dishName === null || json.dishName === undefined
          ? null
          : String(json.dishName),
      envSummary: json.envSummary ? String(json.envSummary) : "",
      scenes: json.scenes ? String(json.scenes) : "",
      raw: content,
    };
    return result;
  } catch (e) {
    console.warn(
      "解析 Hunyuan 返回 JSON 失败，直接返回原始文本:",
      content,
    );
    return {
      dishName: null,
      envSummary: content,
      scenes: "",
      raw: content,
    };
  }
}
