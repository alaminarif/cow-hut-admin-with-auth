import express from 'express';
import { createOrder, getAllOrders, getSingleOrder } from './order.controller';
const router = express.Router();

router.post('/', createOrder);
router.get('/:id', getSingleOrder);
router.get('/', getAllOrders);

export const orderRoutes = router;
