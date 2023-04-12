// cd C:\Users\inhui\Documents\GitHub\nodejs\public\typescript
// tsc typescript2.ts

// 인터페이스

// typescript 의 핵심 원칙 중 하나는 타입 검사가 값의 형태에 초점을 맞추고 있다는 것입니다.
// 인터페이스는 이런 타입들의 이름을 짓는 역할을 하고 코드 안의 계약을 정 의하는 것뿐만 아니라 프로젝트 외부에서 사용하는 코드의 계약을 정의하는 강력한 방법입니다.

interface interface1 {
    label: string;
}


function func5(param: interface1) : object {
    return param;
}

console.log(func5({label: '123'}));
// console.log(func5({label: '123', label2: 123}));
let param1 = {label: '123', label2: 123};
console.log(func5(param1));
let param2 = {label2: 123};
// console.log(func5(param2));

// 여기서 중요한 것은 형태뿐입니다.
// 함수에 전달된 객체가 나열된 요구 조건을 충족하면 허용합니다.

// 타입 검사는 프로퍼티들의 순서를 요구하지 않습니다.
// 단지 인터페이스가 요구하는 프로퍼티들이 존재하는지와 프로퍼티들이 요구하는 타입을 가졌는지만 확인합니다 


// 선택적 프로퍼티 (Optional Properties)
// 인터페이스의 모든 프로퍼티가 필요한 것은 아닙니다.
// 어떤 조건에서만 존재하거나 아예 없을 수도 있습니다.

interface interface2 {
    a?: string;
    b?: number;
    c: number[];
}


let obj3: interface2 = {
    a: '123', // a,b 는 선택적이기 때문이 없어도 오류가 발생하지 않음
    c : [1,2,3], // c 는 반드시 있어야함
};

// 읽기전용 프로퍼티 (Readonly properties)
// 일부 프로퍼티들은 객체가 처음 생성될 때만 수정이 가능해야합니다.
// 프로퍼티 이름 앞에 readonly 를 넣어서 이를 지정할 수 있습니다.
// 순수 javascript 면 .. get 접근자만 사용해서 가져온다는 뜻이겠지?

interface interface3 {
    readonly a: string;
    readonly b: number;
    c: string;
}

let obj4: interface3 = {
    a: 'test1',
    b: 123,
    c: 'test2'
};

// obj4.a = 'test3'; 

// typescript 에서는 모든 변경 메서드가 제거된 Array<T> 와 동일한 ReadonlyArray<T> 타입을 제공합니다.

let arr5: ReadonlyArray<string> = ['1','2'];
// 타입 단언(type assertion)으로 오버라이드 하는 것은 가능합니다.
let arr6 = arr5 as string[];
arr6[0] = '3';
arr6[1] = '1';

// readonly VS const
// 변수는 const 를 사용하고, 프로퍼티는 readonly 를 사용합니다.


// 함수 타입(Function Types)
// 인터페이스는 함수 타입을 설명할 수 있습니다.

interface interface4 {
    (a: string, b: string): boolean;
}

let func6: interface4 = function(param1: string, param2: string) : boolean {
    return false;
}

// 올바른 함수 타입 검사를 위해, 매개변수의 이름이 같을 필요는 없습니다.
// 함수 매개변수들은 같은 위치에 대응되는 매개변수끼리 한번에 하나씩 검사합니다.

// interface4 타입의 변수로 직접 함수 값이 할당되었기 때문에 typescript의 문맥상 타이핑이 인수 타입을 추론할 수 있습니다.
let func7: interface4 = function(param1, param2) {
    // param1 = 123; // error
    return true;
}




// 클래스 타입(class Types)

interface interface5 {
    currentTime: Date;
    setTime(d: Date): void;
}

class class1 implements interface5 {
    currentTime: Date = new Date();
    setTime(d: Date): void {
        this.currentTime = d;
    }
    constructor(h: number, m: number) {}
}

// 인터페이스는 클래스의 public 과 private 모두보다는 public 을 기술합니다.
// 클래스 인스턴스의 private 에서는 특정 타입이 있는지 검사할 수 없습니다.


// 인터페이스 확장하기
// 인터페이스들도 확장이 가능합니다.
// 이는 한 인터페이스의 멤버를 다른 인터페이스에 복사하는 것을 가능하게 해주는데, 인터페이스를 재사용성 높은 컴포넌트로 쪼갤 때, 유연함을 제공해줍니다.

interface interface6 {
    a: string;
}

interface interface7 extends interface6 {
    b: number;
}

// 인터페이스는 여러 인터페이스를 확장할 수 있어, 모든 인터페이스의 조합을 만들어낼 수 있습니다.
interface interface8 extends interface6, interface7 {
    c: boolean;
}

let obj5: interface8 = {
    a:'test',
    b:123,
    c:true,
};


// 하이브리드 타입(Hybrid Types)
// 인터페이스는 실제 javascript 세계에 존재하는 다양한 타입들을 기술할 수 있습니다.
// javascript 의 동적이고 유연한 특성 때문에, 위에서 설명했던 몆몆 타입의 조합으로 동작하는 객체를 가끔 마주할 수 있습니다.
// 그러한 예제 중 하나는 추가적인  프로퍼티와 함께, 함수와 객체 역할 모두 수행하는 객체입니다.

interface interface9 {
    (start: number): string;
    interval: number;
    reset(): void;
}

function func8() : interface9 {
    let counter = (function(start: number) {}) as interface9;
    counter.interval = 123;
    counter.reset = function() {};
    return counter;
}

let obj6 = func8();


