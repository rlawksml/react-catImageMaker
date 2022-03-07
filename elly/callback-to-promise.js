'use strict'



// class UserStorage
class UserStorage {

  // class 함수 유저 로그인 기능 함수
  // 인자 onSuccess,onError는 callback 함수
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      if ((id === "genie" && password === "1234") || (id === "genie2" && password === "12345")) {
        resolve(id)
      } else {
        reject(new Error('not found'))
      }
    })
  }

  // class 함수 역할을 정해주는 기능 함수
  // 인자 onSuccess, onError는 callback 함수
  getRoles(user) {
    return new Promise((resolve, reject) => {
      if (user === "genie") {
        resolve({
          name: "genie",
          role: 'admin'
        })
      } else {
        reject(new Error('no access'))
      }
    })
  }
}
const userStorage = new UserStorage()
const id = "genie"
const password = "1234"

userStorage.loginUser(id, password)
  .then((userId) => {
    userStorage.getRoles(userId)
      .then((userWithRole) => {
        alert(`안녕 ${userWithRole.name}, 당신의 역할은 ${userWithRole.role} 입니다.`)
      })
  })

//then에서 전달해주는 인자가 하나라면 줄여줄 수 있음 아래와 같이
userStorage.loginUser(id, password)
  .then(userStorage.getRoles)
  .then((user) => {
    alert(`안녕 ${user.name}, 당신의 역할은 ${user.role} 입니다. 2`)
  })