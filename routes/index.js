import express from 'express';
import TodoController from '../controllers/todo';

const api = express.Router();

api.get('/todos', TodoController.GetTodos);
api.get('/todos/:id', TodoController.GetTodo);
api.post('/todos', TodoController.PostTodo);
api.put('/todos/:id', TodoController.PutTodo);
api.delete('/todos/:id', TodoController.DeleteTodo);

export default api;
