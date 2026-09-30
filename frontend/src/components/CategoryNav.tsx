import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Leaf,
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Layers,
  Flame,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gift,
  HeartPulse,
  Building2,
  X,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

const categories = [
  {
    id: 'organic-foods',
    name: 'Pure Organic Foods',
    bn: 'খাঁটি মধু ও অর্গানিক',
    slug: 'organic-foods',
    icon: Leaf,
    isOrganic: true,
    subcategories: [
      { name: 'Sundarbans Wild Raw Honey', bn: 'সুন্দরবনের খাঁটি চাকের মধু', slug: 'organic-foods' },
      { name: 'Pabna Organic Cow Ghee', bn: 'পাবনার খাঁটি গাওয়া ঘি', slug: 'organic-foods' },
      { name: 'Cold-Pressed Mustard Oil', bn: 'কাঠের ঘানির সরিষার তেল', slug: 'organic-foods' },
      { name: 'Royal Kashmiri Saffron', bn: 'রয়্যাল কাশ্মীরি জাফরান', slug: 'organic-foods' },
      { name: 'Organic Chia & Flax Seeds', bn: 'অর্গানিক চিয়া সিড ও তিসির বীজ', slug: 'organic-foods' },
    ],
  },
  {
    id: 'electronics-gadgets',
    name: 'Electronics & Gadgets',
    bn: 'গ্যাজেট ও স্মার্টওয়াচ',
    slug: 'electronics-gadgets',
    icon: Smartphone,
    subcategories: [
      { name: 'AMOLED Smartwatches', bn: 'অ্যামোলেড স্মার্টওয়াচ', slug: 'electronics-gadgets' },
      { name: 'ANC TWS Wireless Earbuds', bn: 'এএনসি ওয়্যারলেস ইয়ারবাডস', slug: 'electronics-gadgets' },
      { name: 'MagSafe Fast Powerbanks', bn: 'ম্যাগসেফ ফাস্ট পাওয়ারব্যাংক', slug: 'electronics-gadgets' },
      { name: 'RGB Wireless Keyboards', bn: 'মেকানিক্যাল ওয়্যারলেস কিবোর্ড', slug: 'electronics-gadgets' },
      { name: 'Smart Home Security Cams', bn: 'স্মার্ট হোম সিসিটিভি ক্যামেরা', slug: 'electronics-gadgets' },
    ],
  },
  {
    id: 'fashion-lifestyle',
    name: 'Fashion & Apparel',
    bn: 'ফ্যাশন ও লাইফস্টাইল',
    slug: 'fashion-lifestyle',
    icon: Shirt,
    subcategories: [
      { name: 'Premium Semi-Pure Panjabi', bn: 'প্রিমিয়াম ডিজাইনার পাঞ্জাবি', slug: 'fashion-lifestyle' },
      { name: 'Jamdani & Pure Silk Sarees', bn: 'জামদানি ও কাতান শাড়ি', slug: 'fashion-lifestyle' },
      { name: 'Genuine Leather Wallets', bn: 'খাঁটি চামড়ার মানিব্যাগ ও বেল্ট', slug: 'fashion-lifestyle' },
      { name: 'Polarized UV Sunglasses', bn: 'পোলারাইজড ইউভি সানগ্লাস', slug: 'fashion-lifestyle' },
    ],
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    bn: 'হোম ও কিচেন অ্যাপ্লায়েন্স',
    slug: 'home-kitchen',
    icon: Home,
    subcategories: [
      { name: 'Smart Air Fryers 5.5L', bn: 'স্মার্ট এয়ার ফ্রায়ার', slug: 'home-kitchen' },
      { name: 'High-Torque Mixer Grinders', bn: 'হেভি ডিউটি মিক্সার গ্রাইন্ডার', slug: 'home-kitchen' },
      { name: 'Stainless Electric Kettles', bn: 'অটো-কাট ইলেকট্রিক কেটলি', slug: 'home-kitchen' },
      { name: 'RO Water Purifiers', bn: 'খনিজ সমৃদ্ধ আরও ওয়াটার পিউরিফায়ার', slug: 'home-kitchen' },
    ],
  },
  {
    id: 'beauty-care',
    name: 'Beauty & Wellness',
    bn: 'বিউটি ও পার্সোনাল কেয়ার',
    slug: 'beauty-care',
    icon: Sparkles,
    subcategories: [
      { name: 'Kumkumadi Radiance Facial Oil', bn: 'কুমকুমাডি হারবাল ফেসিয়াল অয়েল', slug: 'beauty-care' },
      { name: 'Royal Dehn Al Oud Attar', bn: 'রয়্যাল দেহন আল উদ সুগন্ধি', slug: 'beauty-care' },
      { name: 'Organic Herbal Hair Oil', bn: 'অর্গানিক হেয়ার ফল কন্ট্রোল তেল', slug: 'beauty-care' },
    ],
  },
];

export const CategoryNav: React.FC = () => {
  const { lang } = useLanguageStore();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const [activeMegaCategory, setActiveMegaCategory] = useState<any | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaCategory(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={megaMenuRef} className="relative bg-slate-900/95 border-b border-slate-800/90 shadow-md py-2 px-4 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        {/* Main Category Links */}
        <div className="flex items-center gap-2 min-w-max">
          {/* Flash Deals Special Link */}
          <Link
            to="/products?flash=true"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white shadow-md shadow-red-600/30 hover:scale-105 transition animate-pulse"
          >
            <Flame className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
            <span>{lang === 'bn' ? 'ফ্ল্যাশ ডিল' : 'Flash Deals'}</span>
          </Link>

          {/* All Categories Button */}
          <Link
            to="/products"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              !currentCategory
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md'
                : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'সব পণ্য' : 'All Products'}</span>
          </Link>

          {/* Department Items with Mega-Menu Trigger */}
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = currentCategory === cat.slug;
            const isMenuOpen = activeMegaCategory?.id === cat.id;

            return (
              <div key={cat.id} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMegaCategory(isMenuOpen ? null : cat)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md shadow-orange-500/20'
                      : cat.isOrganic
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900/60'
                      : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? cat.bn : cat.name}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Mega-Menu Flyout Dropdown */}
      {activeMegaCategory && (
        <div className="absolute top-full left-0 right-0 bg-slate-950/95 border-b border-slate-800 shadow-2xl backdrop-blur-xl p-6 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Department Intro */}
            <div className="space-y-3 border-r border-slate-800/80 pr-6 hidden md:block">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center font-black">
                  <activeMegaCategory.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">
                    {lang === 'bn' ? activeMegaCategory.bn : activeMegaCategory.name}
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-bold">100% Verified Quality</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'bn'
                  ? 'সরাসরি যাচাইকৃত ভেন্ডর ও ল্যাব টেস্ট সার্টিফিকেশন সহ খাঁটি পণ্য কিনুন।'
                  : 'Shop authenticated products with lab-test verification & instant doorstep inspection.'}
              </p>
              <Link
                to={`/products?category=${activeMegaCategory.slug}`}
                onClick={() => setActiveMegaCategory(null)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md hover:scale-105 transition"
              >
                <span>{lang === 'bn' ? 'পুরো ক্যাটালগ দেখুন' : 'View Full Catalog'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Subcategories Grid */}
            <div className="col-span-3 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {lang === 'bn' ? 'জনপ্রিয় সাব-ক্যাটাগরি ও আইটেমসমূহ:' : 'Top Subcategories & Specialties:'}
                </span>
                <button
                  onClick={() => setActiveMegaCategory(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeMegaCategory.subcategories.map((sub: any, idx: number) => (
                  <Link
                    key={idx}
                    to={`/products?category=${sub.slug}`}
                    onClick={() => setActiveMegaCategory(null)}
                    className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-850 transition flex items-center justify-between group shadow-sm"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                        {lang === 'bn' ? sub.bn : sub.name}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-mono">Verified Stock</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
