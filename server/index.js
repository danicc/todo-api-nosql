import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import { port, host, db } from '../config';
import api from '../routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

mongoose.connect(db, {});
const dataBaseConnection = mongoose.connection;
dataBaseConnection.on('error', console.error.bind(console, 'connection error:'));
dataBaseConnection.on('open', () => {
  app.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`);
  });
});
