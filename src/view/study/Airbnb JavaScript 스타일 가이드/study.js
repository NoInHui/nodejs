// Ctrl + Alt + N : 실행
const log = console.log;

// types
// primitive type 은 그 값을 직접 조작합니다.
// string number boolean null undefined

// const foo = 1;
// let bar = foo;
// bar = 9;
// log(foo, bar);

// 참조형(complex) 은 참조를 통해 값을 조작합니다.

// const foo = [1,2];
// const bar = foo;
// bar[0] = 9;
// log(foo,bar);

// 참조(References)
// 모든 참조는 const 를 사용하고 var 를 사용하지 마십시오.
// 왜? 참조를 재할당 할 수 없으므로 버그로 이어지고 이해하기 어려운 코드가 되는것을 방지합니다.

// 참조를 재할당 해야한다면 var 대신 let 을 사용하십시오.
// let 과 const 는 같은 블록스코프라는것을 유의하십시오
// let a = 1;
// const a = 1;

// 오브젝트
// 오브젝트를 작성할때는 리터럴 구문을 사용하십시오.

// const items = new Object(); -> bad
// const items = {}; -> good

// 코드가 브라우저상의 스크립트로 실행될때 예약어를 키로 이용하지 마십시오. IE8에서 작동하지 않습니다.
// ES6 모듈안이나 서버 사이드에서는 이용가능합니다.

// const superman = {
//     default: {clark: 'kent'},
//     private: true,
// };

// const superman = {
//     defaults: {clark: 'kent'},
//     hidden: true,
// }

// log(superman)

// 예약어 대신 알기 쉬운 동의어를 사용해 주십시오.
// const superman = {
//     type: 'alien'
// };

// const getKey = (k) => `key named ${k}`;

// const obj = {
//     id: 5,
//     name: 'San Francisco',
//     [getKey('enabled')]: true,
// };

// log(obj)

// 메소드의 단축구문을 이요해 주십시오

// const obj = {
//     addValue: function() {
//         return 1;
//     }
// }

// const obj = {
//     addValue() {
//         return 1
//     }
// }

// const a = '1';
// const obj = {
//     a
// };

// log(obj)

// 프로퍼티 단축 구문은 오브젝트 선언의 시작부분에 그룹화해주세요

// let a = 1;
// let b = 2;

// const obj = {
//     a,
//     b,
//     c: 3,
//     d: 4
// };

// log(obj)

// arrays

// 배열을 작성 할 때는 리터럴 구문을 사용해 주십시오
// const items = [];

// 직접 배열에 항목을 대입하지 말고 push 를 이용해주십시오

// const items = [];
// items.push(1);

// 배열을 복사할때는 배열의 확장연산자 ... 를 이용해 주십시오.

// const array1 = [1,2,3,4];
// const array2 = [...array1];
// log(array2)

// 유사배열 오브젝트를 배열로 변환하는 경우 array.from 을 이용해 주십시오.
// const foo = document.querySelectorAll('.foo');
// const nodes = Array.from(foo);

// destructuring

// 하나의 오브젝트에서 복수의 프로퍼티를 엑세스 할 때는 오브젝트 구조화대입을 이용해주십시오.
// 구조화대입을 이용하는 것으로 프로퍼티를 위한 임시적인 참조의 작성을 줄일 수 있습니다.

// function getFullName(user) {
//     const firstName = user.firstName;
//     const lastName = user.lastName;

//     return `${firstName} ${lastName}`;
// }

// function getFullName(user) {
//     const {firstName,lastName} = user;
//     return `${firstName} ${lastName}`;
// }

// function getFullName({firstName,lastName,...etc}) {
//     return `${firstName} ${lastName}`;
// }

// 배열의 구조화대입을 이용해주십시오

// const arr = [1,2,3,4];

// const first = arr[0];
// const second = arr[1];

// const [first,second,...etc] = arr;

// log(first,second,etc)

// 복수의 값을 반환하는 경우 배열의 구조화대입이 아닌 오브젝트의 구조화대입을 이용해 주십시오.

// 문자열

// 문자열에 싱크쿼터 '' 를 사용해 주십시오.
// 100 문자 이상의 문자열은 문자열연결을 사용해서 복수행에 걸쳐 기술할 필요가 있습니다.
// 문자연결을 과용하면 성능에 영향을 미칠 수 있스빈다.

// const message = 'this is\ feaf'
// const message = 'this is' + ' feaf';
// log(message)

// 프로그램에서 문자열을 생성하는 경우는 문자열 연결이 아닌 template strings 를 이용해 주십시오.
// template strings 는 문자열 보간기능과 적절한 줄바꿈 기능을 갖는 간결한 구문으로 가독성이 좋기 때문입니다.
// `how are you, ${name}`;

// 절대로 eval() 을 이요하지 마십시오. 이것은 많은 취약점을 만들기 때문입니다.

// 함수식 보다 함수선언을 이용해 주십시오.
// 왜? 이름이 부여된 함수선언은 콜스택에서 간단하게 확인하는 것이 가능합니다.
// 또한 함수선언은 함수의 본체가 hoist 되어집니다. 그에 반해 함수식은 참조만 hoist 되어집니다.
// 이 룰에 의해 함수식의 부분을 항상 arrow 함수 에서 이용하는것이 가능합니다.

// const foo = function() {};
// function foo() {}

// (() => log('abc'))();

// 함수 이외의 블록 안에서 함수를 선언하지 마십시오. 변수에 함수를 대입하는 대신 브라우저들은 그것을 허용하지만 모두가 다르게 해석합니다.

// if(currentUser) {
//     function test() {

//     }
// }

// rest syntax ... 를 이용해주십시오.
// ... 를 이용하는 것으로 몆개의 파라메터를 이용하고 싶은가를 확실하게 할 수 있습니다.
// 더해서 rest 파라미터는 arguemtns 와 같은 유사배열객체가 아닌 진짜 array 입니다.

// function func1(a,b,...args) {
//     log(a,b,args)
// }

// func1(1,2,3,4,5);

// 함수의 파라미터를 변이시키는 것보다 default 파라미터를 이용해 주십시오.

// function func(opts) {
//     // 함수의 파라미터를 변이시키면 안됩니다.
//     opts = opts || {};

// }

// function func(opts = {}) {

// }

// 항상 default 파라미터는 뒤쪽에 두십시오

// function func(name,opts = {}) {

// }

// 절대 새 함수를 작성하기 위해 Function constructor 를 이용하지 마십시오.
// 이 방법으로 문자열을 평가시켜 새 함수를 작성하는 것은 eval() 과 같은 수준의 취약점을 일으킬 수 있습니다.

// arrow function
// 함수식을 이용하는 경우 arrow 함수 표기를 이용해주십시오
// 왜? arrow 함수는 그 context 의 this 에서 실행하는 버전의 함수를 작성합니다.

// prototype 을 직접 조작하는것을 피하고 항상 class 를 이용해 주십시오.
// 왜? class 구문은 간결하고 의미를 알기 쉽기 때문입니다.

// function Queue(contents = []) {
//     this._queue = [...contents];
// }

// Queue.prototype.pop = function() {
//     const value = this._queue[0];
//     this._queue.splice(0,1);
//     return value;
// }

// let queue = new Queue([1,2,3,4,5]);
// log(queue)
// log(queue.pop());
// log(queue.pop());
// log(queue.pop());
// log(queue.pop());
// log(queue.pop());
// log(queue.pop());

// class Queue {
//     constructor(contents = []) {
//         this._queue = [...contents];
//     }

//     pop() {
//         const value = this._queue[0];
//         this._queue.splice(0,1);
//         return value;
//     }
// }

// let queue = new Queue([1,2,3,4,5]);
// log(queue)
// log(queue.pop());
// log(queue.pop());
// log(queue.pop());
// log(queue.pop());
// log(queue.pop());
// log(queue.pop());

// 상속은 extends 를 이용해주십시오.

// class PeekableQueue extends Queue {
//     peek() {
//         return this._queue[0];
//     }
// }

// let peek = new PeekableQueue([1,2,3,4,5]);
// log(peek.pop());
// log(peek.peek());

// 메소드의 반환값으로 this 를 반환하는 것으로 메소드채이닝을 할 수 있습니다.

// class Jedi {
//     jump() {
//         this.jumping = true;
//         return this;
//     }

//     setHeight(height) {
//         this.height = height;
//         return this;
//     }
// }

// const luke = new Jedi();
// luke.jump().setHeight(50);
// log(luke)

// modules

// 비표준 모듈시스템이 아닌 항상 import/export 를 이용해 주십시오.
// 이렇게 함으로써 선호하는 모듈시스템에 언제라도 옮겨가는게 가능해 집니다.

// const a = require('./a');
// module.exports = a.method;

// import a from './a';
// export default a.method;

// import {method} from './a';
// export default a;

// 이터레이터와 제너레이터

// iterators 를 이용하지 마십시오. for..of 루프 대신 map() 과 reduce() 와 같은 고급함수를 이용해 주십시오.
// 고급함수는 불변룰을 적용합니다. side effect 에 대해 추측하는거보다 값을 반환하는 순수 함수를 다루는게 간단하기 때문입니다.

// const numbers = [1, 2, 3, 4, 5];
// const sum = numbers.reduce((acc,cur) => acc += cur, 0);
// log(sum);

// properties
// 프로퍼티에 엑세스하는 경우 . 을 사용해 주십시오.
// 변수를 사용해 프로퍼티에 엑세스하는 경우는 [] 를 사용

// 변수를 선언 할 때는 항상 const 를 사용해 주십시오.
// 그렇게 하지 않으면 글로벌 변수로 선언됩니다.

// 하나의 변수선언에 대해 하나의 const 를 이용해 주십시오

// const 를 그룹화하고 let 을 그룹화해주세요.

// hoisting
// var 선언은 할당이 없이 스코프의 선두에 hoist 됩니다.


// 조건식과 등가식
// == != 보다 === !== 을 사용해 주십시오

// if 문과 같은 조건식은 ToBoolean 메소드에 의해 강제 형변환으로 평가되어 항상 다음과 같은 심플한 룰을 따릅니다.

// 오브젝트는 true 로 평가
// undefined 는 false
// null false
// 수치는 true, 0,NaN 은 false
// 문자열은 true, 빈문자는 false

// 복수행의 블록에는 중괄호를 사용해주십시오

// if(test) {
//     feaf
// } else {
//     feaf
// }

// comments
// 복수행의 코멘트는 /**  */  를 사용


/**
 * 
 * feklajflka
 * fkleajflka
 * @param {String} tag
 * @return {Element} element
 */

// if (test) {

// }

// function test() {

// }

// const x = y + 5;

// 형변환과 강제

// String(12);

// Number 로 형변환 하는 경우 parseInt 를 이용하고 형변환을 위한 기수를 인수로 넘겨주십시오

// log(parseInt('123456789',10));
// 또는 Number('123456')

// private 프로퍼티명은 선두에 _ 를 사용해 주십시오

// this._firstName = 'Panda';
// this 의 참조를 보존하는것은 피해주십시오. arrow 함수나 Funcgion bind 를 이용해 주십시오

function foo() {
    this.a = '123';
    const self = this;
    return function() {
        log(self);
    }
}

foo();

// isVal();
// hasVal();

$(this).trigger('listingUpdated', {listingId: listing.id});

$(this).on('listingUpdated', function(e,data) {
    
});

// Jquery 오브젝트의 변수에는 선두에 $ 를 부여해 주십시오
// const $sidebar = $('.sidebar');

// Jquery 의 검색결과를 캐시해 주십시오
function setSidebar() {
    const $sidebar = $('.sidebar');
    $sidebar.hide();
    $sidebar.css({
        'background-color' : 'pink',
    });
}

