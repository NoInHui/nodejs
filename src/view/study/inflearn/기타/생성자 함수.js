// Ctrl + Alt + N : 실행
const log = console.log;

// new 연산자와 생성자 함수

// 객체 리터럴 {...} 을 사용하면 객체를 쉽게 만들 수 있습니다.
// 그런데 개발을 하다 보면 유사한 객체를 여러 개 만들어야 할 때가 생기곤 합니다.
// 복수의 사용자, 메뉴 내 다양한 아이템을 객체로 표현하려고 하는 경우가 그렇죠.

// new 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있습니다.

// 생성자 함수와 일반 함수에 기술적인 차이는 없습니다.
// 다만 생성자 함수는 아래 두 관례를 따릅니다.

// 함수 이름의 첫 글자는 대문자로 시작합니다.
// 반드시 new 연산자를 붙여 실행합니다.

// new User(...) 를 써서 함수를 실행하면 아래와 같은 알고리즘이 동작합니다.

// 1. 빈 객체를 만들어 this에 할당합니다.
// 2. 함수 본문을 실행합니다. this 에 새로운 프로퍼티를 추가해 this 를 수정합니다.
// 3. this 를 반환합니다.


function User(name) {
    // this = {}; 빈 객체가 암시적으로 만들어짐

    this.name = name;
    this.isAdmin = false;

    // return this; this가 암시적으로 반환됨
}

let user1 = new User('inhui');
log(user1);

// 객체 리터럴 문법으로 일일이 객체를 만드는 방법보다 훨씬 간단하고 읽기 쉽게 객체를 만들 수 있습니다.
// 생성자의 의의는 바로 여기에 있습니다. 재사용할 수 있는 객체 생성 코드를 구현하는 것이죠.

// 모든 함수는 생성자 함수가 될 수 있다는 점을 잊지 마시기 바랍니다.
// new 를 붙여 실행한다면 어떤 함수라도 위에 언급된 알고리즘이 실행됩니다.
// 이름의 첫 글자가 대문자인 함수는 new 를 실행해야 한다는 점도 잊지 마세요. 공동의 약속입니다.

// 재사용할 필요가 없는 복잡한 객체를 만들어야 한다고 해봅시다. 많은 양의 코드가 필요할 겁니다.
// 이럴땐 아래와 같이 코드를 익명 생성자 함수로 감싸주는 방식을 사용할 수 있습니다.

let user2 = new function() {
    this.name = 's';
    this.isAdmin = false;
}

log(user2);

// 위 생성자 함수는 익명 함수이기 때문에 어디에도 저장되지 않습니다.
// 처음 만들 때 부터 단 한번만 호출할 목적으로 만들었기 때문에 재사용이 불가능합니다.
// 이렇게 익명 생성자 함수를 이용하면 재사용은 막으면서 코드를 캡슐화 할 수 있습니다.


// 생성자 함수엔 보통 return 문이 없습니다.
// 반환해야 할 것들은 모두 this 에 저장되고 this 는 자동으로 반환되기 때문에 반환문을 명시적으로 써 줄 필요가 없ㅅ브니다.
// 그런데 만약 return 문이 있다면 어떤 일이 벌어질까요?

// 객체를 return 한다면 this 대신 객체가 반환됩니다.
// 원시형을 return 한다면 return 문지 무시됩니다.

// 인수가 없는 생성자 함수는 괄호를 생략해 호출할 수 있습니다.
// 명세서엔 괄호를 생략해도 된다고 정의되어 있지만 좋은 스타일을 아닙니다.

function User2() {
    this.name = 'b';
    return;
}

let user = new User2();
let user1 = new User2;

console.log(user);
console.log(user1);


// 생성자 내 메서드
// 생성자 함수를 사용하면 매개변수를 이용해 객체 내부를 자유롭게 구성할 수 있습니다.
// 엄청난 유연성이 확보되죠.

function User(name) {
    this.name = name;
    this.sayHi = function() {
        console.log(name);
    }
}

let user = new User('이보라');
user.sayHi();

// 요약
// 생성자 함수(생성자)는 일반 함수입니다.
// 다만 일반 함수와 구분하기 위해 함수 이름 첫 글자를 대문자로 씁니다.
// 생성자 함수는 반드시 new 연산자와 함께 호출해야 합니다.
// new 와 함께 호출하면 내부에서 this 가 암시적으로 만들어지고, 마지막엔 this 를 반환합니다.
// 생성자 함수는 유사한 객체를 여러 개 만들때 유사합니다.
// 자바스크립트는 언어 차원에서 다양한 생성자 함수를 제공합니다.
// 날짜를 나타내는 데 쓰이는 Date, 집합을 나타내는데 쓰이는 Set 드으이 내장 객체는 이런 생성자 함수를 이용해 만들 수 있습니다.



// 과제

let obj = {};

function A() {
    return obj
}

function B() {
    return obj
}

let a = new A;
let b = new B;

console.log(a == b);
console.log(a === b);


function Calculator() {

    this.read = (a,b) => {
        this.a = a;
        this.b = b;
    }

    this.sum = () => (this.a ?? 0) + (this.b ?? 0);
    this.mul = () => (this.a ?? 0) * (this.b ?? 0);
}

let cal = new Calculator();
cal.read(2,3);
console.log(cal.sum());
console.log(cal.mul());

function Accumulator(startingValue) {
    this.sumValue = startingValue;
    this.read = (value) => this.sumValue += value;
}

let acc = new Accumulator(1);
acc.read(3);
acc.read(3);

console.log(acc.sumValue)