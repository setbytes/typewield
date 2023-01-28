import { CacheSingleton } from '../singletons/cache-singleton'
import { CacheUseCase } from '../../core/usecase/cache-usecase'
import { CacheService } from '../../data/cache-service'
import { CacheOptions } from 'core/model/cache'

export class CacheFactory {
  public static createCache(cacheOptions: CacheOptions): CacheUseCase {
    const cacheDatabase = CacheSingleton.getInstance().getCacheDatabase()
    const cacheService = new CacheService(cacheOptions, cacheDatabase)
    return cacheService
  }
}
