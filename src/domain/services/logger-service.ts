import { Logger } from "@/infra/logger/logger-protocol";
import { LoggerUseCase } from "@/domain/usecases/logger-usecase";

export class LoggerService implements LoggerUseCase {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public log(params: Array<any>, functionName: string, originalFunction: Function): any {
    if (params.length) {
      this.logger.info("[INPUT]", `[${functionName}]`, params);
    }
    try {
      const result = originalFunction(...params);
      Promise.resolve(result).then((data) => {
        this.logger.info("[OUTPUT]", `[${functionName}]`, data);
      });
      return result;
    } catch (error) {
      this.logger.error("[OUTPUT]", `[${functionName}]`, error.message);
      throw error;
    }
  }
}
