import { CacheUseCase } from "@/domain/usecases/cache-usecase";
import { CacheDatabase } from "@/infra/cache/cache-protocol";
import { Logger } from "@/infra/logger/logger-protocol";
import { Cache, CacheOptions } from "@/domain/models/cache";

export class CacheService implements CacheUseCase {
  private readonly cacheOptions: CacheOptions;
  private readonly caches: CacheDatabase;
  private readonly logger: Logger;

  public constructor(cacheOptions: CacheOptions, caches: CacheDatabase, logger: Logger) {
    this.cacheOptions = cacheOptions;
    this.caches = caches;
    this.logger = logger;
  }

  public get(key: string): Cache | undefined {
    if (!this.caches.has(key)) return;
    const cache = this.caches.get(key);
    if (this.caches.isExpired(cache)) {
      this.caches.delete(key);
    }
    return cache;
  }

  public cache(args: Array<any>, functionName: string, originalFunction: Function): any {
    const cacheKey = functionName + JSON.stringify(args);
    const isCache = this.get(cacheKey);
    if (isCache) {
      if (this.cacheOptions.logger) {
        this.logger.info("[CACHE]", `[${functionName}]`, isCache);
      }
      return isCache.data;
    } else {
      const expireAt = Date.now();
      const result = originalFunction(...args);
      if (result instanceof Promise) {
        return result.then(data => {
          this.caches.set(cacheKey, { data, expireAt });
          return data;
        });
      }
      this.caches.set(cacheKey, { data: result, expireAt });
      return result;
    }
  }
}
