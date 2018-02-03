import mongoose from 'mongoose';
import TodoModel from '../models/todo';

const { ObjectId } = mongoose.Types;

const checkTodoId = (req, res, next, id) => {
  if (ObjectId.isValid(id)) {
    TodoModel.findById(id, (err, todo) => {
      if (err) {
        res.status(500).send({ message: 'Internal Server Error' });
      } else if (!todo) {
        res.status(404).send({ message: 'Todo item not found' });
      }

      req.todo = todo;
      next();
    });
  } else {
    res.status(400).send({ message: 'Invalid Id' });
  }
};

export default checkTodoId;
