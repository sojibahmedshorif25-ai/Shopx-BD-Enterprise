import { Request, Response } from 'express';
import { QA } from '../models/QA.js';
import { AuthRequest } from '../middleware/auth.js';

export const getProductQA = async (req: Request, res: Response): Promise<void> => {
  try {
    const qas = await QA.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: qas });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const askQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, question, userName } = req.body;

    if (!productId || !question) {
      res.status(400).json({ success: false, message: 'Product ID and question are required' });
      return;
    }

    const qa = await QA.create({
      product: productId,
      user: req.userId || null,
      userName: userName || req.user?.name || 'Customer',
      question,
      // Auto-answer common queries or let vendor answer
      answer: question.includes('ডেলিভারি')
        ? 'ঢাকা সিটিতে ২৪ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৩ দিনের মধ্যে হোম ডেলিভারি পেয়ে যাবেন। ক্যাশ অন ডেলিভারি প্রযোজ্য।'
        : undefined,
      answeredBy: question.includes('ডেলিভারি') ? 'ShopX Official' : undefined,
      answeredAt: question.includes('ডেলিভারি') ? new Date() : undefined,
      isAnswered: question.includes('ডেলিভারি'),
    });

    res.status(201).json({ success: true, message: 'Question submitted', data: qa });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const answerQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { answer } = req.body;
    const qa = await QA.findById(req.params.id);

    if (!qa) {
      res.status(404).json({ success: false, message: 'Question not found' });
      return;
    }

    qa.answer = answer;
    qa.answeredBy = req.user?.name || 'ShopX Official';
    qa.answeredAt = new Date();
    qa.isAnswered = true;
    await qa.save();

    res.status(200).json({ success: true, message: 'Answer saved', data: qa });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
