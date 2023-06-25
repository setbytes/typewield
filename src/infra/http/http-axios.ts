import { HttpClient } from "@/infra/http/usecases/http-client";
import { HttpRequest, HttpResponse } from "@/domain/models/http";

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
