import { CacheFactory } from '../factories/cache-factory'

export class CacheAdapter {
  static createCacheAdapter(originalFunction: Function): Function {
    return function (...params: Array<any>) {
      const bindOriginalFunction = originalFunction.bind(this)
      const cacheService = CacheFactory.createCache()
      return cacheService.cache(params, bindOriginalFunction)
    }
  }
}
