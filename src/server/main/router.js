const express = require('express');
const router = express.Router();
const controller = require('./controller');
const refererCheck = require("../middlewares/refererCheck");

router.get('/', refererCheck, controller.main);
router.get('/noRedirect', controller.noRedirect);

router.get('/careerCalculator', controller.careerCalculator);
router.post('/careerCalculator/save', controller.saveCareerData);
router.post('/careerCalculator/load', controller.loadCareerData);
router.post('/careerCalculator/deleteloadData', controller.deleteloadData);

router.get('/editor', controller.editor);

router.get('/study/:category/:page', controller.study);

module.exports = router;