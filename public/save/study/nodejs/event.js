// 스트림을 배울 때 on('data', 콜백) 또는 on('end', 콜백) 을 사용했습니다.
// 바로 data 라는 이벤트와 end 라는 이벤트가 발생할 때 콜백 함수를 호출하도록 이벤트를 등록한 것입니다.
// createReadStream 같은 경우는 내부적으로 알아서 data 와 end 이벤트를 호출하지만, 우리가 직접 이벤트를 만들 수도 있습니다.

const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('event1', () => {
    console.log('이벤트 1');
});

myEvent.on('event2', () => {
    console.log('이벤트 2');
});

myEvent.once('event3', () => { // 한번만 실행
    console.log('이벤트 3');
});

myEvent.emit('event1');
myEvent.emit('event2');
myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', () => {
    console.log('이벤트 4');
});

myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener = () => {
    console.log('이벤트 5');
};

myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5');

console.log(myEvent.listenerCount('event2'));