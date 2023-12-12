// 참고로 ES 모듈에서는 __filename 과 __dirname 을 사용할 수 없습니다.
// 대신 import.metal.url 로 경로를 가져올 수 있습니다.

console.log(import.meta.url);
console.log(__filename); // error

// CommonJS 모듈에서 사용했던 require 함수나 module 객체는 따로 선언하지 않았음에도 사용할 수 있었습니다.
// 이것이 어떻게 가능할까요?
// 바로 노드에서 기본적으로 제공하는 내장 객체이기 때문입니다.
// 다음 절에서는 내장 객체를 자세히 알아보겠습니다.