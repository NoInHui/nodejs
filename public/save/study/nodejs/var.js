// const odd = 'CJS 홀수입니다.';
// const even = 'CJS 짝수입니다.';

// module.exports = {
//     odd,
//     even,
// };

exports.odd = 'CJS 홀수입니다.';
exports.even = 'CJS 짝수입니다.';

// module.exports 에 변수들을 담은 객체를 대입했습니다.
// 이제 이 파일은 모듈로서 가능합니다.
// 변수들을 모아둔 모듈이 되는 것이죠.
// 다른 파일에서 이 파일을 불러오면 module.exports 에 대입된 값을 사용할 수 있습니다.

// module.exports 로 한 번에 대입하는 대신, 각각의 변수를 exports 객체에 하나씩 넣었습니다.
// 동일하게 동작하는 이유는 module.exports 와 exports 가 같은 객체를 참조하기 때무닝빈다.
// console.log(module.exports === exports); // true
// 따라서 exports 객체에 add 함수를 넣으면 module.exports 에도 add 함수가 들어갑니다.

// exports 객체 사용 시 유의 사항
// exports 객체를 사용할 때는 module.exports 와의 참조 관계가 깨지지 않도록 주의해야 합니다.
// module.exports 에는 어떤 값이든 대입해도 되지만, exports 에는 반드시 객체처럼 속석명과 속성값을 대입해야 합니다.
// exports 에 다른 값을 대입하면 객체의 참조 관계가 끊겨 더는 모듈로 기능하지 않습니다.
// exports 를 사용할 때는 객체만 사용할 수 있으므로 func.js 와 같이 module.exports 에 함수를 대입한 경우에는 exports 로 바꿀 수 없습니다.
// exports 와 module.exports 에는 참조 관계가 있으므로 한 모듈에 exports 객체와 module.exports 를 동시에 사용하지 않는 것이 좋습니다.

