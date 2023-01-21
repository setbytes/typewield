import { LoggerAdapter } from "@/app/adapters/logger-adapter";

export function Logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
   const originalFunction = descriptor.value;
   descriptor.value = LoggerAdapter.createLoggerAdapter(propertyKey, originalFunction);
}