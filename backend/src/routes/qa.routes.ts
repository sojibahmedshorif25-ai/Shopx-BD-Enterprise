import { Router } from 'express';
import { getProductQA, askQuestion, answerQuestion } from '../controllers/qa.controller.js';
import { optionalAuth, authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/:productId', getProductQA);
router.post('/', optionalAuth, askQuestion);
router.put('/:id/answer', authenticate, authorize('admin', 'vendor'), answerQuestion);

export default router;
