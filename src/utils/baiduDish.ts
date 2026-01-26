// src/utils/baiduDish.ts
import qs from 'node:querystring'

let cachedToken: { token: string; expireAt: number } | null = null

async function getAccessToken() {
  const apiKey = process.env.BAIDU_API_KEY
  const secretKey = process.env.BAIDU_SECRET_KEY

  if (!apiKey || !secretKey) {
    console.warn('未配置 BAIDU_API_KEY / BAIDU_SECRET_KEY，跳过菜品识别')
    return null
  }

  // 有缓存且未过期，直接用
  if (cachedToken && cachedToken.expireAt > Date.now()) {
    return cachedToken.token
  }

  const url = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`

  const resp = await fetch(url, { method: 'POST' })
  if (!resp.ok) {
    console.error('获取百度 access_token 失败', resp.status, await resp.text())
    return null
  }

  const data = (await resp.json()) as any
  const token = data.access_token as string
  const expiresIn = data.expires_in as number // 秒

  cachedToken = {
    token,
    // 稍微提前 5 分钟过期
    expireAt: Date.now() + (expiresIn - 300) * 1000,
  }

  return token
}

/**
 * 传入图片 Buffer，调用百度菜品识别，返回菜名（如“西红柿炒蛋”）
 */
export async function recognizeDishFromBuffer(
  buf: Buffer,
): Promise<string | null> {
  const accessToken = await getAccessToken()
  if (!accessToken) return null

  const imgBase64 = buf.toString('base64')

  const body = qs.stringify({
    image: imgBase64,
    top_num: 3, // 返回前 3 个结果
    filter_threshold: 0.9, // 置信度阈值，低于此值的结果会被过滤掉, 建议 0.8-0.9
  })

  const resp = await fetch(
    `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=${accessToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    },
  )

  if (!resp.ok) {
    console.error('百度菜品识别接口请求失败', resp.status, await resp.text())
    return null
  }

  const data = (await resp.json()) as any

  const first = data.result?.[0]
  if (!first) return null

  const name = first.name as string
  const prob = first.probability as number | undefined

  // 置信度太低就不要用
  if (prob !== undefined && prob < 0.2) {
    return null
  }

  return name
}

/**
 * 直接传 imageUrl（COS 的地址），内部下载图片后识别
 */
export async function recognizeDishFromUrl(
  imageUrl: string,
): Promise<string | null> {
  try {
    const imgResp = await fetch(imageUrl)
    if (!imgResp.ok) {
      console.error(
        '下载图片失败，用于菜品识别',
        imgResp.status,
        await imgResp.text(),
      )
      return null
    }
    const arrayBuf = await imgResp.arrayBuffer()
    const buf = Buffer.from(arrayBuf)
    return recognizeDishFromBuffer(buf)
  } catch (e) {
    console.error('从 URL 识别菜品时异常', e)
    return null
  }
}
