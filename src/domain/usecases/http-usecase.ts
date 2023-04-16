import { HttpRequest } from "@/domain/models/http";

export interface HttpUseCase {
  send(request: HttpRequest, functionName: string): Promise<any>
}
