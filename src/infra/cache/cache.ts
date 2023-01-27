import { Cache } from '../../core/model/cache'
import { CacheDatabase } from '../../core/domain/cache-protocol'

export class CacheImpl implements CacheDatabase {
  private readonly caches = new Map<string, Cache>()

  get(key: string): Cache {
    return this.caches.get(key) as Cache
  }

  has(key: string): boolean {
    return this.caches.has(key)
  }

  delete(key: string): boolean {
    return this.caches.delete(key)
  }

  getAll(): Map<string, Cache> {
    return this.caches
  }
}
