// Ctrl + Alt + N : 실행

let arr = ['1','2'];
let [a,b] = arr;
console.log(a,b);

// 인덱스를 이용해 배열에 접근하지 않고도 변수로 이름과 성을 사용할 수 있게 되었습니다.

// 분해는 파괴를 의미하지 않습니다.
// 구조분해할당이란 명칭은 어떤 것을 복사한 이후에 변수로 분해 해준다는 의미 땜누에 붙여졌습니다.
// 이 과정에서 분해 대상은 수정 또는 파괴되지 않습니다.


let arr2 = [{a:1},{b:2}];
let [c,d] = arr2;
c.c = 3;
console.log(c,d);
console.log(arr2);

let [e,,f] = [1,2,3];
console.log(e,f);

// 할당 연산자 우측엔 모든 이터러블이 올 수 있습니다.

let [a,b,c] = 'abc';
console.log(a,b,c);

let [a,b,c] = new Set([1,2,3]);
console.log(a,b,c);


let obj = {
    a: 1,
    b: 2,
    c: 3
};

for(let [key,value] of Object.entries(obj)) console.log(key, value);

let map = new Map();
map.set('a',1);
map.set('b',1);
map.set('c',1);

for(let [key,value] of map) console.log(key,value);


// 변수 교환 트릭

let a = 1;
let b = 2;

[a,b] = [b,a];

console.log(a,b);

// ... 로 나머지 요소 가져오기

let [a,b,...c] = [1,2,3,4,5];
console.log(a,b,c);

// 할당값이 없으면 undefined 취급
// = 를 이용하면 할당할 값이 없을 때 기본으로 할당해 줄 값인 기본값을 설정할 수 있습니다.

let [a,b=2] = [1];
console.log(a,b);


// 객체 분해하기

let obj = {
    a:1,
    b:2,
    c:3
};

let {c,b,a} = obj;
let {d} = obj;

console.log(a,b,c);
console.log(d);

// 순서는 중요하지 않음

let obj = {
    a:1,
    b:2,
    c:3
};
let {a: d, b: e, c: f} = obj;
console.log(d,e,f);


// 나머지 패턴 ...

// 지금까진 할당 연산지 let {...} = {...} 안에서 변수들을 선언하였습니다.
// let 으로 새로운 변수를 선언하지 않고 기존에 있던 변수에 분해한 값을 할당할 수도 있는데
// 이때는 주의할 점이 있습니다.

let a,b,c;
{a,b,c} = {a:1,b:2,c:3};
console.log(a,b,c);

// 자바스크립트는 표현식 안에 있지 않으면서 주요 코드 흐름 상에 있는 {...} 를 코드 블록으로 인식합니다.
// 코드블록의 본래 용도는 문으로 묶는 것입니다.

// 위쪽 예시에선 구조 분해 할당을 위해 사용한 {...} 를 자바스크립트가 코드 블록으로 인식해서 에러가 발생하였습니다.
// 에러를 해결하려면 할당문을 (...) 로 감싸 자바스크립트가 {...} 를 코드블록이 아닌 표현식으로 해석하게 하면 됩니다.

let a,b,c;
({a,b,c} = {a:1,b:2,c:3});
console.log(a,b,c);

// 중첩 구조 분해

// 객체나 배열이 다른 객체나 배열을 포함하는 경우, 좀 더 복잡한 패턴을 사용하면 중첩 배열이나 객체의 정보를 추출할 수 있습니다.
// 이를 중첩 구조 분해라고 부릅니다.

let a = 1;
let b = a;
b = 2;
console.log(a,b);

let a = 1n;
let b = 2n;
console.log(a+b);

// BigInt
// BigInt 형은 표준으로 채택된 지 얼마 안 된 자료형으로, 길이에 상관없이 정수를 나타낼 수 있습니다.
// BigInt 형 값은 정수 리터럴 끝에 n 을 붙이면 만들 수 있습니다.

// IE 에서 지원하지 않을수있음


const arr = [1,2,3];
arr.push(4);
console.log(arr);


const obj = {a:1,b:2};
obj.c = 3;
obj = {...obj, ...{c:3}};
console.log(obj);