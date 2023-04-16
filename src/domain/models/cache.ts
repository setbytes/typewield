export type Cache = {
  data: any
  expireAt: number
}

export type CacheOptions = {
  expire: number
  checkInterval?: number
  logger?: boolean
}
