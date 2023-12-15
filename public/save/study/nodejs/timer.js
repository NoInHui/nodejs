// 타이머

// 타이머 기능을 제공하는 함수인 setTimeout, setInterval, setImmediate 는 노드에서 window 대신 global 객체 안에 들어 있습니다.
// setTimeout(callback, time) : 주어진 밀리초 이후에 콜백 함수를 실애합니다.
// setInterval(callback, time) : 주어진 밀리초마다 콜백 함수를 반복 실행합니다.
// setImmediate(callback) : 콜백함수를 즉시 실행합니다.

// 이 타이머 함수들은 모두 아이디를 반환합니다.
// 아이디를 사용하면 타이머를 취소할 수 있습니다.

// clearTimeout(id)
// clearInterval(id)
// clearImmediate(id)

const timeout = setTimeout(() => {
    console.log('1.5초 후 실행')
},1500);

const interval = setInterval(() => {
    console.log('1초마다 실행');
},1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다.');
},3000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
    console.log('즉시실행');
});

const immediate2 = setImmediate(() => {
    console.log('실행되지 않습니다.');
});

clearImmediate(immediate2);


// 즉시실행 immediate
// 1초마다 실행interval
// 1.5초 후 실행 timeout
// 1초마다 실행 interval

// immediate2 는 바로 clearImmediate 를 사용해서 취소했으므로 실행되지 않습니다.

// setImmediate(callback) 와 setTimeout(callback,0)

// setImmediate(callback) 과 setTimeout(callback,0) 에 담긴 콜백 함수는 이벤트 루프를 거친 뒤 즉시 실행됩니다.
// 둘의 차이점은 무엇일까요?
// 특수한 경우 setImmediate 는 setTimeout(callback,0) 보다 먼저 실행됩니다.
// 파일 시스템 접근, 네트워킹 같은 I/O 작업의 콜백 함수 안에서 타이머를 호출하는 경우입니다.
// 하지만 setImmediate 가 항상 setTimeout(callback,0) 보다 먼저 호출되는 것은 아니라는 사실만 알아두세요.
// 헷갈리지 않도록 setTimeout(callback,0) 대신 setImmediate 를 사용하자

