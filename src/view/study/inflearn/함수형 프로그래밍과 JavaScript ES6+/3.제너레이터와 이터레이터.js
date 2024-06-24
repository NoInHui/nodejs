// Ctrl + Alt + N : 실행

// 제너레이터/이터레이터
// 제너레이터 : 이터레이터이자 이터러블을 생성하는 함수, well formed 이터레이터를 반환하는 함수

function *gen(flag) {
    if(flag) yield 1;
    if(!flag) yield 2;
    if(flag) yield 3;
    return 100; // for of 에서는 안나옴
}

for(const a of gen(false)) console.log(a);
for(const a of gen(true)) console.log(a);

let iter = gen(true);
// console.log(iter == iter[Symbol.iterator]());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());


// odds

function *infinity(i=0) {
    while(true) yield i++;
}

function *limit(l, iter) {
    for(const a of iter) {
        yield a;
        if(a == l) return;
    }
}

function *odds(n) {
    for(const i of limit(n, infinity(1))) {
        if(i%2) yield i;
        if(i==n) return;
    }
}

for(const a of odds(50)) console.log(a);

console.log(...odds(10), ...odds(20));

const [a,b, ...rest] = odds(10);
console.log(a, b, rest)

