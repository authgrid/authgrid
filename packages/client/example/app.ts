import express from 'express';
import Authgrid from '../lib';
import { Driver as MongooseDriver } from '../../mongoose-driver/lib';
import cors from 'cors';

import mongoose from 'mongoose';

(async () => {
  await mongoose.connect(String('mongodb://localhost:27017/authgrid'), {
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
    '/authgrid',
    Authgrid({
      driver: MongooseDriver(),
    })
  );

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
