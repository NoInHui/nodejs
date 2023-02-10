const express = require('express');
const router = express.Router();
const controller = require('./controller');
const fs = require('fs');
const formidable = require('formidable');
const multer = require('multer');

const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        const path = 'public/save/editorImg/';
        
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }
        cb(null, path);
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, req.headers['file-name']);
    }
})});

router.post('/uploadEditorImg', upload.single('body'), (req, res) => {
    console.log(req);
    console.log(req.body);
    const originalPath = '/save/editorImg/';
    const fileName = req.headers['file-name'];
    res.status(200).send(`sFileURL=${originalPath}${fileName}&sFileName=${fileName}&bNewLine=true`);
});

module.exports = router;