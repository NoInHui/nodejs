// Ctrl + Alt + N -> 실행

// const , let
// const 와 let 은 블록 스코프를 갖습니다.
// var 는 함수 스코프를 갖습니다.


// modernJavascriptDeepDive

function helloWorld() {
    console.log('Hello World');
    helloNode();
}

function helloNode() {
    console.log('Hello Node');
}

helloWorld();