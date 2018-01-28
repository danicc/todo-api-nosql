import mongoose from 'mongoose';
import TodoModel from '../models/todo';

const { ObjectId } = mongoose.Types;

const TodoController = {
  GetTodos: (req, res) => {
    TodoModel.find({}, (err, todos) => {
      if (err) res.status(500).send({ message: 'Internal Server Error' });

      res.status(200).send({ todos });
    });
  },
  GetTodo: (req, res) => {
    const todoId = req.params.id;
    if (!ObjectId.isValid(todoId)) { res.status(200).send({ message: 'Invalid Id' }); }

    TodoModel.findById(todoId, (err, todo) => {
      if (err) res.status(500).send({ message: 'Internal Server Error' });
      if (!todo) res.status(404).send({ message: 'Todo item not found' });

      res.status(200).send({ todo });
    });
  },
  PostTodo: (req, res) => {
    const todo = new TodoModel();
    todo.name = req.body.name;
    todo.description = req.body.description;
    todo.dueDate = req.body.dueDate;
    todo.completed = req.body.completed;

    todo.save((err, todoStored) => {
      if (err) res.status(500).send({ message: 'Internal Server Error' });

      res.status(201).send({ todo: todoStored });
    });
  },
  PutTodo: (req, res) => {
    const todoId = req.params.id;
    const updateParams = req.body;

    if (!ObjectId.isValid(todoId)) { res.status(200).send({ message: 'Invalid Id' }); }

    TodoModel.findByIdAndUpdate(todoId, updateParams, { new: true }, (err, todoUpdated) => {
      if (err) res.status(500).send({ message: `Error updating todo item: ${err}` });

      res.status(200).send({ todo: todoUpdated });
    });
  },
  DeleteTodo: (req, res) => {
    const todoId = req.params.id;

    if (!ObjectId.isValid(todoId)) { res.status(200).send({ message: 'Invalid Id' }); }
    TodoModel.findById(todoId, (err, todo) => {
      if (err) res.status(500).send({ message: `Error deleting todo item: ${err}` });

      todo.remove((error) => {
        if (error) res.status(500).send({ message: `Error deleting todo item: ${error}` });
        res.status(200).send({ message: 'Todo item removed' });
      });
    });
  },
};

export default TodoController;
