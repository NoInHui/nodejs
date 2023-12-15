// 노드에서 지원하는 pbkdf2 를 알아보겠습니다.
// pbkdf2 는 간단히 말하면 기존 문자열에 salt 라고 불리는 문자열을 붙인 후 해시 알고리즘을 반복해서 적용하는 겁니다.

const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password', key.toString('base64'));
    });
});

// randomBytes() 메서드로 64바이트 기링의 문자열을 만듭니다.
// 이것이 salt 가 됩니다.

// pbkdf2() 메서드에는 순서대로 비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘을 인수로 넣습니다.
// 예시에서는 10만번 반복해서 적용한다고 했습니다.
// 즉, sha512 로 변환된 결괏값을 다시 sha512 로 변환하는 과정을 10만번 반복한겁니다.

// randomBytes 이므로 매번 실행할 때마다 결과가 달라집니다.
// 따라서 salt 를 잘 보관하고 있어야 비밀번호도 찾을 수 있습니다.

