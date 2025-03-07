// Ctrl + Alt + N : 실행
const log = console.log;

const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry(
    (f,acc,iter) => {
        if(!iter) {
            iter = acc[Symbol.iterator]();
            acc = iter.next().value;
        }
        for(const a of iter) {
            acc = f(acc,a);
        }
        return acc;
    }
);

const go = (...args) => reduce((a,f) => f(a), args);

const pipe = (f,...fs) => (...args) => go(f(...args), ...fs);

const range = l => {
    let i = -1;
    let res = [];
    while(i++ < l) {
        res.push(i);
    }
    return res;
}

const add = (a,b) => a+b;
let list = range(100);
log(list);
log(reduce(add,list));

const L = {};

L.range = function *(l) {
    let i = -1;
    let res = [];
    while(i++ < l) {
        yield i
    }
    return res;
}

let list2 = L.range(100);
log(list2);
log(reduce(add,list2));



const map = curry(
    (f,iter) => {
        let res = [];
        for(const a of iter) {
            res.push(f(a))
        }
        return res;
    }
);

L.map = curry(
    function *(f,iter) {
        for(const a of iter) {
            yield f(a);
        }
    }
);

const filter = curry(
    (f,iter) => {
        let res = [];
        for(let a of iter) {
            if(f(a)) res.push(a);
        }
        return res;
    }
);

L.filter = curry(
    function *(f,iter) {
        for(const a of iter) {
            if(f(a)) yield a;
        }
    }
);

const take = curry(
    (l, iter) => {
        let res = [];
        for(const a of iter) {
            res.push(a);
            if(res.length == l) return res;
        }
        return res;
    }
);

const products = [
    {name: 'a', price: 10000},
    {name: 'b', price: 20000},
    {name: 'c', price: 15000},
    {name: 'd', price: 30000},
    {name: 'e', price: 25000},
];