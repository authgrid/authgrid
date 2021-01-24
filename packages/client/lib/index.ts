import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { responseEnhancer } from 'express-response-formatter';
import { IUser } from '@authgrid/common/interfaces/user.interfaces';
import dovent from 'dotenv';

dovent.config();

import routes from './routes';

import LocalStrategy, { LOCAL_ENDPOINT } from './strategies/local.strategy';
import { DriverHolder } from './utils/driver.utils';
import { expressLogger } from './utils/logger.utils';
import { IOptions } from '@authgrid/common/interfaces/authGrid.interfaces';

declare module 'express' {
  export interface Request {
    user: any;
  }
}

const initialOptions = {
  tokenExpires: 86400,
  refreshTokenExpires: 2592000,
};

export default (options: IOptions): express.Router => {
  options = {
    ...initialOptions,
    ...options,
  };

  if (options.driver) {
    DriverHolder.setDriver(options.driver);
  } else {
    throw new Error('please select a driver');
  }

  const router = express.Router();

  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

  router.use(expressLogger);

  return router;
};
