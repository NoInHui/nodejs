const fs = require('fs');

fs.readFile('./readme.txt', (err,data) => {
    if(err) {
        throw err;
    }

    console.log(data);
    console.log(data.toString());
});

// fs 모듈은 파일 시스템에 접근하는 모듈입니다.
// 즉, 파일을 생성하거나 삭제하고, 읽고 쓸 수 있습니다.
// 또한 폴더도 만들거나 지울 수 있습니다.
// 웹 브라우저에서 자바스크립트를 사용할 때는 일부를 제외하고는 파일 시스템 접근이 금지되어 있으므로 노드의 fs 모듈이 낯설 것입니다.

// fs 모듈을 불러온 뒤 읽을 파일의 경로를 지정합니다.

// readFile 의 결과물은 버퍼(buffer) 라는 형식으로 제공됩니다.
// 지금은 단순히 버퍼를 메모리의 데이터라고 생각하면 됩니다.
// 버퍼는 사람이 읽을 수 있는 형식이 아니므로 toString 을 사용해 문자열로 변환했습니다.
