import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Plane, ShieldCheck, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';
import { ProductCard } from './ProductCard';

interface GlobalCollectionSectionProps {
  products: any[];
  onQuickView: (product: any) => void;
  onQuickOrder: (product: any) => void;
}

export const GlobalCollectionSection: React.FC<GlobalCollectionSectionProps> = ({
  products,
  onQuickView,
  onQuickOrder,
}) => {
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();

  // Filter global / high-end imports
  const globalProducts = products.filter(
    (p) =>
      p.categorySlug === 'smartphones-tablets' ||
      p.categorySlug === 'laptops-computers' ||
      p.categorySlug === 'cameras-drones' ||
      p.categorySlug === 'gaming-consoles' ||
      p.categorySlug === 'global-imports' ||
      p.brand === 'Apple' ||
      p.brand === 'Sony' ||
      p.brand === 'Creed Paris' ||
      p.brand === 'Dyson' ||
      p.brand === 'Keychron' ||
      p.brand === 'Nespresso'
  ).slice(0, 8);

  if (globalProducts.length === 0) return null;

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border border-indigo-500/20 p-6 sm:p-8 my-10 shadow-2xl">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'বিশ্বসেরা গ্লোবাল কালেকশন' : 'ShopX Global Imports'}</span>
            </span>
            <span className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <Plane className="w-3 h-3" />
              <span>{lang === 'bn' ? 'এয়ার এক্সপ্রেস ট্র্যাকড' : 'Direct Air Express'}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            {lang === 'bn'
              ? 'আমেরিকা, দুবাই ও জাপানের অরিজিনাল ফ্ল্যাগশিপ পণ্য'
              : 'Global Flagship Brands & Direct Imports'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {lang === 'bn'
              ? 'কাস্টমস ট্যাক্স পেইড, ১০০% অথেন্টিক গ্যারান্টি এবং ১ বছর অফিসিয়াল ইন্টারন্যাশনাল ওয়ারেন্টি সহ বিশ্বমানের প্রযুক্তি ও লাক্সারি ব্র্যান্ড।'
              : '100% Genuine Authenticity Guaranteed, Customs Duty Cleared & 1-Year International Warranty on Apple, Sony, Dyson & Luxury Fragrances.'}
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center space-x-3 text-xs text-slate-300">
          <div className="flex items-center space-x-1 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'bn' ? '১০০% অরিজিনাল' : '100% Genuine'}</span>
          </div>
          <Link
            to="/products"
            className="flex items-center space-x-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'View All Imports'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {globalProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onQuickView={onQuickView}
            onQuickOrder={onQuickOrder}
          />
        ))}
      </div>
    </section>
  );
};
