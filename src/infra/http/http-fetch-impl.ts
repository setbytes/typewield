import { HttpClient } from "@/infra/http/http-client-protocol";
import { HttpRequest, HttpResponse } from "@/domain/models/http";

export class HttpFetchImpl implements HttpClient {
  public async send(request: HttpRequest): Promise<HttpResponse> {
    const { method, headers, data, params, url } = request;
    const endpoint = params ? url + "?" + new URLSearchParams(params) : url;
    return await fetch(endpoint, { method, headers: { Accept: "application/json", "Content-Type": "application/json", ...headers }, body: JSON.stringify(data) })
      .then(async response => ({ statusCode: response.status, data: await response.json() }));
  }
}
