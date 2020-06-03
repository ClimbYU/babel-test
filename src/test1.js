import test from './index.js'
class Test{
  constructor(){}

  provide(){}
}

const a = () => {}

const b = [1,2,4,455,5].includes(4)

console.log(test)

const p = new Promise((resolve, reject) => {
  resolve(100);
});

const getApi = function(){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(11111)
    },1000)
  })
}

async function test1(){
 const a = await getApi()
 console.log(a)
}


test1()

