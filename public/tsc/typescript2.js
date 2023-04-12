"use strict";
// cd C:\Users\inhui\Documents\GitHub\nodejs\public\typescript
// tsc typescript2.ts
function func5(param) {
    return param;
}
console.log(func5({ label: '123' }));
// console.log(func5({label: '123', label2: 123}));
let param1 = { label: '123', label2: 123 };
console.log(func5(param1));
let param2 = { label2: 123 };
let obj3 = {
    a: '123',
    c: [1, 2, 3], // c 는 반드시 있어야함
};
let obj4 = {
    a: 'test1',
    b: 123,
    c: 'test2'
};
// obj4.a = 'test3'; 
// typescript 에서는 모든 변경 메서드가 제거된 Array<T> 와 동일한 ReadonlyArray<T> 타입을 제공합니다.
let arr5 = ['1', '2'];
// 타입 단언(type assertion)으로 오버라이드 하는 것은 가능합니다.
let arr6 = arr5;
arr6[0] = '3';
arr6[1] = '1';
let func6 = function (param1, param2) {
    return false;
};
// 올바른 함수 타입 검사를 위해, 매개변수의 이름이 같을 필요는 없습니다.
// 함수 매개변수들은 같은 위치에 대응되는 매개변수끼리 한번에 하나씩 검사합니다.
// interface4 타입의 변수로 직접 함수 값이 할당되었기 때문에 typescript의 문맥상 타이핑이 인수 타입을 추론할 수 있습니다.
let func7 = function (param1, param2) {
    // param1 = 123; // error
    return true;
};
class class1 {
    setTime(d) {
        this.currentTime = d;
    }
    constructor(h, m) {
        this.currentTime = new Date();
    }
}
let obj5 = {
    a: 'test',
    b: 123,
    c: true,
};
function func8() {
    let counter = (function (start) { });
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let obj6 = func8();
