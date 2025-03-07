// Ctrl + Alt + N : 실행
const log = console.log;


// const arr1 = [1,2,3,4,5];
// log(arr1);

// const arr2 = new Array(1,2,3,4,5)
// log(arr2);

// Array.of
// ES6 에서 도입된 Array.of 메서드는 전달된 인수를 요소로 갖는 배열을 생성한다.
// Array.of 는 Array 생성자 함수와 다르게 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.

// const arr3 = Array.of(1,2,3,4,5,'feaf',true)
// log(arr3);

// Array.from
// ES6 에서 도입된 Array.from 메서드는 유사 배열 객체 또는 이터러블 객체를 인수로 전달 받아 배열로 반환하여 전달한다.

// log(Array.from('hello'));
// let obj= {
//     a:1
//     ,b:2
//     ,c:3
// };

// for(let a of obj) log(a)

// log(Array.from(obj))


// log(obj[Symbol.iterator])

// 배열은 사실 객체이기 때문에 배열의 특정 요소를 삭제하기 위해 delete 연산자를 사용할 수 있다.
// delete 연산자는 객체의 프로퍼티를 삭제한다.
// 이때 배열은 희소배열이 되며 length 프로퍼티 값은 변경되지 않는다.
// 따라서 희소배열을 만드는 delete 연산자는 사용하지 않는 것이 좋다.

// 희소배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하려면
// Array.prototype.splice 메서드를 사용한다.

// const arr = [1,2,3,4];
// // delete arr[1];
// arr.splice(1,1);

// log(arr);
// log(Object.getOwnPropertyDescriptors(arr));

// 자바스크립트는 배열을 다룰 떄 유용한 빌트인 메서드를 제공한다.
// Array 생성자 함수는 정적 메서드를 제공하며
// 배열 객체의 프로토타입인 Array.prototype 은 프로토타입 메서드를 제공한다.

// 뱅려 메서드는 결과물을 반환하는 패턴이 두 가지이므로 주의가 필요하다.
// 배열에는 원본 배열(배열 메서드를 호출한 배열, 즉 배열 제서드의 구현체 내부에서 this 가 가리키는 객체)을 직접 변경하는 메서드
// 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드

// ES5 부터 도입된 배열 메서드는 대부분 원본 배열을 직접 변경하진 않지만
// 초창기 배열 메서드는 원본 배열을 직접 변경하는 경우가 많다.
// 원본 배열을 직접 변경하는 메서드는 외부 상태를 직접 변경하는 부수 효과가 있으므로 사용해 주의해야 한다.
// 따라서 가급적 원본 배열을 직접 변경하지 않는 메서드를 사용하는 편이 좋다.



// const arr = [1];
// arr.push(2);
// log(arr);
// const result = arr.concat(3);
// log(arr);
// log(result);

// log(Array.isArray(true));
// log(Array.isArray([1]));

// Array.isArray 는 Array 생성자 함수의 정적 메서드
// 배열 생성에서 본 Array.of Array.from 도 Array 생성자 함수의 정적 메서드이다.

// Array.prototype.indexOf
// indexOf 메서드 대신 ES7 에서 도입된 
// Array.prototype.includes 메서드를 사용하면 가독성이 더 좋다.

// let arr = [1,2,'s'];
// log(arr.includes('s'))
// log(arr.includes('1'))

// Array.prototype.push
// push 메서드는 성능 면에서 좋지 않다.
// 마지막 요소로 추가할 요소가 하나뿐이라면 push 메서드를 사용하지않고
// length 프로퍼티를 사용하여 배열의 마시작 요소를 직접 추가할 수도 있다.
// 이 방법이 push 메서드보다 빠르다.
// const arr = [1,2,3];
// arr[arr.length] = 4;
// log(arr)

// push 메서드는 원본 배열을 직접 변경하는 부수 효과가 있다.
// 따라서 push 메서드보다는 ES6 의 스프레드 문법을 사용하는 편이 좋다.
// 스프레드 문법을 사용하면 함수 호출 없이 표현식으로 마지막 요소를 추가할 수 있으며 부수효과도 없다.

// let arr2 = [...arr, 5];
// log(arr2)

// Array.prototype.pop
// pop 메서드는 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
// 원본 배열이 빈 비열이면 undefined 를 반환한다.
// pop 메서드는 원본 배열을 직접 변경한다.

// let popresult = arr2.pop();
// log(popresult)
// log(arr2)

// const Stack = (function() {
//     function Stack(array = []) {
//         if(!Array.isArray(array)) {
//             throw new TypeError('error');
//         }
//         this.array = array;
//     }

//     Stack.prototype = {
//         constructor: Stack,
//         push(value) {
//             return this.array.push(value);
//         },
//         pop() {
//             return this.array.pop();
//         },
//         entries() {
//             return [...this.array];
//         }
//     };

//     return Stack;
// }());

// class Stack {
//     #array;

//     constructor(array = []) {
//         if(!Array.isArray(array)) {
//             throw new TypeError('erorr');
//         }
//         this.#array = array;
//     }

//     push(value) {
//         return this.#array.push(value)
//     }

//     pop() {
//         return this.#array.pop();
//     }

//     entries() {
//         return [...this.#array];
//     }
// }


// const stack = new Stack([1,2]);
// log(stack.entries());
// stack.push(3);
// log(stack.entries());
// stack.pop();
// log(stack.entries());

// Array.prototype.concat
// concat 메서드는 인수로 전달된 값들을(배열 또는 원시값) 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다.
// 원본 배열은 변경되지 않는다.

// let arr = [1,2,3];
// let arr2 = arr.concat(4,5,6);
// log(arr);
// log(arr2);


// push 와 unshift 메서드는 원본 배열을 직접 변경하지만 concat 메서드는 원본 배열을 변경하지 않고 새로운 배열을 반환한다.
// 따라서 push unshift 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 한다.
// concat 메서드를 사용할 경우 반환값을 반드시 변수에 할당받아야 한다.

// concat 메서드는 ES6 의 스프레드 문법으로 대체할 수 있다.

// 결론적으로 push unshift concat 메서드를 사용하는 대신 ES6 의 스프레드 문법을 일관성 있게 사용하는 것을 권장

// const arr = [1,2,3,4,5,6,7,8,9,10];
// arr.splice(8);
// const result = arr.splice(1,2,10,20);
// log(arr);
// log(result);

// Array.prototype.slice
// slice 메서드는 인수로 전달된 범위의 요소들을 복사하여 배열로 반환
// 원본 배열은 변경되지 않는다.

// Array.prototype.reverse
// reverse 메서드는 원본 배열의 순서를 반대로 뒤집는다.
// 이때 원본 배열이 변경된다.
// 반환값은 변경된 배열이다.

// const arr = [1,2,3,4,5,6,7,8,9,10];
// const arr2 = arr.reverse();
// log(arr);
// log(arr2);

// Array.prototype.fill
// ES6 에서 도입된 fill 메서드는 인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채운다.
// 이때 원본 배열이 변경된다.
// const arr = [1,2,3,4,5,6,7,8,9,10];
// arr.fill(-1);
// log(arr);


// Array.prototype.flat
// ES10 에서 도입된 flat 메서드는 인수로 전달한 깊이 만큼 재귀적으로 배열을 평탄화한다.

// log([1,2,[3,4],[5,[6,7,8]]].flat(Infinity))

// 배열 고차 함수

// 고차 함수는 함수를 인자로 받거나 함수를 반환하는 함수
// 자바스크립트의 함수는 일급 객체이므로 함수를 값처럼 인수로 전달할 수 있으며 반환할 수 있다.
// 고차 함수는 외부 상태의 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에 기반을 두고 있다.


// Array.prototype.sort
// sort 메서드는 배열의 요소를 정렬한다.
// 원본 배열을 직접 변경하며 정렬된 배열을 반환한다.
// sort 메서드는 기본적으로 오름차순으로 요소를 정렬한다.

// const arr = ['b','a','c','d'];
// arr.sort();
// log(arr);
// log(arr.reverse())

// const arr = [100,1,10,15,50,90,500,400];
// log(arr.sort());

// sort 메서드의 기본 정렬 순서는 유니코드 코드 포인트의 순서를 따른다.
// 배열의 요소가 숫자 타입이라 할지라도 배열의 요소를 일시적으로 문자열로 변환한 후 유니코드 코드 포인트의 순서를 기준으로 정렬한다.

// 따라서 숫자 요소를 정렬할 때는 sort 메서드에 정렬 순서를 정의하는 비교 함수를 인수로 전달해야 한다.
// 비교함수는 양수,음수,0 을 반환해야 한다.
// 0보다 작으면 첫번째 인수를 우선하여 정렬
// 0이면 정렬하지 않음
// 0보다 크면 두번째 인수를 우선하여 정렬

// const arr = [100,1,10,15,50,90,500,400];

// log(arr.sort((a,b) => a-b));
// log(arr.sort((a,b) => b-a));

// const todos = [
//     {id:4, content: 'Javascript'},
//     {id:1, content: 'HTML'},
//     {id:2, content: 'CSS'},
// ];

// const compare = (key) => {
//     return (a,b) => {
//         if(a[key] > b[key]) {
//             return 1
//         } else if(a[key] < b[key]) {
//             return -1
//         } else {
//             return 0;
//         }
//     }
// }

// log(todos.sort(compare('content')))

// Array.prototype.forEach
// 함수형 프로그래밍은 순수 함수와 보조 함수의 조합을 통해 로직 내에 존재하는 조건문과 반복문을 제거하여
// 복잡성을 해결하고 변수의 사용을 억제하여 상태 변경을 피하려는 프로그래밍 패러다임이다.

// forEach 메서드는 for 문을 대체할 수 있는 고차함수다.
// forEach 메서드는 반복문을 추상화한 고차 함수로서 내부에서 반복문을 ㅌ ㅗㅇ해 자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출한다.


// const todos = [
//     {id:4, content: 'Javascript'},
//     {id:1, content: 'HTML'},
//     {id:2, content: 'CSS'},
// ];

// todos.forEach((item,i,arr) => {
//     log(item,i,arr)
// })



// const values = [1,2,3,4,5,6];
// const values = [-1,-1,-2,-3,-2,-4,-6,-5,-6];

// let average = values.reduce((acc,cur,i,{length}) => i === length-1 ? (acc+cur)/length : acc+=cur,0);
// log(average)

// let max = values.reduce((acc,cur,i) => i === 0 ? acc = cur : cur > acc ? cur : acc,null);

// log(max);
// log(Math.max(...values));

// let duplCnt = values.reduce((acc,cur,i) => {
//     acc[cur] = (acc[cur] ?? 0) + 1;
//     return acc;
// },{});

// log(duplCnt);

// let values2 = values.reduce((acc,cur,i) => acc.includes(cur) ? acc : [...acc,cur],[]);
// log(values2);

// let values3 = [...new Set(values)];
// log(values3)

const values = [1,2,3,4,5,6];
log(values.some(v => v >= 5));
log(values.every(v => v >= 5));
