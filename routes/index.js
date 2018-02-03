import express from 'express';
import todoRouter from './todo';

const api = express.Router();

api.use('/todos', todoRouter);

export default api;
