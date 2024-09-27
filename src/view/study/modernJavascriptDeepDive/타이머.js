// Ctrl + Alt + N : 실행

// 자바스크립트 엔진은 단 하나의 실행 컨텍스트를 갖기 때문에 두 가지 이상의 테스크를 동시에 실행할 수 없다.
// 자바스크립트 엔진은 싱글 스레드로 동작한다.
// 이런 이유로 타이머 함수 setTimeout 과 setInterval 은 비동기 처리 방식으로 동작한다.

const timerId = setTimeout((name, phrase) => console.log(`${name} ${phrase}`), 2000, 'inhui', 'hello');
clearInterval(timerId);

let count = 0;
const timerId2 = setInterval((a,b) => {
    if(count++ > 1) clearInterval(timerId2);
    else console.log(`${a} ${b}`);
}, 1000, 'inhui', 'hello');
