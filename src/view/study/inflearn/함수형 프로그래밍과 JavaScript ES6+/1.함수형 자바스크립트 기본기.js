// Ctrl + Alt + N : 실행

// 평가
// 코드가 계산되어 값을 만드는것

// 일급
// 값으로 다룰 수 있다.
// 변수에 담을 수 있다.
// 함수의 인자로 사용될 수 있다.
// 함수의 결과로 사용될 수 있다.

// 일급 함수
// 함수를 값으로 다룰 수 있다.
// 조합성과 추상화의 도구

const add = a => a+5;
console.log(add(5));
const f1 = () => () => 1;
const f2 = f1();
console.log(f2());

// 고차 참수
// 함수를 값으로 다루는 함수

// 함수를 인자로 받아서 실행하는 함수
const apply = f => f(1);
const add = a => a+2;
console.log(apply(add));
console.log(apply(a => a-1));

const times = (f,n) => {
    let i = -1;
    while(++i < n) f(i);
}

times(console.log, 3);
times(a => console.log(a+10), 3);

// 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)
const addMaker = a => b => a+b;
const add10 = addMaker(10);
console.log(add10(10));
console.log(add10(5));
