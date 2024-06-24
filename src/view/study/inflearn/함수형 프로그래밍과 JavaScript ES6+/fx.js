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

export {log, map, filter, reduce};