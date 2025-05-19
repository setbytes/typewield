import { Cache, CacheOptions } from "@/domain/models/cache";
import { CacheDatabase } from "@/infra/cache/cache-protocol";

export class CacheImpl implements CacheDatabase {
  private readonly cacheOptions: CacheOptions;
  private readonly caches = new Map<string, Cache>();

  constructor(cacheOptions: CacheOptions) {
    this.cacheOptions = cacheOptions;
  }

  public isExpired(cache: Cache): boolean {
    const timestampNow = Date.now();
    const millisecondsToExpire = this.cacheOptions.expire || 30_000; // 30 seconds
    return (timestampNow - cache.expireAt) > millisecondsToExpire;
  }

  public deleteExpired(): boolean {
    const cacheMap = this.caches;
    for (const [key, cache] of cacheMap) {
      if (this.isExpired(cache)) {
        this.caches.delete(key);
      }
    }
    return true;
  }

  public get(key: string): Cache {
    return this.caches.get(key) as Cache;
  }

  public has(key: string): boolean {
    this.deleteExpired();
    return this.caches.has(key);
  }

  public delete(key: string): boolean {
    return this.caches.delete(key);
  }

  public getAll(): Map<string, Cache> {
    return this.caches;
  }

  public set(key: string, data: Cache): void {
    this.caches.set(key, data);
  }
}
