import { CacheOptions } from '../../core/model/cache'
import { CacheFactory } from '../factories/cache-factory'

export class CacheAdapter {
  static createCacheAdapter(functionName: string, originalFunction: Function): Function {
    return function (...args: Array<any>) {
      const bindOriginalFunction = originalFunction.bind(this)
      const cacheService = CacheFactory.createCache({ expire: 30_000 }) // 30 seconds to be expire
      return cacheService.cache(args, functionName, bindOriginalFunction)
    }
  }

  static createCacheParamAdapter(functionName: string, cacheOptions: CacheOptions, originalFunction: Function) {
    return function (...args: Array<any>) {
      const bindOriginalFunction = originalFunction.bind(this)
      const cacheService = CacheFactory.createCache(cacheOptions)
      return cacheService.cache(args, functionName, bindOriginalFunction)
    }
  }
}
