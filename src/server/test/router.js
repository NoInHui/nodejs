const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/fetchTest', controller.fetchTest);
router.get('/fetchTest2', controller.fetchTest2);
router.get('/fetchTest3', controller.fetchTest3);
router.get('/fetchTest4', controller.fetchTest4);

module.exports = router;