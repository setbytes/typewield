import { Logger } from "@/infra/logger/usecases/logger-protocol";

export class LoggerImpl implements Logger {
  log(...args: Array<any>): void {
    console.log("[LOG]", ...args);
  }

  info(...args: Array<any>): void {
    console.info("[INFO]", ...args);
  }

  warn(...args: Array<any>): void {
    console.warn("[WARN]", ...args);
  }

  error(...args: Array<any>): void {
    console.error("[ERROR]", ...args);
  }
}
