import React from 'react';
import { Scale, X } from 'lucide-react';
import { useCompareStore } from '../store/useCompareStore';

export const CompareFloatingBar: React.FC = () => {
  const { compareItems, openCompare, clearCompare } = useCompareStore();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 animate-in slide-in-from-bottom-3 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md border border-orange-500/40 rounded-2xl p-2.5 sm:px-4 sm:py-3 shadow-2xl flex items-center gap-3 ring-2 ring-orange-500/20">
        <button
          onClick={openCompare}
          className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-white hover:text-orange-400 transition"
        >
          <div className="relative p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl text-slate-950">
            <Scale className="w-5 h-5 font-black" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center ring-2 ring-slate-900">
              {compareItems.length}
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <p className="font-black text-white text-xs">পণ্য তুলনা করুন ({compareItems.length})</p>
            <p className="text-[10px] text-slate-400">ম্যাট্রিক্স ভিউ দেখতে ক্লিক করুন</p>
          </div>
        </button>

        <button
          onClick={clearCompare}
          title="তুলনা তালিকা খালি করুন"
          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
