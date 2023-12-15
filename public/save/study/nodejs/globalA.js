// 노드에서는 기본적인 내장 객체와 내장 모듈을 제공합니다.
// 내장 객체와 내장 모듈은 따로 설치하지 않아도 바로 사용할 수 있으며, 브라우저의 windows 객체와 비슷하다고 보면 됩니다.

// global
// 먼저 global 객체입니다.
// 브라우저의 window 와 같은 전역 객체이며, 전역 객체이므로 모든 파일에서 접근할 수 있습니다.
// 또한 window.open 메서드를 그냥 open 으로 호출할 수 있는것처럼 global 도 생략할 수 있습니다.

// 이전 절에서 사용했던 require 함수도 global.require 에서 global 이 생략된 것입니다.
// 노드 콘솔에 로그를 기록하는 console 객체도 원래는 global.console 입니다.

// global 객체 내부에는 매우 많은 속성이 들어 있습니다.

// winow,document 객체와 globalThis
// 노드에는 DOM 이나 BOM 이 없어 window 와 document 객체를 노드에서 사용할 수 없습니다.
// 노드에서 window 또는 document 를 사용하면 에러가 발생합니다.

// 따라서 이 둘을 아우르는 globalThis 객체가 만들어졌습니다.
// 브라우저 환경에서는 globalThis 가 저절로 window 가 되고, 노드에서는 globalThis 가 저절로 global 이 됩니다.

module.exports = () => global.message;