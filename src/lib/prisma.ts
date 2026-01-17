import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      'error',
      'warn'
    ] as any
  })

  // 记录查询耗时，定位慢查询
  ; (prisma as any).$on('query', (e: any) => {
    // e: { query, params, duration }
    if (e?.duration >= 500) {
      console.warn(`[Prisma][SlowQuery] ${e.duration}ms\nSQL: ${e.query}\nParams: ${e.params}`)
    }
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
export default prisma