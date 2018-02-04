import express from 'express';
import TodoController from '../controllers/todo';
import checkTodoId from '../middleware/check-todo-id';

const todoRouter = express.Router();

todoRouter.param('id', checkTodoId);

todoRouter.get('/', TodoController.GetTodos);
todoRouter.get('/:id', TodoController.GetTodo);
todoRouter.post('/', TodoController.PostTodo);
todoRouter.put('/:id', TodoController.PutTodo);
todoRouter.delete('/:id', TodoController.DeleteTodo);

export default todoRouter;

