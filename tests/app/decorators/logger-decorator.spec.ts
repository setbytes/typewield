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

  it('should run with this binding successfuly', () => {
    class LoggerDecorator {
      public checkThis = 'binded'
      @Logger
      run(value: string, num: number) {
        return [this.checkThis]
      }
    }

    const result = new LoggerDecorator().run('binded', 0);
    expect(result).toStrictEqual(['binded'])
  })
})