const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/careerCalculator', controller.careerCalculator);
router.post('/careerCalculator/save', controller.saveCareerData);
router.post('/careerCalculator/load', controller.loadCareerData);



module.exports = router;