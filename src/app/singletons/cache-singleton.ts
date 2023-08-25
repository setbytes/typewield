import { CacheOptions } from "@/domain/models/cache";
import { CacheDatabase } from "@/infra/cache/cache-protocol";
import { CacheImpl } from "@/infra/cache/cache-impl";

export class CacheSingleton {
  private static instance: CacheSingleton;
  private readonly cacheDatabase: CacheDatabase;

  private constructor(cacheOptions: CacheOptions) {
    this.cacheDatabase = new CacheImpl(cacheOptions);
  }

  public static getInstance(cacheOptions: CacheOptions): CacheSingleton {
    if (!CacheSingleton.instance) {
      CacheSingleton.instance = new CacheSingleton(cacheOptions);
    }
    return CacheSingleton.instance;
  }

  public getCacheDatabase(): CacheDatabase {
    return this.cacheDatabase;
  }
}
