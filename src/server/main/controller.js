const fs = require('fs');

exports.main = async function(req, res) {
    const {page = 'careerCalculator/careerCalculator'} = req.body;
    res.render('main/main',{page});
}

exports.careerCalculator = async function(req, res) {
    const {pageName} = req.query;
    res.render('careerCalculator/careerCalculator', {pageName});
}

exports.loginHistoryCheck = async function(req, res) {
    let fileInfo = fs.readFileSync(`public/save/교강사 로그인 기록 데이터.json`, 'utf8');
    // console.log(fileInfo);
    let jsonData = JSON.parse(fileInfo);
    let memberList = jsonData.reduce((acc,cur,i) => {
        if(!acc.find(v => v.id.toLowerCase() == cur.id.toLowerCase())) {
            acc.push({
                id: cur.id.toLowerCase(),
                name: cur.name,
            });
        }
        return acc;
    }, []);
    // console.log(jsonData);
    memberList.map(v => {
        v.access_list = jsonData.filter(l => l.id.toLowerCase() == v.id).map(d => d.access_at);
    });
    console.log(memberList);

}

exports.editor = async function(req, res) {
    const {pageName} = req.query;
    res.render('editor/editor', {pageName});
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
        fs.writeFileSync(`${param.filePath}${param.realFileName}`,param.fileInfo, 'utf8');
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
        for await (realFileName of fileList) {
            let fileInfo = fs.readFileSync(`${param.filePath}${realFileName}`, 'utf8');
            fileData.push({realFileName,fileInfo});
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
        fs.unlinkSync(`${param.filePath}${param.realFileName}`);
        return res.status(200).json({ id: '200', message: 'success'});
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error'});
    }
}