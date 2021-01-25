import express from 'express';
import {
  activateUser,
  logout,
  refreshToken,
  requestResetPassword,
  resetPassword,
} from '../controllers/auth.controller';

export const authRoutes = express.Router();

authRoutes.get('/token/refresh', refreshToken);
authRoutes.get('/logout', logout);
authRoutes.post('/activate', activateUser);
authRoutes.post('/forgot-password', requestResetPassword);
authRoutes.post('/reset-password', resetPassword);
