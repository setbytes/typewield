import { LoggerFactory } from '../factories/logger-factory'

export class LoggerAdapter {
  static createLoggerAdapter(functionName: string, originalFunction: Function): any {
    return function (...params: Array<any>) {
      const logger = LoggerFactory.createLogger()
      return logger.log(params, functionName, originalFunction)
    }
  }
}
