import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieSession from 'cookie-session';

import { IDriver } from '@authcom/common/interfaces/driver.interfaces';
import { IUser } from '@authcom/common/interfaces/user.interfaces';

import LocalStrategy, { LOCAL_ENDPOINT } from './strategies/local.strategy';

interface IOptions {
  driver: IDriver;
}

export default (options: IOptions): express.Router => {
  const router = express.Router();

  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  router.use(
    cookieSession({
      expires: false,
      keys: ['key1', 'key2'],
    }),
  );

  router.use(passport.initialize());
  router.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: IUser, done) => {
    done(null, user);
  });

  router.use(LOCAL_ENDPOINT, LocalStrategy(options.driver));

  return router;
};
