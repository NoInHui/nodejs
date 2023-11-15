// Ctrl + Alt + N -> 실행

// 비동기 프로그래밍

const foo = () => console.log('foo');
const bar = () => console.log('bar');

foo();
bar();

// 자바스크립트 엔진은 단 하나의 실행 컨텍스트를 갖는다.
// 이난 함수가 실행할 수 있는 창구가 단 하나이며, 동시에 2개 이상의 함수를 동시에 실행할 수 없다는 것을 의미한다.
// 실행 컨텍스트 스택의 최상위 요소인 "실행 중인 실행 컨텍스트"를 제외한 모든 실행 컨텍스트는 모두 실행 대기 중인 태스크들이다.
// 대기 중인 태스크들은 현재 실행 중인 실행 컨텍스트가 팝되어 실행 컨텍스트 스택에서 제외되면, 다시 말해 현재 실행 중인 함수가 종료되면 비로소 실행되기 시작한다.

// 이처럼 자바스크립트 엔진은 한 번에 하나의 태스크만 실행할 수 있는 싱글 스레트 방식으로 동작한다.
// 싱글 스레드 방식은 한 번에 하나의 태스크만 실행할 수 있기 때문에 처리에 시간이 걸리는 태스크를 실행하는 경우 블로킹(작업중단) 이 발생한다.

function sleep(func, delay) {
    const delayUtil = Date.now() + delay;
    while(Date.now() < delayUtil);

    func();
}

const foo = () => console.log('foo');
const bar = () => console.log('bar');

sleep(foo, 3000);
bar();

// 위 예제의 sleep 함수는 3초 후 foo 함수를 호출한다.
// 이때 bar 함수는 sleep 함수의 실행이 종료된 이후에 호출되므로 3초 이상 호출되지 못하고 블로킹된다.

// 이처럼 현재 실행 중인 태스크가 종료할 때까지 다음 실행될 태스크가 대기하는 방식을 동기(synchornous)처리 라고한다.
// 동기 처리 방식은 태스크를 순서대로 하나씩 처리하므로 실행 순서가 보장된다는 장점이 있지만, 앞선 태스크가 종료할 때까지 이후 태스크들이 블로킹되는 단점이 있다.

// 위 예제를 타이머 함수인 setTimeout 을 사용하여 수정해 보자

const foo = () => console.log('foo');
const bar = () => console.log('bar');

setTimeout(foo, 3000);
bar();

// setTimeout 함수는 앞서 살펴본 sleep 함수와 유사하게 일정 시간이 경과한 이후에 콜백 함수를 호출하지만
// setTimeout 함수 이후의 태스크를 블로킹하지 않고 곧바로 실행한다.

// 이처럼 현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방식을 비동기(asynchronous)처리 라고한다.

// 동기 처리 방식은 태스크를 순서대로 하나씩 처리하므로 실행 순서가 보장된다는 장점이 있지만, 앞선 태스크가 종료할 때까지 이후 태스크들이 블로킹되는 단점이 있었다.
// 비동기 처리 방식은 현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하므로 블로킹이 발생하지 않는다는 장점이 있지만, 태스크의 실행 순서가 보장되지 않는 단점이 있다.

let numarr = [];
let num = 0;
while(num < 100) {
    numarr.push(++num);
}

let sum = 0;
numarr.map(v => sum += v);

console.log(sum);
console.log(numarr);

// 비동기 처리를 수행하는 비동기 함수는 전통적으로 콜백 패턴을 사용한다.
// 비동기 처리를 위한 콜백 패턴은 콜백 헬을 발생시켜 가독성을 나쁘게 하고, 비동기 처리 중 발생한 에러의 예외 처리가 곤란하며, 여러 개의 비동기 처리를 한 번에 처리하는 데도 한계가 있다.

// 타이머 함수인 setTimeout, setInterval, HTTP 요청, 이벤트 핸들러는 비동기 처리 방식으로 동작한다.
// 비동기 처리는 이벤트 루프와 태스크 큐와 깊은 관계가 있다.

// 이벤트 루프와 태스크 큐

// 자바스크립트의 특징 중 하나는 싱글 스레드로 동작한다는 것이다.
// 앞서 살펴본 바와 같이 싱글 스레드 방식은 한 번에 하나의 태스크만 처리할 수 있다는 것을 의미한다.
// 하지만 브라우저가 동작하는 것을 살펴보면 많은 태스크가 동시에 처리되는 것처럼 느껴진다.

// 예를 들어, HTml 요소가 애니메이션 효과를 통해 움직이면서 이벤트를 처리하기도 하고, HTTP 요청을 통해 서버로부터 데이터를 가지고 오면서 렌더링하기도 한다.
// 이처럼 자바스크립트의 동시성을 지원하는 것은 바로 이벤트 루프이다.


const foo = () => console.log('foo');
const bar = () => console.log('bar');
const bar2 = () => console.log('bar2');

setTimeout(foo);
bar();
bar2();

// 1. 전역 코드가 평가되어 전역 실행 컨텍스트가 생성되고 콜 스택에 푸시된다.

// 2. 전역 코드가 실행되기 시작하여 setTimeout 함수가 호출된다.
// 이때 setTimeout 함수의 함수 실행 컨텍스트가 생성되고 콜스택에 푸시되어 현재 실행 중인 컨텍스트가 된다.
// 브라우저의 Web API인 타잏머 함수도 함수이므로 함수 실행 컨텍스트를 생성한다.

// 3. setTimeout 함수가 실행되면 콜백 함수를 호출 스케줄링하고 종료되어 콜 스택에 팝된다.
// 이때 호출 스케줄링, 즉 타이머 설정과 타이머가 만료되면 콜백 함수를 태스크 큐로 푸시하는 것은 브라우저 역할이다.

// 4. 브라우저가 수행하는 4-1과 자바스크립트 엔진이 수행하는 4-2는 병행처리된다.
//  4-1. 브라우저는 타이머를 설정하고 타이머의 만료를 기다린다. 이후 타이머가 만료되면 콜백 함수 foo 가 태스크 큐에 푸시된다.
//      위 예제의 경우 지연시간이 0이지만 지연 시간이 4ms 이하인 경우 최소 지연시간 4ms 가 지정된다. 따라서 4ms 후에 콜백 함수 foo 가 태스크 큐에 푸시되어 대기하게 된다.
//      이 처리 또한 자바스크립트 엔진이 아니라 브라우저가 수행한다.
//      이처럼 setTimeout 함수로 호출 스케줄링한 콜백 함수는 정확히 지연 시간 후에 호출된다는 보장은 없다.
//      지연 시간 이후에 콜백 함수가 태스크 큐에 푸시되어 대기하게 되지만 콜 스택이 비어야 호출되므로 약간의 시간차가 발생할 수 있기 때문이다.

//  4-2. bar 함수가 호출되어 bar 함수의 함수 실행 컨텍스트가 생성되고 콜 스택에 푸시되어 현재 실행 중인 실행 컨텍스트가 된다.
//      이후 bar 함수가 종료되어 콜 스택에서 팝된다. 이때 브라우저가 타이머를 설정한 후 4ms 가 경과했다면 foo 함수는 아직 태스크 큐에서 대기 중이다.

// 5. 전역 코드 실행이 종료되고 전역 실행 컨텍스트가 콜 스택에 팝된다.
// 이로서 콜 스택에는 아무런 실행 컨텍스트도 존재하지 않게 된다.

// 6. 이벤트 루프에 의해 콜 스택이 비어 있음이 감지되고 태스크 큐에서 대기 중인 콜백 함수 foo 가 이벤트 루프에 의해 콜 스택에 푸시된다.
// 다시 말해, 콜백 함수 foo 의 함수 실행 컨텍스트가 생성되고 콜 스택에 푸시되어 현재 실행 중인 실행 컨텍스트가 된다.
// 이후 foo 함수가 종료되어 콜 스택에서 팝된다.


// 이처럼 비동기 함수인 setTimeout 의 콜백 함수는 태스크 큐에 푸시가되어 대기하다가 콜 스택이 비게 되면, 다시 말해 전역 코드 및 명시적으로 호출된 함수가 모두 종료되면 비로소 콜 스택에 푸시되어 실행된다.

// 자바스크립트는 싱글 스레드 방식으로 동작한다.
// 이때 싱글 스레드 방식으로 동작하는 것은 브라우저가 아니라 브라우저에 내장된 자바스크립트 엔진이라는 것에 주의하기 바란다.
// 만약 모든 자바스크립트 코드가 자바스크립트 엔진에서 싱글 스레드 방식으로 동작한다면 자바스크립트는 비동기로 동작할 수 없다.
// 즉, 자바스크립트 엔진은 싱글 스레드로 동작하지만 브라우저는 멀티 스레드로 동작한다.

// 예를 들어, setTimeout 함수의 모든 처리가 자바스크립트 엔진에서 싱글 스레드로 수행된다고 가정해 보자.
// 이때 setTimeout 함수의 호출 스케줄링을 위한 타이머 설정도 자바스크립트 엔진에서 수행될 것이므로 대기 시간 동안 어떤 태스크도 실행할 수 없다.
// 즉 setTimeout 함수의 타이머 설정까지 자바스크립트 엔진에서 싱글 스레드 방식으로 동작해서는 비동기로 동작할 수 없다.

// 브라우저는 자바스크립트 엔진 외에도 렌더링 엔진과 Web API 를 제공한다.
// Web API 는 ECMAScript 사양에 정의된 함수가 아니라 브라우저에서 제공하는 API 이며, DOM API 와 타이머 함수, HTTP 요청(Ajax) 과 같은 비동기 처리를 포함한다.
// 위 예제에서 살펴봤듯이 브라우저의 Web API 인 setTimeout 함수가 호출되면 자바스크립트 엔진의 콜 스택에 푸시되어 실행된다.

// 하지만 setTimeout 함수의 두 가지 기능인 타이머 설정과 타이머가 만료되면 콜백 함수를 태스크 큐에 등록하는 처리는 자바스크립트 엔진이 아니라 브라우저가 실핸한다.
// 브라우저가 수행하는 4-1 과 엔진이 수행하는 4-2 는 병행 처리된다.
// 이처럼 브라우저와 자바스크립트 엔진이 협력하여 비동기 함수인 setTimeout 함수를 실행한다.



// Ajax 란 ?

// Ajax (Asynchronous Javascript XML) 란 자바스크립트를 사용해 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹 페이지를 동적으로 갱신하는 프로그래밍 방식을 말한다.
// Ajax 는 브라우저에서 제공하는 Web API 인 XMLHttpRequest 객체를 기반으로 동작한다.
// XMLHttpRequest 는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공한다.

// 1999년 마이크로소프트가 개발한 XMLHttpRequest 는 그다지 큰 주목을 받지 못하다가 2005년 구글이 발표한 구글 맵스를 통해 웹 애플리케이션 개발 프로그래밍 언어로서 자바스크립트의 가능성을 확인하는 계기를 마련했다.
// 웹 브라우저에서 자바스크립트와 Ajax 를 기반으로 동작하는 구글 맵스가 데스크톱 애플리케이션과 비교해 손색이 없을 정도의 퍼포먼스와 부드러운 화면 전환 효과를 보여준 것이다.

// 이전의 웹 페이지는 html 태그로 시작해서 html 태그로 끝나는 완전한 HTML 을 서버로부터 전송받아 웹페이지 전체를 처음부터 다시 렌더링하는 방식으로 동작했다.
// 따라서 화면이 전환되면 서버로부터 새로운 HTML 을 전송받아 웹페이지 전체를 처음부터 다시 렌더링했다.

// 이러한 전통적인 방식은 다음과 같은 단점이 있다.
// 1. 이전 웹페이지와 차이가 없어서 변경할 필요가 없는 부분까지 포함된 완전한 HTML 을 서버로부터 매번 다시 전송받기 때문에 불필요한 데이터 통신이 발생한다.
// 2. 변경할 필요가 없는 부분까지 처음부터 다시 렌더링한다. 이로 인해 화면 전환이 일어나면 화면이 순간적으로 깜빡이는 현상이 발생한다.
// 3. 클라이언트와 서버와의 통신이 동기 방식으로 동작하기 때문에 서버로부터 응답이 있을 때까지 다음 처리는 블로킹된다.

// Ajax 의 등장은 이전의 전통적인 패러다임을 획기적으로 전환했다.
// 즉, 서버로부터 웹페이지의 변경에 필요한 데이터만 비동기 방식으로 전송받아 웹페이지를 변경할 필요가 없는 부분은 다시 렌더링하지 않고, 변경할 필요가 있는 부분만 한정적으로 렌더링하는 방식이 가능해진 것이다.
// 이를 통해 브라우저에서도 데스크톱 애플리케이션과 유사한 빠른 퍼포먼스와 부드러운 화면 전환이 가능해졌다.

// Ajax 는 전통적인 방식과 비교했을 때 다음과 같은 장점이 있다.
// 1. 변경할 부분을 갱신하는 데 필요한 데이터만 서버로부터 전송받기 때문에 불필요한 데이터 통신이 발생하지 않는다.
// 2. 변경할 필요가 없는 부분은 다시 렌더링하지 않는다. 따라서 화면이 순간적으로 깜빡이는 현상이 발생하지 않는다.
// 3. 클라이언트와 서버와의 통신이 비동기 방식으로 동작하기 때문에 서버에게 요청을 보낸 이후 블로킹이 발생하지 않는다.


// JSON

// JSON (JavaScript Object Notation) 은 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷이다.
// 자바스크립트에 종속되지 않는 언어 독립형 데이터 포맷으로, 대부분의 프로그래밍 언어에서 사용할 수 있다.

// JSON 표기 방식
// JSON 은 자바스크립트의 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트다.

let json = `
    {
        "name": "inhui",
        "age": 32,
        "alive": true,
        "hobby": ["게임","헬스"]
    }
`;

console.log(JSON.parse(json));

// JSON 의 키는 반드시 큰따옴표(작은따옴표 사용 불가)로 묶어야 한다.
// 값은 객체 리터럴과 같은 표기법을 그대로 사용할 수 있다.
// 하지만 문자열은 반드시 큰따옴표로 묶어야 한다.

// JSON.stringfy
// JSON.stringfy 메서드는 객체를 JSON 포맷의 문자열로 변환한다. 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데 이를 직렬화(serialize) 라 한다.

let obj = {
    name: 'inhui',
    age: 32,
    hobby: ['게임', '헬스']
};

console.log(JSON.stringify(obj));

// JSON.stringfy 메서드는 객체뿐만 아니라 배열도 JSON 포맷의 문자열로 변환한다.

let array1 = [
    {id: 1, content: 'HTML'},
    {id: 2, content: 'JAVASCRIPT'},
    {id: 3, content: 'JAVA'},
];

console.log(JSON.stringify(array1));


// JSON.parse
// JSON.parse 메서드는 JSON 포맷의 문자열을 객체로 변환한다.
// 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열이다.
// 이 문자열을 객체로서 사용하려면 JSON 포맷의 문자열을 객체화해야 하는데 이를 역직렬화(deserialize) 라 한다.

console.log(JSON.parse(JSON.stringify(obj)));
console.log(JSON.parse(JSON.stringify(array1)));

// XMLHttpRequest

// 브라우저는 주소창이나 HTML 의 form , a 태그를 통해 HTTP 요청 전송 기능을 기본 제공한다.
// 자바스크립트를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용한다.
// Web API 인 XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공한다.

// XMLHttpRequest 객체 생성
// XMLHttpRequest 객체는 XMLHttpRequest 생성자 함수를 호출하여 생성한다.
// XMLHttpRequest 객체는 브라우저에서 제공하는 Web API 이므로 브라우저 환경에서만 정상적으로 실행된다.

const xhr = new XMLHttpRequest();

// HTTP 요청을 전송하는 경우 다음 순서를 따른다.

// 1. XMLHttpRequest.prototype.open 메서드로 HTTP 요청을 초기화한다.
// 2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 특정 HTTP 요청의 헤더 값을 설정한다.
// 3. XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송한다.

xhr.open('GET', '/test/requestTest1?name=inhui');
xhr.setRequestHeader('content-type', 'text/plain');
xhr.send();


// XMLHttpRequest.prototype.open

// open 메서드는 서버에 전송할 HTTP 요청을 초기화한다.
// open 메서드를 호출하는 방법은 다음과 같다.

// xhr.open(method, url[, async])

// method : HTTP 요청 메서드(GET, POST, PUT, DELETE 등)
// url : HTTP 요청을 전송할 URL
// async : 비동기 요청 여부, 옵션으로 기본값은 true 이며, 비동기 방식으로 동작한다.

// HTTP 요 청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법이다.
// 주로 5가지 요청 메서드를 사용하여 CRUD 를 구현한다.

// GET : 모든/특정 리소스 취득 (index/retrieve) , 페이로드 x
// POST : 리소스 생성 (create) 페이로드 o
// PUT : 리소스 전체 교체 (replace) 페이로드 o
// PATCH : 리소스의 일부 수정 (modify) 페이로드 o
// DELETE : 모든/특정 리소스 삭제 (delte) 페이로드 x

// XMLHttpRequest.prototype.send

// send 메서드는 open 메서드로 초기화된 HTTP 요청을 서버에 전송한다.
// 기본적으로 서버로 전송하는 데이터는 GET, POST 요청 메서드에 따라 전송 방식에 차이가 있다.

// GET 요청 메서드의 경우 데이터를 URL 의 일부분인 쿼리 문자열(query string) 로 서버에 전송한다.
// POST 요청 메서드의 경우 데이터(페이로드)를 요청 몸체(request body)에 담아 전송한다.

// send 메서드에는 요청 몸체에 담아 전송할 데이터(페이로드)를 인수로 전달할 수 있다.
// 페이로드가 객체인 경우 반드시 JSON.stringfy 메서드를 사용하여 직렬화한 다음 전달해야 한다.

const xhr2 = new XMLHttpRequest();
xhr2.open('POST', '/test/requestTest1');
xhr2.setRequestHeader('content-type', 'application/json');
xhr2.send(JSON.stringify({id:1, name:'inhui', bol: true, arr: ['a','b']}));

// HTTP 요청 메서드는 GET 인 경우 send 메서드에 페이로드로 전달할 인수는 무시되고 요청 몸체는 null 로 설정된다.


// XMLHttpRequest.prototype.setRequestHeader

// setRequestHeader 메서드는 특정 HTTP 요청의 헤더 값을 설정한다.
// setRequestHeader 메서드는 반드시 open 메서드를 호출한 이후에 호출해야 한다.
// 자주 사용하는 HTTP 요청 헤더인 Content-type 과 Accept 에 대해 살펴보자.

// Content-type 은 요청 몸체에 담아 전송할 데이터의 MIME 타입의 정보를 표현한다.
// 자주 사용되는 MIME 타입은 다음과 같다.

// text : text/plain , text/html , text/css , text/javascript
// application : application/json , application/x-www-form-urlencode
// multipart : multipart/formed-data

// HTTP 클라이언트가 서버에 요청할 때 서버가 응답할 데이터의 MIME 타입을 Accept 로 지정할 수 있다.

xhr2.setRequestHeader('accept', 'application/json');

// 만약 accept 헤더를 설정하지 않으면 send 메서드가 호출될 때 Accept 헤더가 */* 으로 전송된다.


// HTTP 응답처리

// 서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 한다.
// XMLHttpRequest 객체는 onreadystatechange, onload, onerror 같은 이벤트 핸들러 프로퍼티를 갖는다.
// 이 이벤트 핸들러 프로퍼티 중에서 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티 값이 변경된 경우 발생하는 readystatechange 이벤트를 캐치하여 다음과 같이 HTTP 응답을 처리할 수 있다.

const xhr3 = new XMLHttpRequest();
xhr3.open('POST', '/test/requestTest1');
xhr3.setRequestHeader('content-type', 'application/json');
xhr3.send(JSON.stringify({id:1, name:'inhui', bol: true, arr: ['a','b']}));

xhr3.onreadystatechange = () => {
    console.log(xhr3.readyState);
    console.log(xhr3.status);
}
