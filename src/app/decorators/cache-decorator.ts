import { CacheAdapter } from '../adapters/cache-adapter'

export function Cache(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  const originalFunction = descriptor.value
  descriptor.value = CacheAdapter.createCacheAdapter(originalFunction)
}
