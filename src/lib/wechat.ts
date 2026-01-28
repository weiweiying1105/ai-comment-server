

// 微信小程序 access_token 缓存
/**
 * 获取微信小程序 access_token，作用是调用微信小程序 API
 * 缓存 7200 秒（默认）
 */
let cachedToken: { accessToken: string; expireAt: number } | null = null

export async function getWeChatAccessToken() {
  const now = Date.now()

  if (cachedToken && cachedToken.expireAt > now + 60 * 1000) {
    // 提前 60 秒过期
    return cachedToken.accessToken
  }

  const appid = process.env.WECHAT_APP_ID!
  const secret = process.env.WECHAT_APP_SECRET!

  const res = await fetch(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
  )
  const data = await res.json()
  // console.log('获取 access_token 响应:', data, typeof data)

  if (!data.access_token) {
    throw new Error('获取 access_token 失败：' + JSON.stringify(data))
  }

  cachedToken = {
    accessToken: data.access_token,
    expireAt: now + (data.expires_in || 7200) * 1000,
  }

  return cachedToken.accessToken
}
