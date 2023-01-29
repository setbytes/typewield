import { Constructor } from '../../core/model/constructor'

type HttpClientOptions = {
  axiosInstance?: any
}

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

    descriptor.value = function (...args: Array<any>) {
      const dynamicParams = url.match(/:(\w+)/g) || []
      const dynamicValues = dynamicParams.map((param: string) => args[params[param.slice(1)]])
      const dynamicBody = args[body.index]

      let urlWithParams = url
      dynamicParams.forEach((param, index) => {
        urlWithParams = urlWithParams.replace(param, dynamicValues[index].toString())
      })

      console.log(dynamicValues)
      return [dynamicValues, dynamicBody]
    }
  }
}
