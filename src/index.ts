class test {
  @Logger()
  log(s: string) {
    console.log('ok4', s)
  }
}

function Logger(target?: any): any {
  console.log(target)
  return 
}

const t = new test()
t.log('tes')
