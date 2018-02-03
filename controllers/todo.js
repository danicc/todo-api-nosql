import TodoModel from '../models/todo';

const TodoController = {
  GetTodos: (req, res) => {
    TodoModel.find({}, (err, todos) => {
      if (err) return res.status(500).send({ message: 'Internal Server Error' });

      return res.status(200).send({ todos });
    });
  },
  GetTodo: (req, res) => {
    res.status(200).send({ todo: req.todo });
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
    const updateParams = req.body;

    TodoModel.findByIdAndUpdate(req.todo.id, updateParams, { new: true }, (err, todoUpdated) => {
      if (err) return res.status(500).send({ message: `Error updating todo item: ${err}` });
      return res.status(200).send({ todo: todoUpdated });
    });
  },
  DeleteTodo: (req, res) => {
    req.todo.remove((err) => {
      if (err) res.status(500).send({ message: `Error deleting todo item: ${err}` });
      res.status(200).send({ message: 'Todo item removed' });
    });
  },
};

export default TodoController;
