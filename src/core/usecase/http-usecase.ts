import { HttpRequest } from '../../core/model/http'

export interface HttpUseCase {
  send(request: HttpRequest, functionName: string): Promise<any>
}
