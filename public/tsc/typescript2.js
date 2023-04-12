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
// readonly VS const
// 변수는 const 를 사용하고, 프로퍼티는 readonly 를 사용합니다.
