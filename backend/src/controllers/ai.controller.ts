import { Request, Response } from 'express';
import { generateAIResponse, generateProductDescription } from '../config/gemini.js';
import { Product } from '../models/Product.js';

export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, language = 'en' } = req.body;

    if (!message) {
      res.status(400).json({ success: false, message: 'Message is required' });
      return;
    }

    const trimmed = message.trim();
    const lower = trimmed.toLowerCase();

    // Check if user is asking in Bengali or Banglish
    const isExplicitBangla =
      language === 'bn' ||
      /[\u0980-\u09FF]/.test(message) ||
      lower.includes('bangla') ||
      lower.includes('bolo') ||
      lower.includes('kemon') ||
      lower.includes('pabo') ||
      lower.includes('paoya') ||
      lower.includes('taka') ||
      lower.includes('dam') ||
      lower.includes('ache') ||
      lower.includes('ki ') ||
      lower.includes('modhu') ||
      lower.includes('tel') ||
      lower.includes('bhalo') ||
      lower.includes('jani');

    // Extract any budget number mentioned (e.g. 200, 500, 1000, 25000, 50k, 100k)
    const budgetMatch = lower.match(/(\d+[\d,]*)\s*(tk|taka|te|takar|টাকা|হাজার|k)?/);
    let budgetNum = 0;
    if (budgetMatch) {
      let rawNum = parseInt(budgetMatch[1].replace(/,/g, ''), 10);
      if (budgetMatch[2] === 'k' || lower.includes('হাজার')) {
        rawNum = rawNum * 1000;
      }
      budgetNum = rawNum;
    }

    // 1. Language switch request
    if (lower === 'bangla bolo' || lower.includes('bangla bol') || lower === 'বাংলায় বলো' || lower === 'বাংলা') {
      res.status(200).json({
        success: true,
        reply:
          'অবশ্যই! আমি ShopX AI কো-পাইলট, আপনার সাথে সম্পূর্ণ বাংলায় কথা বলছি। আমাদের ১০০% জেনুইন গ্যাজেট, খাঁটি সুন্দরবনের মধু, গাওয়া ঘি, অফিশিয়াল ব্র্যান্ডের ফোন ও আজকের মেগা ডিল সম্পর্কে আপনার যেকোনো প্রশ্ন করতে পারেন। কীভাবে সাহায্য করব?',
      });
      return;
    }

    // 2. Greetings
    if (
      lower === 'hi' ||
      lower === 'hello' ||
      lower === 'hey' ||
      lower === 'salam' ||
      lower === 'assalamu alaikum' ||
      lower === 'kemon acho' ||
      lower === 'ki khobor' ||
      lower === 'হাই' ||
      lower === 'হ্যালো' ||
      lower === 'সালাম'
    ) {
      const reply = isExplicitBangla
        ? 'আসসালামু আলাইকুম! ShopX BD-তে আপনাকে স্বাগতম। আমি আপনার সার্বক্ষণিক এআই শপিং অ্যাসিস্ট্যান্ট। আপনি কোন ধরণের পণ্য খুঁজছেন? যেমন: বাজেট স্মার্টফোন, খাঁটি সুন্দরবনের মধু ও ঘি, ল্যাপটপ, ফ্যাশন বা আজকের স্পেশাল ভাউচার? যেকোনো প্রশ্ন করুন!'
        : 'Hello & Welcome to ShopX BD! I am your 24/7 AI Shopping Copilot. What product or budget are you exploring today? (e.g. Flagship phones, BSTI-certified organic honey, laptops, audio gear, or promo discount codes)';
      res.status(200).json({ success: true, reply });
      return;
    }

    // 3. Budget Queries (e.g. "200 te ki paoya jabe", "500 takar moddhe ki ache")
    if (budgetNum > 0 && (lower.includes('ki') || lower.includes('pabo') || lower.includes('paoya') || lower.includes('under') || lower.includes('budget') || lower.includes('moddhe') || lower.includes('পাব') || lower.includes('পাওয়া'))) {
      const searchCeiling = budgetNum < 500 ? 550 : budgetNum;
      const matchingProducts = await Product.find({
        status: 'active',
        $or: [{ discountPrice: { $lte: searchCeiling } }, { price: { $lte: searchCeiling } }],
      })
        .select('title banglaTitle price discountPrice isOrganic')
        .limit(5);

      if (matchingProducts.length > 0) {
        const prodList = matchingProducts
          .map((p) => {
            const pTitle = isExplicitBangla && p.banglaTitle ? p.banglaTitle : p.title;
            const price = p.discountPrice || p.price;
            return `• ${pTitle} — ৳${price}`;
          })
          .join('\n');

        const reply = isExplicitBangla
          ? `৳${budgetNum} এর বাজেটের মধ্যে ShopX BD-তে আমাদের সেরা কোয়ালিটি পণ্যসমূহ:\n\n${prodList}\n\n🎁 প্রথম অর্ডারে 'SHOPX100' কুপন ব্যবহার করে ফ্ল্যাট ৳১০০ ডিসকাউন্ট পেয়ে যাবেন! সারাদেশে ক্যাশ অন ডেলিভারি সুবিধা রয়েছে।`
          : `Here are top verified products available around your ৳${budgetNum} budget at ShopX BD:\n\n${prodList}\n\n🎁 Use promo code 'SHOPX100' for an instant ৳100 discount on your order! Cash on Delivery available across all 64 districts.`;

        res.status(200).json({ success: true, reply });
        return;
      }
    }

    // 4. Specific category / product searches from DB
    let categorySearchTerm = '';
    if (lower.includes('honey') || lower.includes('মধু')) categorySearchTerm = 'honey';
    else if (lower.includes('ghee') || lower.includes('ঘি')) categorySearchTerm = 'ghee';
    else if (lower.includes('oil') || lower.includes('তেল') || lower.includes('mustard')) categorySearchTerm = 'oil';
    else if (lower.includes('phone') || lower.includes('smartphone') || lower.includes('samsung') || lower.includes('iphone') || lower.includes('মোবাইল')) categorySearchTerm = 'smartphones';
    else if (lower.includes('laptop') || lower.includes('computer') || lower.includes('macbook') || lower.includes('ল্যাপটপ')) categorySearchTerm = 'laptops';
    else if (lower.includes('headphone') || lower.includes('earbuds') || lower.includes('tws') || lower.includes('speaker') || lower.includes('হেডফোন')) categorySearchTerm = 'audio';

    // Fetch context products from DB
    const dbProducts = await Product.find({ status: 'active' })
      .select('title banglaTitle price discountPrice isOrganic isFlashSale stock categorySlug brand')
      .limit(15);

    const productContext = dbProducts
      .map(
        (p) =>
          `[${p.title} (${p.banglaTitle || ''}) - Brand: ${p.brand || 'Official'} - Price: ৳${p.discountPrice || p.price}, Category: ${p.categorySlug}]`
      )
      .join('\n');

    const systemInstruction = isExplicitBangla
      ? `You are ShopX AI Copilot, the official 24/7 intelligent assistant for ShopX BD (Bangladesh).
Company Info:
- Head Office: Rowmari, Kurigram, Rangpur, Bangladesh (রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ)
- 24/7 Hotline: 01942791004 (০১৯৪২৭৯১০০৪) | Email: support@shopxbd.com
- Founder & CEO: Sojib Ahmed Shorif (সজীব আহমেদ শরীফ)
- Delivery: Inside Dhaka 24h (৳60), Nationwide outside Dhaka across all 64 districts (৳120) with Cash on Delivery (COD)
- Active Vouchers: SHOPX100 (৳100 off on ৳1000+), EID50 (10% cashback), LUCKY250 (৳250 off)

Live Product Catalog:
${productContext}

Instructions:
1. Always understand Bengali, Romanized Banglish (e.g., "head office koi", "kikoro", "ki koro", "kemon acho", "modhu koto taka"), and English.
2. Answer the user's specific question directly, concisely, and accurately in polite Bengali (বাংলা).
3. If they ask about products, recommend specific matching items with BDT prices from the live catalog.`
      : `You are ShopX AI Copilot, the official 24/7 intelligent assistant for ShopX BD (Bangladesh).
Company Info:
- Head Office: Rowmari, Kurigram, Rangpur, Bangladesh
- 24/7 Hotline: 01942791004 | Email: support@shopxbd.com
- Founder & CEO: Sojib Ahmed Shorif
- Delivery: Inside Dhaka 24h (৳60 BDT), Nationwide outside Dhaka (৳120 BDT) Cash on Delivery across all 64 districts
- Active Vouchers: SHOPX100 (Flat ৳100 off on ৳1000+), EID50 (10% cashback)

Live Product Catalog:
${productContext}

Instructions:
1. Answer the user's question clearly, accurately, and politely in English.
2. Recommend specific matching products with BDT (৳) prices from the catalog.`;

    const aiReply = await generateAIResponse(message, systemInstruction, isExplicitBangla ? 'bn' : 'en');

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
