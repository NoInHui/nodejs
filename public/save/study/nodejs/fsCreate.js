// 기타 fs 메서드 알 아보기

const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
.then(() => {
    return Promise.reject('이미 폴더 있음');
})
.catch(error => {
    if(error.code === 'ENOENT') {
        console.log('폴더 없음')
        return fs.mkdir('./folder')
    }
    return Promise.reject(error);
})
.then(() => {
    console.log('파일 만들기 성공')
    return fs.open('./folder/file.js', 'w');
})
.then(fd => {
    console.log('빈 파일 만들기 성공', fd);
    return fs.rename('./folder/file.js', './folder/newfile.js');
})
.then(() => {
    console.log('이름 바꾸기 성공');
})
.catch(err => {
    console.log(err);
});

// fs.access(겅로, 옵션, 콜백)
// 폴더나 파일에 접근할 수 있는지를 체크합니다.
// 두 번째 인수로 상수들을 넣습니다.(constants 를 통해 가져옵니다.)
// F_OK 는 파일 존재 여부, R_OK 는 읽기 권한 여부, W_OK 는 쓰기 권한 여부를 체크합니다.
// 파일/폴더나 권한이 없다면 에러가 발생하는데, 파일/폴더가 없을 때의 에러 코드는 ENOENT 입니다.

// fs.mkdir(경로, 콜백)
// 폴더를 만드는 메서드입니다.
// 이미 폴더가 있다면 에러가 발생하므로 먼저 access 메서드를 호출해서 확인하는 것이 중요합니다.

// fs.open(경로,옵션,콜백)
// 파일의 아이디를 가져오는 메서드입니다.
// 파일이 없다면 파일을 생성한 뒤 그 아이디를 가져옵니다.

// fs.rename(기존 경로, 새 경로, 콜백)
// 파일의 이름을 바꾸는 메서드입니다.
// 기존 파일 위치와 새로운 파일 위치를 적으면 됩니다.