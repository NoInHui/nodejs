const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const writeStream = fs.createWriteStream('./writeme3.txt');

// const data = [];

// readStream.on('data', chunk => {
//     data.push(chunk);
// });

// readStream.on('end', () => {
//     writeStream.write(Buffer.concat(data).toString());
//     writeStream.end();
// });

// writeStream.on('finish', () => {
//     console.log('파일 쓰기 완료');
// });

readStream.pipe(writeStream);

// 읽기 스트림과 쓰기 스트림을 만들어둔 후 두 개의 스트림 사이를 pipe 메서드로 연결하면 저절로 데이터가 writeStream 으로 넘어갑니다.
// pipe 는 스트림 사이에 여러 번 연결할 수 있습니다.