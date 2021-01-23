import express from 'express';
import {
  activateUser,
  logout,
  refreshToken,
} from '../controllers/auth.controller';

export const authRoutes = express.Router();

authRoutes.get('/token/refresh', refreshToken);
authRoutes.get('/logout', logout);
authRoutes.post('/activate', activateUser);
