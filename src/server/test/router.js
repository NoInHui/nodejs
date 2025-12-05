const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/nodejs', controller.nodejs);

router.get('/fetchTest', controller.fetchTest);
router.get('/fetchTest2', controller.fetchTest2);
router.get('/fetchTest3', controller.fetchTest3);
router.get('/fetchTest4', controller.fetchTest4);

router.get('/promise1', controller.promise1);

router.get('/requestTest1', controller.requestTest1);
router.post('/requestTest1', controller.requestTest1);

router.get('/todos', controller.getTodos);
router.get('/todos/:id', controller.getTodos);
router.post('/todos', controller.postTodos);
router.put('/todos/:id', controller.putTodos);
router.patch('/todos/:id', controller.patchTodos);
router.delete('/todos/:id', controller.deleteTodos);


module.exports = router;