import 'module-alias/register';
import { Logger } from '@/app/decorators/logger'
class TestDecorator {
  @Logger
  logging(value: string, n: number) {
    console.log('this is a test class', value, n)
    return 'this is the return'
  }
}

console.log('works', new TestDecorator().logging('HelloWorld', 3000))