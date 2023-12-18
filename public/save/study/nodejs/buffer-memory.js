const fs = require('fs');

console.log('before', process.memoryUsage.rss());

const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);

console.log('after', process.memoryUsage.rss());

// 1GB 용량의 파일을 복사하기 위해 메모리에 파일을 모두 올려둔 후 writeFileSync 를 수행했기 때문에 순식간에 1GB 를 넘었습니다.

