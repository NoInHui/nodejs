// Ctrl + Alt + N : 실행
const log = console.log;

// 정규 표현식

// 정규 표현식은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어다.

const tel = '010-2234-0527';
const regExp = /^\d{3}-\d{4}-\d{4}$/;

log(regExp.test(tel));

let a = 'Is this all there is?';
let r1 = /is/i;

log(r1.test(a));

let r2 = new RegExp(/is/i);

log(r2.test(a));

const count = (s,c) = (s.match(new RegExp(c,'gi')) ?? []).length;

log(count('is this all there is?','is'));