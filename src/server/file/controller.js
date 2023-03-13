const fs = require('fs');

const fileInfoPath = 'src/view/upload/uploadData.json';

exports.uploadPage = async function(req, res) {
    if(!fs.existsSync(fileInfoPath)) {
        fs.mkdirSync('src/view/upload', { recursive: true });
        fs.writeFileSync(fileInfoPath,'', 'utf8');
    }
    res.render('upload/uploadPage');
}

exports.singleDownload = async function (req, res) {
    const {file_path, file_name} = req.query;
    res.download(file_path, file_name);
}

exports.updateFileInfo = async function(req, res) {
    try {
        let fileList = [...req.body.fileList];
        fs.writeFileSync(fileInfoPath,JSON.stringify(fileList), 'utf8');
        return res.status(200).json({});
    } catch (e) {
        console.log(e);
        return res.status(400).json({err:e.message});
    }
}

exports.getFileInfo = async function(req, res) {
    try {
        const fileInfo = fs.readFileSync(fileInfoPath, 'utf8');
        const fileList = fileInfo ? JSON.parse(fileInfo) : [];
        console.log(fileList);
        return res.status(200).json({fileList});
    } catch (e) {
        console.log(e);
        return res.status(400).json({err:e.message});
    }
}