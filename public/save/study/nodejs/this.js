// 노드에서 this 는 무엇일까요?
// 노드에서의 this 는 브라우저의 this 와 조금 다릅니다.

console.log(this);
console.log(this === module.exports);
console.log(this === exports);

function whatIsThis() {
    console.log('function', this === exports, this === global);
}

whatIsThis();

// 다른 부분의 브라우저의 자바스크립트와 동일하지만
// 최상위 스코프에 존재하는 this 는 module.exports 또는 exports 객체를 가리킵니다.
// 또한 함수 선언문 내부의 this 는 global 객체를 가리킵니다.