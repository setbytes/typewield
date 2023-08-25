import { LoggerUseCase } from "@/domain/usecases/logger-usecase";
import { LoggerService } from "@/domain/services/logger-service";
import { LoggerImpl } from "@/infra/logger/logger-impl";

export class LoggerFactory {
  public static createLogger(): LoggerUseCase {
    const logger = new LoggerImpl();
    return new LoggerService(logger);
  }
}
