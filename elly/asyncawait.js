'use strict'

// 1. async
function fetchUser() {
  return new Promise((resolve, reject) => {
    resolve("genie")
  })
}

const user = fetchUser();
user.then(console.log)

// async를 함수 앞에 붙여주면 자동으로 반환값은 promise가 된다
async function fetchUser2() {
  return "genie2"
}
const user2 = fetchUser2();
user.then(console.log)

// 2. await
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getApple() {
  await delay(1000)
  return "apple red"
}

async function getBanana() {
  await delay(1000)
  return 'banana yellow'
}

async function pickFruits() {

  // const apple = await getApple();
  // const banana = await getBanana();
  // return `${apple} + ${banana}`

  // 위 코드를 병렬로 실행하기
  // 프로미스로 바로 받아옴
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple2 = await applePromise;
  const banana2 = await bananaPromise;
  
  return `${apple2} + ${banana2}`

  // return getApple()
  //   .then(apple => {
  //     return getBanana().then(banana => `${apple} + ${banana}`)
  //   })
}
pickFruits().then(console.log)

// 3. useful promise apis
// 병렬을 효율적으로 사용하는 방법 all을 사용한다.
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()])
    .then(fruits => fruits.join(' + '))
}
pickAllFruits().then(console.log)



// 병렬 가장 먼저 끝나는 애부터 시작하기
function pickAllFruits2() {
  return Promise.race([getApple(), getBanana()])
}
pickAllFruits2().then(console.log)