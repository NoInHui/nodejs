// const a = false;
// if(a) {
//     import './func.mjs';
// }
// console.log('성공');

// 하지만 ES 모듈은 if 문 안에서 import 하는 것이 불가능합니다.
// 이럴 때 다이내믹 임포트를 사용합니다.

const a = true;
if(a) {
    const m1 = await import('./func.mjs');
    console.log(m1);
    const m2 = await import('./var.mjs');
    console.log(m2);
}

// import 라는 함수를 사용해 모듈을 동적으로 불러올 수 있습니다.
// import 는 Promise 를 반환하기에 await 이나 then 을 붙여야 합니다.
// 위 코드에서는 async 함수를 사용하지 않았는데 ES 모듈의 최상위 스코프에서는 async 함수 없이도 await 할 수 있습니다.
// CommonJS 모듈에서는 안 됩니다.

// 결과값도 눈여겨볼 필요가 있습니다.
// export default 의 경우 import 할 때도 default 라는 속성 이름으로 import 됩니다.
// CommonJS 모듈에서 module.exports 한 것도 default 라는 이름으로 import 됩니다.

