import { LoggerUseCase } from '../../core/usecase/logger-usecase'
import { LoggerService } from '../../data/usecase/logger-service'
import { Logger } from '../../infra/usecase/logger'

export class LoggerFactory {
  static createLogger(): LoggerUseCase {
    const logger = new Logger()
    const loggerService = new LoggerService(logger)
    return loggerService
  }
}
