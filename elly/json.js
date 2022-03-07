'use strict'
// JSON

// JS Object Notation

// 1. object to json 오브젝트를  json으로 변경하는 방법 stringify
// stringify(obj)


const rabbit = {
  name: 'red rebbit',
  age: 10,
  address: 'seoul'

  // key와 value 값을 저장함
  // js만 가지고 있는 기능은 json으로 변환되지 않음
  // 함수는 저장 안됨
}

let json = JSON.stringify(rabbit);

// 2. json to object  json을 오브젝트로 변경하는 방법 parse
// parse(json)

let obj = JSON.parse(rabbit)

// revival 기능 활용하기

let obj = JSON.parse(rabbit, (key, value) => {
  return key === "function" ? /*function내용 작성*/ true : /* 아닐경우 value값 반환 */ false
})
