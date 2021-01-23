import express from 'express';
import { getUser } from '../controllers/user.controller';

export const userRoutes = express.Router();

userRoutes.get('/me', getUser);
