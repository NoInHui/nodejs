// 타이머는 콜백 기반 API 이지만 프로미스 방식을 사용할 수도 있습니다.
// 다만 프로미스 기반 타이머는 노드 내장 객체가 아니라 노드 내장 모듈입니다.

import {setTimeout, setInterval} from 'timers/promises';

await setTimeout(3000);
console.log('3초 뒤 실행');

for await(const startTime of setInterval(1000, Date.now())){
    console.log('1초 마다 실행', new Date(startTime));
}

// 프로미스 기반이므로 then 대신 await 를 사용하기 위해 ES 모듈을 사용했으며
// timers/promises 라는 모듈에서 setTimeout 과 setInterval 을 새롭게 제공합니다.
// setTimeout() 로 몆 밀리초를 기다릴지 정할 수 있고, setInterval() 은 for await of 문법과 함께 사용할 수 있습니다.
