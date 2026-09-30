import { Router } from 'express';
import { chatWithAI, generateAIDescription } from '../controllers/ai.controller.js';

const router = Router();

router.post('/chat', chatWithAI);
router.post('/generate-description', generateAIDescription);

export default router;
