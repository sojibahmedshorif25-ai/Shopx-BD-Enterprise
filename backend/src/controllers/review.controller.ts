import { Request, Response } from 'express';
import { Review } from '../models/Review.js';
import { Product } from '../models/Product.js';
import { AuthRequest } from '../middleware/auth.js';

export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, rating, comment, images, userName } = req.body;

    if (!productId || !rating || !comment) {
      res.status(400).json({ success: false, message: 'Rating and comment are required' });
      return;
    }

    const review = await Review.create({
      product: productId,
      user: req.userId || '65e900000000000000000001',
      userName: userName || req.user?.name || 'Verified Customer',
      userAvatar: req.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: Number(rating),
      comment,
      images: images || [],
      isVerifiedPurchase: true,
    });

    // Update product average rating
    const allReviews = await Review.find({ product: productId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Product.findByIdAndUpdate(productId, {
      rating: Number(avgRating.toFixed(1)),
      numReviews: allReviews.length,
    });

    res.status(201).json({ success: true, message: 'Review added successfully', data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
