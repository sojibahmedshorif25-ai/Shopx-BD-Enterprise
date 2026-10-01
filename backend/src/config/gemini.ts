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

// Supported Groq models
const GROQ_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];

// Call Groq AI (Ultra-fast LLM inference)
const callGroqAI = async (prompt: string, systemInstruction?: string): Promise<string | null> => {
  for (const apiKey of groqKeys) {
    for (const model of GROQ_MODELS) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
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
            temperature: 0.6,
            max_tokens: 800,
          }),
        });

        if (response.ok) {
          const data = (await response.json()) as any;
          const content = data.choices?.[0]?.message?.content;
          if (content) return content;
        }
      } catch (err: any) {
        // Try next model / key
      }
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
      // Failover silently to next
    }
  }
  return null;
};

export const generateAIResponse = async (
  prompt: string,
  systemInstruction?: string,
  language: string = 'en'
): Promise<string> => {
  const isBangla =
    language === 'bn' ||
    /[\u0980-\u09FF]/.test(prompt) ||
    prompt.toLowerCase().includes('bangla') ||
    prompt.toLowerCase().includes('bolo');

  const defaultInstruction = isBangla
    ? `You are ShopX AI Copilot, the official 24/7 intelligent shopping assistant for ShopX BD (Bangladesh).
Company Info:
- Head Office: Rowmari, Kurigram, Rangpur, Bangladesh (রৌমারী, কুড়িগ্রাম, রংপুর)
- 24/7 Hotline: 01942791004 (০১৯৪২৭৯১০০৪) | Email: support@shopxbd.com
- Delivery: Inside Dhaka 24h (৳60), Nationwide outside Dhaka (৳120) across all 64 districts with Cash on Delivery (COD)
- Active Vouchers: SHOPX100 (৳100 off on ৳1000+), EID50 (10% cashback), LUCKY250 (৳250 off)
Always answer the user's question directly, accurately, and politely in fluent Bengali (বাংলা) or Banglish.`
    : `You are ShopX AI Copilot, the official 24/7 intelligent shopping assistant for ShopX BD (Bangladesh).
Company Info:
- Head Office: Rowmari, Kurigram, Rangpur, Bangladesh
- 24/7 Hotline: 01942791004 | Email: support@shopxbd.com
- Delivery: Inside Dhaka 24h ($60 BDT), Nationwide ($120 BDT) Cash on Delivery across all 64 districts
- Active Vouchers: SHOPX100 (Flat ৳100 off), EID50 (10% cashback)
Always answer clearly, politely, and accurately in English.`;

  const finalInstruction = systemInstruction || defaultInstruction;

  // 1. Try Groq First for instant speed (<300ms)
  const groqRes = await callGroqAI(prompt, finalInstruction);
  if (groqRes) return groqRes;

  // 2. Fallback to Google Gemini
  const geminiRes = await callGeminiAI(prompt, finalInstruction);
  if (geminiRes) return geminiRes;

  // 3. Smart Comprehensive Contextual Fallback Engine
  const lower = prompt.toLowerCase();

  // Head office / Address queries
  if (
    lower.includes('head office') ||
    lower.includes('office') ||
    lower.includes('thikana') ||
    lower.includes('ঠিকানা') ||
    lower.includes('location') ||
    lower.includes('koi') ||
    lower.includes('কোথায়')
  ) {
    return isBangla
      ? '🏢 ShopX BD-এর প্রধান কার্যালয়: রৌমারী, কুড়িগ্রাম, রংপুর বিভাগ, বাংলাদেশ।\n\n📞 আমাদের ২৪/৭ কাস্টমার সাপোর্ট হেল্পলাইন: 01942791004\n✉️ ইমেইল: support@shopxbd.com\nসারাদেশের সকল ৬৪ জেলায় আমাদের হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি সেবা চালু রয়েছে।'
      : '🏢 ShopX BD Head Office: Rowmari, Kurigram, Rangpur Division, Bangladesh.\n\n📞 24/7 Helpline: +880 1942-791004\n✉️ Email: support@shopxbd.com\nWe deliver nationwide to all 64 districts with Cash on Delivery!';
  }

  // Conversational "kikoro", "ki koro", "kemon acho"
  if (
    lower.includes('kikoro') ||
    lower.includes('ki koro') ||
    lower.includes('kemon') ||
    lower.includes('tumi ke') ||
    lower.includes('who are you') ||
    lower.includes('কী করো') ||
    lower.includes('কেমন')
  ) {
    return isBangla
      ? 'আমি ShopX AI কো-পাইলট! আমি ২৪ ঘণ্টা আপনার সেবায় নিয়োজিত। আপনি যেকোনো পণ্য, দাম, ডেলিভারি, ভাউচার কোড বা অর্ডার সংক্রান্ত প্রশ্ন করতে পারেন। কীভাবে আপনাকে সাহায্য করতে পারি?'
      : 'I am ShopX AI Copilot, your 24/7 shopping assistant! You can ask me about products, current prices, vouchers, delivery tracking, or store details. How can I help you today?';
  }

  // Delivery & shipping queries
  if (
    lower.includes('delivery') ||
    lower.includes('shipping') ||
    lower.includes('charge') ||
    lower.includes('ডেলিভারি') ||
    lower.includes('ভাড়া')
  ) {
    return isBangla
      ? '🚚 ডেলিভারি চার্জ ও সময়সীমা:\n• ঢাকা সিটিতে: ২৪ ঘণ্টার মধ্যে ৳৬০\n• ঢাকার বাইরে (সকল ৬৩ জেলায়): ৪৮-৭২ ঘণ্টার মধ্যে ৳১২০\n• পেমেন্ট: ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ), বিকাশ, নগদ ও কার্ড\n📞 ২৪/৭ হটলাইন: 01942791004'
      : '🚚 Delivery Policy & Rates:\n• Inside Dhaka: 24h Express for ৳60 BDT\n• Outside Dhaka (All 64 districts): 48-72h for ৳120 BDT\n• Payment: Cash on Delivery (COD), bKash, Nagad, Card\n📞 24/7 Helpline: 01942791004';
  }

  // Owner / Founder / Company
  if (
    lower.includes('owner') ||
    lower.includes('founder') ||
    lower.includes('ceo') ||
    lower.includes('malik') ||
    lower.includes('মালিক') ||
    lower.includes('ফাউন্ডার')
  ) {
    return isBangla
      ? 'ShopX BD-এর সম্মানিত প্রতিষ্ঠাতা ও সিইও সজীব আহমেদ শরীফ। আমাদের মিশন হচ্ছে সারা বাংলাদেশে শতভাগ খাঁটি খাদ্য, অথেনটিক গ্যাজেট ও অফিশিয়াল ওয়ারেন্টিযুক্ত পণ্য দ্রুততম সময়ে পৌঁছে দেওয়া। 📞 যোগাযোগ: 01942791004।'
      : 'ShopX BD is founded and led by Sojib Ahmed Shorif. Our mission is delivering authentic products, organic pure foods, and official warranty tech across Bangladesh. 📞 Helpline: 01942791004.';
  }

  // Vouchers / Promo
  if (
    lower.includes('voucher') ||
    lower.includes('coupon') ||
    lower.includes('offer') ||
    lower.includes('discount') ||
    lower.includes('ভাউচার') ||
    lower.includes('কুপন') ||
    lower.includes('ছাড়')
  ) {
    return isBangla
      ? '🎁 আজকের লাইভ ভাউচার কোডসমূহ:\n• SHOPX100 — ৳১,০০০+ অর্ডারে ফ্ল্যাট ৳১০০ ডিসকাউন্ট\n• EID50 — ১০% ক্যাশব্যাক (সর্বোচ্চ ৳২০০)\n• LUCKY250 — ৳১,৫০০+ অর্ডারে ফ্ল্যাট ৳২৫০ ডিসকাউন্ট\nচেকআউট পেজে কোডটি বসিয়ে ইনস্ট্যান্ট ডিসকাউন্ট উপভোগ করুন!'
      : '🎁 Active Vouchers Today:\n• SHOPX100 — Flat ৳100 OFF on ৳1,000+ orders\n• EID50 — 10% Cashback up to ৳200\n• LUCKY250 — Flat ৳250 OFF on ৳1,500+ orders\nApply at checkout for instant savings!';
  }

  // Budget queries
  if (lower.includes('200') || lower.includes('300') || lower.includes('500') || lower.includes('1000')) {
    return isBangla
      ? `বাজেট ফ্রেন্ডলি বেস্টসেলার পণ্যসমূহ:\n• প্রিমিয়াম অর্গানিক চিয়া সিড (৫০০ গ্রাম) — ৳৪৫০\n• খাঁটি কাঠের ঘানি সরিষার তেল (১ লিটার) — ৳২৪০\n• ১০০% ভার্জিন কালোজিরা তেল (২৫০ মিলি) — ৳৬২০\n• 65W GaN ফাস্ট চার্জার ক্যাবল — ৳৩৫০\n\n🎁 'SHOPX100' কুপনে প্রথম অর্ডারে ৳১০০ ডিসকাউন্ট পাবেন!`
      : `Top Budget-Friendly Best-Sellers:\n• Organic Black Chia Seeds (500g) — ৳450\n• Cold-Pressed Mustard Oil (1L) — ৳240\n• Pure Virgin Kalijira Oil (250ml) — ৳620\n• 65W GaN Fast Charging Cable — ৳350\n\n🎁 Use promo code 'SHOPX100' for ৳100 OFF!`;
  }

  // Honey / Organic Foods / Superfoods
  if (
    lower.includes('honey') ||
    lower.includes('modhu') ||
    lower.includes('মধু') ||
    lower.includes('ghee') ||
    lower.includes('ghi') ||
    lower.includes('ঘি') ||
    lower.includes('oil') ||
    lower.includes('tel') ||
    lower.includes('তেল') ||
    lower.includes('khejur') ||
    lower.includes('khejir') ||
    lower.includes('dates') ||
    lower.includes('খেজুর') ||
    lower.includes('shilajit') ||
    lower.includes('শিলাজিৎ') ||
    lower.includes('chia') ||
    lower.includes('চিয়া') ||
    lower.includes('saffron') ||
    lower.includes('জাফরান')
  ) {
    return isBangla
      ? '🌿 ShopX BD প্রিমিয়াম অর্গানিক ফুড আইটেম (BSTI ও ল্যাব সার্টিফাইড):\n• সুন্দরবনের খাঁটি খলিসা মধু (৫০০ গ্রাম ৳৬৯০, ১ কেজি ৳১,২৫০)\n• পাবনার ঐতিহ্যবাহী বিলোনা গাওয়া ঘি (৫০০ গ্রাম ৳৭৯০, ১ কেজি ৳১,৫৫০)\n• কাঠের ঘানি ভাঙা দেশি সরিষার তেল (৫ লিটার ক্যান ৳১,৪৯০)\n• মদিনার রয়্যাল মেদজুল খেজুর (১ কেজি গিফট প্যাক ৳১,৫৫০)\n• হিমালয়ান গোল্ড গ্রেড শিলাজিৎ (৩০ গ্রাম ৳১,৯৮০)\n• ১০০% ভার্জিন কালোজিরা তেল (২৫০ মিলি ৳৬২০)\nশতভাগ খাঁটি ও নির্ভেজাল না হলে ইনস্ট্যান্ট মানি-ব্যাক গ্যারান্টি!'
      : '🌿 ShopX Pure Organic Foods (100% BSTI & Lab Certified):\n• Sundarbans Raw Honey (500g ৳690, 1kg ৳1,250)\n• Pabna Pure Bilona Cow Ghee (500g ৳790, 1kg ৳1,550)\n• Cold-Pressed Mustard Oil (5L Can ৳1,490)\n• Madinah Jumbo Medjool Dates (1kg Gift Pack ৳1,550)\n• Pure Himalayan Shilajit Resin (30g ৳1,980)\n• 100% Virgin Kalijira Oil (250ml ৳620)\n100% money-back authenticity guarantee!';
  }

  // Phones / Laptops / Gadgets
  if (
    lower.includes('phone') ||
    lower.includes('mobile') ||
    lower.includes('smartphone') ||
    lower.includes('iphone') ||
    lower.includes('samsung') ||
    lower.includes('pixel') ||
    lower.includes('laptop') ||
    lower.includes('macbook') ||
    lower.includes('ফোন') ||
    lower.includes('মোবাইল') ||
    lower.includes('ল্যাপটপ')
  ) {
    return isBangla
      ? '📱 গ্যাজেট ও স্মার্টফোন কালেকশন (১ বছর অফিশিয়াল ওয়ারেন্টি):\n• Apple iPhone 16 Pro Max 256GB — ৳১৬৯,৯০০\n• Samsung Galaxy S25 Ultra 512GB — ৳১৫৮,০০০\n• Google Pixel 9 Pro XL 256GB — ৳১৩৯,৫০০\n• Apple MacBook Pro 16" M3 Max — ৳৩,১৮,০০০\n• ASUS ROG Zephyrus G16 OLED — ৳৩,৩৫,০০০\n• Dell XPS 16 9640 4K OLED — ৳৩,১৮,০০০\nক্যাশ অন ডেলিভারি ও ০% EMI সুবিধা রয়েছে।'
      : '📱 Official Tech & Laptops (1-Year Brand Warranty):\n• Apple iPhone 16 Pro Max 256GB — ৳169,900\n• Samsung Galaxy S25 Ultra 512GB — ৳158,000\n• Google Pixel 9 Pro XL 256GB — ৳139,500\n• Apple MacBook Pro 16" M3 Max — ৳318,000\n• ASUS ROG Zephyrus G16 OLED — ৳335,000\n• Dell XPS 16 9640 4K OLED — ৳318,000\nCash on Delivery & 0% EMI available!';
  }

  // Watches & Luxury Timepieces
  if (
    lower.includes('watch') ||
    lower.includes('ghori') ||
    lower.includes('ঘড়ি') ||
    lower.includes('rolex') ||
    lower.includes('casio') ||
    lower.includes('gshock') ||
    lower.includes('tissot')
  ) {
    return isBangla
      ? '⌚ লাক্সারি ঘড়ি ও টাইমপিস কালেকশন (১০০% অরিজিনাল):\n• Rolex Submariner Date 41mm Oystersteel — ৳১৫,২০,০০০\n• Tissot PRX Powermatic 80 Blue Dial (Swiss Automatic) — ৳৬৯,৫০০\n• Casio G-Shock GA-2100 CasiOak — ৳১২,২০০\n• Apple Watch Ultra 2 49mm Titanium — ৳৯৮,০০০\nপ্রতিটি ঘড়িতে অফিসিয়াল আন্তর্জাতিক ওয়ারেন্টি কার্ড ও গিফট বক্স রয়েছে।'
      : '⌚ Luxury Watches & Smartwatches:\n• Rolex Submariner Date 41mm — ৳1,520,000\n• Tissot PRX Powermatic 80 Blue Dial — ৳69,500\n• Casio G-Shock CasiOak GA-2100 — ৳12,200\n• Apple Watch Ultra 2 49mm — ৳98,000\nIncludes official international warranty and certificate!';
  }

  // Gaming, Drones & Consoles
  if (
    lower.includes('gaming') ||
    lower.includes('drone') ||
    lower.includes('ps5') ||
    lower.includes('playstation') ||
    lower.includes('steam deck') ||
    lower.includes('গেমিং') ||
    lower.includes('ড্রোন') ||
    lower.includes('ক্যামেরা') ||
    lower.includes('camera')
  ) {
    return isBangla
      ? '🎮 গেমিং, ড্রোন ও ক্যামেরা গিয়ার্স:\n• Sony PlayStation 5 Pro 2TB Console — ৳৮৯,৯০০\n• DJI Mini 4 Pro Fly More Combo Plus — ৳১,২৯,০০০\n• Valve Steam Deck OLED 512GB — ৳৭১,৯০০\n• Sony Alpha 7 IV Full-Frame Camera — ৳২,৩৫,০০০\n• Nintendo Switch OLED — ৳৩৬,৫০০\n• Razer DeathAdder V3 Pro Wireless Mouse — ৳১৩,২০০\nঅফিশিয়াল ওয়ারেন্টি ও ইনটেক সিল প্যাক সহ ডেলিভারি দেওয়া হয়।'
      : '🎮 Gaming & Drone Gears:\n• Sony PlayStation 5 Pro 2TB Console — ৳89,900\n• DJI Mini 4 Pro Fly More Combo Plus — ৳129,000\n• Valve Steam Deck OLED 512GB — ৳71,900\n• Sony Alpha 7 IV Full-Frame Camera — ৳235,000\n• Razer DeathAdder V3 Pro Wireless Mouse — ৳13,200\nAll brand-new sealed units with official warranty!';
  }

  // Fashion & Lifestyle
  if (
    lower.includes('fashion') ||
    lower.includes('saree') ||
    lower.includes('shari') ||
    lower.includes('panjabi') ||
    lower.includes('শাড়ি') ||
    lower.includes('পাঞ্জাবি') ||
    lower.includes('bag') ||
    lower.includes('wallet') ||
    lower.includes('ব্যাগ') ||
    lower.includes('জুতা') ||
    lower.includes('shoe') ||
    lower.includes('sunglass')
  ) {
    return isBangla
      ? '👕 প্রিমিয়াম ফ্যাশন ও লাইফস্টাইল:\n• ঐতিহ্যবাহী ৮৪ কাউন্ট ঢাকাই জামদানি সিল্ক শাড়ি — ৳১২,৮০০\n• রয়্যাল হেরিটেজ জরি এমব্রয়ডারি সিল্ক পাঞ্জাবি সেট — ৳৪,২০০\n• আর্টিসানাল খাঁটি চামড়ার ল্যাপটপ মেসেঞ্জার ব্যাগ — ৳৫,২০০\n• ইতালিয়ান টপ-গ্রেইন লেদার RFID ওয়ালেট — ৳১,৯৫০\n• Ray-Ban Classic Aviator Polarized সানগ্লাস — ৳১৫,৯০০\n• Nike Air Jordan 1 Retro Chicago — ৳২১,৫০০'
      : '👕 Luxury Fashion & Lifestyle Collection:\n• Handloom 84-Count Dhakai Jamdani Silk Saree — ৳12,800\n• Royal Heritage Silk Panjabi Set — ৳4,200\n• Artisanal Full-Grain Leather Laptop Messenger Bag — ৳5,200\n• Italian Top-Grain Leather RFID Wallet — ৳1,950\n• Ray-Ban Classic Aviator Polarized Sunglasses — ৳15,900\n• Nike Air Jordan 1 Retro Chicago — ৳21,500';
  }

  // Beauty, Perfumes & Fragrance
  if (
    lower.includes('beauty') ||
    lower.includes('perfume') ||
    lower.includes('attar') ||
    lower.includes('ator') ||
    lower.includes('আতর') ||
    lower.includes('সুগন্ধি') ||
    lower.includes('oud') ||
    lower.includes('creed') ||
    lower.includes('tom ford') ||
    lower.includes('dyson') ||
    lower.includes('serum')
  ) {
    return isBangla
      ? '💄 রাজকীয় আতর, সুগন্ধি ও বিউটি কেয়ার:\n• Creed Aventus EDP 100ml — ৳৩৫,৫০০\n• Tom Ford Private Blend Oud Wood EDP 50ml — ৳২৮,৫০০\n• রয়্যাল দেহন আল উদ কম্বোডি আতর ১২ মিলি — ৳৮,২০০\n• Dyson Airwrap Multi-Styler Complete Long — ৳৬৪,৫০০\n• Dyson Supersonic Nural Hair Dryer — ৳৫৬,০০০\n• Estée Lauder Advanced Night Repair Serum 50ml — ৳১২,৪০০'
      : '💄 Royal Fragrance & Luxury Beauty:\n• Creed Aventus EDP 100ml — ৳35,500\n• Tom Ford Private Blend Oud Wood 50ml — ৳28,500\n• Royal Dehn Al Oud Cambodi 12ml — ৳8,200\n• Dyson Airwrap Multi-Styler Complete Long — ৳64,500\n• Dyson Supersonic Nural Hair Dryer — ৳56,000\n• Estée Lauder Advanced Night Repair Serum 50ml — ৳12,400';
  }

  // Home & Kitchen Appliances
  if (
    lower.includes('kitchen') ||
    lower.includes('home') ||
    lower.includes('airfryer') ||
    lower.includes('vacuum') ||
    lower.includes('robot') ||
    lower.includes('blender') ||
    lower.includes('হোম') ||
    lower.includes('কিচেন')
  ) {
    return isBangla
      ? '🏠 স্মার্ট হোম ও কিচেন অ্যাপ্লায়েন্স:\n• Philips 5000 Series Connected Airfryer XXL (7.2L) — ৳২২,৯০০\n• Dyson V15 Detect Absolute Cordless Vacuum — ৳৮৪,৯০০\n• Xiaomi Robot Vacuum X20+ (Auto Mop Wash & Empty) — ৳৫১,৫০০\n• Nespresso Vertuo Pop Coffee Machine — ৳২৩,৫০০\n• 2-in-1 Rechargeable Portable Blender — ৳১,৯৫০\nসকল অ্যাপ্লায়েন্সে অফিশিয়াল রিপ্লেসমেন্ট গ্যারান্টি রয়েছে।'
      : '🏠 Smart Home & Kitchen Appliances:\n• Philips Digital Airfryer XXL 7.2L — ৳22,900\n• Dyson V15 Detect Absolute Vacuum — ৳84,900\n• Xiaomi Robot Vacuum X20+ Auto Station — ৳51,500\n• Nespresso Vertuo Pop Coffee Machine — ৳23,500\nOfficial replacement guarantee on all electrical appliances!';
  }

  // Warranty & Returns
  if (
    lower.includes('warranty') ||
    lower.includes('guarantee') ||
    lower.includes('return') ||
    lower.includes('ওয়ারেন্টি') ||
    lower.includes('গ্যারান্টি') ||
    lower.includes('ফেরত')
  ) {
    return isBangla
      ? '🛡️ ShopX BD ট্রাস্ট ও পলিসি:\n• ১-২ বছরের অফিশিয়াল ব্র্যান্ড ওয়্যারেন্টি কার্ড\n• ৭ দিনের সহজ ফ্রি রিটার্ন পলিসি\n• ১০০% অথেনটিসিটি ও বিএসটিআই ল্যাব সার্টিফাইড\n• পণ্য হাতে পেয়ে খুলে দেখে ক্যাশ অন ডেলিভারি পরিশোধের সুযোগ\nযেকোনো সমস্যায় কল করুন: 01942791004।'
      : '🛡️ ShopX BD Trust Guarantee:\n• 1-2 Year Official Brand Warranty\n• 7-Day Hassle-Free Return Policy\n• 100% Genuine & BSTI Lab Certified\n• Open parcel check before Cash on Delivery payment\nHelpline: +880 1942-791004.';
  }

  if (isBangla) {
    return 'আসসালামু আলাইকুম! ShopX BD-তে আপনাকে স্বাগতম। আপনি যেকোনো পণ্য (স্মার্টফোন, ল্যাপটপ, সুন্দরবনের মধু, ঘি, গ্যাজেট, ফ্যাশন), দাম, ডেলিভারি বা ভাউচার কোড সম্পর্কে জিজ্ঞেস করতে পারেন। আমি উত্তর দিতে প্রস্তুত!';
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
