export type HttpRequest = {
  headers?: any
  url: string
  params?: any
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
  data?: any
}

export type HttpResponse<T> = {
  statusCode: number
  data?: T
}

export interface HttpClient<T = any> {
  send(request: HttpRequest): Promise<HttpResponse<T>>
}
