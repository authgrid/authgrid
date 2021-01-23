import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import { IDriver } from '@authcom/common/interfaces/driver.interfaces';
import { IUser } from '@authcom/common/interfaces/user.interfaces';

require('dotenv').config();

import routes from './routes';

import LocalStrategy, { LOCAL_ENDPOINT } from './strategies/local.strategy';

interface IOptions {
  driver: IDriver;
}

export class DriverHolder {
  private static instance: DriverHolder;
  private driver: IDriver | null = null;

  static getInstance(): DriverHolder {
    if (!DriverHolder.instance) {
      DriverHolder.instance = new DriverHolder();
    }

    return DriverHolder.instance;
  }

  public static setDriver(driver: IDriver) {
    DriverHolder.getInstance().driver = driver;
  }

  public static getDriver(): IDriver | null {
    return DriverHolder.getInstance().driver;
  }
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

  router.use(cookieParser());

  router.use(passport.initialize());
  router.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: IUser, done) => {
    done(null, user);
  });

  router.use(LOCAL_ENDPOINT, LocalStrategy(options.driver));

  router.use('/', routes);

  return router;
};
