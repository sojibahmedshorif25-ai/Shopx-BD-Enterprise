import React from 'react';
import { Trees, Heart, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const GreenClimateSection: React.FC = () => {
  const { lang } = useLanguageStore();

  return (
    <section className="max-w-7xl mx-auto px-4 my-8">
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-4 z-10 text-center sm:text-left flex-col sm:flex-row">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
            <Trees className="w-9 h-9 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-1">
              <span className="bg-emerald-500/20 text-emerald-300 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                🌱 ShopX Green Climate Impact
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Eco-Friendly</span>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'bn'
                ? 'আপনার প্রতিটি অর্ডারে সুন্দরবনে রোপণ হচ্ছে ম্যানগ্রোভ চারা!'
                : 'Every Order on ShopX Plants a Tree in the Sundarbans!'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {lang === 'bn'
                ? 'ShopX BD-এর পরিবেশ সুরক্ষার অঙ্গীকার। আমরা প্রতিটি সফল ডেলিভারি থেকে ৫ টাকা জমা করে সুন্দরবন ও উপকূলীয় বনায়নে চারা রোপণ করছি।'
                : 'Our zero-carbon pledge: We contribute ৳5 from each delivery toward Sundarbans coastal mangrove afforestation.'}
            </p>
          </div>
        </div>

        {/* Live Tree Counter */}
        <div className="bg-slate-950/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 text-center shrink-0 min-w-[200px] z-10">
          <p className="text-[11px] text-slate-400 font-medium">
            {lang === 'bn' ? 'মোট রোপিত চারাগাছ' : 'Total Trees Planted'}
          </p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-0.5">
            ১৪,৮২০+
          </p>
          <span className="text-[10px] text-emerald-500 font-semibold block mt-0.5">
            🌳 verified by Forest Dept.
          </span>
        </div>
      </div>
    </section>
  );
};
