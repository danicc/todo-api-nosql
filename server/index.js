import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import config from './config';
import api from './routes';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const { db, port, host } = config[env];

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

mongoose.connect(db, {});
const dataBaseConnection = mongoose.connection;
dataBaseConnection.on('error', console.error.bind(console, 'connection error:'));
dataBaseConnection.on('open', () => {
  app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') console.log(`Server running on http://${host}:${port}`);
  });
});

export default app;
