import { LoggerAdapter } from "@/app/adapters/logger-adapter";

export function Logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
   const originalFunction = descriptor.value;
   descriptor.value = LoggerAdapter.createLoggerAdapter(propertyKey, originalFunction);
   // descriptor.value = function (...params: any[]) {
   //    console.log(target)
   //    console.log('propertyKey', propertyKey)
   //    console.log(params)
   //    const result = originalFunction(...params);
   //    console.log(result)
   //    return result
   // }
}