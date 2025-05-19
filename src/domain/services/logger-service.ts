import { Logger } from "@/infra/logger/logger-protocol";
import { LoggerUseCase } from "@/domain/usecases/logger-usecase";

export class LoggerService implements LoggerUseCase {
  private readonly logger: Logger;

  public constructor(logger: Logger) {
    this.logger = logger;
  }

  public log(params: Array<any>, functionName: string, originalFunction: Function, time?: number): any {
    const timer = time || Date.now();
    if (params.length) {
      this.logger.info("[INPUT]", `[${timer}]`, `[${functionName}]`, params);
    }
    try {
      const result = originalFunction(...params);
      if (result instanceof Promise) {
        return result.then((data) => {
          this.logger.info("[OUTPUT]", `[${timer}]`, `[${functionName}]`, data);
          return data;
        });
      }
      this.logger.info("[OUTPUT]", `[${timer}]`, `[${functionName}]`, result);
      return result;
    } catch (error) {
      this.logger.error("[OUTPUT]", `[${timer}]`, `[${functionName}]`, error.message);
      throw error;
    }
  }
}
