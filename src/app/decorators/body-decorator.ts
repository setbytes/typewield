
export function Body(target: any, propertyKey: string | symbol, parameterIndex: number) {
  target[propertyKey].body = target[propertyKey].body || {}
  target[propertyKey].body.index = parameterIndex
}
