import axios from 'axios'
import { HttpClient, HttpRequest, HttpResponse } from '../../core/model/http'

const http = axios.create({})

export class HttpAxiosImpl implements HttpClient {
  async send(request: HttpRequest): Promise<HttpResponse<any>> {
    return http(request).then(response => ({ statusCode: response.status, data: response.data }))
  }
}
