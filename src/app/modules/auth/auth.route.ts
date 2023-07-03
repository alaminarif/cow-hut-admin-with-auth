import express from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middleware/validateRequest';
const router = express.Router();

router.post('/signup', AuthController.createUser);
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
// router.post('/refresh-token', AuthController.);
// router.post('/refresh-token');

export const AuthRoutes = router;
