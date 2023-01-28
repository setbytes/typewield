import { LoggerFactory } from '../factories/logger-factory'

export class LoggerAdapter {
  static createLoggerAdapter(functionName: string, originalFunction: Function): Function {
    return function (...params: Array<any>) {
      const bindOriginalFunction = originalFunction.bind(this)
      const loggerService = LoggerFactory.createLogger()
      return loggerService.log(params, functionName, bindOriginalFunction)
    }
  }
}
