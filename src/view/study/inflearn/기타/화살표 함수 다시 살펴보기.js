// Ctrl + Alt + N : 실행
const log = console.log;

// 화살표 함수는 단순히 함수를 짧게 쓰기 위한 용도로 사용되지 않습니다.

// 어딘가에 함수를 전달하게 되면 함수의 컨텍스트를 잃을 수 있습니다.
// 이럴때 화살표 함수를 사용하면 현재 컨텍스트를 잃지 않아 편리합니다.

// 화살표 함수 본문에서 this 에 접근하면 외부에서 값을 가져옵니다.


let group = {
    title: 'title',
    array: [1,2,3],
    // func() {
    //     this.array.map(v => console.log(this.title, v))
    // },
    func() {
        this.array.map(function(v) {
            console.log(this.title, v);
        })
    },
}

group.func();

// 화살표 함수의 this 는 외부에서 가져온다.
// new 와 함꼐 호출 불가능하다.
