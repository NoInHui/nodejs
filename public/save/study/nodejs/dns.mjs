// DNS 를 다룰 떄 사용하는 모듈입니다.
// 주로 도메인을 통해 IP 나 기타 DNS 정보를 얻고자 할 때 사용합니다.

import dns from 'dns/promises';

const ip = await dns.lookup('sbjgvc.net');
console.log(ip)

const a = await dns.resolve('sbjgvc.net', 'A');
console.log(a);

const mx = await dns.resolve('sbjgvc.net', 'MX');
console.log(mx);