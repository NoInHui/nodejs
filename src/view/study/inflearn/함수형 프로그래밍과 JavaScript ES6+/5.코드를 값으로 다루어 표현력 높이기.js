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

const go = (...args) => reduce((a,f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

// -----------------------------------------------------------------------------------------------------------------------

const products = [
    {name:'a', price: 1000},
    {name:'b', price: 1500},
    {name:'c', price: 2000},
    {name:'d', price: 15000},
    {name:'e', price: 30000},
];

go(
    0,
    a => a+1,
    a => a+10,
    a => a+100,
    log
);

// const pipe = (...fs) => (a) => go(a, ...fs);

const f = pipe(
    (a,b) => a+b,
    a => a+10,
    a => a+100
)

log(f(1,2))