// 에러 처리는 asyncHandler 미들웨어 등의 패턴으로 중앙집중

// 각 라우터에서 try/catch 를 매번 쓰지 말고, 한 번 짜놓은 래퍼(asyncHandler) 와 공통 에러 미들웨어에 다 몰아 넣자.

// 이걸 단계별로 풀어서 표현하면

// 1. 중앙집중이 안된 상태 (지옥 버전)

app.get('/users/:id', async(req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// User.findById 에서 에러가 나면 async 함수 안에서 throw 된 에러는 Promise reject 가 되는데
// Express 4 기준에서는 이게 자동으로 next(err) 로 안 넘어감, UnhandledPromiseRejection 이 될 수 있음

// 그래서 보통은 이렇게 함

app.get('/users/:id', async (res,res,next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            const err = new Error('User not found');
            err.status = 404;
            throw err;
        }
        res.json(user);
    } catch(e) {
        next(e);
    }
});

// 그런데 라우터가 100개면?
// 모든 라우터마다 try/catch + next(err) 를 다 넣어야 함
// 중복 코드 폭발
// 에러 로그/응답 포맷을 바꾸려고 해도 여기저기 흩어져 있음
// 이게 에러가 각 라우터에 분산되어 있는 상태

// 목표 : 에러 로직을 한 곳에 모으자 (중앙집중)
// 우리가 원하는 구조는
// 1. 각 라우터에서는 비즈니스 로직만 쓰고 에러는 throw 만 한다.
// 2. 공통 에러 미들웨어 하나가 모든 에러 로그 + http 응답 형식을 통일해서 처리

// 이렇게
// 라우터에서는 
// throw new Error('뭔가 잘못됨');

// 전역 에러 미들웨어 하나에서만
app.use((err,req,res,next) => {
    // 여기서만 로그/응답 정책 관리
});

// 문제는 어떻게 라우터에서 발생한 에러를 전부 저 공통 에러 미들웨어 까지 잘 보내냐?
// 여기서 나오는게 asyncHandler 패턴

// asyncHandler 가 하는 일

const asyncHandler = fn => (req,res,next) => {
    Promise.resolve(fn(req,res,next))
    .catch(next); // 에러 나면 자동으로 next(err) 호출
};

app.get('/users/:id', asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }
    res.json(user);
}));

// 여기서 중요한 부분
// asyncHandler 안에서 fn(req,res,next) 를 Promise 로 감쌌고 .catch(next) 를 걸어놨기 때문에
// fn 내부에서 아무 곳에서나 throw 가 발생하면 -> next(err) 로 넘어감
// 그러면 Express 는 그 에러를 전역 에러 처리 미들웨어로 전달

// 그래서 라우터에서는 try/catch 필요 없음
// 그냥 throw 만 하면 됨
// 에러를 next 로 넘기는 작업을 asyncHandler 가 대신해줌

// 전역 에러 처리 미들웨어
// Express 의 전역 에러 미들웨어는 인자 4개짜리 함수

app.use((err,req,res,next) => {
    console.error(err);

    const status = err.status || 500;

    res.status(status).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// 이제 구조가 이렇게 됨
// 1. 라우터에서 throw
// 2. asyncHandler 가 .catch(next) 로 받아서 next(err)
// 3. Express 가 app.use((err,req,res,next) => {...}) 이 미들웨어로 에러 전달
// 4. 여기 한 곳에서 로그 포맷, 응답 JSON 구조, status code 전부 통일해서 관리
// 그래서 에러 처리를 중앙집중화 했다 고 표현하는 것