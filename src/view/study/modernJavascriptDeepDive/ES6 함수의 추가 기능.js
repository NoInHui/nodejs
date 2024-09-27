// Ctrl + Alt + N : 실행

const e = require("connect-flash");

// 함수의 구분

// ES6 이전까지 자바스크립트의 함수는 별다른 구분 없이 다양한 목적으로 사용되었다.
// 자바스크립트 함수는 일반적인 함수로서 호출할 수도 있고
// new 연산자와 함께 호출하여 인스턴스를 생성할 수 있는 생성자 함수로서 호출할 수도 있으며
// 객체에 바인딩되어 메서드로서 호출할 수도 있다.

var foo = function() {
    console.log(1)
}

foo();
new foo();
var obj = {foo};
obj.foo();

// 이처럼 ES6 이전의 함수는 사용 목적에 따라 명확히 구분되지 않는다.
// 즉 ES6 이전의 모든 함수는 일반함수로써 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다.

// ES6 이전의 모든 함수는 callable 이면서 constructor 이다.

// 호출할수있는 함수 객체를 callable
// 인스턴스를 생성할 수 있는 함수 객체를 constructor

// ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.

const obj = {
    x: 1,
    func1() {return this.x},
    func2: function() {return this.x}
}

// new obj.func1(); // error
new obj.func2();

// ES6 사양에서 정의한 메서드는 인스턴스를 생성할 수 없는 non constructor 다.
// 따라서 ES6 메서드는 생성자 함수로서 호출할 수 없다.

// ES6 메서드는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

console.log(obj.func1.hasOwnProperty('prototype'));
console.log(obj.func2.hasOwnProperty('prototype'));

// ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]] 를 갖는다.
// super 참조는 내부 슬롯 [[HomeObject]] 를 사용하여 수퍼클래스의 메서드를 참조하므로 내부 슬롯을 갖는 ES6 메서드는 super 키워드를 사용할 수있다.

const base = {
    name: 'inhui',
    sayHi() {
        return 'hello ' + this.name
    }
}

const derived = {
    __proto__ : base,
    sayHi() {
        return super.sayHi() + ' hwo are you doing?'
    }
}

console.log(derived.sayHi())

// ES6 메서드가 아닌 함수는 super 키워드를 사용할 수 없다.
// ES6 메서드가 아닌 함수는 내부 슬롯 [[HomeObject]] 를 갖지 않기 때문이다.

// 이처럼 ES6 메서드는 본연의 기능(super) 을 추가하고 의미적으로 맞지 않는 기능(constructor) 은 제거했다.
// 따라서 메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES6 이전의 방식은 사용하지 않는것이 좋다.


// 화살표 함수

// 화살표 함수는 function 키워드 대신 화살표 => 를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의할 수 있다.
// 화살표 함수는 표현만 간략한 것이 아니라 내부 동작도 기본 함수보다 간략하다.
// 특히 화살표 함수는 콜백 함수 내부에서 this 가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

const obj = {
    name : 'inhui',
    func1() {
        console.log(this.name);
    },
    func2 : () => {
        console.log(this.name);
    }
}

obj.func1();
obj.func2();

function func1() {
    console.log(this);
}

func1()

const func2 = () => {
    console.log(this);
}

func2();


// 함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {} 를 생략할 수 있다.
// 이때 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다.


const a = x => x ** 2;
console.log(a(2))

// return 문을 생략할수있다는 의미

// 객체 리터럴을 반환하는 경우라면

const b = (x,y) => ({x,y});
console.log(b(1,2))


// 즉시 실행 함수로 사용할 수 있다.



// 화살표 함수와 일반 함수의 차이

// 화살표 함수는 인스턴스를 생성할 수 없다. 생성자 함수로 불가능(new)
// 화살표 함수는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입을 생성하지 않는다.

// 중복된 매개변수 이름을 선언할 수 없다.

// 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.

// 따라서 화살표 함수 내부에서 this, arguments, super, new.target 을 참조하면 스코프 체인을 통해 상위 스코프의 this, arguments, super, new.target 을 참조한다.

class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        return arr.map(function(item) {
            return this.prefix + item;
        });
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));


// 프로토타입 메서드 내부의 this 는 메서드를 호출한 객체(Prefixer) 를 가리킨다.
// 그런데 map 의 인수로 전달한 콜백 함수의 내부의 this 는 undefined 를 가리킨다.
// 이는 Array.prototype.map 메서드가 콜백 함수를 일반 함수로서 호출하기 때문이다.

// this 에서 살펴보았듯이 일반 함수에서 호출되는 모든 함수 내부의 this 는 전역 객체를 가리킨다.
// 그런데 클래스 내부의 모든 코드에는 script mode 가 암묵적으로 적용된다.
// 따라서 Array.prototype.map 메서드의 콜백 함수에도 strict mode 가 적용된다.

// 이때 발생하는 문제가 바로 콜백 함수 내부의 this 문제 다.
// 콜백 함수의 this 와 외부 함수의 this 가 서로 다른 값을 가리키고 있기 때무에 TypeErorr 가 발생한 것이다.
// 이와 같은 콜백 함수 내부의 this 문제 를 해결하기 위해 ES6 이전에는 다음과 같은 방법을 사용했다.

class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        const that = this;
        return arr.map(function(item) {
            return that.prefix + item;
        });
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));


class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        return arr.map(function(item) {
            return this.prefix + item;
        }, this);
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));

// 화살표 함수를 사용하여 콜백 함수 내부의 this 문제를 해결할 수 있다.

class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        return arr.map(item => this.prefix + item);
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));

// 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다.
// 따라서 화살표 함수 내부에서 this 를 참조하면 상위 스코프 this 를 그대로 참조한다.
// 이를 lexical this 라 한다.

// 이는 마치 렉시컬 스코프와 같이 화살표 함수의 this 가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.







// this

// 화살표 함수가 일반 함수와 구별되는 가장 큰 특징은 바로 this 다.
// 그리고 화살표 함수는 다른 함수의 인수로 전달되어 콜백 함수로 사용되는 경우가 많다.

// 화살표 함수의 this 는 일반 함수의 this 와 다르게 동작한다.
// 이는 콜백 함수 내부의 this 문제


class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        // return arr.map(function(item) {
        //     return this.prefix + item
        // }, this);

        // return arr.map(function(item) {
        //     return this.prefix + item
        // }.bind(this));

        return arr.map(item => this.prefix + item);
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['a','b']));

// 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다.
// 따라서 화살표 함수 내부에서 this 를 참조하면 상위 스코프의 this 를 그대로 참조한다.
// 이를 lexical this 라 한다.

// 화살표 함수를 제외한 모든 함수에는 this 바인딩이 반드시 존재한다.
// 따라서 ES6 에서 화살표 함수가 도입되기 이전에는 일반적인 식별자 처럼 스코프 체인을 통해 this 를 탐색할 필요가 없었다.
// 하지만 화살표 함수는 함수 자체의 this 바인딩이 존재하지 않는다.
// 따라서 화살표 함수 내부에서 this 를 참조하면 일반적인 식별자 처럼 스코프 체인을 통해 상위 스포크에서 this 를 탐색한다.


(() => console.log(this))();
(function() {return console.log(this)}.bind(this))();

// 만약 화살표 함수와 화살표 함수가 중첩되어 있다면 상위 화살표 함수에도 this 바인딩이 없으므로 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this 를 참조한다.

const foo = () => console.log(this);
foo();

// 메서드를 화살표 함수로 정의하는 것은 피해야 한다.

const person = {
    name: 'lee',
    sayHi: () => console.log(this.name)
}

person.sayHi();

// sayHi 프로퍼티에 할당한 화살표 함수 내부의 this 는 메서드를 호출한 객체인 person 을 가리키지 않고 상위 스코프인 전역의 this 가 가리키는 전역 객체를 가리킨다.
// 따라서 화살표 함수로 메서드를 정의하는 것은 바람직하지 않다.
// 메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.

const person = {
    name: 'lee',
    sayHi() {
        console.log(this.name)
    }
}

person.sayHi();

// 프로토타입 객체의 프로퍼티에 화살표 함수를 할당하는 경우도 동일한 문제가 발생한다.

function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = () => console.log(this.name);

const person = new Person('lee');
person.sayHi();



function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function() {
    console.log(this.name);
}

const person = new Person('lee');
person.sayHi();


function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    sayHi() {
        console.log(this.name);
    }
}

const person = new Person('lee');
person.sayHi();


// arguments

// 화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않는다.
// 따라서 화살표 함수 내부에서 arguments 를 참조하면 this 와 마찬가지로 상위 스코프의ㅏ arguments 를 참조한다.

function func1(...args) {
    const foo = () => {
        console.log(args);
    }
    foo();
}

func1('a','b')


// 매개변수 기본밗
