import { CacheSingleton } from "@/app/singletons/cache-singleton";
import { CacheUseCase } from "@/domain/usecases/cache-usecase";
import { CacheService } from "@/domain/services/cache-service";
import { CacheOptions } from "@/domain/models/cache";
import { LoggerImpl } from "@/infra/logger/logger";

export class CacheFactory {
  public static createCache(cacheOptions: CacheOptions): CacheUseCase {
    const logger = new LoggerImpl();
    const cacheDatabase = CacheSingleton.getInstance(cacheOptions).getCacheDatabase();
    return new CacheService(cacheOptions, cacheDatabase, logger);
  }
}
