import TodoModel from ('../models/todo');

const GetTodo = (req, res) => {
  let todoId = req.params.id;
  TodoModel.findById(todoId, (err, todo) => {
    if (err) return res.status(500).send({message: 'Internal Server Error'});
    if (!todo) return res.status(404).send({ message: 'El elemento Todo no existe'});

    res.status(200).send({ product });
  });
}

const GetTodos = (req, res) => {
  TodoModel.find({}, (err, todos) => {
    if (err) return res.status(500).send({message: 'Internal Server Error'});

    res.status(200).send({ todos });
  });
}

const PostTodo = (req, res) => {
  let todo = new TodoModel();
  todo.name = req.body.name;
  todo.description = req.body.description;
  todo.dueDate = req.body.dueDate;
  todo.completed = req.body.completed;

  todo.save((err, todoStored) => {
    if (err) return res.status(500).send({message: 'Internal Server Error'});

    res.status(201).send({ todo: todoStored});
  });
}
