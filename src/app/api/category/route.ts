import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { createJsonResponse, ResponseUtil } from '@/lib/response'
import fs from 'fs/promises'
import path from 'path'

// 在生产环境启用 60s 缓存
export const revalidate = 60

// 轻量级内存缓存（开发/Node 运行时有效）
const CATEGORY_CACHE_TTL_MS = 30 * 1000
const __categoryCache: Map<string, { ts: number; data: any }> = (globalThis as any).__categoryCache || new Map()
    ; (globalThis as any).__categoryCache = __categoryCache
const getCached = (key: string) => {
    const v = __categoryCache.get(key)
    if (!v) return undefined
    return Date.now() - v.ts < CATEGORY_CACHE_TTL_MS ? v.data : undefined
}
const setCached = (key: string, data: any) => {
    __categoryCache.set(key, { ts: Date.now(), data })
}

const selectFields = {
    id: true,
    name: true,
    parentId: true,
    keyword: true,
    icon: true,
    active_icon: true,
    use_count: true,
}

type CategoryNode = {
    id: number
    name: string
    parentId: number | null
    keyword: string | null
    icon: string | null
    active_icon: string | null
    use_count: number
    frequentlyUsed?: boolean
    group?: 'international' | 'regional' | 'dessert'
    children: CategoryNode[]
}
function buildCategoryTree(items: { id: number; name: string; parentId: number | null; keyword: string | null; icon: string | null; active_icon: string | null; use_count: number; frequentlyUsed?: boolean; group?: 'international' | 'regional' | 'dessert' }[]): CategoryNode[] {
    const nodeMap = new Map<number, CategoryNode>()
    const roots: CategoryNode[] = []

    // 初始化节点映射
    for (const it of items) {
        nodeMap.set(it.id, {
            id: it.id,
            name: it.name,
            parentId: it.parentId,
            keyword: it.keyword,
            icon: it.icon,
            active_icon: it.active_icon,
            use_count: it.use_count,
            frequentlyUsed: it.frequentlyUsed,
            group: it.group,
            children: []
        })
    }

    // 建立父子关系
    for (const node of nodeMap.values()) {
        if (node.parentId == null) {
            roots.push(node)
        } else {
            const parent = nodeMap.get(node.parentId)
            if (parent) {
                parent.children.push(node)
            } else {
                // 父节点缺失，作为根节点返回，避免数据丢失
                roots.push(node)
            }
        }
    }

    // 二级分类排序：常用优先，其次 use_count 降序，再按 id 升序
    for (const node of nodeMap.values()) {
        if (node.children && node.children.length > 0) {
            node.children.sort((a, b) => {
                const af = a.frequentlyUsed ? 1 : 0
                const bf = b.frequentlyUsed ? 1 : 0
                if (bf !== af) return bf - af
                return (b.use_count || 0) - (a.use_count || 0) || (a.id - b.id)
            })
        }
    }

    return roots
}

export async function OPTIONS() {
    return createJsonResponse(ResponseUtil.success(null), { status: 204 })
}

export async function GET(req: NextRequest) {
    try {
        const t0 = Date.now()
        const { searchParams } = new URL(req.url)
        const keyword = searchParams.get('keyword') || undefined
        const top = searchParams.get('top')
        const parentIdParam = searchParams.get('parentId')
        const frequentlyUsed = searchParams.get('frequentlyUsed')
        const limitParam = searchParams.get('limit')
        const limit = limitParam ? Number(limitParam) : undefined
        const snapshotParam = searchParams.get('snapshot')
        const useSnapshotFlag = snapshotParam === 'true' || process.env.USE_CATEGORY_SNAPSHOT === '1'
        const canUseSnapshot = useSnapshotFlag && !keyword && !top && !parentIdParam && frequentlyUsed !== 'true'

        // 缓存 key
        const cacheKey = JSON.stringify({
            keyword,
            top: !!top,
            parentId: parentIdParam ? Number(parentIdParam) : null,
            frequentlyUsed: frequentlyUsed === 'true',
            limit,
            snapshot: !!canUseSnapshot,
        })
        const cached = getCached(cacheKey)
        if (cached) {
            const msg = frequentlyUsed === 'true'
                ? '常用分类查询成功（缓存）'
                : (keyword || top || parentIdParam
                    ? '分类查询成功（含keyword、icon、active_icon）（缓存）'
                    : '分类树查询成功（含keyword、icon、active_icon）（缓存）')
            const tCache = Date.now()
            console.log(`[API/category] cache-hit, total=${tCache - t0}ms`)
            return createJsonResponse(ResponseUtil.success(cached, msg), {
                headers: {
                    'Cache-Control': 's-maxage=60, stale-while-revalidate=300'
                }
            })
        }

        // 快照优先：用于避免首次请求的数据库唤醒/网络延迟
        if (canUseSnapshot) {
            const candidates = [
                path.resolve(process.cwd(), 'public', 'category-snapshot.json'),
                path.resolve(process.cwd(), 'src', 'data', 'category-snapshot.json'),
            ]
            let snapshotData: any | null = null
            for (const p of candidates) {
                try {
                    const buf = await fs.readFile(p, 'utf-8')
                    snapshotData = JSON.parse(buf)
                    break
                } catch (_) { }
            }
            if (snapshotData) {
                setCached(cacheKey, snapshotData)
                const tEnd = Date.now()
                console.log(`[API/category] snapshot-return total=${tEnd - t0}ms`)
                return createJsonResponse(
                    ResponseUtil.success(snapshotData, '分类快照返回'),
                    {
                        headers: {
                            'Cache-Control': 's-maxage=60, stale-while-revalidate=300'
                        }
                    }
                )
            } else {
                console.warn('[API/category] snapshot enabled but file not found')
            }
        }

        // 按需过滤
        const where: any = {}
        if (keyword) where.keyword = keyword
        if (top) where.parentId = null
        if (parentIdParam) where.parentId = Number(parentIdParam)

        // Default ordering
        let orderBy: Array<Record<string, 'asc' | 'desc'>> = [{ parentId: 'asc' }, { id: 'asc' }]

        // If frequentlyUsed is true, sort by use_count descending
        if (frequentlyUsed === 'true') {
            orderBy = [{ use_count: 'desc' }, { id: 'asc' }]
            // Only show categories with use_count > 0
            where.use_count = { gt: 0 }
        }

        const take = frequentlyUsed === 'true' && typeof limit === 'number' ? Math.max(1, Math.min(limit, 200)) : undefined

        const categories = await prisma.category.findMany({
            where,
            select: selectFields,
            orderBy,
            ...(take ? { take } : {})
        })
        const tQuery = Date.now()
        console.log(`[API/category] query=${tQuery - t0}ms, rows=${Array.isArray(categories) ? categories.length : 0}`)

        // 仅针对“美食”二级分类（keyword 以 food- 开头）计算 use_count Top 3 并标注 frequentlyUsed
        const foodSecondLevel = Array.isArray(categories) ? categories.filter((c: any) => c.parentId != null && typeof c.keyword === 'string' && c.keyword.startsWith('food-')) : []
        const topFoodSecondLevelIds = foodSecondLevel
            .slice()
            .sort((a: any, b: any) => (b.use_count || 0) - (a.use_count || 0))
            .slice(0, 3)
            .map((c: any) => c.id)

        // 分组映射：异国料理 / 地方菜系 / 甜品饮料
        const internationalSet = new Set(['food-japan', 'food-western', 'food-korean', 'food-pizza'])
        const dessertSet = new Set(['food-dessert'])
        const resolveGroup = (kw?: string | null): 'international' | 'regional' | 'dessert' | undefined => {
            if (!kw) return undefined
            if (dessertSet.has(kw)) return 'dessert'
            if (internationalSet.has(kw)) return 'international'
            if (kw.startsWith('food-')) return 'regional'
            return undefined
        }

        const categoriesEnriched = Array.isArray(categories)
            ? (categories as any[]).map((c) => ({
                ...c,
                frequentlyUsed: topFoodSecondLevelIds.includes(c.id) && (c.use_count || 0) > 0,
                group: resolveGroup(c.keyword)
            }))
            : categories

        // 常用优先的扁平排序（仅用于平铺返回的场景）
        const categoriesFlatSorted = Array.isArray(categoriesEnriched)
            ? (categoriesEnriched as any[]).slice().sort((a, b) => {
                const af = a.frequentlyUsed ? 1 : 0
                const bf = b.frequentlyUsed ? 1 : 0
                if (bf !== af) return bf - af
                return (b.use_count || 0) - (a.use_count || 0) || (a.id - b.id)
            })
            : categoriesEnriched

        // 如果存在 parentId/顶级/keyword 过滤或请求的是常用分类，则直接返回扁平列表
        if (keyword || top || parentIdParam || frequentlyUsed === 'true') {
            const msg = frequentlyUsed === 'true' ? '常用分类查询成功' : '分类查询成功（含keyword、icon、active_icon）'
            setCached(cacheKey, categoriesFlatSorted)
            const tEnd = Date.now()
            console.log(`[API/category] flat-return total=${tEnd - t0}ms`)
            return createJsonResponse(
                ResponseUtil.success(categoriesFlatSorted, msg),
                {
                    headers: {
                        'Cache-Control': 's-maxage=60, stale-while-revalidate=300'
                    }
                }
            )
        }

        const tree = buildCategoryTree(categoriesEnriched as any)
        const tTree = Date.now()
        console.log(`[API/category] buildTree=${tTree - tQuery}ms`)
        setCached(cacheKey, tree)
        const tEnd = Date.now()
        console.log(`[API/category] tree-return total=${tEnd - t0}ms`)
        return createJsonResponse(
            ResponseUtil.success(tree, '分类树查询成功（含keyword、icon、active_icon）'),
            {
                headers: {
                    'Cache-Control': 's-maxage=60, stale-while-revalidate=300'
                }
            }
        )
    } catch (error: any) {
        return createJsonResponse(
            ResponseUtil.error(`分类查询失败: ${error?.message || String(error)}`),
            { status: 500 }
        )
    }
}
