const fs = require('fs');

exports.main = async function(req, res) {
    const {page = 'careerCalculator/careerCalculator'} = req.body;
    res.render('main/main',{page});
}

exports.careerCalculator = async function(req, res) {
    const {pageName} = req.query;
    res.render('careerCalculator/careerCalculator', {pageName});
}

exports.editor = async function(req, res) {
    const {pageName} = req.query;
    res.render('editor/editor', {pageName});
}

exports.uploadPage = async function(req, res) {
    res.render('upload/upload');
}

exports.study = async function(req, res) {
    const {category, page} = req.params;
    const {pageName} = req.query;
    res.render(`study/${category}/${page}`, {category, page, pageName});
}

exports.noRedirect = async function(req, res) {
    res.render('noRedirect');
}

exports.saveFile = async function(req, res) {
    const param = req.body;
    try {
        fs.writeFileSync(`${param.filePath}${param.fileName}`,param.fileInfo, 'utf8');
        return res.status(200).json({ id: '200', message: 'success'});
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}

exports.loadFileList = async function(req, res) {
    try {
        const param = req.body;
        let fileList = fs.readdirSync(param.filePath);
        let fileData = new Array();
        for await (fileName of fileList) {
            let fileInfo = fs.readFileSync(`${param.filePath}${fileName}`, 'utf8');
            fileData.push({fileName,fileInfo});
        }
        return res.status(200).json({ id: '200', message: 'success', fileData});
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}

exports.loadFile = async function(req, res) {
    try {
        const param = req.body;
        if(fs.existsSync(param.filePath)) {
            let fileInfo = fs.readFileSync(`${param.filePath}`, 'utf8');
            return res.status(200).json({ id: '200', message: 'success', fileInfo});
        } else {
            return res.status(400).json({ id: '400', message: 'notexist'});
        }
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}

exports.deleteFile = async function(req, res) {
    const param = req.body;
    try {
        fs.unlinkSync(`${param.filePath}${param.fileName}`);
        return res.status(200).json({ id: '200', message: 'success'});
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}