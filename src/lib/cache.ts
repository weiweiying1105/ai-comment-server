type CacheValue<T = any> = {
  value: T
  expiresAt: number | null
}


// 用全局变量避免开发环境热更新重复创建
const globalAny = global as any;


if (!globalAny.__AI_COMMENT_CACHE__) {
  globalAny.__AI_COMMENT_CACHE__ = new Map<string, CacheValue>();
}


const store:Map<string, CacheValue> = globalAny.__AI_COMMENT_CACHE__;

/**
 * 设置缓存
 * @param key 缓存 key
 * @param value 任意值
 * @param ttlMs 过期时间（毫秒），不传则不过期
 */

export function setCache<T>(key: string, value: T, ttlMs?: number) {
  const expiresAt = ttlMs ? Date.now() + ttlMs : null;
  store.set(key, { value, expiresAt });
}

/**
 * 获取缓存
 * @param key 缓存 key
 * @returns 缓存值或 undefined
 */
export function getCache<T>(key: string): T | undefined {
  const cache = store.get(key);
  if (!cache) return undefined;
  if (cache.expiresAt && cache.expiresAt < Date.now()) {
    store.delete(key);
    return undefined;
  }
  return cache.value;
}


/**
 * 删除某个 key
 */
export function deleteCache(key: string) {
  store.delete(key)
}

/**
 * 清空缓存
 */
export function clearCache() {
  store.clear()
}