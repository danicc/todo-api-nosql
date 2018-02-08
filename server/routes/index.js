import express from 'express';
import todoRouter from './todo';
import userRouter from './user';

const api = express.Router();

api.use(userRouter);
api.use('/todos', todoRouter);

export default api;
