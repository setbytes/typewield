import { HttpClient } from "../../core/domain/http-protocol";
import { HttpRequest, HttpResponse } from "../../core/model/http";
export class HttpClientImpl implements HttpClient {
  async send(request: HttpRequest): Promise<HttpResponse<any>> {
    const { method, headers, data, params, url } = request;
    const endpoint = params ? url + "?" + new URLSearchParams(params) : url;
    return await fetch(endpoint, { method, headers, body: JSON.stringify(data) })
      .then(async response => ({ statusCode: response.status, data: await response.json() }));
  }
}
