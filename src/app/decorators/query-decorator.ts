export function Query(target: any, propertyKey: string | symbol, parameterIndex: number) {
  target[propertyKey].query = target[propertyKey].query || {}
  target[propertyKey].query.index = parameterIndex
}
