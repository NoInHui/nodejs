const http = require('http');

http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello Server!</p>');
})
.listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중 입니다.')
});

// 포트는 서버 내에서 프로세스를 구분하는 번호입니다.
// 서버는 HTTP 요청을 대기하는 것 외에도 다양한 작업을 합니다.
// 데이터베이스와도 통신해야하고, FTP 요청을 처리하기도 합니다.
// 따라서 서버는 프로세스에 포트를 다르게 할당해 들어오는 요청을 구분합니다.
// 유명한 포트 번호로는
// FTP : 21
// HTTP : 80
// HTTPS : 443
// MYSQL : 3306