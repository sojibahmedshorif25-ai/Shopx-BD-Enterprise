import { create } from 'zustand';

export type Language = 'bn' | 'en';

interface LanguageState {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

export const translations: Record<string, { bn: string; en: string }> = {
  appName: { bn: 'ShopX BD', en: 'ShopX BD' },
  tagline: { bn: 'সবার সেরা শপিং মল', en: "Bangladesh's #1 Multi-Vendor Mall" },
  searchPlaceholder: { bn: 'পণ্য, খাঁটি মধু, গ্যাজেট বা ব্র্যান্ড সার্চ করুন...', en: 'Search 100,000+ products, organic foods, gadgets...' },
  organicBadge: { bn: '১০০% খাঁটি ও অর্গানিক', en: '100% Pure Organic' },
  cashOnDelivery: { bn: 'ক্যাশ অন ডেলিভারি', en: 'Cash on Delivery' },
  fastDelivery: { bn: '২৪ ঘণ্টায় সুপার ডেলিভারি', en: '24h Express Delivery' },
  moneyBack: { bn: 'টাকা ফেরত গ্যারান্টি', en: '7-Day Refund Guarantee' },
  flashSale: { bn: 'ফ্ল্যাশ সেল (Flash Deals)', en: 'Flash Deals (Limited Time)' },
  flashSaleSubtitle: { bn: 'অরিজিনাল ব্র্যান্ড ও খাঁটি পণ্যে মেগা ছাড়!', en: 'Mega discounts on original brands & organic goods!' },
  organicCollection: { bn: 'ঘরের বাজার স্পেশাল — খাঁটি অর্গানিক ফুড', en: 'Ghorer Bazar Special — Pure Organic Foods' },
  organicSubtitle: { bn: 'BSTI ও BCSIR ল্যাব টেস্টে শতভাগ খাঁটি ও ভেজালমুক্ত পণ্য', en: 'BSTI & BCSIR lab tested 100% pure & unadulterated' },
  comboDeals: { bn: 'সুপার সেভার কম্বো অফার', en: 'Super Saver Combo Bundles' },
  comboSubtitle: { bn: 'একসাথে কিনুন এবং পান আকর্ষণীয় বান্ডেল ছাড়', en: 'Buy bundles together and get massive bundle savings' },
  teamBuy: { bn: 'ভাইরাল টিম ও গ্রুপ বাই ডিলস', en: 'Social Viral Team & Group Buy' },
  teamBuySubtitle: { bn: 'বন্ধুদের সাথে গ্রুপে কিনে পান ফ্ল্যাট ৩০% পর্যন্ত ডিসকাউন্ট', en: 'Buy in group with friends & get up to 30% flat discount' },
  trending: { bn: 'জনপ্রিয় সব কালেকশন (Trending)', en: 'Trending & Best Selling Collections' },
  trendingSubtitle: { bn: 'গ্রাহকদের সবচেয়ে পছন্দের গ্যাজেট, ফ্যাশন ও হোম অ্যাপ্লায়েন্স', en: 'Most loved tech gadgets, lifestyle & organic food' },
  bestSellers: { bn: 'সেরা বিক্রিত পণ্য', en: 'Best Selling Products' },
  instantOrder: { bn: '১-ক্লিকে অর্ডার', en: '1-Click Order' },
  buyNow: { bn: 'সরাসরি কিনুন', en: 'Buy Now' },
  addToCart: { bn: 'কার্ট', en: 'Cart' },
  viewDetails: { bn: 'বিস্তারিত দেখুন', en: 'View Details' },
  cart: { bn: 'শপিং ব্যাগ', en: 'Shopping Bag' },
  checkout: { bn: 'অর্ডার সম্পন্ন করুন', en: 'Proceed to Checkout' },
  trackOrder: { bn: 'অর্ডার ট্র্যাক করুন', en: 'Track Order' },
  login: { bn: 'লগইন / সাইন আপ', en: 'Login / Sign Up' },
  becomeSeller: { bn: 'সেলার হোন', en: 'Become a Seller' },
  liveAiHelp: { bn: 'AI সহকারী', en: 'AI Assistant' },
  dhakaDelivery: { bn: 'ঢাকার ভেতর ৬০ টাকা', en: 'Inside Dhaka ৳60' },
  outsideDhakaDelivery: { bn: 'ঢাকার বাইরে ১২০ টাকা', en: 'Outside Dhaka ৳120' },
  hotline: { bn: 'হটলাইন', en: 'Hotline' },
  pureAndTested: { bn: '১০০% খাঁটি ও পরীক্ষিত', en: '100% Pure & Tested' },
  testedSubtitle: { bn: 'BSTI ও BCSIR ল্যাব সার্টিফাইড', en: 'BSTI & BCSIR Lab Certified' },
  superDelivery: { bn: 'দ্রুততম সুপার ডেলিভারি', en: 'Fastest Delivery' },
  superDeliverySub: { bn: 'ঢাকায় ২৪ ঘণ্টা, সারাদেশে ৪৮ ঘণ্টা', en: '24h in Dhaka, 48h Nationwide' },
  easyReturn: { bn: '৭ দিনের সহজ রিটার্ন', en: '7-Day Easy Returns' },
  easyReturnSub: { bn: 'পণ্য দেখে টাকা দেওয়ার সুবিধা', en: 'Check & Pay on Delivery' },
  securePay: { bn: 'নিরাপদ পেমেন্ট ও COD', en: 'Secure Pay & COD' },
  securePaySub: { bn: 'বিকাশ, নগদ ও ক্যাশ অন ডেলিভারি', en: 'bKash, Nagad & Cash on Delivery' },
  support247: { bn: '২৪/৭ কাস্টমার কেয়ার', en: '24/7 Customer Care' },
  support247Sub: { bn: 'হটলাইন: 01942791004', en: 'Hotline: 01942791004' },
  mysteryBoxTitle: { bn: 'ShopX লাকি মিস্ট্রি বক্স আনলক করুন! 🎁', en: 'Unlock ShopX Lucky Mystery Box! 🎁' },
  mysteryBoxSub: { bn: 'প্রতিটি অর্ডারের সাথে জিতে নিন ৳৫০০ পর্যন্ত ক্যাশ ভাউচার ও মেগা সারপ্রাইজ!', en: 'Win up to ৳500 instant cash vouchers & mega gifts with orders!' },
  openBox: { bn: 'এখনই বক্স খুলুন (Open Box)', en: 'Open Mystery Box' },
  compareBadge: { bn: 'পণ্য তুলনা করুন', en: 'Compare Products' },
  allCategories: { bn: 'সকল ক্যাটাগরি', en: 'All Categories' },
  organicFoods: { bn: 'খাঁটি অর্গানিক ফুড', en: 'Organic Foods' },
  electronics: { bn: 'ইলেকট্রনিক্স ও গ্যাজেটস', en: 'Electronics & Gadgets' },
  fashion: { bn: 'ফ্যাশন ও লাইফস্টাইল', en: 'Fashion & Lifestyle' },
  healthBeauty: { bn: 'হেলথ ও বিউটি', en: 'Health & Beauty' },
  homeAppliances: { bn: 'হোম ও কিচেন', en: 'Home & Kitchen' },
};

export const useLanguageStore = create<LanguageState>((set, get) => ({
  lang: (localStorage.getItem('shopx_lang') as Language) || 'en', // Default to English as requested
  setLang: (lang) => {
    localStorage.setItem('shopx_lang', lang);
    set({ lang });
  },
  toggleLang: () => {
    const nextLang = get().lang === 'bn' ? 'en' : 'bn';
    localStorage.setItem('shopx_lang', nextLang);
    set({ lang: nextLang });
  },
  t: (key: string) => {
    const currentLang = get().lang;
    return translations[key] ? translations[key][currentLang] : key;
  },
}));
