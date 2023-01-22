import { LoggerProtocol } from '../../core/domain/logger-protocol'
import { LoggerUseCase } from '../../core/usecase/logger-usecase'

export class LoggerService implements LoggerUseCase {
  private readonly logger: LoggerProtocol

  constructor(logger: LoggerProtocol) {
    this.logger = logger
  }

  log(params: Array<any>, functionName: string, originalFunction: Function): any {
    this.logger.info('[INPUT]', `[${functionName}]`, params)
    const result = originalFunction(...params)
    this.logger.info('[OUTPUT]', `[${functionName}]`, result)
    return result
  }
}
