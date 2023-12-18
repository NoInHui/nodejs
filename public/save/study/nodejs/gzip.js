const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');

readStream.pipe(zlibStream).pipe(writeStream);

// 노드에서는 파일을 압축하는 zlib 모듈도 제공합니다.
// zlib 의 createGzip 이라는 메서드가 스트림을 지원하므로 readStream 과 writeStream 중간에서 파이핑을 할 수 있습니다.