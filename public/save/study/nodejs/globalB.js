const A = require('./globalA');

global.message = '안녕하세요';

console.log(A());

// globalA 모듈의 함수는 global.message 값을 반환합니다.
// globalB.js 에서는 global 객체에 속성명이 message 인 값을 대입하고 globalA 모듈의 함수를 호출합니다.
// 콘솔 결과를 보면 globalB 에서 넣은 global.message 값을 globalA 에서도 접근할 수 있음을 알 수 있습니다.

// global 객체의 남용
// global 객체의 속성에 값을 대입해 파일 간에 데이터를 공유할 수 있지만, 이를 남용하지는 마세요.
// 프로그램의 규모가 커질수록 어떤 파일에서 global 객체에 값을 대입했는지 찾기 힘들어 유지보수에 어려움을 겪게 되기 때문입니다.
// 다른 파일의 값을 사용하고 싶다면 모듈 형식으로 만든 후 명시적으로 값을 불러와서 사용하는 것이 좋습니다.