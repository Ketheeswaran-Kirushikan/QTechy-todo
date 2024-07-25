const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Process', 'Completed'],
    default: 'Process'
  },
  created_by: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const TodoItem = mongoose.model('TodoItem', TodoSchema);

module.exports = TodoItem;
