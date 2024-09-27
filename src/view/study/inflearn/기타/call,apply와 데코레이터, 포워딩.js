// Ctrl + Alt + N : 실행

// call/apply 와 데코레이터, 포워딩

// 자바스크립트는 함수를 다룰 때 탁월한 유연성을 제공합니다.
// 함수는 이곳저곳 전달될 수 있고 객체로도 사용될 수 있습니다.
// 이번 챕터에선 함수 간에 호출을 어떻게 포워딩 하는지, 함수를 어떻게 데코레이팅 하는지에 대해 알아보겠습니다.

// 코드 변경 없이 캐싱 기능 추가하기

// cpu 를 많이 잡아먹지만 결과는 안정적인 함수 slow(x) 가 있다고 가정해 봅시다.
// 결과가 안정적이라는 말은 x 가 같으면 호출 결과도 같다는 것을 의미합니다.
// slow(x) 가 자주 호출된다면 결과를 어딘가에 저장(캐싱)해 재연산에 걸리는 시간을 줄이고 싶을 겁니다.

// 아래 예시에선 slow() 안에 캐싱 관련 코드를 추가하는 대신, 래퍼 함수를 만들어 캐싱 기능을 추가할 예정입니다.
// 곧 정리하겠지만, 이렇게 래퍼 함수를 만들면 여러 가지 이점이 있습니다.

// function slow(x) {
//     console.log(`slow(${x})을/를 호출함`);
//     return x;
// }

// function cachingDecorator(func) {
//     let cache = new Map();

//     return function(x) {
//         if(cache.has(x)) {
//             return cache.get(x);
//         }

//         let result = func(x);
//         cache.set(x, result);
//         return result;
//     }
// }

// slow = cachingDecorator(slow);

// console.log(slow(1));
// console.log(slow(1));
// console.log(slow(2));
// console.log(slow(2));

// cachingDecorator 같이 인수로 받은 함수의 행동을 변경시켜주는 함수를 데코레이터(decorator) 라고 부릅니다.

// 모든 함수를 대상으로 cachingDecorator 를 호출 할 수 있는데, 이때 반환되는 것은 캐싱 래퍼입니다.
// 함수에 cachingDecorator 를 적용하기만 하면 캐싱이 가능한 함수를 원하는 만큼 구현할 수 있기 때문에 데코레이터 함수는 아주 유용하게 사용됩니다.

// 캐싱 관련 코드를 함수 코드와 분리할 수 있기 때문에 함수의 코드가 간결해진다는 장점도 있습니다.

// cachingDecorator(func) 를 호출하면 래퍼(wrapper) function(x) 가 반환됩니다.
// 래퍼 function(x) 는 func(x) 의 호출 결과를 캐싱 로직으로 감쌉니다.

// 바깥 코드에서 봤을 때, 함수 slow 는 래퍼로 감싼 이전이나 이후나 동일한 일을 수행합니다.
// 행동 양식에 캐싱 기능이 추가된 것뿐입니다.

// slow 본문에 수정하는 것보다 독립된 래퍼 함수 cachingDecorator 를 사용할 때 생기는 이점을 정리하면 다음과 같습니다.

// cachingDecorator 를 재사용 할 수 있습니다. 원하는 함수 어디에든 cachingDecorator 를 적용할 수 있습니다.
// 캐싱 로직이 분리되어 slow 자체의 복잡성이 증가하지 않습니다.
// 필요하다면 여러 개의 데코레이터를 조합해서 사용할 수도 있습니다.


// func.call 를 사용해 컨텍스트 지정하기

// 위에서 구현한 데코레이터는 객체 메서드에 사용하기엔 적합하지 않습니다.

// 객체 메서드 work.sow() 는 데코레이터 적용 후 제대로 동작하지 않죠.

let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        console.log(`slow(${x})을/를 호출함`);
        return x * this.someMethod();
    }
}

function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {
        if(cache.has(x)) {
            return cache.get(x);
        }

        let result = func.call(this,x);
        cache.set(x, result);
        return result;
    }
}

// console.log(worker.slow(1));

worker.slow = cachingDecorator(worker.slow);

console.log(worker.slow(2));

// 명확한 이해를 위해 this 가 어떤 과정을 거쳐 전달되는지 자세히 살펴보겠습니다.
// 1. 데코레이터를 적용한 후에 worker.slow 는 래퍼 function(x) {...} 가 됩니다.
// 2. worker.slow(2) 를 실행하면 래퍼는 2를 인수로 받고, this=worker 가 됩니다. (점 앞의 객체)
// 3. 결과가 캐시되지 않은 상황이라면 func.call(this,x) 에서 현재 this 와 인수를 원본 메서드에 전달합니다.





// this.someMethod 접근에 실패했기 때문에 에러가 발생했습니다.
// 원인은 래퍼가 기존 함수 func(x) 를 호출하면 this 가 undefined 되기 때문입니다.

let func = worker.slow;
// func(2);

// 리퍼가 기존 메서드 호출 결과를 전달하려 했지만 this 의 컨텍스트가 사라졌기 때문에 에러가 발생하는 것이죠.
// 에러가 발샏ㅇ하지 않게 코드를 수정해 봅시다.
// 먼저 this 를 명시적으로 고정해 함수를 호출할 수 있게 해주는 특별한 내장 함수 메서드 func.call(context, ...args) 에 대해 알아봅시다.
// 메서드를 호출하면 메서드의 첫 번째 인수가 this 이어지는 인수가 func 의 인수가 된 후 func 를 호출합니다.

console.log(func.call(worker, 2));


function say(phrase) {
    console.log(this.name + ' : ' + phrase);
}

let user = {name: 'inhui'};

say.call(user, 'Hello');



// 여러 인수 전달하기

// cachingDecorator 를 좀 더 다채롭게 해봅시다.
// 지금 상태론 인수가 하나뿐인 함수에만 cachingDecorator 를 적용할 수 있습니다.
// 복수 인수를 가진 메서드 worker.slow 를 캐싱하려면 어떻게 해야 할지 생각해 봅시다.

let worker = {
    slow(...args) {
        return args.reduce((acc,cur) => {
            acc += cur;
            return acc;
        },0);
    }
};

function slow(...args) {
    return args.reduce((acc,cur) => {
        acc += cur;
        return acc;
    },0);
}

function cachingDecorator(func) {
    let cache = new Map();
    return function(...args) {
        let key = args.join(',');
        if(cache.has(key)) {
            return cache.get(key);
        }
        let result = func.call(this, ...args);
        cache.set(key, result);
        return result;
    }
}

worker.slow = cachingDecorator(worker.slow);
slow = cachingDecorator(slow);

console.log(slow(3,5));
console.log(slow(3,5));
console.log(slow(3,5));

console.log(worker.slow(3,5));
console.log(worker.slow(3,5));
console.log(worker.slow(3,5));
console.log(worker.slow(3,5,8,9));
console.log(worker.slow(3,5,8,9));


// func.apply
// 그런데 여기서 func.call 대신 func.apply 를 사용해도 됩니다.

// call 과 apply 의 문법적 차이는 call 이 복수 인수를 따로따로 받는 대신 apply 는 인수를 유사배열객체로 받는다는 점뿐입니다.

// func.call(context, ...args);
// func.apply(context, args);

// 그런데 약간의 차이가 있긴 합니다.
// 전개구문 ... 은 이터러블 args 을 분해해 call 에 전달할 수있도록 해줍니다.
// apply 는 오직 유사배열형태의 args 만 받습니다.

// 이 차이만 빼면 두 메서드는 완전히 동일하게 동작합니다.
// 인수가 이터러블 형태라면 call 을, 유사 배열 형태라면 apply 를 사용하면 됩니다.

// 배열같이 이터러블이면서 유사 배열인 객체엔 둘 다를 사용할 수 있는데, 대부분의 자바스크립트 엔진은 내부에서 apply 를 최적화 하기 때문에 apply 를 사용하는게 좀 더 빠르긴 합니다.

// 이렇게 컨텍스트와 함께 인수 전체를 다른 함수에 전달하는 것을 콜 포워딩(call forwarding) 이라고 합니다.

// 가장 간단한 형태의 콜 포워딩은 다음과 같습니다.

let wrapper = () => {
    return func.apply(this, arguments);
}



function hash() {
    return [].join.call(arguments);
}

// arguments 는 진짜 배열이 아니고 이터러블 객체나 유사 배열 객체이기 때문에 오류가 납니다.

console.log(hash(1,5));


// 데코레이터와 함수 프로퍼티
// 함수 또는 메서드를 데코레이터로 감싸 대체하는 것은 대체적으로 안전합니다.
// 그런데 원본 함수에 func.calledCount 등의 프로퍼티가 있으면 데코레이터를 적용한 함수에선 프로퍼티를 사용할 수 없으므로 안전하지 않습니다.
// 함수에 프로퍼티가 있는 경우엔 데코레이터 사용에 주의해야 합니다.
// 몆몆 데코레이터는 자신만의 프로퍼티를 갖기도 합니다.
// 데코레이터는 함수가 얼마나 많이 호출되었는지 세거나 호출 시 얼마나 많은 시간이 소모되었는지 등의 젖ㅇ보를 래퍼의 프로퍼티에 저장할 수 있습니다.



function work(a,b) {
    console.log(a+b);
}

function spy(func) {
    wrapper.calls = [];

    function wrapper(...args) {
        wrapper.calls.push(args);
        func(...args);
    }

    return wrapper;
}

work = spy(work);
work(1,2);
work(4,5);

for(let args of work.calls) {
    console.log('call:' + args.join())
}


function f(...x) {
    console.log(this);
    console.log(x.join());
}

function delay(func, ms) {
    return function(...arg) {
        setTimeout(() => func.apply(this,arg), ms);
    }
}

let f1000 = delay(f, 3000);
f1000('test1');


let f1500 = delay(f, 1500);


f1500('test2');

