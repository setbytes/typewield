import { Cache, CacheOptions } from "../../domain/models/cache";
import { CacheDatabase } from "./protocols/cache-protocol";

export class CacheImpl implements CacheDatabase {
  private readonly cacheOptions: CacheOptions;
  private readonly caches = new Map<string, Cache>();

  constructor(cacheOptions: CacheOptions) {
    this.cacheOptions = cacheOptions;
    if (process.env.NODE_ENV != "test") {
      this.startBackgroundDeletion();
    }
  }

  startBackgroundDeletion(): void {
    setInterval(() => {
      this.deleteExpired();
    }, this.cacheOptions.checkInterval || 300_000); // 5 minutes
  }

  isExpired(cache: Cache): boolean {
    const timestampNow = Date.now();
    const millisecondsToExpire = this.cacheOptions.expire || 30_000; // 30 seconds
    return (timestampNow - cache.expireAt) > millisecondsToExpire;
  }

  deleteExpired(): boolean {
    const cacheMap = this.caches;
    for (const [key, cache] of cacheMap) {
      if (this.isExpired(cache)) {
        this.caches.delete(key);
      }
    }
    return true;
  }

  get(key: string): Cache {
    return this.caches.get(key) as Cache;
  }

  has(key: string): boolean {
    return this.caches.has(key);
  }

  delete(key: string): boolean {
    return this.caches.delete(key);
  }

  getAll(): Map<string, Cache> {
    return this.caches;
  }

  set(key: string, data: Cache): void {
    this.caches.set(key, data);
  }
}
