import React, { useState, useEffect } from 'react';
import { X, Sparkles, Tag, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { useNavigate } from 'react-router-dom';

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const { items } = useCartStore();
  const { lang } = useLanguageStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && items.length > 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [items.length, hasShown]);

  if (!isOpen || items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 border border-orange-500/40 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative text-center overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30 mb-4 animate-bounce">
          <Tag className="w-9 h-9" />
        </div>

        <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">
          {lang === 'bn' ? 'অর্ডার মিস করবেন না!' : "DON'T LEAVE EMPTY HANDED"}
        </span>

        <h3 className="text-xl sm:text-2xl font-black text-white mt-3">
          {lang === 'bn' ? 'আপনার জন্য বিশেষ ৳১০০ ডিসকাউন্ট!' : 'Take an Extra ৳100 Off Today!'}
        </h3>

        <p className="text-xs text-slate-300 mt-2">
          {lang === 'bn'
            ? 'আপনার কার্টের পণ্যগুলো অর্ডার সম্পন্ন করতে নিচের কুপনটি ব্যবহার করুন:'
            : 'Complete your checkout right now and use this instant promo voucher:'}
        </p>

        {/* Promo Box */}
        <div className="my-5 bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[10px] text-slate-500 font-bold uppercase">
              {lang === 'bn' ? 'কুপন কোড' : 'PROMO CODE'}
            </span>
            <p className="font-mono font-black text-base text-orange-400">SHOPX100</p>
          </div>
          <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
            {lang === 'bn' ? '৳১০০ সেভ' : '৳100 SAVED'}
          </span>
        </div>

        <button
          onClick={() => {
            setIsOpen(false);
            navigate('/checkout');
          }}
          className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/30 hover:scale-105 transition"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{lang === 'bn' ? 'চেকআউটে গিয়ে ছাড় নিন →' : 'Apply & Complete Order →'}</span>
        </button>
      </div>
    </div>
  );
};
