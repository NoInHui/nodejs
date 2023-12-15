// search 부분(쿼리스트링) 은 보통 주소를 통해 데이터를 전달할 때 사용됩니다.
// search 는 ? 로 시작하고 그 뒤에 키=값 형식으로 데이터를 전달합니다.
// 여러 키가 있을 경우에는 & 로 구분합니다.
// search 부분을 다루기 위해 searchParams 라는 특수한 객체가 생성됩니다.

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=javascript');

console.log(myURL.searchParams);

myURL.searchParams.append('filter', 'es3');
myURL.searchParams.append('filter', 'es5');
// myURL.searchParams.set('filter', 'es6')

console.log(myURL.searchParams.getAll('filter'));
console.log(myURL.searchParams.getAll('category'));
console.log(myURL.searchParams.get('limit'));
console.log(myURL.searchParams.has('page'));

console.log(myURL.searchParams.keys());
console.log(myURL.searchParams.values());

console.log(myURL.searchParams.toString());