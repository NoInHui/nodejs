// path

// 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈입니다.
// path 모듈이 필요한 이유 중 하나는 운영체제별로 경로 구분자가 다르기 때문입니다.

// 크게 윈도 타입과 POSIX 타입으로 구분됩니다.
// POSIX 는 유닉스 기반의 운영체제들로 맥과 리눅스가 속해 있습니다.

const path = require('path');

console.log(__filename);
console.log(path.sep);
console.log(path.delimiter);

console.log(path.dirname(__filename));
console.log(path.extname(__filename));