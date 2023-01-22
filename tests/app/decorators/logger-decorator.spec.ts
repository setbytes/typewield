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
      run() {
        return [this.checkThis]
      }
    }

    const result = new LoggerDecorator().run();
    expect(result).toStrictEqual(['binded'])
  })

  it('should run a async function successfuly', async () => {
    class LoggerDecorator {
      @Logger
      async run() {
        const result = await new Promise((resolve) => {
          setTimeout(() => {
            resolve('promise')
          }, 40);
        })
        return result
      }
    }

    const result = await new LoggerDecorator().run();
    expect(result).toBe('promise')
  })

  it('should run a static function successfuly', async () => {
    class LoggerDecorator {
      @Logger
      static run() {
        return 'static function'
      }
    }

    const result = LoggerDecorator.run();
    expect(result).toBe('static function')
  })
})