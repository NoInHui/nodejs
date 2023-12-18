// 이렇게 전체 파일을 모두 버퍼에 저장하는 readFile 메서드와 부분으로 나눠 읽는 createReadStream 메서드를 알아봤습니다.
// 그럼 이 두 메서드 간의 메모리 사용량 차이를 실제로 확인해보겠습니다.

// 다음은 1GB 용량의 텍스트 파일을 만드는 코드입니다.

const fs = require('fs');
const file = fs.createWriteStream('./big.txt');
for(let i = 0; i<= 1e7; i++) {
    file.write('안녕하세요. 엄청나게 큰 파일을 만들어 볼 것입니다. 각오 단단히 하세요!\n');
}
file.end();