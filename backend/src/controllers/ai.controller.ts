import { Request, Response } from 'express';
import { generateAIResponse, generateProductDescription } from '../config/gemini.js';
import { Product } from '../models/Product.js';

export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400).json({ success: false, message: 'Message is required' });
      return;
    }

    // Fetch top products for context
    const products = await Product.find({ status: 'active' })
      .select('title banglaTitle price discountPrice isOrganic isFlashSale stock')
      .limit(8);

    const productContext = products
      .map(
        (p) =>
          `[${p.title} (${p.banglaTitle || ''}) - Price: ৳${p.discountPrice || p.price}, Stock: ${p.stock}, Organic: ${p.isOrganic}]`
      )
      .join('\n');

    const prompt = `User Message: "${message}"

Current ShopX BD Top Store Catalog Context:
${productContext}

Instructions:
1. Respond friendly in the language the user asked (English, Bengali, or Banglish).
2. Recommend relevant products if applicable with their prices in BDT (৳).
3. If they ask about delivery, mention Dhaka 24h (৳60) and Outside Dhaka 48-72h (৳120), Cash on Delivery available.
4. Keep the answer helpful, concise, with emojis.`;

    const aiReply = await generateAIResponse(prompt);

    res.status(200).json({ success: true, reply: aiReply });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateAIDescription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, features } = req.body;

    if (!title || !category) {
      res.status(400).json({ success: false, message: 'Title and category are required' });
      return;
    }

    const result = await generateProductDescription({ title, category, features });
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
