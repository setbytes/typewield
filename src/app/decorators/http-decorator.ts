import { HttpClientOptions } from '../../core/model/http'
import { HttpAdapter } from '../../app/adapters/http-adapter'
import { Constructor } from '../../core/model/constructor'

export function HttpClient(httpClientOptions: HttpClientOptions): Function {
  return function<T extends Constructor>(target: T) {
    return class extends target {
      private readonly _httpClient = httpClientOptions.axiosInstance
      constructor(...args: Array<any>) {
        super(...args)
      }
    }
  }
}

export function GetRequest(url: string, options?: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const params = target[propertyKey].params
    const body = target[propertyKey].body
    const query = target[propertyKey].query
    descriptor.value = HttpAdapter.createHttpAdapter('GET', url, params, body, query, options)
  }
}
