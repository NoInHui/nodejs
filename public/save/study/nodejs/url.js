// url

// 인터넷 주소를 쉽게 조작하도록 도와주는 모듈입니다.
// url 처리에는 크게 두 가지 방식이 있습니다.

// 하나는 노드 버전 7에서 추가된 WHATWG(웹 표준을 정하는 단체의 이름) 방식의 url 이고
// 다른 하나는 예전부터 노드에서 사용하던 방식의 url 입니다.

// 요즘은 WHATWG 방식만 사용합니다.
// 브라우저에서도 WHATWG 방식을 사용하므로 호환성이 좋습니다.

// WHATWG 와 노드의 주소 체계
// https: // user : pass @ sub.host.com: 8080 /p/a/t/h ? query=string #hash

const url = require('url');
const {URL} = url;

const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log(myURL);
console.log(url.format(myURL));

// url 모듈 안에 URL 생성자가 있습니다.
// 참고로 URL 은 노드 내장 객체이기도 해서 require 할 필요는 없습니다.
// 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리됩니다.
// 이 방식이 WHATWG 의 url 입니다.
// username, password, origin, searchParams 속성이 존재합니다.

// url.format(객체) : 분해되었던 url 객체를 다시 원래 상태로 조립합니다.

// 주소가 host 부분 없이 pathname 부분만 오는 경우 (예: /book/bookList.aspx) WHATWG 방식은 이 주소를 처리할 수 없습니다.
// 이럴 때는 new URL('/book/bookList.aspx', 'http://www.gilbut.co.kr') 처럼 두번째 인수에 host 를 적어줘야 합니다.



