import { HttpService } from "../../data/http-service";
import { HttpClientImpl } from "../../infra/http/http-client";
import { HttpUseCase } from "../../core/usecase/http-usecase";
import { HttpAxiosImpl } from "../../infra/http/http-axios";
import { HttpClientOptions } from "../../core/model/http";
import { LoggerImpl } from "../../infra/logger/logger";

export class HttpFactory {
  static createHttpRequest(httpClientOptions: HttpClientOptions): HttpUseCase {
    const logger = new LoggerImpl();
    const httpClient = new HttpClientImpl();
    const axiosApp = httpClientOptions.axiosInstance;
    const httpAxios = new HttpAxiosImpl(axiosApp);
    return new HttpService(httpClientOptions, axiosApp ? httpAxios : httpClient, logger);
  }
}
