// Ctrl + Alt + N : 실행
const log = console.log;

// 정규표현식은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어
// 

// const tel = '010-2234-0527';

// const regExp = /^\d{3}-\d{4}-\d{4}$/;

// log(regExp.test(tel));

// const regExp2 = /is/i;
// log(regExp2.test('is this all there is?'));
// const regExp3 = new RegExp(/is/i);
// log(regExp3.test('is this all there is?'));

// const count = (str,char) => (str.match(new RegExp(char,'gi')) ?? []).length;
// log(count('is thie all there is?','is'));


// 정규표현식을 사용하는 메서드는
// RegExp.prototype.exec
// RegExp.prototype.test
// String.prototype.match
// String.prototype.replace
// String.prototype.search
// String.prototype.split

// RegExp.prototype.exec
// exec 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다.
// 매칭 결과가 없을 경우 null 을 반환

// const target = 'Is this all there is?';
// const regExp = /is/g;

// log(regExp.exec(target));

// RegExp.prototype.test
// test 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 boolean 값으로 반환

// const target = 'Is this all there is?';
// const regExp = /is/;

// log(regExp.test(target))

// String.prototype.match
// String 표준 빌트인 객체가 제공하는 match 메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환환다.

// 플래그
// 패턴과 함께 정규 표현식을 구성하는 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다.
// 플래그는 총 6개 있다.
// i (ignore case) 대소문자 구별하지 않고 패턴을 검색한다.
// g (global) 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
// m (multi line) 문자열의 행이 바뀌더라도 패턴 검색을 계속한다.

// 플래그는 옵션이므로 선택적으로 사용할수있음
// 순서와 상관없이 하나 이상의 플래그를 동시에 설정할수도 있다.
// 어떠한 플래그는 사용하지 않은 경우 대소문자를 구별해서 패턴을 검색한다.
// 그리고 문자열에 패턴 검색 매칭 대상이 1개 이상 존재해도 첫 번째 매칭한 대상만 검색하고 종료한다.

// const target = 'Is this all there is?';
// log(target.match(/is/));
// log(target.match(/is/i));
// log(target.match(/is/g));
// log(target.match(/is/gi));

// 패턴
// 정규 표현식은 일정한 규칙을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어
// 정규 표현식은 패턴과 플래그로 구성된다.
// 패턴은 / 로 열고 닫으며 문자열의 따옴표는 생략한다.
// 따옴표를 포함하면 따옴표까지도 패턴에 포함되어 검색된다.
// 또한 패턴은 특별한 의미를 가지는 메타문자 또는 기호로 표현할 수 있다.
// 어떤 문자열 내에 패턴과 일치하는 문자열이 존재할 때 정규 표현식과 매치 한다고 표현한다.
// 패턴을 표현하는 몆가지 방법에 대해 살펴보자.

// 문자열 검색
// 정규표현식의 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열을 검색한다.
// 물론 정규 표현식을 생성하는 것만으로 검색이 수행되징 ㅏㄶ는다.

// 임의의 문자열 검색
// . 은 임의의 문자 한 개를 의미한다. 문자의 내용은 무엇이든지 상관없다.

// const target = 'Is this all there is?';
// const regExp = /.../g;

// log(target.match(regExp));

// 반복 검색
// {m,n} 은 앞선 패턴이 최소 m 번 최대 n 번 반복되는 문자열의 의미한다.
// 콤마 뒤에 공색이 있으면 정상 동작하지 않음

const target = 'A AA B BB Aa Bb AAA';
const regExp = /A{1,2}/ig;
const regExp2 = /A{2}/ig;

log(target.match(regExp))
log(target.match(regExp2))

// + 는 앞선 패턴이 최소 한번 이상 반복되는 문자열의 의미한다. 즉 + 는 {1} 과 같다.

// ? 는 앞선 패턴이 최대 한번 이상 반복되는 문자열의 의미한다. 즉 ? 는 {0,1} 과 같다.