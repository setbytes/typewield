import { HttpRequest } from "../models/http";

export interface HttpUseCase {
  send(request: HttpRequest, functionName: string): Promise<any>
}
