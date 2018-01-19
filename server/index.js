import express from 'express';
import { port, host } from '../config';

const app = express();

app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});
