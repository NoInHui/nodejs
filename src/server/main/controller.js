const fs = require('fs');

const careerDataFilePath = 'public/save/careerCalculator/';

exports.main = async function(req, res) {
    const {page = 'careerCalculator/careerCalculator'} = req.body;
    res.render('main/main',{page});
}

exports.careerCalculator = async function(req, res) {
    res.render('careerCalculator/careerCalculator');
}

exports.saveCareerData = async function(req, res) {
    const param = req.body;
    try {
        fs.writeFileSync(`${careerDataFilePath}${param.fileName}.json`,param.fileInfo, 'utf8');
        return res.status(200).json({ id: '200', message: 'success'});
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}

exports.deleteloadData = async function(req, res) {
    const param = req.body;
    try {
        fs.unlinkSync(`${careerDataFilePath}${param.fileName}`);
        return res.status(200).json({ id: '200', message: 'success'});
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}

exports.loadCareerData = async function(req, res) {
    try {
        let fileList = fs.readdirSync(careerDataFilePath);
        let fileData = new Array();
        for await (fileName of fileList) {
            let fileInfo = fs.readFileSync(`${careerDataFilePath}${fileName}`, 'utf8');
            fileData.push({fileName,fileInfo});
        }
        return res.status(200).json({ id: '200', message: 'success', fileData});
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}

exports.study = async function(req, res) {
    const {category, page} = req.params;
    res.render(`study/${category}/${page}`);
}