import { Cache } from 'core/model/cache'
import { CacheUseCase } from 'core/usecase/cache-usecase'
import { CacheDatabase } from '../../core/domain/cache-protocol'

export class CacheService implements CacheUseCase {
  private readonly caches: CacheDatabase

  constructor(caches: CacheDatabase) {
    this.caches = caches
  }

  isExpired(cache: Cache) {
    const timestampNow = new Date().getTime()
    const millisecondsToExpire = 7200000 // 2 hors mock
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
}
