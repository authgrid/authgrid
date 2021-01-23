import express from 'express';
import { authRoutes } from './auth.routes';
import { withAuthentication } from '../middlewares/withAuthentication';
import { userRoutes } from './user.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', withAuthentication(), userRoutes);

export default router;
