import express from 'express';
import AuthGrid, { withAuthentication } from '../lib';
import { Driver as MongooseDriver } from '../../mongoose-driver/lib';
import cors from 'cors';
import sgMail from '@sendgrid/mail';

import mongoose from 'mongoose';

(async () => {
  sgMail.setApiKey(String(process.env.SENDGRID_API_KEY));

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

  const mailer = async ({ to, subject, html }) =>
    sgMail.send({
      to,
      from: 'nirberko@gmail.com',
      subject,
      html,
    });

  app.use(
    '/authgrid',
    AuthGrid({
      driver: MongooseDriver(),
      tokenSecret: String(process.env.TOKEN_SECRET),
      refreshTokenSecret: String(process.env.REFRESH_TOKEN_SECRET),
      mailer,
    })
  );

  app.get('/get-user-details', withAuthentication(), (req, res) => {
    res.json(req.user);
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
