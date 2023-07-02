import express from 'express';
import { CowControllers } from './cow.controllers';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../emnus/user';
const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.SELLER), CowControllers.createCow);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowControllers.getSingleCow
);
router.patch('/:id', auth(ENUM_USER_ROLE.SELLER), CowControllers.updateCow);
router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowControllers.deleteCow);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowControllers.getAllCows
);
export const cowRoutes = router;
