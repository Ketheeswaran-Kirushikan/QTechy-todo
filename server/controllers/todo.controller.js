const TodoItem = require('../Models/todo.model');

// Create a new todo item
const createTodo = async (req, res) => {
    try {
      const { taskName, category, description, created_by } = req.body;
  
      if (!taskName || !category || !description || !created_by) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const todo = new TodoItem({
        taskName,
        category,
        description,
        created_by,
      });
  
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Get all todo items
const getTodos = async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id);
    try {
      const todos = await TodoItem.find({ created_by: user_id }); // Query TodoItems by user_id
      res.json(todos);
      console.log(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get a single todo item by Name
const getTodoByName = async (req, res) => {
  try {
    const todo = await TodoItem.findOne({ taskName: req.params.taskName, created_by: req.user._id });
    if (!todo) return res.status(404).json({ message: "Task not found." });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodoStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedTodo = await TodoItem.findByIdAndUpdate(
        id,
        { status: 'Completed' },
        { new: true }
      );
      if (!updatedTodo) return res.status(404).json({ message: 'Task not found.' });
      res.json(updatedTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const updateTodo = async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await TodoItem.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      if (!todo) return res.status(404).json({ message: "Task not found." });
      res.json(todo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  module.exports = { updateTodo };
  
const deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await TodoItem.findByIdAndDelete(id);
      if (!todo) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  createTodo,
  getTodos,
  getTodoByName,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
};
