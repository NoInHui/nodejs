const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/fetchTest', controller.fetchTest);
router.get('/fetchTest2', controller.fetchTest2);
router.get('/fetchTest3', controller.fetchTest3);
router.get('/fetchTest4', controller.fetchTest4);

router.get('/requestTest1', controller.requestTest1);
router.post('/requestTest1', controller.requestTest1);

module.exports = router;