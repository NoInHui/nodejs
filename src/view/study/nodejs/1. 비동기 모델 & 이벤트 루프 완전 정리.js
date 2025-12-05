// 전통적인 서버 모델 (멀티 스레드)
// Java 톰캣 같은 전통적인 서버 모델은 보통 이렇게 생각함현 된다.
// 요청 1개 -> 스레드 1개 할당
// 1000개 요청 -> 최대 1000개 스레드
// 각 스레드는 블로킹 I/O 를 직접 수행 

// 문제
// 스레드 개수가 많아질수록
// 컨텍스트 스위칭 비용
// 스레드 스택 메모리
// OS 스케줄링 비용 떄문에 튜닝 포인트가 많음

// Nodejs 모델
// Node 는 접근 방식이 다르다.
// JS 를 실행하는 메인 스레드는 딱 1개
// I/O 는 libuv + OS 비동기 API + 스레드풀 에 맡김
// 메인 스레드는 이벤트 루프를 돌면서 어떤 콜백을 실행할지만 관리

// 스레드를 많이 쓰는 대신, 이벤트 루프와 콜백으로 동시성을 확보한다.

// 장점 : 구조 단순, 메모리 오버헤드 적고, I/O 많은 서비스에 강함
// 단점 : CPU를 오래 잡아먹는 작업이 있으면 전체 서버가 같이 느려진다.


// Nodejs 런타임 구성 요소

// JS 코드
// call stack
// event loop (timer qs, io q, check q)
// libuv (스레드풀, io 관리)
// os kernel

// call stak : js 함수 실행 스택, 동기 코드는 다 여기서 처리
// heap : 객체/배열/클로저 등 데이터 저장 GC 가 관리
// event loop : 여러 큐(timers,io,check ...) 를 돌면서 지금 무엇을 실행할지 결정
// libuv : c 라이브러리, 이벤트 루프 + 스레드 풀 + io 추상화
// thread pool : fs, crypto, 일부 dns 같은 비동기 작업 처리
// os kernel 네트워크/디스크/io 실제 수행

// 이벤트 루프의 단계
// 이벤트 루프는 한 바퀴 도는 걸 tick 이라고 부를 수 있따.
// 매 tick 마다 아래 순서를 돈다.

// timers
// pending callbacks
// idle, prepare
// poll
// check
// close callback

// timers phase : setTimeout, setInterval
// 이 단계에서는 setTimeout, setInterval 로 등록된 콜백 중 delay 시간이 지났다고 판단된 것들이 실행된다.

// 중요한점 setTimeout(finally,0) 은 0ms 후에 정확히 실행이 아니라 가능한 빠른 타이밍의 Timers phase 에서 실행 후보에 올려 둔다.
// 에 가깝다.
// cpu 바쁘거나 poll 단계가 오래 걸리면 실제 실행 시점은 밀릴 수 있음

// pending callbacks phase
// os 에서 비동기로 넘어온 에러/특수 콜백 같은 것 처리
// 일반 애플리케이션 코드 작성할 때는 크게 신경 안 써도 되는 영역

// idle, prepare phase
// node 내부적으로 사용하는 단계
// 앱 개발자가 직접 제어할 일 거의 없음

// poll phase - 이벤트 루프의 핵심
// poll 단계는 이벤트 루프의 심장부
// 대부분 io 완료 콜백이 여기서 실행됨, fs net http 등
// 처리할 io 콜백이 없으면
// 타이머 만료 예정 시간까지 대기할 수도 있고
// 바로 다음 단계로 넘어갈 수도 있음

// 파일 읽기 쓰기 끝난 뒤 콜백 실행
// http 요청 완료 후 콜백 실행


// check phase
// 여기서 setImmediate() 로 등록한 콜백들이 실행된다.



// Microtask Queue - promiseImpl, process.nextTick

// Microtask 란
// 이벤트 루프는 각 phase 를 돌고 나서
// phase 사이 마다 Microtask Q 를 확인한다.

// Microtask q 에 들어가는 것들
// process.nextTick
// Promise.then .catch .finally
// queueMicrotask

// rule
// call stack 이 비고 (동기 코드가 다 실행되고) 
// 특정 phase 콜백 실행이 끝난 시점 (다 돈다는 뜻은 아님 1개 돌면)
// Microtask Q 가 빌때까지 전부 실행한다.

// 우선순위
// Node 에서는 대략 아래 순서로 보면 된다.

// 1. process.nextTick
// 2. 일반 Microtask : Promise.then catch finally, queueMicrotask
// 3. 그 다음 이벤트 루프 phase 진행

// process.nextTick 을 재귀/루프에 쓰면
// 이벤트 루프가 다음 phase 로 못 넘어가서 starvation (굶겨 죽임) 상태가 올 수 있다.

// async / await 도 결국 Promise + Microtask

// async/await 는 문법만 다를 뿐 내부적으로는 promise 기반이다.

