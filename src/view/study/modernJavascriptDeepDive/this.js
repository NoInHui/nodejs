// Ctrl + Alt + N : 실행
const log = console.log;

// 객체 리터럴 방식

// const circle = {
//     radius: 5,
//     func1() {
//         return this.radius;
//     }
// }

// log(circle.func1())

// log(this);

// function func1() {
//     // 일반 함수 내부에서 this 는 전역 객체 window 를 가리킨다.
//     log(this);
// }

// func1()

// const person = {
//     name: 'Lee',
//     func1() {
//         // 메서드 내부에서 this 는 메서드를 호출한 객체를 가리킨다.
//         log(this.name);
//     },
// }

// person.func1();

// function Person(name) {
//     this.name = name;
//     // 생성자 함수 내부에서 this 는 생성자 함수가 생성할 인스턴스를 가리킨다.
//     log(this.name);
// }

// const me = new Person('inhui');


// 일반함수에서는 this 를 사용할 필요가 없기 때문에 strcit mode 에서는 undefined


// this 바인딩은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.

// 렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.
// 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다.
// 하지만 this 바인딩은 함수 호출 시점에 결정된다.

// 일반 함수 호출, 메서드 호출, 생성자 함수 호출, Function.prototype.apply,call,bind 메서드에 의한 간접 호출

// const foo = function() {
//     log(this);
// }

// // foo();

// // const obj = {foo};

// // obj.foo();

// // new foo();

// const bar = {name: 'bar'};
// foo.call(bar);
// foo.apply(bar);
// foo.bind(bar)();


function foo() {
    const a = '1';
    log(this.a);
    const bar = () => {
        log(this.a);
    }
    bar();
}

foo();

