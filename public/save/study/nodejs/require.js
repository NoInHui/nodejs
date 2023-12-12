// 이번에는 모듈을 불러오는 require 에 대해 알아봅시다.
// require 는 함수이고, 함수는 객체이므로 require 는 객체로서 속성을 몆 개 갖고 있습니다.
// 그 중에 require.cache 와 require.main 을 알아보겠습니다.

console.log('require 가 가장 위에 오지 않아도 됩니다.');

module.exports = '저를 차장보세요';

require('./var');

console.log('require.cache', require.cache);
console.log('require.main', require.main);
console.log('require.main.filename', require.main.filename);

// 위 예제에서 알아야 할 점은 require 가 반드시 파일 최상단에 위치할 필요가 없고
// module.exports 도 최 하단에 위치할  필요가 없다는 것입니다.
// 아무 곳에서나 사용해도 됩니다.

// require.cache 객체에 require.js 나 var.js 같은 파일 이름이 속성명으로 들어 있는 것을 볼 수 있습니다.
// 속성값으로는 각 파일의 모듈객체가 들어 있습니다.

// 한번 require 한 파일은 require.cache 에 저장되므로 다음 번에 require 할 때는 새로 불러오지 않고 require.cache 에 있는 것이 재사용됩니다.

// 만약 새로 require 하길 원한다면 require.cache 의 속성을 제거하면 됩니다.
// 다만, 프로그램의 동작이 꼬일 수 있으므로 권장하지는 않습니다.
// 속성을 자세히 살펴보면 module.exports 했던 부분이나 로딩 여부, 자식 모듈 관계를 찾을 수 있습니다.

// require.main 은 노드 실행 시 첫 모듈을 가리킵니다.
// 현재 node require 로 실행했으므로 require.js 가 require.main 이 됩니다.
// require.main 객체의 모양은 require.cache 의 모듈 객체와 같ㅅ브니다.
// 현재 파일이 첫 모듈인지 알아보려면 require.main === module 을 해보면 됩니다.
// node require 로 실행한 경우, var.js 에서 require.main === module 을 실행하면 false 가 반환될 것입니다.
// 첫 모듈의 이름을 알아보려면 require.main.filename 으로 확인하면 됩니다.


