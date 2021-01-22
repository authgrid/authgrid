import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { IDriver } from '@authcom/common/interfaces/driver.interfaces';
import { comparePassword, encryptPassword } from '../utils/encrypt';

export const LOCAL_ENDPOINT = '/local';

export default (driver: IDriver) => {
  const options = {
    usernameField: 'email',
    passwordField: 'password',
  };

  passport.use(
    'local',
    new LocalStrategy(options, async (email, password, done) => {
      const user = await driver.findUserByEmail({ email });

      if (await comparePassword(password, user.password)) {
        return done(null, user);
      }

      done('Passowrd is not right', null);
    }),
  );

  passport.use(
    'local-signup',
    new LocalStrategy(
      { ...options, passReqToCallback: true },
      async (req, email, password, done) => {
        const userExists = await driver.findUserByEmail({ email });

        if (userExists) {
          return done('user already exists', null);
        }

        const hashPassword = await encryptPassword(password);

        const user = await driver.createUser({ email, password: hashPassword });

        done(null, user);
      },
    ),
  );

  const router = express.Router();

  router.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
    },
  );

  router.post('/signup', passport.authenticate('local-signup'), function (req, res) {
    res.json(req.user);
  });

  return router;
};
