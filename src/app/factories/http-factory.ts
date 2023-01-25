import { HttpService } from '../../data/usecase/http-service'
import { HttpClientImpl } from '../../infra/http/http-client'
import { HttpUseCase } from '../../core/usecase/http-usecase'
import { HttpAxiosImpl } from 'infra/http/http-axios'

export class HttpFactory {
  static createHttpRequest(): HttpUseCase {
    const http = new HttpClientImpl()
    const httpAxios = new HttpAxiosImpl()
    const httpService = new HttpService(http || httpAxios)
    return httpService
  }
}
