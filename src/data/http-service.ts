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
    if (this.httpClientOptions.logger) {
      const logList = [request.params ? request.url + '?' + new URLSearchParams(request.params) : request.url]
      if (request.data) logList.push(request.data)
      this.logger.info(`[${request.method || 'GET'}]`, `[${functionName}]`, ...logList)
    }
    return this.http.send(request)
  }
}
