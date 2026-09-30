import React, { useState, useEffect } from 'react';
import { Ticket, CheckCircle2, Sparkles, Clock, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../store/useCartStore';
import { useLanguageStore } from '../store/useLanguageStore';

export const VoucherCenter: React.FC = () => {
  const { setCoupon } = useCartStore();
  const { lang } = useLanguageStore();

  const todayStr = new Date().toISOString().split('T')[0];
  const storageKey = `shopx_daily_collected_vouchers_${todayStr}`;

  const [collectedCodes, setCollectedCodes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(collectedCodes));
    } catch (e) {
      console.error(e);
    }
  }, [collectedCodes, storageKey]);

  const vouchers = [
    {
      id: 'v-1',
      code: 'SHOPX100',
      discountTitle: lang === 'bn' ? '৳১০০ ফ্ল্যাট ছাড়' : '৳100 Flat Discount',
      minOrder: lang === 'bn' ? '৳১,০০০ বা তার বেশি অর্ডারে' : 'On orders above ৳1,000',
      discountAmount: 100,
      validUntil: lang === 'bn' ? '৩১ মার্চ ২০২৬' : '31 Mar 2026',
      type: lang === 'bn' ? 'মেগা ভাউচার' : 'Mega Voucher',
      bgTag: 'bg-emerald-100 text-emerald-800',
      totalQuota: 100,
      remainingQuota: 82,
      isExhausted: false,
    },
    {
      id: 'v-2',
      code: 'EID50',
      discountTitle: lang === 'bn' ? '১০% মেগা ক্যাশব্যাক' : '10% Cashback Rush',
      minOrder: lang === 'bn' ? '৳৫০০ অর্ডারে (সর্বোচ্চ ৳২০০)' : 'On orders above ৳500 (Max ৳200)',
      discountAmount: 50,
      validUntil: lang === 'bn' ? '১৫ এপ্রিল ২০২৬' : '15 Apr 2026',
      type: lang === 'bn' ? 'স্টোর ভাউচার' : 'Store Voucher',
      bgTag: 'bg-blue-100 text-blue-800',
      totalQuota: 150,
      remainingQuota: 45,
      isExhausted: false,
    },
    {
      id: 'v-3',
      code: 'FREEDELIV',
      discountTitle: lang === 'bn' ? 'ফ্রি হোম ডেলিভারি' : 'Free Doorstep Shipping',
      minOrder: lang === 'bn' ? 'যেকোনো ক্যাটাগরির অর্ডারে' : 'Valid on any department order',
      discountAmount: 60,
      validUntil: lang === 'bn' ? '৩০ এপ্রিল ২০২৬' : '30 Apr 2026',
      type: lang === 'bn' ? 'শিপিং ভাউচার' : 'Shipping Voucher',
      bgTag: 'bg-amber-100 text-amber-800',
      totalQuota: 200,
      remainingQuota: 110,
      isExhausted: false,
    },
  ];

  const handleCollect = (v: any) => {
    if (v.isExhausted) return;
    if (collectedCodes.includes(v.code)) return;

    const next = [...collectedCodes, v.code];
    setCollectedCodes(next);
    setCoupon(v.code, v.discountAmount);
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
  };

  return (
    <section id="voucher-center-section" className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Ticket className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {lang === 'bn' ? 'ভাউচার কালেকশন হাব' : 'Voucher Collection Center'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'bn' ? 'প্রতিদিন ১টি একাউন্ট থেকে ১ বার ক্লেইম করা যাবে' : 'Daily 1-Claim Limit per Account'}
            </p>
          </div>
        </div>
        <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
          {lang === 'bn' ? '✓ ১-ক্লিকে সংগ্রহ — চেকআউটে অটো ডিসকাউন্ট' : '✓ 1-Click Collect — Auto applied to cart'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {vouchers.map((v) => {
          const isCollected = collectedCodes.includes(v.code);

          return (
            <div
              key={v.id}
              className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 relative overflow-hidden ${
                isCollected ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-100/90 hover:border-emerald-300'
              }`}
            >
              {/* Left Cutout Ticket Styling */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${v.bgTag}`}>
                    {v.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {lang === 'bn' ? `আজকের কোটা: ${v.remainingQuota}/${v.totalQuota}` : `Quota: ${v.remainingQuota}/${v.totalQuota}`}
                  </span>
                </div>

                <h4 className="text-lg font-black text-slate-900 leading-snug">
                  {v.discountTitle}
                </h4>
                <p className="text-xs text-slate-500 font-medium">{v.minOrder}</p>
                
                <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400 font-mono">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{lang === 'bn' ? 'মেয়াদ:' : 'Valid:'} {v.validUntil}</span>
                </div>
              </div>

              {/* Collect Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400">
                  {isCollected 
                    ? (lang === 'bn' ? 'আজকের দিনে সংরক্ষিত' : 'Claimed for today') 
                    : (lang === 'bn' ? 'সীমিত অফার' : 'Limited daily slots')}
                </span>

                <button
                  onClick={() => handleCollect(v)}
                  disabled={isCollected || v.isExhausted}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-sm ${
                    isCollected
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-not-allowed font-extrabold'
                      : v.isExhausted
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
                  }`}
                >
                  {isCollected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{lang === 'bn' ? 'আজকের জন্য সংগৃহীত ✓' : 'Collected for Today ✓'}</span>
                    </>
                  ) : v.isExhausted ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'সীমা শেষ (Stock Out)' : 'Limit Reached'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'কালেক্ট করুন' : 'Claim Voucher'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
