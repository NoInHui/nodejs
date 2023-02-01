const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.main);
router.get('/careerCalculator', controller.careerCalculator);
router.post('/careerCalculator/save', controller.saveCareerData);
router.post('/careerCalculator/load', controller.loadCareerData);
router.post('/careerCalculator/deleteloadData', controller.deleteloadData);

router.get('/study/:category/:page', controller.study);

module.exports = router;