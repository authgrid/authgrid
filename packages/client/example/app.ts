import express from 'express';
import Authcom from '../lib';
import { MongooseDriver } from '@authcom/drivers/lib/index';
import cors from 'cors';

import mongoose from 'mongoose';

(async () => {
  await mongoose.connect(String('mongodb://localhost:27017/authcom'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();
  const port = 8080;

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use(
    '/authcom',
    Authcom({
      driver: MongooseDriver(),
    })
  );

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
