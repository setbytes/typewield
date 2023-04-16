import { faker } from "@faker-js/faker";
import { Cache, CacheParam } from "@/app/decorators/cache-decorator";

describe("Cache Decorators", () => {
  describe("@Cache", () => {
    it("should run no async decorator successfuly", () => {
      class CacheDecorator {
        @Cache
        run(value: string, num: number): any {
          return { value, num };
        }
      }
      const message = faker.random.word();
      const num = Number(faker.random.numeric());
      const resultNoCache = new CacheDecorator().run(message, num);
      const resultWithCache = new CacheDecorator().run(message, num);
      expect(resultNoCache).toStrictEqual({ value: message, num });
      expect(resultWithCache).toStrictEqual({ value: message, num });
    });

    it("should run async decorator successfuly", async() => {
      class CacheDecorator {
        @Cache
        async run(value: string, num: number): Promise<any> {
          return await Promise.resolve({ value, num });
        }
      }

      const message = faker.random.word();
      const num = Number(faker.random.numeric());
      const resultNoCache = await new CacheDecorator().run(message, num);
      const resultWithCache = await new CacheDecorator().run(message, num);
      expect(resultNoCache).toStrictEqual({ value: message, num });
      expect(resultWithCache).toStrictEqual({ value: message, num });
    });
  });
  describe("@CacheParam", () => {
    it("should run no async decorator successfuly", () => {
      class CacheParamDecorator {
        @CacheParam({ expire: 10 })
        run(value: string, num: number): any {
          return { value, num };
        }
      }

      const message = faker.random.word();
      const num = Number(faker.random.numeric());
      const resultNoCache = new CacheParamDecorator().run(message, num);
      const resultWithCache = new CacheParamDecorator().run(message, num);
      expect(resultNoCache).toStrictEqual({ value: message, num });
      expect(resultWithCache).toStrictEqual({ value: message, num });
    });

    it("should run async decorator successfuly", async() => {
      class CacheParamDecorator {
        @CacheParam({ expire: 10 })
        async run(value: string, num: number): Promise<any> {
          return await Promise.resolve({ value, num });
        }
      }

      const message = faker.random.word();
      const num = Number(faker.random.numeric());
      const resultNoCache = await new CacheParamDecorator().run(message, num);
      const resultWithCache = await new CacheParamDecorator().run(message, num);
      expect(resultNoCache).toStrictEqual({ value: message, num });
      expect(resultWithCache).toStrictEqual({ value: message, num });
    });
  });
});
