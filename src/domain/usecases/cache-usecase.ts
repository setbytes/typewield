export interface CacheUseCase {
  get(key: string): any
  cache(args: Array<any>, functionName: string, originalFunction: Function): any
}
