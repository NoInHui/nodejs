const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});

const data = [];

readStream.on('data', chunk => {
    data.push(chunk);
    console.log('data', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end', Buffer.concat(data).toString());
});

readStream.on('error', err => {
    console.log(err);
});

// 먼저 createReadStream 으로 읽기 스트림을 만듭니다.
// 첫 번째 인수로 읽을 파일 경로를 넣습니다.
// 두 번째 인수는 옵션 객체인데, highWaterMark 라는 옵션이 버퍼의 크기를 정할 수 있는 옵션입니다.

// readStream 은 이벤트 리스너를 붙여서 사용합니다.
// 보통 data,end,error 이벤트를 사용합니다.