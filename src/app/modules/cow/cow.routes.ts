import express from 'express';
import { CowControllers } from './cow.controllers';
const router = express.Router();

router.post('/', CowControllers.createCow);

router.get('/:id', CowControllers.getSingleCow);
router.patch('/:id', CowControllers.updateCow);
router.delete('/:id', CowControllers.deleteCow);
router.get('/', CowControllers.getAllCows);
export const cowRoutes = router;
