// routes/todo.route.js
const express = require('express');
const todoController = require('../controllers/todo.controller');
const router = express.Router();

router.post('/createtodo', todoController.createTodo);
router.get('/gettodos/:user_id', todoController.getTodos);
router.get('/gettodo/:taskname', todoController.getTodoByName);
router.put('/updatetodo/:id', todoController.updateTodo);
router.patch('/updatestatus/:id', todoController.updateTodoStatus);  
router.delete('/deletetodo/:id', todoController.deleteTodo);

module.exports = router;
