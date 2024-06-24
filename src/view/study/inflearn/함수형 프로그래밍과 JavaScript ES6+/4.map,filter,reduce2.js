// Ctrl + Alt + N : 실행

const log = console.log;

const map = (f, iter) => {
    let res = [];
    for(const o of iter) {
        res.push(f(o));
    }
    return res;
}

const filter = (f,iter) => {
    let res = [];
    for(const o of iter) {
        if(f(o)) res.push(o);
    }
    return res;
}

const reduce = (f, acc, iter) => {
    if(!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for(const o of iter) {
        acc = f(acc,o)
    }
    return acc;
}

// -----------------------------------------------------------------------------------------------------------------------

const products = [
    {name:'a', price: 1000},
    {name:'b', price: 1500},
    {name:'c', price: 2000},
    {name:'d', price: 15000},
    {name:'e', price: 30000},
];

const prices = reduce((acc,cur) => acc+cur, 0, map(v => v.price, filter(v => v.price < 20000, products)));

log(prices);