import mongoose from 'mongoose';

const { Schema } = mongoose;

const TodoSchema = Schema({
  name: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, default: Date.now() },
});

const TodoModel = mongoose.model('Todo', TodoSchema);

export default TodoModel;
