import { Logger } from "@/infra/logger/logger-protocol";

export class LoggerImpl implements Logger {
  public log(...args: Array<any>): void {
    console.log("[LOG]", ...args);
  }

  public info(...args: Array<any>): void {
    console.info("[INFO]", ...args);
  }

  public warn(...args: Array<any>): void {
    console.warn("[WARN]", ...args);
  }

  public error(...args: Array<any>): void {
    console.error("[ERROR]", ...args);
  }
}
