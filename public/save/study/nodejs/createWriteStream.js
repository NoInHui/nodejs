const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
    console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다\n');
writeStream.write('한번 더 씁니다.');
writeStream.end();

// 먼저 createWriteStream 으로 쓰기 스트림을 만듭니다.
// 첫번째 인수로는 출력 파일명을 입력합니다. 두번째 인수는 옵션인데, 여기서는 사용하지 않습니다.

// createReadStream 으로 파일을 읽고 그 스트림을 전달받아 createWriteStream 으로 파일을 쓸 수도 있습니다.
// 파일 복사와 비슷합니다.
// 스트림끼리 연결하는 것을 파이핑한다 고 표현하는데, 액체가 흐르는 관(파이프) 처럼 데이터가 흐른다고 해서 지어진 이름입니다.

