'use strict'


// 배열의 선언 방법
const arr1 = new Array()
const arr2 = [1, 2]

const fruits = ['apple', 'bannana']

// 배열 출력하기
for (let i in fruits) {
  console.log(fruits[i])
}

for (let item of fruits) {
  console.log(item)
}

fruits.forEach((item, index) => {
  console.log(item)
  console.log(index)
})

// 추가 삭제 복사
// push pop 
fruits.push('strawberry')
console.log(fruits)
fruits.pop()
console.log(fruits)

// 앞에서 부터 삭제 or 넣기

// unshift 앞에 넣기
fruits.unshift('strawberry')
console.log(fruits)

// shift 앞에 삭제
fruits.shift('strawberry')
console.log(fruits)

// 내가 원하는 곳에 있는 index 삭제하기
fruits.splice(0, 1)
console.log(fruits)

fruits.push('watermelon')
console.log(fruits)

// 3번째 인자는 삭제한 것대신에 넣기
fruits.splice(0, 1, 'peach')
console.log(fruits)

// 배열 합치기 concat을 사용하기
const fruits2 = ['wintermelon', 'coconut']
const newFruits = fruits.concat(fruits2)
console.log(newFruits)

// 검색 api indexof -> 인덱스 번호 반환 , includes -> true false 반환 유무 확인
fruits.indexOf('bannana') // 0
fruits.lastIndexOf('bannana') // 배열중에 가장 마지막에 있는 값을 뽑아낼 수 있음
fruits.includes('bannana') // false


const test = ['a', 'b', 'c']
console.log(test.join(''))

const test2 = '1, 2, 3, 4'
console.log(test2.split(''))

const array = [1, 2, 3, 4, 5]
console.log(array.reverse())
const newarr = array.reverse()

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}

const students = [
  new Student('a', 29, true, 45),
  new Student('b', 28, false, 85),
  new Student('c', 30, true, 90),
  new Student('d', 40, false, 66),
  new Student('e', 18, true, 88),
]

// find를 써서 해결 할 것
const result = students.find(student => {
  return student.score === 90;
})

for (let i in students) {
  if (students[i].score >= 90) {
    console.log(students[i])
  }
}

// filter를 사용하기
const result2 = students.filter(student => {
  student.enrolled
})
console.log(result2)

const enrolled_students = []

for (let i in students) {
  if (students[i].enrolled == true) {
    enrolled_students.push(students[i])
  }
}
console.log(enrolled_students)

const score_list = (students.map(item => {
  return item.score
})).join(', ')

// 점수만 뽑아내고 이것을 sort한다.
students.map(student => {
student.score
}).sort((a, b) => a - b)

console.log(score_list)



// find에는 함수를 사용해야함
const finding = students.find(item => {
  return (item.score <= 50)
})

// 있는지 여부만 확인하는 것이라면 some과 every를 사용해야한다.
const finding2 = students.some(student => student.score < 50) // true
const finding3 = students.every(student => student.score > 50) // false


// 0은 초기화 값임
// prev는 돌때마다 이전 값을 전달
// item(curr)는 돌때마다 지금 현재 값 전달
const score_avg = students.reduce((prev, item) => {
  return prev += item.score
  // return 값을 전달해야지 return이 prev에 전달이 됨
}, 0)


console.log(score_avg)
console.log(score_avg / students.length)