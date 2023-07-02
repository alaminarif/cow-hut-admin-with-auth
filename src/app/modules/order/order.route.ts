import express from 'express';
import { createOrder, getAllOrders, getSingleOrder } from './order.controller';
import { ENUM_USER_ROLE } from '../../../emnus/user';
import auth from '../../middleware/auth';
const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.BUYER), createOrder);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  getSingleOrder
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  getAllOrders
);

export const orderRoutes = router;
