import { Logger } from "@/infra/logger/logger-protocol";
import { LoggerUseCase } from "@/domain/usecases/logger-usecase";

export class LoggerService implements LoggerUseCase {
  private readonly logger: Logger;

  public constructor(logger: Logger) {
    this.logger = logger;
  }

  public log(params: Array<any>, functionName: string, originalFunction: Function, time?: number): any {
    const timer = time || Date.now();
    const start = performance.now();
    try {
      const result = originalFunction(...params);
      if (result instanceof Promise) {
        return result.then((data) => {
          const end = performance.now();
          const milliseconds = (end - start).toFixed(2);
          if (params.length) this.logger.info("[INPUT]", `[${timer}]`, `[${milliseconds}ms]`, `[${functionName}]`, params);
          this.logger.info("[OUTPUT]", `[${timer}]`, `[${milliseconds}ms]`, `[${functionName}]`, data);
          return data;
        }).catch(error => {
          const end = performance.now();
          const milliseconds = (end - start).toFixed(2);
          if (params.length) this.logger.info("[INPUT]", `[${timer}]`, `[${milliseconds}ms]`, `[${functionName}]`, params);
          this.logger.info("[OUTPUT]", `[${timer}]`, `[${milliseconds}ms]`, `[${functionName}]`, error);
          throw error;
        });
      }
      const end = performance.now();
      const milliseconds = (end - start).toFixed(2);
      if (params.length) this.logger.info("[INPUT]", `[${timer}]`, `[${milliseconds}ms]`, `[${functionName}]`, params);
      this.logger.info("[OUTPUT]", `[${timer}]`, `[${milliseconds}ms]`, `[${functionName}]`, result);
      return result;
    } catch (error) {
      const end = performance.now();
      const milliseconds = (end - start).toFixed(2);
      if (params.length) this.logger.info("[INPUT]", `[${timer}]`, `[${milliseconds}ms]`, `[${functionName}]`, params);
      this.logger.error("[OUTPUT]", `[${timer}]`, `[${milliseconds}ms]`, `[${functionName}]`, error.message);
      throw error;
    }
  }
}
