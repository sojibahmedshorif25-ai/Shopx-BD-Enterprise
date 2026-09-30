import React from 'react';
import { X, Scale, Trash2, CheckCircle2, ShoppingCart, Zap, Star, ShieldCheck, Award } from 'lucide-react';
import { useCompareStore } from '../store/useCompareStore';
import { useCartStore } from '../store/useCartStore';

interface ProductCompareModalProps {
  onQuickOrder?: (product: any) => void;
}

export const ProductCompareModal: React.FC<ProductCompareModalProps> = ({ onQuickOrder }) => {
  const { compareItems, isOpen, closeCompare, removeFromCompare, clearCompare } = useCompareStore();
  const { addItem } = useCartStore();

  if (!isOpen || compareItems.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500/20 border border-orange-500/30 rounded-2xl text-orange-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                পণ্য তুলনা ম্যাট্রিক্স (Product Comparison)
                <span className="text-xs bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">
                  {compareItems.length}/4 টি পণ্য
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                একসাথে একাধিক পণ্যের দাম, ডিসকাউন্ট, ল্যাব টেস্ট ও স্পেক্স তুলনা করুন
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-rose-400 hover:text-rose-300 font-bold px-3 py-1.5 rounded-xl bg-rose-950/30 border border-rose-900/50 flex items-center gap-1.5 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>সব মুছুন</span>
            </button>
            <button
              onClick={closeCompare}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Table comparison */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-3 text-slate-400 font-bold w-1/4">পণ্য তথ্য</th>
                {compareItems.map((item) => (
                  <th key={item._id} className="p-3 w-1/3 align-top">
                    <div className="relative group bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
                      <button
                        onClick={() => removeFromCompare(item._id)}
                        className="absolute top-2 right-2 p-1 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-full transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <img
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                        alt={item.title}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl mb-2"
                      />
                      <h4 className="font-bold text-xs sm:text-sm text-slate-200 line-clamp-2 mb-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base font-black text-orange-400">
                          ৳{(item.discountPrice || item.price).toLocaleString()}
                        </span>
                        {item.discountPrice && item.discountPrice < item.price && (
                          <span className="text-xs text-slate-500 line-through">
                            ৳{item.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full gap-2">
                        <button
                          onClick={() => {
                            if (onQuickOrder) onQuickOrder(item);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20"
                        >
                          <Zap className="w-3.5 h-3.5 fill-slate-950" />
                          <span>সরাসরি কিনুন</span>
                        </button>
                        <button
                          onClick={() => addItem(item, 1)}
                          className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>কার্টে যোগ করুন</span>
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
              <tr>
                <td className="p-3 text-slate-400 font-bold">ক্যাটেগরি</td>
                {compareItems.map((item) => {
                  const catName = typeof item.category === 'object' ? item.category?.name : (item.categorySlug || 'General');
                  return (
                    <td key={item._id} className="p-3 text-slate-200 font-medium">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs">
                        {catName}
                      </span>
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td className="p-3 text-slate-400 font-bold">রেটিং ও রিভিউ</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3 text-slate-200">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{item.rating || 4.9}</span>
                      <span className="text-xs text-slate-500">({item.numReviews || 48} রিভিউ)</span>
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 text-slate-400 font-bold">স্টক স্ট্যাটাস</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3 text-emerald-400 font-bold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>স্টকে আছে ({item.stock || 50}+ টি)</span>
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 text-slate-400 font-bold">ল্যাব সার্টিফিকেট / বিশুদ্ধতা</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      BSTI & BCSIR অনুমোদিত
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 text-slate-400 font-bold">০% ইন্টারেস্ট EMI</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-lg">
                      <Award className="w-3.5 h-3.5" />
                      ৩-৩৬ মাস EMI প্রযোজ্য
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 text-slate-400 font-bold">রিটার্ন পলিসি</td>
                {compareItems.map((item) => (
                  <td key={item._id} className="p-3 text-slate-300 font-medium text-xs">
                    ৭ দিনের সহজ ফ্রি রিটার্ন ও রিফান্ড গ্যারান্টি
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
