import axios from 'axios'
import { HttpClient, HttpRequest, HttpResponse } from '../../core/model/http'

const http = axios.create({})

export class HttpAxios implements HttpClient {
  async send(request: HttpRequest): Promise<HttpResponse<any>> {
    return http.get(request.url, { data: request.data })
      .then(response => ({ statusCode: response.status, data: response.data }))
  }
}
