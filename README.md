## How to use
```shell
npm i typescript-decorator
```

### @Logger
```js
import { Logger } from 'typescript-decorator'

class TestDecorator {
  @Logger
  logging(value: string, num: number) {
    // doing something...
    return 'returning something'
  }
}

new TestDecorator().logging('Hello', 2023)
```

```shell
[INFO] [INPUT] [logging] [ 'Hello', 2023 ]
[INFO] [OUTPUT] [logging] returning something
```

### @Cache
```js
import { Cache } from 'typescript-decorator'

class CacheDecorator {
  @Cache
  run(value: string, num: number) {
    return {value, num}
  }
}
const message = 'cache'
// first try the cache will be save
const resultNoCache = new CacheDecorator().run(message, 10);
// second try the return will come from the cache
const resultWithCache = new CacheDecorator().run(message, 10);

console.log(resultNoCache)
console.log(resultWithCache)

// the cache will be expired each 30 seconds by default
```

### @CacheParam
```js
import { CacheParam } from 'typescript-decorator'

class CacheParamDecorator {
  // expire: time in milliseconds for the cache to expire. 30 seconds by default
  // logger: displays in the console when data comes from the cache. false by default
  // checkInterval: routine for cleaning all expired caches in milliseconds. 5 minuts by default
  @CacheParam({ expire: 1000, logger: true, checkInterval: 30000 })
  run(value: string, num: number) {
    return {value, num}
  }
}

const message = 'cache'
// first try the cache will be save
const resultNoCache = new CacheParamDecorator().run(message, 10);
// second try the return will come from the cache
const resultWithCache = new CacheParamDecorator().run(message, 10);

```

```shell
[INFO] [CACHE] [run] { data: { value: 'cache', num: 1 }, expireAt: 1674913252407 }
```

### @HttpClient

```js
import axios from 'axios'

const axiosInstance = axios.create({})

// if you dont use a axios instance this will be using fetch by default
@HttpClient({ axiosInstance, baseURL: 'http://localhost:3001' })
class HttpRequest {
  // post request example
  @PostRequest('/users')
  async save(@Body data: any): Promise<any> {}

  //get request example
  @GetRequest('/users')
  async findAll(): Promise<any> {}

  // get using a param on url
  @GetRequest('/users/:id')
  async findById(@Param('id') myId: number): Promise<any> {}

  // get ussing query string
  @GetRequest('/users')
  async findByQueryString(@Query query: any): Promise<any> {}
}


// others avilable decorators 
// @PostRequest @GetRequest @PutRequest @DeleteRequest @HeadRequest 
// @PurgeRequest @LinkRequest @UnlinkRequest @OptionsRequest @PatchRequest
```