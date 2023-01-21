import { LoggerProtocol } from "../../core/domain/logger-protocol";

export class Logger implements LoggerProtocol {
  log(...args: any[]): void {
    console.log('[LOG]', ...args);
  }

  info(...args: any[]): void {
    console.info('[INFO]', ...args)
  }

  warn(...args: any[]): void {
    console.warn('[WARN]', ...args)
  }

  error(...args: any[]): void {
    console.error('[ERROR]', ...args)
  }
}