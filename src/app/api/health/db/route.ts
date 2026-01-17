import prisma from '@/lib/prisma'
import { createJsonResponse, ResponseUtil } from '@/lib/response'

export const dynamic = 'force-dynamic'

export async function GET() {
  const t0 = Date.now()
  try {
    // 轻量级探针：唤醒数据库计算节点并验证连接状态
    await prisma.$queryRaw`SELECT 1`
    const t1 = Date.now()
    return createJsonResponse(
      ResponseUtil.success({ ok: true, durationMs: t1 - t0 }, 'DB 健康检查成功'),
      {
        headers: {
          // 允许代理缓存 30 秒，避免频繁触发
          'Cache-Control': 's-maxage=30'
        }
      }
    )
  } catch (error: any) {
    const t1 = Date.now()
    return createJsonResponse(
      ResponseUtil.error(`DB 健康检查失败: ${error?.message || String(error)}`),
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}