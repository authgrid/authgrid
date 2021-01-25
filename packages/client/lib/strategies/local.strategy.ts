import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { comparePassword, encryptPassword } from '../utils/password.utils';
import { createTokens } from '../utils/token';
import { sendActivationEmail } from '../utils/auth.utils';
import { ContextHolder } from '../utils/context.utils';

export const LOCAL_ENDPOINT = '/local';

export default () => {
  const driver = ContextHolder.getDriver();
  const { tokenSecret, refreshTokenSecret } = ContextHolder.getContext();

  const options = {
    usernameField: 'email',
    passwordField: 'password',
  };

  passport.use(
    'local',
    new LocalStrategy(options, async (email, password, done) => {
      const user = await driver.userActions.findUserByEmail({ email });

      if (!user) {
        done(null, false);
      }

      if (await comparePassword(password, user.password)) {
        const [, newRefreshToken] = await createTokens(
          user,
          tokenSecret,
          `${refreshTokenSecret}${user.password}`
        );

        delete user.password;
        return done(null, {
          refreshToken: newRefreshToken,
        });
      }

      done('Passowrd is not right', null);
    })
  );

  passport.use(
    'local-signup',
    new LocalStrategy(
      { ...options, passReqToCallback: true },
      async (req, email, password, done) => {
        const userExists = await driver.userActions.findUserByEmail({ email });

        if (userExists) {
          return done('Email already exists', false);
        }

        const hashPassword = await encryptPassword(password);

        const user = await driver.userActions.createUser({
          email,
          password: hashPassword,
        });

        delete user.password;

        await sendActivationEmail({
          email,
          id: user.id,
        });

        done(null, user);
      }
    )
  );

  const router = express.Router();

  router.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    async (req, res) => {
      res.cookie('ac_refresh', (req.user as any)?.refreshToken);
      res.formatter.ok(req.user);
    }
  );

  router.post(
    '/signup',
    passport.authenticate('local-signup', { failWithError: true }),
    (req, res) => {
      res.formatter.ok(req.user);
    },
    (err, req, res, next) => {
      return res.formatter.badRequest(err);
    }
  );

  return router;
};
