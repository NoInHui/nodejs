// console
// 지금까지 사용했던 console 도 노드에서는 window 대신 global 객체 안에 들어 있습니다.
// 브라우저에서의 console 과 거의 비슷합니다.

// console 객체는 보통 디버깅을 위해 사용합니다.
// 개발 중 변수에 값이 제대로 들어 있는지 확인하기 위해 사용하기도 하고, 에러 발생 시 에러 내용을 콘솔에 표시하기 위해서도 사용하며, 코드 실행 시간을 알아보려고 할 때도 사용합니다.
// 대표적으로 console.log 메서드가 있습니다.

const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside: {
            key: 'value'
        }
    }
};

console.time('전체시간');
console.error('error');
console.table([{name:'제로', birth: 1994}, {name: 'hero', birth:1988}]);
console.dir(obj, {color: false, depth: 2});
console.dir(obj, {color: true, depth: 1});

console.time('시간측정');
for(let i=0; i<1e5; i++) {}
console.timeEnd('시간측정');

function b() {
    console.trace('에러위치추적');
}
function a() {
    b();
}
a();
console.timeEnd('전체시간');

// console.time(레이블) : console.timeEnd(레이블) 과 대응되어 레이블을 가진 time 과 timeEnd 사이의 시간을 측정합니다.
// console.log : 평범한 로그를 콘솔에 표시합니다.
// console.error(err) : 에러를 콘솔에 표시합니다.
// console.table(배열) : 배열의 요소로 객체 리터럴을 넣으면, 객체의 속성들이 테이블 형식으로 표현됩니다.
// console.dir(객체, 옵션) : 객체를 콘솔에 표시할 때 사용합니다. 첫 번째 인수로 표시할 객체를 넣고, 두번째 인수로 옵션을 넣습니다.
// 옵션의 colors : true 로 하면 콘솔에 색이 추가되어 보기가 한결 편해집니다.
// depth 는 객체 안의 객체를 몆 단계까지 보여줄지를 결정합니다. 기본값은 2 입니다.
// console.trace(레이블) : 에러가 어디서 발생했는지 추적할 수 있게 합니다.
// 보통은 에러 발생 시 에러 위치를 알려주므로 자주 사용하지 않지만, 위치가 나오지 않는다면 사용할 만합니다.

