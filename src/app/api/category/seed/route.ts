import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { dpCategories, Category } from '@/data/dpCategories'
import { ResponseUtil, createJsonResponse } from '@/lib/response'

async function upsertCategory(
  id: string,
  name: string,
  parentId?: number,
  keyword?: string,
  icon?: string,
  active_icon?: string,
) {
  return prisma.category.upsert({
    where: { name },
    update: {
      name,
      parentId,
      keyword,
      icon,
      active_icon,
    },
    create: {
      name,
      parentId,
      keyword,
      icon,
      active_icon,
    },
  })
}

async function seedCategories(categories: Category[], parentId?: number) {
  const results: { id: number; name: string; keyword: string | null; parentId: number | null; icon: string | null; active_icon: string | null }[] = []

  for (const cat of categories) {
    const keyword = cat.keyword ?? cat.id
    const icon = cat.icon ?? undefined
    const activeIcon = (cat as any).active_icon ?? undefined
    const created = await upsertCategory(cat.id, cat.name, parentId, keyword, icon, activeIcon)
    results.push({ id: created.id, name: created.name, keyword: created.keyword ?? null, parentId: created.parentId ?? null, icon: created.icon ?? null, active_icon: created.active_icon ?? null })

    if (cat.children && cat.children.length > 0) {
      const childResults = await seedCategories(cat.children, created.id)
      results.push(...childResults)
    }
  }

  return results
}

export async function POST(req: NextRequest) {
  try {
    const seeded = await seedCategories(dpCategories)
    return createJsonResponse(
      ResponseUtil.success(
        { count: seeded.length, items: seeded },
        '分类已写入（幂等：按名称唯一Upsert，含keyword、icon、active_icon）'
      )
    )
  } catch (error: any) {
    console.error('Seed categories error:', error)
    return createJsonResponse(
      ResponseUtil.error(`分类导入失败: ${error?.message || String(error)}`),
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return createJsonResponse(ResponseUtil.success(null), { status: 204 })
}