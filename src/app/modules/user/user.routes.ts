import express from 'express';
import { UserController } from './user.controllers';
import auth from '../../middleware/auth';
const router = express.Router();

// router.post('/', UserController.createUser);

router.get('/:id', UserController.getSingleUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/', auth(), UserController.getAllUsers);

export const UserRoutes = router;
