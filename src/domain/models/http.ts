export type Method = | "get" | "GET"
| "delete" | "DELETE"
| "head" | "HEAD"
| "options" | "OPTIONS"
| "post" | "POST"
| "put" | "PUT"
| "patch" | "PATCH"
| "purge" | "PURGE"
| "link" | "LINK"
| "unlink" | "UNLINK"

export type HttpRequest<T = any> = {
  headers?: any
  url: string
  params?: T
  method?: Method
  data?: T
}

export type HttpResponse<T = any> = {
  statusCode: number
  data?: T
}

type Headers = Record<string, string | Array<string> | number | boolean | null>

export type HttpClientOptions = {
  baseURL?: string
  headers?: Headers
  logger?: boolean
  axiosInstance?: any
}
