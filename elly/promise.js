'use strict'


// Promise is a js obejct for 비동기 동작

// 1 state
// state pending -> fulfilled or rejected

// 2 produce와 consumer의 차이점


// 1) producer
const testpromise = new Promise((resolve, reject) => {
  // 동기 작업 
  console.log('doing something')
  setTimeout(() => {
    // 성공시 resolve 반환
    // resolve('genie')
    reject(new Error('no network'))
  }, 2000);
})

// 2) consumer then catch finally를 사용해서 받을 수 있다.
// then 성공시
// catch 실패시
// finally 그런것에 상관 없이 모두
testpromise.then((value) => {
  console.log(value)
}).catch(error => {
  console.log(error)
}).finally(() => {
  console.log('finally')
})


// 3 promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000);
})

fetchNumber
  .then(num => num + 1)
  .then(num => num + 1)
  .then(num => num + 1)
  .then(num => console.log(num))


// 4 error handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('닭'), 1000)
  })


const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} -> 알`), 1000)
  })


const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} -> 달걀 후라이`), 1000)
  })


getHen()
  .then(hen => getEgg(hen))
  .then(egg => cook(egg))
  .then(meal => console.log(meal))

getHen()
  .then(getEgg)
  .then(cook)
  .then(console.log)