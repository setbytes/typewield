@LoggerClass()
@Print()
@Class
class test {
  @Logger()
  @Decorator()
  log(s: string) {
    console.log('ok4', s)
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

new test().log('tes');
(<any>new test()).print(); // method added by decorator