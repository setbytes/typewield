export function Param(name: string) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    target[propertyKey].params = target[propertyKey].params || {}
    target[propertyKey].params[name] = parameterIndex
  }
}
