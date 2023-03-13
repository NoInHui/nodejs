const fs = require('fs');
const zl = require('zip-lib');

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

exports.zipCreate = async function (req, res) {
    try {
        const fileList = req.body;
        const zip = new zl.Zip();
        for await (file of fileList) {
            zip.addFile(file.file_path, file.file_name);
        }

        const dateArr = getDateArr();
        const zipFileName = `zip_${dateArr[0]}${dateArr[1]}${dateArr[2]}${dateArr[3]}${dateArr[4]}${dateArr[5]}.zip`;
        
        zip.archive(`public/save/fileuploader/${zipFileName}`).then(function() {
            console.log('zip created');
            return res.status(200).json({file_path: `public/save/fileuploader/${zipFileName}`, file_name: zipFileName});
        }, function(err) {
            console.log('zip error', err);
            return res.status(400).json({err:e.message});
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({err:e.message});
    }
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

function getDateArr() {
    let date = new Date();

    let year = date.getFullYear().toString();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    month = month >= 10 ? month.toString() : '0' + month;
    day = day >= 10 ? day.toString() : '0' + day;	
    hour = hour >= 10 ? hour.toString() : '0' + hour;
    minutes = minutes >= 10 ? minutes.toString() : '0' + minutes;
    seconds = seconds >= 10 ? seconds.toString() : '0' + seconds;

    return [year,month,day,hour,minutes,seconds];
}