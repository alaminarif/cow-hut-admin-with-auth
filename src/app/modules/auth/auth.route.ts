import express from 'express';
import { UserController } from '../user/user.controllers';
const router = express.Router();

router.post('/signup', UserController.createUser);

export const AuthRoutes = router;
