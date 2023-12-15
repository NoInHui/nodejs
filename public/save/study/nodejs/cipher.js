// 양방향 암호화

// 암호화된 문자열을 복호화할 수 있으며, 키라는 것이 사용됩니다.
// 대칭형 암호화에서는 암호를 복호화하려면 암호화할 때 사용한 키와 같은 키를 사용해야 합니다.

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456';

const cipher = crypto.createCipheriv(algorithm, key, iv);
let result = cipher.update('암호화할 문장', 'utf8', 'base64');
result += cipher.final('base64');

console.log('암호화', result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');

console.log('복호화', result2);