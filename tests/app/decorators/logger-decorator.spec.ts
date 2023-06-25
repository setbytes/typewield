import { faker } from "@faker-js/faker";
import { Logger } from "@/app/decorators/logger-decorator";

describe("@Logger Decorator", () => {
  it("should run no async decorator successfully", () => {
    class LoggerDecorator {
      @Logger
      run(value: string, num: number): Array<any> {
        return [value, num];
      }
    }
    const message = faker.lorem.word();
    const year = Number(faker.random.numeric());
    const result = new LoggerDecorator().run(message, year);
    expect(result).toStrictEqual([message, year]);
  });

  it("should run with this binding successfully", () => {
    class LoggerDecorator {
      public binding = "binding";
      @Logger
      run(): string {
        return this.binding;
      }
    }

    const result = new LoggerDecorator().run();
    expect(result).toBe("binding");
  });

  it("should run a async function successfully", async() => {
    class LoggerDecorator {
      @Logger
      async run(): Promise<any> {
        const result = await new Promise((resolve) => {
          setTimeout(() => {
            resolve("promise");
          }, 40);
        });
        return result;
      }
    }

    const result = await new LoggerDecorator().run();
    expect(result).toBe("promise");
  });

  it("should run a static function successfully", async() => {
    class LoggerDecorator {
      @Logger
      static run(): string {
        return "static function";
      }
    }

    const result = LoggerDecorator.run();
    expect(result).toBe("static function");
  });

  it("should log an error successfully", () => {
    class LoggerDecorator {
      @Logger
      static run(value: string): void {
        throw new Error(value);
      }
    }
    const message = faker.lorem.words();
    expect(() => LoggerDecorator.run(message)).toThrowError(new Error(message));
  });
});
