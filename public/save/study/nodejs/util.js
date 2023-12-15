// utils

// utils 이라는 이름처럼 각종 편의 기능을 모아둔 모듈입니다.
// 계속해서 API 가 추가되고 있으며, 가끔 deprecated 되어 사라지는 경우도 있습니다.

// deprecated : 프로그래밍 용어로, 중요도가 떨어져 더 이상 사용되지 않고 앞으로 사라지게 될

const util = require('util');
const crypto = require('crypto');

const randomBytesPormise = util.promisify(crypto.randomBytes);
randomBytesPormise(64).then(buf => {
    console.log(buf.toString('base64'));
}).catch(error => {
    console.log(error);
});

// util.promisfy : 콜백 패턴을 프로미스 패턴으로 바꿉니다.
// 바꿀 함수를 인수로 제공하면 됩니다.



