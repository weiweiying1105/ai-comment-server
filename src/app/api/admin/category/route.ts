import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { createJsonResponse, ResponseUtil } from '@/lib/response'
import { verifyToken } from '@/utils/jwt'

const allowWithoutToken = process.env.ADMIN_MODE === '1'

async function ensureAuth(req: NextRequest) {
  const user = await verifyToken(req)
  if (!user && !allowWithoutToken) {
    return createJsonResponse(ResponseUtil.error('未授权访问'), { status: 401 })
  }
  return null
}

export async function GET(req: NextRequest) {
  try {
    const parentIdParam = req.nextUrl.searchParams.get('parentId')
    const list = await prisma.category.findMany({
      where: parentIdParam ? { parentId: Number(parentIdParam) } : undefined,
      orderBy: { id: 'asc' }
    })
    return createJsonResponse(ResponseUtil.success(list, '分类列表查询成功'))
  } catch (error: any) {
    return createJsonResponse(
      ResponseUtil.error(`分类列表查询失败: ${error?.message || String(error)}`),
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  // const unauth = await ensureAuth(req)
  // if (unauth) return unauth
  try {
    const body = await req.json()
    const { name, keyword, parentId, icon, active_icon } = body || {}
    if (!name || typeof name !== 'string') {
      return createJsonResponse(ResponseUtil.error('name 必填'), { status: 400 })
    }
    const created = await prisma.category.create({
      data: {
        name,
        keyword: keyword || null,
        parentId: typeof parentId === 'number' ? parentId : null,
        icon: icon || null,
        active_icon: active_icon || null,
      }
    })
    return createJsonResponse(ResponseUtil.success(created, '分类创建成功'))
  } catch (error: any) {
    return createJsonResponse(
      ResponseUtil.error(`分类创建失败: ${error?.message || String(error)}`),
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  // const unauth = await ensureAuth(req)
  // if (unauth) return unauth
  try {
    const body = await req.json()
    const { id, name, keyword, parentId, icon, active_icon } = body || {}
    if (!id || typeof id !== 'number') {
      return createJsonResponse(ResponseUtil.error('id 必填'), { status: 400 })
    }
    const updated = await prisma.category.update({
      where: { id },
      data: {
        name,
        keyword,
        parentId: typeof parentId === 'number' ? parentId : null,
        icon,
        active_icon,
      }
    })
    return createJsonResponse(ResponseUtil.success(updated, '分类更新成功'))
  } catch (error: any) {
    return createJsonResponse(
      ResponseUtil.error(`分类更新失败: ${error?.message || String(error)}`),
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const unauth = await ensureAuth(req)
  if (unauth) return unauth
  try {
    const idParam = req.nextUrl.searchParams.get('id')
    if (!idParam) {
      return createJsonResponse(ResponseUtil.error('id 必填'), { status: 400 })
    }
    const id = Number(idParam)
    await prisma.category.delete({ where: { id } })
    return createJsonResponse(ResponseUtil.success({ id }, '分类删除成功'))
  } catch (error: any) {
    return createJsonResponse(
      ResponseUtil.error(`分类删除失败: ${error?.message || String(error)}`),
      { status: 500 }
    )
  }
}

// 批量修改分类
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { ids, parentId } = body || {}
    if (!Array.isArray(ids) || ids.length === 0) {
      return createJsonResponse(ResponseUtil.error('ids 必须是非空数组'), { status: 400 })
    }
    // 批量更新分类的 parentId
    await prisma.category.updateMany({
      where: { id: { in: ids } },
      data: { parentId: typeof parentId === 'number' ? parentId : null }
    })
    return createJsonResponse(ResponseUtil.success({ ids, parentId }, '批量修改成功'))
  } catch (error: any) {
    return createJsonResponse(
      ResponseUtil.error(`批量修改失败: ${error?.message || String(error)}`),
      { status: 500 }
    )
  }
}