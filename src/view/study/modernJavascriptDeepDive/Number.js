// Ctrl + Alt + N : 실행
const log = console.log;

// log(0.1+0.2);
// log(0.1+0.2 === 0.3);

// log(Number.EPSILON);
// Number.EPSILON 은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다.

// const isEqual = (a,b) => Math.abs(a-b) < Number.EPSILON;
// log(isEqual(0.1+0.2, 0.3));

// log(Number.MAX_VALUE);

// log(Number.MIN_VALUE);

// log(Number.MAX_SAFE_INTEGER);

// log(Number.MIN_SAFE_INTEGER);

// log(Number.POSITIVE_INFINITY);

// log(Number.NEGATIVE_INFINITY);

// log(Number.NaN);
// Number.NaN 은 숫자가 아님 Not a Number 을 나타내는 숫자값, window.NaN 과 같다.

// Number 메서드

// Number.isFinite()
// Number.isInteger()
// Number.isNaN()

log(isNaN('2'))
log(Number.isNaN('2'))