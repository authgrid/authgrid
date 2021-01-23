import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { responseEnhancer } from 'express-response-formatter';

import { IDriver } from '@authcom/common/interfaces/driver.interfaces';
import { IUser } from '@authcom/common/interfaces/user.interfaces';
import dovent from 'dotenv';

dovent.config();

import routes from './routes';

import LocalStrategy, { LOCAL_ENDPOINT } from './strategies/local.strategy';
import { DriverHolder } from './utils/driver.utils';

declare module 'express' {
  export interface Request {
    user: any;
  }
}

interface IOptions {
  driver: IDriver;
}

export default (options: IOptions): express.Router => {
  if (options.driver) {
    DriverHolder.setDriver(options.driver);
  } else {
    throw new Error('please select a driver');
  }

  const router = express.Router();

  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  router.use(responseEnhancer());

  router.use(cookieParser());

  router.use(passport.initialize());
  router.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: IUser, done) => {
    done(null, user);
  });

  router.use((req, res, next) => {
    if (options.driver) {
      req['driver'] = options.driver;
    }

    next();
  });

  router.use(LOCAL_ENDPOINT, LocalStrategy(options.driver));

  router.use('/', routes);

  return router;
};
