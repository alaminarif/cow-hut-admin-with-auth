import express from 'express';
import { UserController } from './user.controllers';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../emnus/user';
const router = express.Router();

// router.post('/', UserController.createUser);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
