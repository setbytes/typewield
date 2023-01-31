import { Logger } from '../core/domain/logger-protocol'
import { HttpClient } from '../core/domain/http-protocol'
import { HttpClientOptions, HttpRequest } from '../core/model/http'
import { HttpUseCase } from '../core/usecase/http-usecase'

export class HttpService implements HttpUseCase {
  private readonly http: HttpClient
  private readonly logger: Logger
  private readonly httpClientOptions: HttpClientOptions

  constructor(httpClientOptions: HttpClientOptions, http: HttpClient, logger: Logger) {
    this.http = http
    this.logger = logger
    this.httpClientOptions = httpClientOptions
  }

  send(request: HttpRequest, functionName: string): Promise<any> {
    let baseURL = request.url.trim()
    if (!request.url.startsWith('http')) {
      baseURL = this.httpClientOptions.baseURL || this.httpClientOptions?.axiosInstance.defaults.baseURL
      baseURL += request.url
    }
    const uri = request.params ? baseURL + '?' + new URLSearchParams(request.params) : baseURL
    if (this.httpClientOptions.logger) {
      const logList = [uri]
      if (request.data) logList.push(request.data)
      this.logger.info(`[${request.method || 'GET'}]`, `[${functionName}]`, ...logList)
    }
    request.url = baseURL
    return this.http.send(request)
  }
}
