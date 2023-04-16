import { LoggerAdapter } from "../adapters/logger-adapter";

export function Logger(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  const originalFunction = descriptor.value;
  descriptor.value = LoggerAdapter.createLoggerAdapter(propertyKey, originalFunction);
}
