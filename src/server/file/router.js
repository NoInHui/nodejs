const express = require('express');
const router = express.Router();
const controller = require('./controller');
const fs = require('fs');
const formidable = require('formidable');
const multer = require('multer');

const imageUploader = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'public/save/editorImg/';
        
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, req.headers['file-name']);
    }
})});

router.post('/uploadEditorImg', imageUploader.single('body'), (req, res) => {
    const originalPath = '/save/editorImg/';
    const fileName = req.headers['file-name'];
    res.status(200).send(`sFileURL=${originalPath}${fileName}&sFileName=${fileName}&bNewLine=true`);
});

router.get('/uploadPage', controller.uploadPage);

const fileUploader = multer(
    {
        storage: multer.diskStorage(
            {
                destination: (req, file, cb) => {
                    const path = getFilePath();
                    if(!fs.existsSync(path)) {
                        fs.mkdirSync(path, { recursive: true });
                    }
                    cb(null, path);
                },
                filename: function (req, file, cb) {
                    cb(null, req.params.filename);
                },
            }
        ),
    }
);

router.post('/upload/:filename', fileUploader.single('file'), (req, res) => {
    try {
        return res.status(200).json({ id: '200', message: 'success', file: req.file});
    } catch(e) {
        console.log(e);
        return res.status(400).json({ id: '400', message: 'error', e});
    }
});

router.get('/singleDownload', controller.singleDownload);

router.post('/updateFileInfo', controller.updateFileInfo);

router.post('/getFileInfo', controller.getFileInfo);

function getFilePath() {
    return `public/save/fileuploader/`
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

module.exports = router;