// Ctrl + Alt + N : 실행

const log = console.log;


// ------------------------------------------------------------------------------------

function addMaker(a) {
    return function(b) {
        return a+b;
    }
}

const add10 = addMaker(10);
log(add10(20));
log(add10(20));

const add20 = addMaker(20);
log(add20(20));
log(add20(20));

function f4(f1,f2,f3) {
    return f3(f1() + f2());
}

let a = f4(
    () => 2,
    () => 1,
    (a) => a*a
);

log(a);

