import { Logger } from "@/infra/logger/protocols/logger-protocol";
import { HttpClient } from "@/infra/http/protocols/http-protocol";
import { HttpClientOptions, HttpRequest } from "@/domain/models/http";
import { HttpUseCase } from "@/domain/usecases/http-usecase";

export class HttpService implements HttpUseCase {
  private readonly http: HttpClient;
  private readonly logger: Logger;
  private readonly httpClientOptions: HttpClientOptions;

  constructor(httpClientOptions: HttpClientOptions, http: HttpClient, logger: Logger) {
    this.http = http;
    this.logger = logger;
    this.httpClientOptions = httpClientOptions;
  }

  async send(request: HttpRequest, functionName: string): Promise<any> {
    let baseURL = request.url.trim();
    if (!request.url.startsWith("http")) {
      baseURL = this.httpClientOptions.baseURL || this.httpClientOptions?.axiosInstance.defaults.baseURL;
      baseURL += request.url;
    }
    const uri = request.params ? baseURL + "?" + new URLSearchParams(request.params) : baseURL;
    if (this.httpClientOptions.logger) {
      const logList = [uri];
      if (request.data) logList.push(request.data);
      const typeMethod: string = request.method || "GET";
      this.logger.info(`[${typeMethod}]`, `[${functionName}]`, ...logList);
    }
    request.url = baseURL;
    return this.http.send(request);
  }
}
