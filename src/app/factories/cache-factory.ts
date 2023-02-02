import { CacheSingleton } from '../singletons/cache-singleton'
import { CacheUseCase } from '../../core/usecase/cache-usecase'
import { CacheService } from '../../data/cache-service'
import { CacheOptions } from '../../core/model/cache'
import { LoggerImpl } from '../../infra/logger/logger'

export class CacheFactory {
  public static createCache(cacheOptions: CacheOptions): CacheUseCase {
    const logger = new LoggerImpl()
    const cacheDatabase = CacheSingleton.getInstance(cacheOptions).getCacheDatabase()
    return new CacheService(cacheOptions, cacheDatabase, logger)
  }
}
