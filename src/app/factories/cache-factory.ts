import { CacheSingleton } from '../singletons/cache-singleton'
import { CacheUseCase } from '../../core/usecase/cache-usecase'
import { CacheService } from '../../data/cache-service'

export class CacheFactory {
  public static createCache(): CacheUseCase {
    const cacheDatabase = CacheSingleton.getInstance().getCacheDatabase()
    const cacheService = new CacheService(cacheDatabase)
    return cacheService
  }
}
