import { HttpClient } from 'core/domain/http-protocol'
import { HttpRequest } from 'core/model/http'
import { HttpUseCase } from '../../core/usecase/http-usecase'

export class HttpService implements HttpUseCase {
  private readonly http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  send(request: HttpRequest): Promise<any> {
    return this.http.send(request)
  }
}
