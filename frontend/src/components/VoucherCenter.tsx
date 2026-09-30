import React, { useState } from 'react';
import { Ticket, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../store/useCartStore';
import { useLanguageStore } from '../store/useLanguageStore';

export const VoucherCenter: React.FC = () => {
  const [collectedCodes, setCollectedCodes] = useState<string[]>([]);
  const { setCoupon } = useCartStore();
  const { lang } = useLanguageStore();

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
    },
  ];

  const handleCollect = (v: any) => {
    if (collectedCodes.includes(v.code)) return;
    setCollectedCodes([...collectedCodes, v.code]);
    setCoupon(v.code, v.discountAmount);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <section id="voucher-center-section" className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Ticket className="w-5 h-5 text-emerald-700" />
          <h3 className="text-xl font-extrabold text-slate-900">
            {lang === 'bn' ? 'ভাউচার কালেকশন হাব' : 'Voucher Collection Center'}
          </h3>
        </div>
        <span className="text-xs text-emerald-700 font-bold">
          {lang === 'bn' ? '✓ ১-ক্লিকে সংগ্রহ করুন — কার্টে অটো ডিসকাউন্ট প্রযোজ্য' : '✓ 1-Click Collect — Auto applied to your checkout cart'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vouchers.map((v) => {
          const isCollected = collectedCodes.includes(v.code);

          return (
            <div
              key={v.id}
              className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all flex items-center justify-between gap-4 relative overflow-hidden"
            >
              {/* Left Cutout Ticket Styling */}
              <div className="space-y-1">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${v.bgTag}`}>
                  {v.type}
                </span>
                <h4 className="text-base font-extrabold text-slate-900">
                  {v.discountTitle}
                </h4>
                <p className="text-[11px] text-slate-500">{v.minOrder}</p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {lang === 'bn' ? 'মেয়াদ:' : 'Valid:'} {v.validUntil}
                </p>
              </div>

              {/* Collect Button */}
              <button
                onClick={() => handleCollect(v)}
                disabled={isCollected}
                className={`px-4 py-2 rounded-2xl font-bold text-xs transition flex-shrink-0 shadow-sm ${
                  isCollected
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                {isCollected ? (lang === 'bn' ? 'সংগৃহীত ✓' : 'Collected ✓') : (lang === 'bn' ? 'কালেক্ট করুন' : 'Claim Voucher')}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
