import { Logger } from '../../../src'

describe('@Logger Decorator', () => {
  it('should run no async decorator successfuly', () => {
    class LoggerDecorator {
      @Logger
      run(value: string, num: number) {
        return [value, num]
      }
    }
    const message = 'hello'
    const year = 2023
    const result = new LoggerDecorator().run(message, year);
    expect(result).toStrictEqual([message, year])
  })
})