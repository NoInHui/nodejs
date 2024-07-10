// Ctrl + Alt + N : 실행
const log = console.log;

// 배열 분해

// let arr = ['123', '456'];

// let [a, b] = arr;
// log(a,b);


// 할당 연산자 우측엔 모든 이터러블이 올 수 있습니다.
// let [a,b,c] = 'abc'
// log(a,b,c)
// let [one, two, three] = new Set([1,2,3]);
// log(one,two,three);

// ... 로 나머지 요소 가져오기

// let [a,b,c,...r] = [1,2,3,4,5,6,7];

// log(a,b,c);
// log(r);

// 기본값
// 할당하고자 하는 변수의 개수가 분해하고자 하는 배열의 길이보다 크더라도 에러가 발생하지 않습니다.
// 할당할 값이 없으면 undeinfed 취급되기 떄문입니다.

// let [a,b,c=1] = [];
// log(a,b,c);

// let user = {
//     name: "John",
//     years: 30
// };

// let {name, years:age, isAdmin=false} = user;

// log(name, age, isAdmin);

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

function topSalary(obj) {

}