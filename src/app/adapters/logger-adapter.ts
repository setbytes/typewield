import { LoggerFactory } from '../factories/logger-factory'

export class LoggerAdapter {
  static createLoggerAdapter(functionName: string, originalFunction: Function): Function {
    return function (...args: Array<any>) {
      const bindOriginalFunction = originalFunction.bind(this)
      const loggerService = LoggerFactory.createLogger()
      return loggerService.log(args, functionName, bindOriginalFunction)
    }
  }
}
