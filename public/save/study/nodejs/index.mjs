import {odd, even} from './var.mjs';
import checkNumber from './func.mjs';

function checkStringOddOrEven(str) {
    if(str.length%2) {
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));

// require 와 exports, module.exports 가 각각 import, export, export default 로 바뀌었습니다.
// 상당한 부분에서 차이가 있으므로 단순히 글자만 바꿔서는 제대로 동작하지 않을 수 있습니다.
// ES 모듈의 import 나 export default 는 require 나 module 처럼 함수나 객체가 아니라 문법 그 자체입니다.

// 파일도 js 대신 mjs 확장자로 변경되었습니다.
// js 확장자에서 import 를 사용하면 Syntax 에러가 발생합니다.
// mjs 확장자 대신 js 확장자를 사용하면서 ES 모듈을 사용하려면 package.json 에 type : "module" 속성을 넣으면 됩니다.

// CommonJS 모듈과는 다르게 import 시 파일 경로에서 js, mjs 같은 확장자는 생략할 수 없습니다.
// 또한 폴더 내부에서 index.js 도 생략할 수 없습니다.

