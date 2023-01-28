export interface CacheUseCase {
  get(key: string): any
  deleteExpired(): boolean
  cache(args: Array<any>, originalFunction: Function): any
}
