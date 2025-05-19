export interface LoggerUseCase {
  log(params: Array<any>, functionName: string, originalFunction: Function, timer?: number): any
}
