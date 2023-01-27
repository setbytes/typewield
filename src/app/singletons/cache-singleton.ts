import { CacheDatabase } from '../../core/domain/cache-protocol'
import { CacheImpl } from '../../infra/cache/cache'

export class CacheSingleton {
  private static instance: CacheSingleton
  private readonly cacheDatabase: CacheDatabase

  private constructor() {
    this.cacheDatabase = new CacheImpl()
  }

  public static getInstance(): CacheSingleton {
    if(!CacheSingleton.instance) {
      CacheSingleton.instance = new CacheSingleton()
    }
    return CacheSingleton.instance
  }

  getCacheDatabase(): CacheDatabase {
    return this.cacheDatabase
  }
}
