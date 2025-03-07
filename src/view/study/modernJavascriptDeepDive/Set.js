// Ctrl + Alt + N : 실행
const log = console.log;

// Set 객체는 중복되지 않은 유일한 값들의 집합

// Set 객체의 특성은 수학적 집합의 특성과 일치한다.
// Set 은 수학적 집합을 구현하기 위한 자료구조이다.

// 따라서 Set 을 통해 교집합,합집합,여집합 등을 구현할 수 있다.



// const uniq = array => [...new Set(array)];

// log(uniq([1,1,1,2,3,4,2,3,8,7,8]));

// Set 객체는 수학적 집합을 구현하기 위한 자료구조다.
// 따라서 Set 객체를 통해 교집합, 합집합, 차집합 등을 구현할 수 있다.

Set.prototype.intersection = function(set) {
    const result = new Set();
    for(const value of set) {
        if(this.has(value)) result.add(value);
    }
    return result;
}

Set.prototype.union = function(set) {
    const result = new Set(this);
    for(const value of set) {
        result.add(value);
    }
    return result;
}

Set.prototype.difference = function(set) {
    const result = new Set(this);
    for(const value of set) {
        result.delete(value)
    }
    return result;
}

const set1 = new Set([1,2,3,4]);
const set2 = new Set([2,4,8,9,1]);
log(set1.intersection(set2));
log(set1.union(set2));
log(set1.difference(set2));

