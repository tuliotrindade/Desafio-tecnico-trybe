const express = require('express');
const taskControllers = require('../controllers/taskController');
const { validateTask } = require('../middlewares/validadeteTask')
const router = express.Router();

router.get('/');

router.get('/', taskControllers.getTasks);

router.post('/', validateTask, taskControllers.createTask);

router.put('/:id', validateTask, taskControllers.updateTask);

router.delete('/:id', taskControllers.deleteTask);

module.exports = router;