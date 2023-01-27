export interface CacheUseCase {
  get(key: string): any
  deleteExpired(): boolean
}
