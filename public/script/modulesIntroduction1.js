// 모듈 소개

// 개발하는 애플리케이션의 크기가 커지면 언젠가 파일을 여러 개로 분리해야 하는 시점이 옵니다.
// 이때 분리된 파일 각각을 '모듈(module)' 이라고 부르는데, 모듈은 대개 클래스 하나 혹은 특정한 목적을 가진 복수의 함수로 구성된 라이브러리 하나로 구성됩니다.

// 자바스크립트가 만들어진 지 얼마 안 되었을 때는 자바스크립트로 만든 스크립트의 크기도 작고 기능도 단순했기 때문에 자바스크립트는 긴 세월 동안 모듈 관련 표준 문법 없이 성장할 수 있었습니다.
// 새로운 문법을 만들 필요가 없었던 것이죠.

// 그런데 스크립트의 크기가 점차 커지고 기능도 복잡해지자 자바스크립트 커뮤니티는 특별한 라이브러리를 만들어 필요한 모듈을 언제든지 불러올 수 있게 해준다거나 코드를 모듈 단위로 구성해 주는 방법을 만드는 등 다양한 시도를 하게 됩니다.

// 그 시도는 다음과 같은 모듈 시스템으로 이어졌습니다.ㅣ

// AMD - 가장 오래된 모듈 시스템 중 하나로 require.js 라는 라이브러리를 통해 처음 개발되었습니다.
// CommonJS - Node.js 서버를 위해 만들어진 모듈 시스템입니다.
// UMD - AMD 와 CommonJS 와 같은 다양한 모듈 시스템을 함께 사용하기 위해 만들어졌습니다.

// 이런 모듈 시스템은 오래된 스크립트에서 여전히 발견할 수 있는데, 이제는 역사의 뒤안길로 사라져가고 있습니다.

// 모듈 시스템은 2015년에 표준으로 등재되었습니다.
// 이 이후로 관련 문법은 진화를 거듭해 이제는 대부분의 주요 브라우저와 Node.js 가 모듈 시스템을 지원하고 있습니다.
// 이제 본격적으로 모던 자바스크립트에서 쓰이는 모듈에 대해 알아봅시다.


// 모듈이란

// 모듈은 단지 파일 하나에 불과합니다.
// 스크립트 하나는 모듈 하나입니다.

// 모듈에 특수한 지시자 export 와 import 를 적용하면 다른 모듈을 불러와 불러온 모듈에 있는 함수를 호출하는것과 같은 기능 공유가 가능합니다.
// export 지시자를 변수나 함수 앞에 붙이면 외부 모듈에서 해당 변수나 함수에 접근할 수 있습니다. (모듈 내보내기)
// import 지시자를 사용하면 외부 모듈의 기능을 가져올 수 있습니다. (모듈 가져오기)

// export 지시자를 사용해 파일 내부의 함수를 외부로 내보내 봅시다.

export function func1(user) {
    console.log('func1', user);
}