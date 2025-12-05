1. CPU-heavy 작업이면 아래 프로세스로 빼자 (메인 스레드에서 CPU-heavy 제거)
: Node는 메인 JS 스레드가 1개라서 특정 요청 하나의 CPU 연산 때문에 같은 Node 프로세스의 모든 요청이 같이 멈춘다.
 - Worker Threads
 - 외부 서비스로 분리 : Python/Go/Java 등의 별도 서비스가 담당하도록
 - 클러스터/멀티 프로세스 : cluster 모듈, PM2, Docker 등을오 프로세스를 여러 개 띄워 멀티코어 활용
 - 대량 데이터(file)는 Buffer 한 번에 읽지 말고 Stream 사용


 
2. 에러 로직 중앙 집중
controller, api, router 등에서 다 try/catch 를 쓰지 말고 한 번 짜놓은 래퍼(asyncHandler)함수 와 공통 에러 미들웨어에 다 몰어 넣자.

// utils/asyncHandler.js
module.exports = function asyncHandler(fn) {
  return (req, res, next) => {
    Promise
      .resolve(fn(req, res, next))
      .catch(next);
  };
};

// routes/user.js
const asyncHandler = require('../utils/asyncHandler');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);  // 여기서 에러 나면?

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err; // 이 throw 가 알아서 전역 에러 미들웨어까지 감
    }

    res.json(user);
  })
);

module.exports = router;

// app.js
const express = require('express');
const app = express();

app.use('/users', require('./routes/user'));

// 전역 에러 미들웨어 (맨 마지막)
app.use((err, req, res, next) => {
  console.error(err);   // 여기서만 로그 찍으면 됨

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(3000);

