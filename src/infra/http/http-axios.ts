import { HttpClient } from "../../core/domain/http-protocol";
import { HttpRequest, HttpResponse } from "../../core/model/http";

type AxiosApp = any
export class HttpAxiosImpl implements HttpClient {
  private readonly http: AxiosApp;

  constructor(http: AxiosApp) {
    this.http = http;
  }

  async send(request: HttpRequest): Promise<HttpResponse<any>> {
    return this.http(request).then(response => ({ statusCode: response.status, data: response.data }));
  }
}
