import express from 'express';
import { cowRoutes } from '../modules/cow/cow.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.routes';
import { orderRoutes } from '../modules/order/order.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: cowRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

// Route: /api/v1/auth/signup (POST)
