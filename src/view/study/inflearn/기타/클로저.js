// Ctrl + Alt + N : 실행
const log = console.log;

// 클로저는 자바스크립트 고유의 개념이 아니다.
// 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어(하스켈,리스프,얼랭,스칼라 등)에서 사용되는 중요한 특성이다.

// 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

// const x = 1;

// function outerFunc() {
//     const x = 10;
//     innerFunc();
// }

// function innerFunc() {
//     log(x);
// }

// outerFunc();

// 자바스크립트가 렉시컬 스코프를 따르는 프로그래밍 언어이기 때문이다.

// 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정한다.
// 이를 렉시컬 스코프(정적 스코프)라 한다.


const counter = function() {
    let num = 0;
    
    return {
        increase() {
            return ++num;
        },
        decrease() {
            return --num;
        }
    }
}();

log(counter.increase());
log(counter.increase());
log(counter.increase());
log(counter.decrease());
log(counter.decrease());
log(counter.decrease());
log(counter.decrease());

// 위 코드는 잘 동작하지만 오류를 발생시킬 가능성을 내포하고 있는 좋지 않은 코드다.
