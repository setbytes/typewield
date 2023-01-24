import { LoggerUseCase } from '../../core/usecase/logger-usecase'
import { LoggerService } from '../../data/usecase/logger-service'
import { LoggerImpl } from '../../infra/logger/logger'

export class LoggerFactory {
  static createLogger(): LoggerUseCase {
    const logger = new LoggerImpl()
    const loggerService = new LoggerService(logger)
    return loggerService
  }
}
