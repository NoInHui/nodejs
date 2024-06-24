// Ctrl + Alt + N : 실행

const products = [
    {name:'a', price: 1000},
    {name:'b', price: 1500},
    {name:'c', price: 2000},
    {name:'d', price: 15000},
    {name:'e', price: 30000},
];

// map
const map = (f, iter) => {
    let res = [];
    for(const p of iter) {
        res.push(f(p));
    }
    return res;
}

// console.log(map(p => p.name, products));
// console.log(map(p => p.price, products));

// 이터러블 프로토콜을 따른 map 의 다형성

// document.querySelectorAll('*').map(v => v.nodeName); -> error
// map(v => v.nodeName, document.querySelectorAll('*'));


function *gen() {
    yield 2;
    yield 4;
    yield 6;
}

console.log(map(v => v*v, gen()));

// array 의 map function 을 못쓰는 경우가 많은데 이렇게 하면 다 대처가 가능함

const map = (f, iter) => {
    let res = [];
    for(const p of iter) {
        res.push(f(p));
    }
    return res;
}

let m = new Map();
m.set('a',10);
m.set('b',20);

// console.log(m.map(v => v));
console.log(new Map(map(([k,a])=> [k,a*a], m)));




const products = [
    {name:'a', price: 1000},
    {name:'b', price: 1500},
    {name:'c', price: 2000},
    {name:'d', price: 15000},
    {name:'e', price: 30000},
];

// filter

const filter = (f,iter) => {
    let res = [];
    for(const p of iter) {
        if(f(p)) res.push(p);
    }
    return res;
}

console.log(filter(p => p.price > 2000, products));

console.log(
    filter(n => n%2, function*() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
    }())    
)


// reduce

const products = [
    {name:'a', price: 1000},
    {name:'b', price: 1500},
    {name:'c', price: 2000},
    {name:'d', price: 15000},
    {name:'e', price: 30000},
];

const reduce = (f, acc, iter) => {
    if(!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for(const a of iter) {
        acc = f(acc,a);
    }
    return acc;
};

const add = (acc,cur) => acc+cur;

console.log(reduce(add, 0, [1,2,3,4,5]));
console.log(reduce(add,[1,2,3,4,5]));


console.log(reduce((acc,cur) => acc += cur.price, 0, products));


