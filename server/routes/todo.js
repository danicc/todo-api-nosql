import express from 'express';
import TodoController from '../controllers/todo';
import checkTodoId from '../middleware/check-todo-id';
// import auth from '../middleware/auth';

const todoRouter = express.Router();

// todoRouter.use(auth);

todoRouter.param('id', checkTodoId);

todoRouter.get('/', TodoController.GetTodos);
todoRouter.get('/:id', TodoController.GetTodo);
// todoRouter.post('/', auth, TodoController.PostTodo);
// todoRouter.put('/:id', auth, TodoController.PutTodo);
// todoRouter.delete('/:id', auth, TodoController.DeleteTodo);

export default todoRouter;

