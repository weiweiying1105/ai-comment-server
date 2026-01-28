import { getWeChatAccessToken } from '@/lib/wechat'
import prisma from '@/lib/prisma'
import { createJsonResponse, ResponseUtil } from '@/lib/response'
import { verifyToken } from '@/utils/jwt'
import { NextRequest, NextResponse } from 'next/server'



export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code } = body || {}
    if (!code || typeof code !== 'string') {
      return createJsonResponse(ResponseUtil.error('code 必填'), { status: 400 })
    }

    // 先验证用户登录
    const user = verifyToken(req)
    if (!user) {
      return createJsonResponse(ResponseUtil.error('用户未登录'), { status: 401 })
    }
    // 调用微信小程序 API 交换手机号
    const accessToken = await getWeChatAccessToken()
    const res = await fetch(
      `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${accessToken}`,
      {
        method: 'POST',
        body: JSON.stringify({
          code,
        }),
      }
    )
    const data = await res.json()
    console.log(data)
    if (!data.phone_info) {
      throw new Error('获取手机号失败：' + JSON.stringify(data))
    }
      const phoneInfo = data.phone_info
    const phoneNumber = phoneInfo.phoneNumber as string
    // 绑定手机号
    await prisma.user.update({
      where: { id: user.userId  },
      data: {
        mobile:phoneNumber,
      }
    })
  } catch (error: any) {
    return createJsonResponse(
      ResponseUtil.error(`手机号绑定失败: ${error?.message || String(error)}`),
      { status: 500 }
    )
  }
}
