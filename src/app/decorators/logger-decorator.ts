import { LoggerAdapter } from "@/app/adapters/logger-adapter";

export function Logger(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  const originalFunction = descriptor.value;
  const isStatic = typeof target === "function";
  const className = isStatic ? target.name : target.constructor.name;

  descriptor.value = LoggerAdapter.createLoggerAdapter(className + "." + propertyKey, originalFunction);
}
