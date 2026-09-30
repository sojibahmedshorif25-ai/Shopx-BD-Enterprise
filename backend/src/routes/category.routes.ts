import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/category.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getCategories);
router.post('/', authenticate, authorize('admin'), createCategory);

export default router;
