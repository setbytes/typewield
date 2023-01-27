import { HttpRequest, HttpResponse } from '../model/http'

export interface HttpClient {
  send(request: HttpRequest): Promise<HttpResponse<any>>
}
