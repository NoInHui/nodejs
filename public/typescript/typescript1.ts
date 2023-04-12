// cd C:\Users\inhui\Documents\GitHub\nodejs\public\typescript
// tsc typescript1.ts
// tsc -w

// 소개

// 프로그램이 유용하려면 숫자, 문자열, 구조체, 불린 값과 같은 간단한 데이터 단위가 필요합니다.
// TypeScript 는 JavaScript 와 거의 동일한 데이터 타입을 지원하며, 열거 타입을 사용하여 더 편리하게 사용할 수 있습니다.


// Boolean

let boolean1: boolean = false;


// Number

let number1: number = 10;


// String

let string1: string = '123';


// Array

let arr1: number[] = [1,2,3];
let arr2: string[] = ['1','2','3'];
// 제네릭 배열 타입
let arr3: Array<number> = [1,2,3];


// 튜플(Tuple)

let tuple1: [string, number] = ['hello', 10];

// 열거(Enum)
// JAVA 에선 서로 연관된 상수들의 집합을 의미
enum Enum1 {Red, Green, Blue};
let obj1: Enum1 = Enum1.Green;
let obj2: string = Enum1[2];

console.log(obj1,obj2);


// Any
// 애플리케이션을 만들 때 알지 못하는 타입을 표현해야 할 수도 있습니다.
// 이 값들은 사용자로부터 받은 데이터나 서드 파티 라이브러리 같은 동적인 컨텐츠에서 올 수도 있습니다.
// 이 경우 타입 검사를 하지 않고, 그 값들이 컴파일 시간에 검사를 통과하길 원합니다.
// 이를 위해 any 타입을 사용할 수 있습니다.

let any1: any = 4;
console.log(Object.getPrototypeOf(any1), any1); // number
any1 = '1234';
console.log(Object.getPrototypeOf(any1), any1); // string

// 또한 any 타입은 타입의 일부만 알고 전체는 알 지 못할 때 유요합니다.
// 예를 들어 여러 다른 타입이 섞인 배열을 다룰 수 있습니다.

let arr4: any[] = [1,true,'1234'];
console.log(arr4);


// Void
// void 는 어떤 타입도 존재할 수 없음을 나타내기 때문에, any 의 반대 타입 같습니다.
// void 는 보통 함수에서 반환 값이 없을때 반환 타입을 표현하기 위해 쓰이는 것을 볼 수 있습니다.

function func1(): void {
    console.log('func1');
}

// void 를 타입 변수로 선언하는 것은 유용하지 않은데, 왜냐하면 그 변수는 null 또는 undefined 만 할당할 수 있기 때문입니다.
// null 은 --strictNullChecks을 사용하지 않을 때만 해당 (strictNullChecks : false)

let void1: void = undefined;
// void1 = null; 


// Null and Undefined
// typescript 는 undefined, null 둘 다 각각 자신의 타입 이름으로 undefined, null 을 사용합니다.
// void 처럼 그 자체로 유용한 경우는 거의 없습니다.

let undefined1: undefined = undefined;
let null1: null = null;

// Never
// never 타입은 절대 발생할 수 없는 타입을 나타냅니다.
// 예를 들어, never 는 함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 않는 반환 타입으로 쓰입니다.
// 변수 또한 타입 가드에 의해 아무 타입도 얻지 못하게 좁혀지면 never 타입을 얻게 될 수 있습니다.
// never 타입은 모든 타입에 할당 가능한 하위 타입입니다.
// 하지만 어떤 타입도 never 에 할당할 수 있거나, 하위 타입이 아닙니다.
// 심지어 any 도 never 에 할당할 수 없습니다.

// never 를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function func2(message: string): never {
    throw new Error(message);
}

// 반환 타입이 never 로 추론된다.
function func3() {
    return func2('error');
}

// never 를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function func4(): never {
    while(true) {}
}


// 객체(Object)
// object 타입을 쓰면, object.create 같은 API 가 더 잘 나타납니다.

function create(o: object | null): void {};
create({prop: 0});
create(null);
// create(42); // error


// 타입 단선(Type assertions)
// 타입 단언은 컴파일러에게 '날 믿어, 난 내가 뭘 하고 있는지 알아' 라고 말해주는 방법입니다.
// 타입 단언은 다른 언어의 타입 변환과 유사하지만, 다른 특별한 검사를 하거나 데이터를 재구성하지는 않습니다.
// 이는 런타임에 영향을 미치지 않으며, 온전히 컴파일러만 이를 사용합니다.

let value1: any = 'inhui';

// 1. angle-bracket 문법
let value2: number = (<string>value1).length;

// 2. as 문법
let value3: number = (value1 as string).length;

// 두 예제 동일합니다. 어떤 것을 사용할지는 주로 선호에 따른 선택입니다.
// 하지만 typescript 를 jsx 와 함께 사용할 때는, as 스타일의 단언만 허용됩니다.

