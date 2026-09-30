import { Request, Response } from 'express';
import { generateAIResponse, generateProductDescription } from '../config/gemini.js';
import { Product } from '../models/Product.js';

export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history, language = 'en' } = req.body;

    if (!message) {
      res.status(400).json({ success: false, message: 'Message is required' });
      return;
    }

    const isEnglish = language === 'en' || !/[\u0980-\u09FF]/.test(message);

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

    const prompt = isEnglish
      ? `User Message: "${message}"

Current ShopX BD Store Catalog Context:
${productContext}

Instructions:
1. You MUST reply in fluent, clear, friendly ENGLISH (unless user explicitly typed Bengali script).
2. Recommend relevant products if applicable with accurate prices in BDT (৳).
3. If asked about shipping/delivery or office, state: Dhaka 24h express (৳60), Nationwide 48-72h (৳120), Cash on Delivery available across all 64 districts. Head Office: Rowmari, Kurigram, Rangpur, Bangladesh. 24/7 Hotline: 01942791004.
4. Keep the answer concise, helpful, and formatted with clean bullet points and emojis.`
      : `User Message: "${message}"

ShopX BD স্টোর ক্যাটালগ কনটেক্সট:
${productContext}

নির্দেশনা:
১. সম্পূর্ণ উত্তরটি অবশ্যই সুন্দর ও প্রাঞ্জল বাংলায় দিন।
২. প্রাসঙ্গিক পণ্যের নাম ও দাম (৳ BDT) উল্লেখ করুন।
৩. ডেলিভারি সংক্রান্ত প্রশ্নে বলুন: ঢাকায় ২৪ ঘণ্টায় ৳৬০, সারাদেশে ৪৮-৭২ ঘণ্টায় ৳১২০ এবং ক্যাশ অন ডেলিভারি সুবিধা। প্রধান কার্যালয়: রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ। হটলাইন: 01942791004।
৪. উত্তর সংক্ষিপ্ত, তথ্যবহুল এবং ইমোজি সহ দিন।`;

    const aiReply = await generateAIResponse(prompt, undefined, isEnglish ? 'en' : 'bn');

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
