'use strict'


console.clear()
console.log('1')
setTimeout(() => {
  // callback
  console.log('timeout 2')
}, 1000);
console.log('3')

// callback은 동기 비동기 둘다 사용 됨

// 동기 callback
function printnow(print) {
  print()
}

printnow(() => {
  console.log('hello')
})

// 비동기 callback
function printtimeout(print, time) {
  setTimeout(() => {
    print()
  }, time);
}

printtimeout(() => {
  console.log('hellow2')
}, 500)



// callback Hell ex

// class UserStorage
class UserStorage {

  // class 함수 유저 로그인 기능 함수
  // 인자 onSuccess,onError는 callback 함수
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if ((id === "genie" && password === "1234") || (id === "genie2" && password === "12345")) {
        onSuccess(id);
      } else {
        onError(new Error('not Found'))
      }
    }, 2000);
  }

  // class 함수 역할을 정해주는 기능 함수
  // 인자 onSuccess, onError는 callback 함수
  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "genie") {
        onSuccess({
          name: "genie",
          role: 'admin'
        })
      } else {
        onError(new Error('no access'))
      }
    }, 1000);
  }
}
const userStorage = new UserStorage()
const id = "genie"
const password = "1234"

userStorage.loginUser(id, password,
  // 로그인 성공시
  user => {

    // userWithRole은 객체임 위에 getRoles에 인자를 객체로 작성하였음
    userStorage.getRoles(user, userWithRole => {
      alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`)
    }, error => {
      console.log(error)
    })
  },
  // 로그인 실패시
  error => {
    console.log(error)
  })

  