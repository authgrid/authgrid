import express from 'express';
import Authcom from './index';
import { Driver as MongooseDriver } from '@authcom/drivers/mongoose';

import mongoose from 'mongoose';

mongoose.connect(String('mongodb://localhost/authcom'), {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(
  '/authcom',
  Authcom({
    driver: MongooseDriver(),
  }),
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
