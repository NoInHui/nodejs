const fs = require('fs');

exports.fetchTest = async function(req, res) {
    return res.status(200).json({ id: '200', message: 'success', result: '1'});
    // return res.status(400).json({ id: '400', message: 'error'});
}

exports.fetchTest2 = async function(req, res) {
    return res.status(200).json({ id: '200', message: 'success', result: '2'});
    // return res.status(400).json({ id: '400', message: 'error'});
}

exports.fetchTest3 = async function(req, res) {
    return res.status(200).json({ id: '200', message: 'success', result: '3'});
    // return res.status(400).json({ id: '400', message: 'error'});
}

exports.fetchTest4 = async function(req, res) {
    return res.status(200).json({ id: '200', message: 'success', result: '4'});
    // return res.status(400).json({ id: '400', message: 'error'});
}

exports.requestTest1 = async function(req, res) {
    console.log('requestTest1');
    console.log(req);
    return res.status(200).json({ id: '200', message: 'success', result: 'requestTest1'});
}

exports.getTodos = async function(req, res) {
    try {
        let id = req.params.id;
        let fileInfo = fs.readFileSync(`public/save/todo.json`, 'utf8');
        fileInfo = JSON.parse(fileInfo);
        if(id) fileInfo = fileInfo.todos.find(v => v.id == id);
        return res.status(200).json(fileInfo.todos);
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}

exports.postTodos = async function(req, res) {
    try {
        let body = req.body;
        let fileInfo = fs.readFileSync(`public/save/todo.json`, 'utf8');
        fileInfo = JSON.parse(fileInfo);
        fileInfo.todos.push(body);
        return res.status(200).json(fileInfo.todos);
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}

exports.putTodos = async function(req, res) {
    try {
        let id = req.params.id;
        let body = req.body;
        let fileInfo = fs.readFileSync(`public/save/todo.json`, 'utf8');
        fileInfo = JSON.parse(fileInfo);
        return res.status(200).json([body]);
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}

exports.patchTodos = async function(req, res) {
    try {
        let id = req.params.id;
        let body = req.body;
        let fileInfo = fs.readFileSync(`public/save/todo.json`, 'utf8');
        fileInfo = JSON.parse(fileInfo);
        let searchTodo = fileInfo.todos.find(v => v.id == id);
        if(searchTodo) searchTodo.complete = body.complete;

        return res.status(200).json(fileInfo.todos);
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}

exports.deleteTodos = async function(req, res) {
    try {
        let id = req.params.id;
        let fileInfo = fs.readFileSync(`public/save/todo.json`, 'utf8');
        fileInfo = JSON.parse(fileInfo);
        fileInfo.todos = fileInfo.todos.filter(v => v.id != id);
        return res.status(200).json(fileInfo.todos);
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}