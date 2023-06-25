import { faker } from "@faker-js/faker";
import { Logger } from "@/infra/logger/usecases/logger-protocol";
import { LoggerUseCase } from "@/domain/usecases/logger-usecase";
import { LoggerService } from "@/domain/services/logger-service";

describe("LoggerService", () => {
  let logger: Logger;
  let loggerService: LoggerUseCase;

  beforeEach(() => {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      log: jest.fn()
    };
    loggerService = new LoggerService(logger);
  });

  it("should call logger.info with input params and function name", () => {
    const inputParams = [faker.random.word(), faker.random.word()];
    const functionName = faker.random.word();
    const originalFunction = jest.fn().mockReturnValue(inputParams[0]);

    loggerService.log(inputParams, functionName, originalFunction);

    expect(logger.info).toHaveBeenCalledWith("[INPUT]", `[${functionName}]`, inputParams);
  });

  it("should call originalFunction with input params and return its result", () => {
    const inputParams = [faker.random.word(), faker.random.word()];
    const functionName = faker.random.word();
    const originalFunction = jest.fn().mockReturnValue(inputParams[0]);

    const result = loggerService.log(inputParams, functionName, originalFunction);

    expect(originalFunction).toHaveBeenCalledWith(...inputParams);
    expect(result).toEqual(inputParams[0]);
  });

  it("should call logger.info with output result and function name", async() => {
    const inputParams = [faker.random.word(), faker.random.word()];
    const functionName = faker.random.word();
    const originalFunction = jest.fn().mockReturnValue(Promise.resolve(inputParams[0]));

    await loggerService.log(inputParams, functionName, originalFunction);

    expect(logger.info).toHaveBeenCalledWith("[INPUT]", `[${functionName}]`, inputParams);
  });

  it("should call logger.error with error message and function name", () => {
    const inputParams = [faker.random.word(), faker.random.word()];
    const functionName = faker.random.word();
    const errorMessage = faker.random.word();
    const originalFunction = jest.fn().mockImplementation(() => { throw new Error(errorMessage); });

    expect(() => loggerService.log(inputParams, functionName, originalFunction)).toThrowError(errorMessage);
    expect(logger.error).toHaveBeenCalledWith("[OUTPUT]", `[${functionName}]`, errorMessage);
  });
});
