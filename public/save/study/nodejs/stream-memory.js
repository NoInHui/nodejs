const fs = require('fs');

console.log('before', process.memoryUsage.rss());

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');

readStream.pipe(writeStream);
readStream.on('end', () => {
    console.log('after', process.memoryUsage.rss());
});

// 스트림을 사용해서 파일을 복사했더니 이전 방식보다 엄청난 개선 효과가 있습니다.
// 큰 파일을 조각내어 작은 버퍼 단위로 옮겼기 떄문입니다.
// 이렇게 스트림을 사용하면 효과적으로 데이터를 전송할 수 있습니다.
// 동영상 같은 큰 파일들을 전송할 때 이러한 이유로 스트림을 사용합니다.
