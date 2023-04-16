import { LoggerUseCase } from "../../core/usecase/logger-usecase";
import { LoggerService } from "../../data/logger-service";
import { LoggerImpl } from "../../infra/logger/logger";

export class LoggerFactory {
  static createLogger(): LoggerUseCase {
    const logger = new LoggerImpl();
    return new LoggerService(logger);
  }
}
