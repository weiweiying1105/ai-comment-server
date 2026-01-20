import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { Category } from '@/data/dpCategories'
import { ResponseUtil, createJsonResponse } from '@/lib/response'
import fs from 'fs/promises'
import path from 'path'

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

// 允许 JSON 中携带 active_icon 字段
type CategoryInput = Category & { active_icon?: string; children?: CategoryInput[] }

async function loadCategoriesFromFile(fileName: string): Promise<CategoryInput[]> {
  // 支持绝对路径、seed 目录、public 目录与 src/data 目录，以及 src/app/api/category/seed 目录
  const candidates: string[] = []
  if (path.isAbsolute(fileName)) {
    candidates.push(fileName)
  } else {
    candidates.push(
      path.join(process.cwd(), 'seed', fileName),
      path.join(process.cwd(), 'public', fileName),
      path.join(process.cwd(), 'src', 'data', fileName),
      path.join(process.cwd(), 'src', 'app', 'api', 'category', 'seed', fileName),
    )
  }

  // 回退快照（优先 public，再尝试 src/data）
  const fallbackCandidates = [
    path.join(process.cwd(), 'public', 'category-snapshot.json'),
    path.join(process.cwd(), 'src', 'data', 'category-snapshot.json'),
  ]

  let jsonText: string | null = null
  for (const p of candidates) {
    try {
      jsonText = await fs.readFile(p, 'utf-8')
      break
    } catch (_) { /* try next */ }
  }

  if (!jsonText) {
    for (const fp of fallbackCandidates) {
      try {
        jsonText = await fs.readFile(fp, 'utf-8')
        console.warn(`[Seed] 未找到 ${fileName}，使用 fallback: ${path.basename(fp)}`)
        break
      } catch (_) { /* try next */ }
    }
  }

  if (!jsonText) {
    throw new Error(`无法读取分类文件：${fileName} 或 fallback 快照。请将 JSON 放到 seed/、public/、src/data/ 或 src/app/api/category/seed/ 目录下。`)
  }

  const raw = JSON.parse(jsonText!)
  const arr =
    Array.isArray(raw) ? raw
      : Array.isArray((raw as any)?.items) ? (raw as any).items
        : Array.isArray((raw as any)?.categories) ? (raw as any).categories
          : null

  if (!arr) {
    throw new Error('分类 JSON 格式错误：应为数组，或包含 items/categories 数组字段')
  }

  return arr as CategoryInput[]
}

async function seedCategories(categories: Category[], parentId?: number) {
  const results: { id: number; name: string; keyword: string | null; parentId: number | null; icon: string | null; active_icon: string | null }[] = []

  for (const cat of categories) {
    const keyword = cat.keyword ?? (cat as any).id
    const icon = cat.icon ?? undefined
    const activeIcon = (cat as any).active_icon ?? undefined
    const created = await upsertCategory((cat as any).id, cat.name, parentId, keyword, icon, activeIcon)
    results.push({ id: created.id, name: created.name, keyword: created.keyword ?? null, parentId: created.parentId ?? null, icon: created.icon ?? null, active_icon: created.active_icon ?? null })

    if ((cat as any).children && (cat as any).children.length > 0) {
      const childResults = await seedCategories(((cat as any).children) as any, created.id)
      results.push(...childResults)
    }
  }

  return results
}

export async function POST(req: NextRequest) {
  try {
    const file = req.nextUrl.searchParams.get('file') ?? 'Category.json'
    const categories = await loadCategoriesFromFile(file)
    const seeded = await seedCategories(categories as any)
    return createJsonResponse(
      ResponseUtil.success(
        { file, count: seeded.length, items: seeded },
        `分类已写入（来源: ${file}；幂等：按名称唯一Upsert，含keyword、icon、active_icon）`
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