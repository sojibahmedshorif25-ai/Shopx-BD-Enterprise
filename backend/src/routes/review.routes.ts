import { Router } from 'express';
import { getProductReviews, addReview } from '../controllers/review.controller.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/:productId', getProductReviews);
router.post('/', optionalAuth, addReview);

export default router;
