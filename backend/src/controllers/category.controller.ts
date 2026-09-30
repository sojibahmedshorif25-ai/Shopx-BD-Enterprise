import { Request, Response } from 'express';
import slugify from 'slugify';
import { Category } from '../models/Category.js';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, banglaName, icon, image, parent, order } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const category = await Category.create({
      name,
      banglaName,
      slug,
      icon: icon || 'ShoppingBag',
      image,
      parent: parent || null,
      order: order || 0,
    });

    res.status(201).json({ success: true, message: 'Category created', data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
