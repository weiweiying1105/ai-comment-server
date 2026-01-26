
import prisma from "@/lib/prisma";
import { normalizeTone, ToneKey } from "@/utils/aiText";
export interface GenerateCommentParams {
    userId: string;
    categoryId: number;
    categoryName: string;
    words: number;
    reference?: string;
    tone?: string;
}

export interface GenerateCommentResult {
    content: string;
    commentId: number;
}
// 构建评论提示词
export function buildPrompt(
    categoryName: string,
    words: number,
    reference?: string,
    toneKey?: ToneKey | string
): string {
    const toneDesc = normalizeTone(toneKey);

    return `你是一名资深大众点评老用户，请根据以下信息写一段走心好评文案，约 ${words} 字左右。

【语气要求（最重要）】
${toneDesc}

【基础信息】
- 关键词/主题/分类：${categoryName}
- 参考文案：${reference || '无'}

【内容要求】
1. 贴地气，语言自然真实，像真实用户写的好评，不要像广告。
2. 尽量包含具体细节（环境、服务、口味、性价比等），让人能“脑补出画面”。
3. 如果关键词是大分类（如“美食”“亲子”“旅游/出行”等），不要出现具体菜名或特别细的项目，只写通用体验。
4. 可以参考以下结构自由发挥（不必全部使用）：
   - 场景与店铺亮点
   - 具体体验细节
   - 推荐的菜/项目以及推荐理由（如果合适）
   - 适合的人群和小建议
   - 温暖结尾或轻微安利

【限制】
- 不使用 Emoji。
- 避免特别夸张和空洞的形容（如“超级无敌”“一生推”“YYDS”等）。
- 不要输出条目列表或小标题，只输出一整段自然连贯的中文好评。

现在请按照以上要求，直接输出最终成品文案，不要添加任何额外说明。`;
}

export async function generateComment(params: GenerateCommentParams): Promise<GenerateCommentResult> {
    try{
    const { userId, categoryId, categoryName, words, reference, tone } = params;
    
    // 验证参数
    if (!userId || !categoryId || !categoryName || !words) {
        throw new Error('参数错误');
    }
    
    // 处理字数限制
    const targetWords = typeof words === 'number' && Number.isFinite(words) && words >= 50 && words <= 800
        ? Math.round(words)
        : 120;
    
    // 获取API密钥
    let apiKey = process.env.DEEPSEEK_API_KEY;
    let apiUrl = 'https://api.deepseek.com/v1/chat/completions';
    
 
    // 构建请求体
    const body = {
        model: apiUrl.includes('openai') ? 'gpt-3.5-turbo' : 'deepseek-chat',
        messages: [
            {
                role: 'system',
                content: '你是资深大众点评文案策划，擅长写真实、具体、有温度的好评文案，能够根据不同需求调整语气风格。输出纯文本，不要解释，不要加前后引号。',
            },
            { role: 'user', content: buildPrompt(categoryName, targetWords, reference ?? '无', tone ?? '正常') },
        ],
        temperature: 0.85,
        max_tokens: Math.min(2048, Math.max(128, Math.round(targetWords * 2))),
    };
    
    
    // 调用API生成评论
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时
    
    let resp;
    try {
        // 创建带超时的fetch请求
        const fetchPromise = fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            signal: controller.signal,
        });
        
        // 添加超时处理
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('API请求超时，请稍后重试')), 30000);
        });
        
        // 竞态条件：谁先完成就用谁的结果
        resp = await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError' || error.message === 'API请求超时，请稍后重试') {
            throw new Error('API请求超时，请稍后重试');
        }
        throw error;
    }
    
    clearTimeout(timeoutId);
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`API 请求失败: ${resp.status} ${errText}`);
    }
    
    const data = await resp.json();
    const content: string = data?.choices?.[0]?.message?.content?.trim() ?? '';
    
    // 保存到数据库
    const result = await prisma.$transaction([
        // 创建评论
        prisma.goodComment.create({
            data: {
                userId,
                category: categoryId,
                categoryName,
                content,
                limit: targetWords,
                isTemplate: false
            }
        }),
        // 更新分类使用次数
        prisma.category.update({
            where: {
                id: categoryId,
            },
            data: {
                use_count: { increment: 1 }
            }
        }),
    ]);
    return {
        content: result[0].content,
        commentId: result[0].id
    };
    }catch(error){
        console.error('生成评论失败11:', error);
        throw error;
    }
    
    
}
