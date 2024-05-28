const http = require('http');
const fs = require('fs').promises;
const path = require('path');

http.createServer(async (req,res) => {
    try {
        if(req.method === 'GET') {
            if(req.url === '/') {
                 
            } else if(req.url === '/about') {

            } else if(req.url === '/users') {

            }
        } else if(req.method === 'POST') {

        } else if(req.method === 'PUT') {

        }
    } catch(e) {

    }
})