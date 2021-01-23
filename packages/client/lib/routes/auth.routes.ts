import express from 'express';
import { refreshToken } from '../controllers/auth.controller';

export const authRoutes = express.Router();


authRoutes.get('/token/refresh', refreshToken);
