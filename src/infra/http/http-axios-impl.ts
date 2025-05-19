import { HttpClient } from "@/infra/http/http-client-protocol";
import { HttpRequest, HttpResponse } from "@/domain/models/http";

type AxiosApp = any
export class HttpAxiosImpl implements HttpClient {
  private readonly http: AxiosApp;

  constructor(http: AxiosApp) {
    this.http = http;
  }

  public async send(request: HttpRequest): Promise<HttpResponse> {
    return this.http(request).then(response => ({ statusCode: response.status, data: response.data }));
  }
}
