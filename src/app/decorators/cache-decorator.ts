import { CacheOptions } from '../../core/model/cache'
import { CacheAdapter } from '../adapters/cache-adapter'

export function Cache(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  const originalFunction = descriptor.value
  descriptor.value = CacheAdapter.createCacheAdapter(originalFunction)
}

export function CacheParam(cacheOptions: CacheOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalFunction = descriptor.value
    descriptor.value = CacheAdapter.createCacheAdapter(originalFunction)
  }
}
