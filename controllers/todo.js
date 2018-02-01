import mongoose from 'mongoose';
import TodoModel from '../models/todo';

const { ObjectId } = mongoose.Types;

const TodoController = {
  GetTodos: (req, res) => {
    TodoModel.find({}, (err, todos) => {
      if (err) return res.status(500).send({ message: 'Internal Server Error' });

      return res.status(200).send({ todos });
    });
  },
  GetTodo: (req, res) => {
    const todoId = req.params.id;
    if (!ObjectId.isValid(todoId)) {
      res.status(400);
      res.send({ message: 'Invalid Id' });
    } else {
      TodoModel.findById(todoId, (err, todo) => {
        if (err) return res.status(500).send({ message: 'Internal Server Error' });
        if (!todo) return res.status(404).send({ message: 'Todo item not found' });

        return res.status(200).send({ todo });
      });
    }
  },
  PostTodo: (req, res) => {
    const todo = new TodoModel();
    todo.name = req.body.name;
    todo.description = req.body.description;
    todo.dueDate = req.body.dueDate;
    todo.completed = req.body.completed;

    todo.save((err, todoStored) => {
      if (err) {
        if (err.errors.name) return res.status(400).send({ message: 'Name is required' });
        return res.status(500).send({ message: 'Internal Server Error' });
      }

      return res.status(201).send({ todo: todoStored });
    });
  },
  PutTodo: (req, res) => {
    const todoId = req.params.id;
    const updateParams = req.body;

    if (!ObjectId.isValid(todoId)) {
      res.status(400).send({ message: 'Invalid Id' });
    } else {
      TodoModel.findByIdAndUpdate(todoId, updateParams, { new: true }, (err, todoUpdated) => {
        if (err) return res.status(500).send({ message: `Error updating todo item: ${err}` });

        return res.status(200).send({ todo: todoUpdated });
      });
    }
  },
  DeleteTodo: (req, res) => {
    const todoId = req.params.id;

    if (!ObjectId.isValid(todoId)) {
      res.status(400).send({ message: 'Invalid Id' });
    } else {
      TodoModel.findById(todoId, (error, todo) => {
        if (error) res.status(500).send({ message: `Error deleting todo item: ${error}` });
        if (!todo) {
          res.status(404).send({ message: 'Todo item not found' });
        } else {
          todo.remove((err) => {
            if (err) res.status(500).send({ message: `Error deleting todo item: ${err}` });
            res.status(200).send({ message: 'Todo item removed' });
          });
        }
      });
    }
  },
};

export default TodoController;
