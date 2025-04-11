// Ctrl + Alt + N : 실행

const log = console.log;

// 에러 처리의 필요성

// try {
//     test();
// } catch(e) {
//     log(e.message);
//     log(e.stack);
// } finally {
//     log('finally');
// }

// Error 객체
// Error 생성자 함수는 에러 객체를 생성한다.
// Error 생성자 함수에는 에러를 상세히 설명하는 에러 메시지를 인수로 전달할 수 있다.

// const error = new Error('invalid');
// log(error.message);
// log(error.stack);

// Error 생성자 함수가 생성한 에러 객체는 message 프로퍼티와 stack 프로퍼티를 갖는다.
// message 프로퍼티의 값은 Error 생성자 함수에 인수로 전달한 에러 메시지이고
// stack 프로퍼티의 값은 에러를 발생시킨 콜스택의 호출 정보를 나타내는 문자열이며 디버깅 목적으로 사용한다.

// 자바스크립트는 Error 생성자 함수를 포함해 7가지의 에러 객체를 생성할 수 있는 Error 생성자 함수를 제공한다.
// 프로토타입은 모두 Error.prototype 을 상속받는다.

// Error : 일반적 에러 객체
// SyntaxError : 자바스크립트 문법에 맞지 않는 문을 해석할 때 발생하는 에러 객체
// ReferenceError : 참조할 수 없는 식별자를 참조했을 때 발생하는 에러 객체
// TypeError : 피연산자 또는 인수의 데이터 타입이 유효하지 않을 때 발생하는 에러 객체
// RangeError : 숫자값의 허용 범위를 벗어났을 때 발생하는 에러 객체
// URIError : encodeURI 또는 decodeURI 함수에 부적절한 인수를 전달했을 때 발생하는 에러 객체
// EvalError : eval 함수에서 발생하는 에러 객체

// throw 문

// Error 생성자 함수로 에러 객체를 생성하고 에러가 발생하는 것은 아니다.
// 즉 에러 객체 생성과 에러 발생은 의미가 다르다.
// 에러를 발생시키려면 throw 문으로 에러 객체를 던져야 한다.

// throw 문의 표현식은 어떤 값이라도 상과없지만 일반적으로 에러 객체를 지정한다.
// 에러를 던지면 catch 문의 에러 변수가 생성되고 던져진 에러 객체가 할당된다.
// 그리고 catch 코드 블록이 실행되기 시작한다.

// const repeat = (n,f) => {
//     if(typeof f !== 'function') throw new TypeError('f must be a function');
//     for(let i=0; i<n; i++) {
//         f(i);
//     }
// };

// try {
//     repeat(2,1);
// } catch(e) {
//     log(e);
// }

// 에러의 전파

const func1 = () => {
    throw new Error('error');
}

const func2 = () => {
    try {
        func1();
    } catch(e) {
        log(2);
        log(e);
    }
}

const func3 = () => {
    func2();
}

try {
    func3();
} catch(e) {
    log(1);
    log(e);
}

// 에러는 호출자 방향으로 전파된다.
// 즉 콜 스택의 아래 방향으로 전파된다.

// throw 된 에러를 캐치하지 않으면 호출자 방향으로 전파된다.
// throw 된 에러를 캐치하여 적절히 대응하면 프로그램을 강제 종료시키지 않고 코드의 실행 흐름을 복구할 수 있다.
// throw 된 에러를 어디에서도 캐치하지 않으면 프로그램은 강제 종료된다. -> 결국 에러 전파의 끝은 전역 실행 컨텍스트 이기 때문에
// 주의할 것은 비동기 함수인 setTimeout 이나 프로미스 후속 처리 메서드의 콜백 함수는 호출자가 없다는 것이다.
// setTImeout 이나 프로미스 후속 처리 메서드의 콟3ㅐㄱ 함수는 태스크 큐나 마이크로태스크 큐에 일시 저장되었다가 콜 스택이 비면 이벤트 루프에 의해 콜 스택으로 푸시되어 실행된다.
// 이때 콜 스택에 푸시된 콜백 함수의 실행 컨텍스트는 콜 스택의 가장 하부에 존재하게 된다.
// 따라서 에러를 전파할 호출자가 존재하지 않는다.

