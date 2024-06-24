// Ctrl + Alt + N : 실행

// 기존과 달라진 ES6 에서의 리스트 순회

// for i++
// for of

const list = [1,2,3];
const str = 'abc';

for(const a of list) console.log(a);
for(const a of str) console.log(a);

// Array
const array = [1,2,3];
array[Symbol.iterator] = null;
for(const a of array) console.log(a);

// Set
const set = new Set([1,2,3]);
console.log(set[Symbol.iterator])


// Map
const map = new Map([['a',1],['b',2],['c',3]]);
console.log(map.keys());
console.log(map.entries());
console.log(map.values());


// 이터러블/이터레이터 프로토콜

// 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값 -> 즉, arary, set, map
console.log(map[Symbol.iterator]())

// 이터레이터: {value, done} 객체를 리턴하는 next() 를 가진 값
let iter = map[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

// 이터러블/이터레이터 프로토콜
// 이터러블을 for..of, 전개 연산자 등과 함께 동작하도록한 규약


// 사용자 정의 이터러블

const iter = {
    [Symbol.iterator]() {
        let i = 3;
        return {
            next() {
                return i == 0 ? {done: true} : {value:i--, done: false}
            },
            [Symbol.iterator]() {
                return this;
            }
        }
    }
}

let iter2 = iter[Symbol.iterator]();
// console.log(iter2);
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());

for(const a of iter) console.log(a);

const arr = [1,2,3];
let iter = arr[Symbol.iterator]();
iter.next();
console.log(iter == iter)
for(const a of iter) console.log(a);


for(const a of document.querySelectorAll('*')) console.log(a);



// 전개 연산자

const arr = [1,2];
console.log(...arr, ...arr, ...[3,4])
arr[Symbol.iterator] = null;
console.log(...arr, ...arr, ...[3,4])

