import React from 'react';
import { Leaf, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useLanguageStore } from '../store/useLanguageStore';

interface GhorerBazarSectionProps {
  products: Product[];
  onQuickOrder: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export const GhorerBazarSection: React.FC<GhorerBazarSectionProps> = ({
  products,
  onQuickOrder,
  onQuickView,
}) => {
  const { lang, t } = useLanguageStore();
  const organicProducts = products.filter((p) => p.isOrganic).slice(0, 4);
  if (organicProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* GhorerBazar Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-emerald-800/50 relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Leaf className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ঘরের বাজার প্রিমিয়াম কালেকশন' : 'Ghorer Bazar Premium Organic'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {lang === 'bn' ? '১০০% খাঁটি ও নির্ভেজাল অর্গানিক খাদ্যপণ্য' : '100% Pure & Organic Certified Foods'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl mt-2 leading-relaxed">
              {lang === 'bn'
                ? 'সরাসরি সুন্দরবনের চাকের মধু, পাবনার গাওয়া ঘি, কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল ও প্রিমিয়াম চিয়া সিড। ল্যাব টেস্টে উত্তীর্ণ এবং টাকা ফেরত গ্যারান্টি।'
                : 'Raw Sundarbans honey, pure cow ghee, cold-pressed mustard oil & royal saffron. BSTI & BCSIR lab certified with 100% money-back guarantee.'}
            </p>
          </div>

          {/* 3 Trust Badges */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-slate-900/60 backdrop-blur-md p-3 rounded-2xl text-center border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-200">{lang === 'bn' ? '১০০% অর্গানিক' : '100% Pure'}</p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md p-3 rounded-2xl text-center border border-amber-500/30">
              <Award className="w-6 h-6 text-amber-400 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-200">{lang === 'bn' ? 'ল্যাব পরীক্ষিত' : 'Lab Tested'}</p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md p-3 rounded-2xl text-center border border-teal-500/30">
              <HeartHandshake className="w-6 h-6 text-teal-300 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-200">{lang === 'bn' ? 'হাতে পেয়ে পেমেন্ট' : 'COD Verified'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Organic Foods */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {organicProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onQuickOrder={onQuickOrder}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};
