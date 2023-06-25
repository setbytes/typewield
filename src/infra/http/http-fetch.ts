import { HttpClient } from "@/infra/http/usecases/http-client";
import { HttpRequest, HttpResponse } from "@/domain/models/http";

export class HttpFetchImpl implements HttpClient {
  async send(request: HttpRequest): Promise<HttpResponse<any>> {
    const { method, headers, data, params, url } = request;
    const endpoint = params ? url + "?" + new URLSearchParams(params) : url;
    return await fetch(endpoint, { method, headers, body: JSON.stringify(data) })
      .then(async response => ({ statusCode: response.status, data: await response.json() }));
  }
}
