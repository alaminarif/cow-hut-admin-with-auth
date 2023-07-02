import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middleware/validateRequest';
import { AdminValidation } from './admin.validation';
const router = express.Router();
// router.get();
// router.post('/login', );
router.post('/create-admin', AdminController.createAdmin);
router.post(
  '/login',
  validateRequest(AdminValidation.loginZodSchema),
  AdminController.loginAdmin
);
router.post(
  '/refresh-token',
  validateRequest(AdminValidation.refreshTokenZodSchema),
  AdminController.refreshToken
);

export const AdminRoutes = router;
