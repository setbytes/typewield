## How to use
```shell
npm i typescript-decorator
```


```js
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