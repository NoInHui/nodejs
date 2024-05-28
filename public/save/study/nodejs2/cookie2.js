const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const parseCookies = (cookie = '') => {
    cookie.split(';').map(v => v.split('=')).reduce((acc, [k,v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    },{})
}

http.createServer(async (req,res) => {
    const cookies = parseCookies(req.headers.cookie);
    if(req.url.startsWith('/login')) {
        const url = new URL(req.url, 'http://localhost:8084');
        const name = url.searchParams.get('name');
        const expires = new Date();
        expires.setMinutes(expires.getMinutes+5);

        res.writeHead(302, {
            Location: '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        })

        res.end();

    }
})
.listen(8084, () => {
    console.log('8084 on');
})