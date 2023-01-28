import { Cache, CacheOptions } from '../core/model/cache'
import { CacheUseCase } from '../core/usecase/cache-usecase'
import { CacheDatabase } from '../core/domain/cache-protocol'

export class CacheService implements CacheUseCase {
  private readonly cacheOptions: CacheOptions
  private readonly caches: CacheDatabase

  constructor(cacheOptions: CacheOptions, caches: CacheDatabase) {
    this.cacheOptions = cacheOptions
    this.caches = caches
  }

  isExpired(cache: Cache) {
    const timestampNow = new Date().getTime()
    const millisecondsToExpire = this.cacheOptions.expire
    return (timestampNow - cache.expireAt) > millisecondsToExpire
  }

  get(key: string) {
    if (!this.caches.has(key)) return
    const cache = this.caches.get(key)
    if (this.isExpired(cache)) {
      this.caches.delete(key)
    }
    return cache
  }

  deleteExpired(): boolean {
    const cacheMap = this.caches.getAll()
    cacheMap.forEach((cache: Cache, key: string) => {
      if (this.isExpired(cache)) {
        this.caches.delete(key)
      }
    })
    return true
  }

  cache(args: Array<any>, originalFunction: Function) {
    const key = JSON.stringify(args)
    const isCache = this.get(key)
    if (isCache) {
      return isCache.data
    } else {
      const expireAt = new Date().getTime()
      const result = originalFunction(...args)
      if (result instanceof Promise) {
        return result.then(data => {
          this.caches.set(key, { data, expireAt })
          return data
        })
      }
      this.caches.set(key, { data: result, expireAt })
      return result
    }
  }
}
