import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_BACKUP,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

const groqKeys = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_BACKUP,
].filter(Boolean) as string[];

// Call Groq Llama 3.3 70B (Fastest response, <300ms)
const callGroqAI = async (prompt: string, systemInstruction?: string): Promise<string | null> => {
  for (const apiKey of groqKeys) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content:
                systemInstruction ||
                'You are ShopX AI Assistant, an ultra-smart, polite, and helpful e-commerce shopping consultant for ShopX BD (Bangladesh). You fluently answer in Bengali (বাংলা) and English with product advice, recipes, pure food health benefits, and gadget comparisons.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as any;
        const content = data.choices?.[0]?.message?.content;
        if (content) return content;
      }
    } catch (err: any) {
      console.warn(`⚠️ [Groq AI Failover] Key issue: ${err.message}`);
    }
  }
  return null;
};

// Call Google Gemini 1.5 Flash
const callGeminiAI = async (prompt: string, systemInstruction?: string): Promise<string | null> => {
  for (const apiKey of geminiKeys) {
    try {
      const cleanKey = apiKey.startsWith('AIzaSy') ? apiKey : `AIzaSy${apiKey.replace(/^AQ\./, '')}`;
      const genAI = new GoogleGenerativeAI(cleanKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction:
          systemInstruction ||
          'You are ShopX AI Assistant, an ultra-smart, polite shopping consultant for ShopX BD. You speak fluent Bengali (বাংলা) and English.',
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (err: any) {
      console.warn(`⚠️ [Gemini AI Failover] Key issue: ${err.message}`);
    }
  }
  return null;
};

export const generateAIResponse = async (
  prompt: string,
  systemInstruction?: string,
  language: string = 'en'
): Promise<string> => {
  const isBangla = language === 'bn' || /[\u0980-\u09FF]/.test(prompt) || prompt.toLowerCase().includes('bangla') || prompt.toLowerCase().includes('bolo');

  const finalInstruction = systemInstruction || (isBangla
    ? 'You are ShopX AI Assistant, an ultra-smart, polite shopping consultant for ShopX BD. You MUST respond in fluent Bengali (বাংলা) with product recommendations in BDT (৳), shipping information, vouchers, and hotline (01942791004).'
    : 'You are ShopX AI Copilot, an ultra-smart, polite, and helpful e-commerce shopping consultant for ShopX BD (Bangladesh). You MUST respond in fluent, professional English with product recommendations in BDT (৳), shipping information (24h Dhaka ৳60, Nationwide ৳120), vouchers, and hotline (01942791004).');

  // Try Groq First for instant speed
  const groqRes = await callGroqAI(prompt, finalInstruction);
  if (groqRes) return groqRes;

  // Fallback to Google Gemini
  const geminiRes = await callGeminiAI(prompt, finalInstruction);
  if (geminiRes) return geminiRes;

  // Smart Contextual Fallback Engine when remote keys are offline
  const lower = prompt.toLowerCase();

  if (lower.includes('bangla') || lower.includes('বাংলা')) {
    return 'অবশ্যই! আমি আপনার সাথে বাংলায় কথা বলছি। ShopX BD-এর যেকোনো পণ্য, দাম, অফার, ভাউচার কোড বা ডেলিভারি সম্পর্কে যেকোনো কিছু জিজ্ঞেস করতে পারেন।';
  }

  if (lower.includes('200') || lower.includes('300') || lower.includes('500')) {
    return isBangla
      ? `৳২০০ - ৳৫০০ বাজেটের মধ্যে ShopX BD-এর জনপ্রিয় বেস্টসেলার পণ্যসমূহ:\n• প্রিমিয়াম অর্গানিক চিয়া সিড (৫০০ গ্রাম) — ৳৩৪০\n• ১০০% খাঁটি ভার্জিন কালোজিরা তেল (২৫০ মিলি) — ৳৪৭০\n• ঘানি ভাঙা খাঁটি সরিষার তেল (১ লিটার) — ৳২৪০\n• 65W GaN ফাস্ট চার্জার ক্যাবল\n\n🎁 'SHOPX100' কুপন ব্যবহার করে প্রথম অর্ডারে ৳১০০ ফ্ল্যাট ছাড় সংগ্রহ করুন!`
      : `Here are popular items under ৳500 at ShopX BD:\n• Organic Black Chia Seeds (500g) — ৳340\n• Pure Virgin Kalijira Oil (250ml) — ৳470\n• Cold-Pressed Mustard Oil (1L) — ৳240\n• 65W GaN Fast Charging Cables\n\n🎁 Use voucher 'SHOPX100' for Flat ৳100 Off on your first order!`;
  }

  if (lower.includes('honey') || lower.includes('মধু')) {
    return isBangla
      ? '🌿 আমাদের সুন্দরবনের প্রাকৃতিক চাকের মধু (৳৬৯০ / ৫০০ গ্রাম) এবং ১ কেজি ফ্যামিলি জার (৳১২৫০) BSTI ও ল্যাব টেস্টে ১০০% নির্ভেজাল প্রমাণিত। ২৪-৪৮ ঘণ্টায় সারাদেশে ডেলিভারি পাওয়া যায়।'
      : '🌿 Our Sundarbans Raw Honey (৳690 / 500g, ৳1,250 / 1kg) is 100% BSTI & BCSIR lab tested pure with doorstep cash on delivery across Bangladesh.';
  }

  if (lower.includes('ghee') || lower.includes('ঘি')) {
    return isBangla
      ? '🌿 পাবনার ঐতিহ্যবাহী ১০০% খাঁটি গাওয়া ঘি (৳৭৯০ / ৫০০ গ্রাম) এবং ১ কেজি জার (৳১৫৫০)। খাঁটি দুধের সর থেকে ঐতিহ্যবাহী নিয়মে প্রস্তুত।'
      : '🌿 Traditional Pabna Pure Cow Ghee (৳790 / 500g, ৳1,550 / 1kg), made from 100% grass-fed cow milk butter.';
  }

  if (lower.includes('phone') || lower.includes('smartphone') || lower.includes('samsung') || lower.includes('iphone') || lower.includes('মোবাইল') || lower.includes('ফোন')) {
    return isBangla
      ? '📱 ShopX BD-তে রয়েছে অফিশিয়াল ১ বছরের ওয়্যারেন্টিসহ Apple iPhone 16 Pro Max (৳১৬৯,৯০০), Samsung Galaxy S25 Ultra (৳১৫৮,০০০), এবং Galaxy S24 Ultra (৳১২৫,০০০)। ক্যাশ অন ডেলিভারি ও ০% EMI সুবিধা রয়েছে।'
      : '📱 We offer official 1-Year Warranty smartphones including Apple iPhone 16 Pro Max (৳169,900), Samsung Galaxy S25 Ultra (৳158,000), and S24 Ultra (৳125,000) with Cash on Delivery & 0% EMI.';
  }

  if (lower.includes('laptop') || lower.includes('computer') || lower.includes('macbook') || lower.includes('ল্যাপটপ')) {
    return isBangla
      ? '💻 আমাদের টপ ল্যাপটপ কালেকশন: Apple MacBook Pro 16" M3 Max (৳৩,৩০,০০০) এবং ASUS ROG Zephyrus G16 OLED (৳২,৭৫,০০০)। সাথে অফিশিয়াল ব্র্যান্ড ওয়ারেন্টি।'
      : '💻 Our top laptops include Apple MacBook Pro 16" M3 Max (৳330,000) and ASUS ROG Zephyrus G16 OLED (৳275,000) with official brand warranty.';
  }

  if (lower.includes('voucher') || lower.includes('coupon') || lower.includes('ভাউচার') || lower.includes('অফার')) {
    return isBangla
      ? '🎁 আজকের স্পেশাল ভাউচারসমূহ:\n• SHOPX100 — ৳১,০০০+ অর্ডারে ফ্ল্যাট ৳১০০ ডিসকাউন্ট\n• EID50 — ১০% ক্যাশব্যাক (সর্বোচ্চ ৳২০০)\n• FREE_DELIVERY — ফ্রি ডেলিভারি ভাউচার\nভাউচার কালেকশন সেন্টার থেকে ১-ক্লিকে ক্লেইম করুন!'
      : '🎁 Active Vouchers Today:\n• SHOPX100 — Flat ৳100 Off on orders over ৳1,000\n• EID50 — 10% Cashback up to ৳200\n• FREE_DELIVERY — Free Doorstep Shipping\nCollect yours at the Voucher Center!';
  }

  if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('ডেলিভারি') || lower.includes('ঠিকানা') || lower.includes('office') || lower.includes('hotline')) {
    return isBangla
      ? '🚚 ডেলিভারি রেট ও পলিসি:\n• ঢাকা সিটিতে: ২৪ ঘণ্টার মধ্যে ৳৬০\n• ঢাকার বাইরে (সকল ৬৩ জেলায়): ৪৮-৭২ ঘণ্টার মধ্যে ৳১২০\n• পেমেন্ট: ক্যাশ অন ডেলিভারি, বিকাশ ও নগদ\n🏢 প্রধান কার্যালয়: রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ\n📞 ২৪/৭ হটলাইন: 01942-791004'
      : '🚚 Delivery Policy & Rates:\n• Inside Dhaka: 24h Express for ৳60\n• Outside Dhaka (all 63 districts): 48-72h for ৳120\n• Payment: Cash on Delivery, bKash & Nagad\n🏢 Head Office: Rowmari, Kurigram, Rangpur, Bangladesh\n📞 24/7 Helpline: +880 1942-791004';
  }

  if (isBangla) {
    return 'আসসালামু আলাইকুম! ShopX BD-তে আপনাকে স্বাগতম। আপনি কোন ধরণের পণ্য খুঁজছেন? যেমন: বাজেট স্মার্টফোন, খাঁটি সুন্দরবনের মধু ও ঘি, ল্যাপটপ, ফ্যাশন বা আজকের স্পেশাল ভাউচার? যেকোনো প্রশ্ন আমাকে জানান!';
  }

  return 'Hello! Welcome to ShopX BD. How can I assist your shopping today? Feel free to ask about flagship smartphones, BSTI-certified organic honey & ghee, fashion, or 24h doorstep express delivery!';
};

export const generateProductDescription = async ({
  title,
  category,
  features,
}: {
  title: string;
  category: string;
  features?: string;
}): Promise<{ shortDescription: string; fullDescription: string; tags: string[]; seoKeywords: string[] }> => {
  const prompt = `Generate a high-converting, SEO-optimized e-commerce product description in English and Bengali for:
Product Title: ${title}
Category: ${category}
Key Features: ${features || 'Premium quality, 100% verified authentic'}

Please return ONLY a valid JSON object matching this structure:
{
  "shortDescription": "2-sentence compelling summary with key highlights in Bengali",
  "fullDescription": "Rich description with bullet points of benefits, specs, and why to buy in Bengali & English",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seoKeywords": ["keyword1", "keyword2", "keyword3"]
}`;

  try {
    const text = await generateAIResponse(
      prompt,
      'You are a world-class e-commerce copywriter for the Bangladesh market. Always return strict JSON.'
    );

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.warn('AI Description JSON parse fallback:', e);
  }

  return {
    shortDescription: `${title} — ShopX BD-এর ১০০% খাঁটি ও প্রিমিয়াম কোয়ালিটি পণ্য। দ্রুত হোম ডেলিভারি ও মানি-ব্যাক গ্যারান্টি।`,
    fullDescription: `${title} পণ্যটি বাজারের সেরা কোয়ালিটি নিশ্চিত করে তৈরি। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি এবং ৭ দিনের রিটার্ন পলিসি সুবিধা রয়েছে।`,
    tags: [category.toLowerCase(), 'shopx-bd', 'organic', 'authentic', 'bangladesh'],
    seoKeywords: [title, category, 'buy online bd', 'best price bangladesh'],
  };
};
