// Ctrl + Alt + N : 실행
const log = console.log;

// 심볼 이란?

// 1977년 자바스크립트가 ECMAScript 로 표준화된 이래로 자바스크립트에는 6개의 타입 즉, 문자열,숫자,불리언,undefined,null,객체 타입이 있었다.

// 심볼은 ES6 에서 도입된 7번째 데이터 타입으로 변경 불가능한 원시 타입의 값이다.

// 심벌 값은 다른 값과 중복되지 않는 유일무이한 값이다.

// 따라서 주로 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용한다.

// 심볼 값 생성

// 심볼 값은 Symbol 함수를 호출하여 생성한다.
// 다른 원시값, 즉 문자열 숫자 불리언 undefined null 타입의 값은 리터럴 표기법을 통해 값을 생성할 수 있지만
// 심벌 값은 Symbol 함수를 호출하여 생성해야 한다.

// 이때 생성된 심벌 값은 외부로 노출되지 않아 확인할 수 없으며
// 다른 값과 절대 중복되지 않는 유일무이한 값이다.




// 이터러블 프로토콜 iterable protocol
// Well-known Symbol 인 Symbol.iterator 를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속 받은 Symbol.itertator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
// 이러한 규약을 이터러블 프로토콜이라 하며 이터러블 프로토콜을 준수한 객체를 이터러블이라 한다.
// 이터러블은 for..of 문으로 순회할 수 있으며 스프레드 문법과 배열 ㄷ ㅣ스트럭처링 할당의 대상으로 사용할 수 있다.

// 이터레이터 프로토콜 iterator protocol
// 이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
// 이너테리터는 next 메서드를 소유하며 next 메서드를 호출하면 이터러블을 순회하며 value 와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.
// 이러한 규약을 이터레이터 프로토콜이라 하며, 이터레이터 프로토콜을 준수한 객체를 이터레이터 라 한다.
// 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 한다.

// const isIterable = v => (v ?? null !== null) && typeof v[Symbol.iterator] === 'function';

// log(isIterable([]));
// log(isIterable('test'));
// log(isIterable(new Map()));
// log(isIterable(new Set()));
// log(isIterable({}));
// log(isIterable(123));

// // 예를 들어 배열은 Array.prototype 의 Symbol.iterator 메서드를 상속받은 이터러블이다.

// const arr = [1,2,3];
// log(arr[Symbol.iterator])
// let iter = arr[Symbol.iterator]();
// log(iter)
// log(iter.next())

// log(iter.next())
// log(iter.next())
// log(iter.next())

// const obj = {a:1, b:2};
// log({...obj})

// 빌트인 이터러블
// 자바스크립트는 이터레이션 프로토콜을 준수한 객체인 빌트인 이터러블을 제공한다.
// 다음의 표준 빌트인 객체들의 빌트인 인터러블이다.

// Array, String, Map, Set, TypedArray, arguments, NodeList, HTMLCollection

// for ..of 문은 이터러블을 순회하면서 이터러블의 요소를 변수에 할당한다.
// for ..of 문은 for ..in 문의 형식과 매우 유사하다.

// for ..in 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트의 값이 true 인 프로터리를 순회하여 열거 한다.
// 이때 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.

// for ..of 문은 내부적 으로 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for.. of 문의 변수에 할당한다.


// 이터러블과 유사배열객체
// 유사배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다.
// 유사배열 객체는 length 프로퍼티를 갖기 때문에 for 문으로 순회할 수 있고 인덱스를 나타내는 숫자형식의 문자열을 프로퍼티 키로 가지므로 마치 배열 처럼 인덱스로 프로퍼티 값에 접근할 수 있다.

// let arraylike = {
//     0:1,
//     1:2,
//     2:3,
//     length:3
// };

// for(let i=0;i<arraylike.length;i++) log(arraylike[i]);

// 유사배열 객체는 이터러블이 아닌 일반 객체이다.
// 따라서 유사 배열 객체에는 Symbol.iterator 메서드가 없기 때문에 for..of 문으로 순회할 수 없다.

// for(let item of arraylike) log(item)

// 단 arguments, NodeList, HTMLCollection 은 유사배열객체 이면서 이터러블이다.
// 정확히 말하면 ES6 에서 이터러블이 도입되면서 유사배열객체인 arguments, NodeList, HTMLCollection 객체에 Symbol.iterator 메서드를 구현하여 이터러블이 되었다.
// 하지만 이터러블이 된 이후에도 length 프로퍼티를 가지며 인덱스로 접근할 수 있는 것에는 변함이 없으므로 유사 배열 객체이면서 이터러블인것이다.

// 배열도 마찬가지로 ES6 에서 이터러블이 도입되면서 Symbol.iterator 메서드를 구현하여 이터러블이 되었다.
// 하지만 모든 유사 배열 객체가 이터러블인 것은 아니다.


// 이터레이션 프로토콜의 필요성

// for..of 문, 스프레드 문법, 배열 디스트럭처링 할당등은 
// dkvtj djsrmqgoTwlaks 

// const list = ...[1,2,3];
// const list = [...[1,2,3]];
// log(list);


let arr2 = [1,2].concat(3,4);
log(arr2)

let arr3 = [...[1,2],...[3,4]];
log(arr3);



