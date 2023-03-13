const express = require('express');
const router = express.Router();
const controller = require('./controller');
const refererCheck = require("../middlewares/refererCheck");

router.get('/', refererCheck, controller.main);
router.get('/noRedirect', controller.noRedirect);
router.get('/careerCalculator', controller.careerCalculator);
router.get('/editor', controller.editor);
router.post('/save', controller.saveFile);
router.post('/load', controller.loadFileList);
router.post('/loadFile', controller.loadFile);
router.post('/delete', controller.deleteFile);
router.get('/study/:category/:page', controller.study);

module.exports = router;