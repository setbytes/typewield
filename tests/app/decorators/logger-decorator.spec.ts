import { faker } from '@faker-js/faker'
import { Logger } from '../../../src'

describe('@Logger Decorator', () => {
  it('should run no async decorator successfuly', () => {
    class LoggerDecorator {
      @Logger
      run(value: string, num: number) {
        return [value, num]
      }
    }
    const message = faker.lorem.word()
    const year = Number(faker.random.numeric())
    const result = new LoggerDecorator().run(message, year);
    expect(result).toStrictEqual([message, year])
  })

  it('should run with this binding successfuly', () => {
    class LoggerDecorator {
      public binded = 'binded'
      @Logger
      run() {
        return this.binded
      }
    }

    const result = new LoggerDecorator().run();
    expect(result).toBe('binded')
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

  it('should log an error successfuly', () => {
    class LoggerDecorator {
      @Logger
      static run(value: string) {
        throw new Error(value)
      }
    }
    const message = faker.lorem.words()
    expect(() => LoggerDecorator.run(message)).toThrowError(new Error(message))
  })
})