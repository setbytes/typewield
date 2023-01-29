import { HttpService } from '../../data/http-service'
import { HttpClientImpl } from '../../infra/http/http-client'
import { HttpUseCase } from '../../core/usecase/http-usecase'
import { HttpAxiosImpl } from '../../infra/http/http-axios'
export class HttpFactory {
  static createHttpRequest(axiosApp?: any): HttpUseCase {
    const http = new HttpClientImpl()
    const httpAxios = new HttpAxiosImpl(axiosApp)
    const httpService = new HttpService(axiosApp ? httpAxios : http)
    return httpService
  }
}
