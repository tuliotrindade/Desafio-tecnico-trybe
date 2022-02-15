const express = require('express');
const taskControllers = require('../controllers/taskController')
const router = express.Router();

router.get('/');

router.get('/', taskControllers.getTasks);

router.post('/', taskControllers.createTask);

router.put('/:id', taskControllers.updateTask);

router.delete('/:id', taskControllers.deleteTask);

module.exports = router;