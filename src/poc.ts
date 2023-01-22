@LoggerClass()
@Print()
@Class
class testD {
  @NoNegative
  private myNumber: number
  constructor(n: number) {
    this.myNumber = n
  }
  @Logger()
  @Decorator()
  log(@Required value: string) {
    console.log('ok4', value, this.myNumber)
  }
}

// function decorator
function Logger(): Function {
  return function (target: Function) {
    console.log(target)
  }
}

// class decorator
type Constructor = { new(...args: Array<any>): {} }

function LoggerClass(): Function {
  return function<T extends Constructor>(target: T) {
    return class extends target {
      constructor(...args: Array<any>) {
        console.log('Before')
        super(...args)
        console.log('After')
      }
    }
  }
}

// extend new method
function Print() {
  return function(target: Constructor) {
    target.prototype.print = function() {
      console.log('print', this)
    }
  }
}

function Decorator() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target, propertyKey, descriptor)
  }
}

function Class(constructor: Constructor) {
  console.log('Class', constructor);
  console.log('Class', constructor.prototype);
}

function NoNegative(target: any, propertyKey: string) {
  delete target[propertyKey]
  Object.defineProperty(target, propertyKey, {
    get: function(): any {
      console.log('get propertie')
      return target['_' + propertyKey]
    },
    set: function(value: any): void {
      if(value < 0) {
        throw new Error('negative value')
      } else {
        console.log('set propertie')
        return target['_' + propertyKey] = value
      }
    }
  })
}

function Required(target: Object, propertyKey: string, parameterIndex: number) {
  console.log('1', target)
  console.log('2', propertyKey)
  console.log('3', parameterIndex)
}

new testD(10).log('tes');
(<any>new testD(10)).print(); // method added by decorator