import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Layers,
  Flame,
  ShoppingCart,
  User,
  X,
  Leaf,
  Smartphone,
  Shirt,
  Sparkles,
  Laptop,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useLanguageStore } from '../store/useLanguageStore';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { items, setDrawerOpen } = useCartStore();
  const { user } = useAuthStore();
  const { lang } = useLanguageStore();
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);

  const categories = [
    { name: lang === 'bn' ? 'সকল কালেকশন' : 'All Collections', slug: '', icon: Layers },
    { name: lang === 'bn' ? 'স্মার্টফোন ও ট্যাব' : 'Smartphones & Tablets', slug: 'smartphones-tablets', icon: Smartphone },
    { name: lang === 'bn' ? 'ল্যাপটপ ও কম্পিউটার' : 'Laptops & Computers', slug: 'laptops-computers', icon: Laptop },
    { name: lang === 'bn' ? 'খাঁটি মধু ও অর্গানিক ফুড' : 'Pure Organic Foods', slug: 'organic-foods', icon: Leaf },
    { name: lang === 'bn' ? 'ফ্যাশন ও লাইফস্টাইল' : 'Fashion & Lifestyle', slug: 'fashion-lifestyle', icon: Shirt },
    { name: lang === 'bn' ? 'বিউটি ও রাজকীয় সুগন্ধি' : 'Beauty & Fragrances', slug: 'beauty-care', icon: Sparkles },
  ];

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Category Bottom Sheet on Mobile */}
      {isCategorySheetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end md:hidden animate-in fade-in">
          <div className="bg-white border-t border-slate-200 rounded-t-3xl p-6 space-y-4 max-h-[75vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-700" />
                <span>{lang === 'bn' ? 'সকল ক্যাটাগরি ব্রাউজ করুন' : 'Browse Categories'}</span>
              </h3>
              <button
                onClick={() => setIsCategorySheetOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    to={cat.slug ? `/products?category=${cat.slug}` : '/products'}
                    onClick={() => setIsCategorySheetOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 text-xs font-bold text-slate-800 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden py-1.5 px-2 shadow-lg">
        <div className="grid grid-cols-5 items-center text-center">
          {/* 1. Home */}
          <Link
            to="/"
            className={`flex flex-col items-center py-1 rounded-xl transition ${
              location.pathname === '/' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{lang === 'bn' ? 'হোম' : 'Home'}</span>
          </Link>

          {/* 2. Categories */}
          <button
            onClick={() => setIsCategorySheetOpen(true)}
            className="flex flex-col items-center py-1 text-slate-500 hover:text-emerald-700 transition"
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{lang === 'bn' ? 'ক্যাটাগরি' : 'Categories'}</span>
          </button>

          {/* 3. Flash Deals */}
          <Link
            to="/products?flash=true"
            className={`flex flex-col items-center py-1 transition ${
              location.search.includes('flash') ? 'text-red-600 font-bold' : 'text-red-500 hover:text-red-600'
            }`}
          >
            <Flame className="w-5 h-5 fill-red-500 text-red-500 animate-pulse" />
            <span className="text-[10px] mt-0.5">{lang === 'bn' ? 'ফ্ল্যাশ ডিল' : 'Flash'}</span>
          </Link>

          {/* 4. Cart Drawer */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex flex-col items-center py-1 text-slate-500 hover:text-emerald-700 transition"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-emerald-700 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{lang === 'bn' ? 'কার্ট' : 'Cart'}</span>
          </button>

          {/* 5. Account */}
          <Link
            to={user ? '/track-order' : '/auth'}
            className={`flex flex-col items-center py-1 transition ${
              location.pathname === '/auth' || location.pathname === '/track-order'
                ? 'text-emerald-700 font-bold'
                : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">
              {user ? (lang === 'bn' ? 'অর্ডার' : 'Orders') : (lang === 'bn' ? 'লগইন' : 'Account')}
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};
