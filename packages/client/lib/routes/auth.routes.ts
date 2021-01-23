import express from 'express';
import { logout, refreshToken } from '../controllers/auth.controller';

export const authRoutes = express.Router();

authRoutes.get('/token/refresh', refreshToken);
authRoutes.get('/logout', logout);
