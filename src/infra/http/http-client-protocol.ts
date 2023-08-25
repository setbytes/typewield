import { HttpRequest, HttpResponse } from "@/domain/models/http";

export interface HttpClient {
  send(request: HttpRequest): Promise<HttpResponse<any>>
}
