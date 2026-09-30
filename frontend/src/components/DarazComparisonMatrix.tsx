import React from 'react';
import { Check, X, Zap, ShieldCheck, Sparkles, Truck, Clock, RefreshCw, Award, Bot } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const DarazComparisonMatrix: React.FC = () => {
  const { lang } = useLanguageStore();

  const comparisonData = [
    {
      feature: lang === 'bn' ? 'ডেলিভারি স্পিড (Dhaka & Nationwide)' : 'Delivery Speed & Precision',
      shopx: lang === 'bn' ? '⚡ ৬০ মিনিটে এক্সপ্রেস / ২৪ ঘণ্টায় সারা দেশ' : '⚡ 60-Min Express / Next-Day 64 Districts',
      daraz: lang === 'bn' ? '🐢 ৩ থেকে ৭ দিন পর্যন্ত দীর্ঘ সময়' : '🐢 3 to 7 Days Standard Delivery',
      icon: Clock,
      highlight: true,
    },
    {
      feature: lang === 'bn' ? 'রাইডারের সামনে খুলে চেক করার সুযোগ' : 'Open Parcel & Inspect Before Payment',
      shopx: lang === 'bn' ? '✅ ১০০% রাইডারের সামনে খুলে চেক অনুমোদিত' : '✅ 100% Free Open & Inspect Allowed',
      daraz: lang === 'bn' ? '❌ টাকা দেওয়ার আগে পার্সেল খোলা নিষেধ' : '❌ No open box inspection before payment',
      icon: ShieldCheck,
      highlight: true,
    },
    {
      feature: lang === 'bn' ? 'ইনস্ট্যান্ট রিফান্ড সরাসরি বিকাশ/নগদে' : 'Instant Refund to bKash / Nagad',
      shopx: lang === 'bn' ? '🚀 ২ মিনিটে সরাসরি এমএফএস ওয়ালেটে রিফান্ড' : '🚀 2-Minute Direct MFS Auto-Refund',
      daraz: lang === 'bn' ? '⏳ ৭ থেকে ১৪ দিন ভাউচার বা অপেক্ষা' : '⏳ 7 to 14 Days Slow Bank Processing',
      icon: RefreshCw,
      highlight: true,
    },
    {
      feature: lang === 'bn' ? '২৪/৭ এআই শপিং অ্যাসিস্ট্যান্ট ও ভয়েস' : '24/7 AI Personal Shopper & Voice AI',
      shopx: lang === 'bn' ? '🤖 লাইভ বাংলা ভয়েস ও বাজেট বিল্ডার এআই' : '🤖 Bangla Voice, Vision & AI Budget Builder',
      daraz: lang === 'bn' ? '❌ সাধারণ রোবটিক চ্যাটবট' : '❌ Static generic text chatbot',
      icon: Bot,
      highlight: false,
    },
    {
      feature: lang === 'bn' ? '৩৬০° ভার্চুয়াল ৩ডি ট্রাই-অন স্টুডিও' : '360° Interactive 3D & Virtual Try-On',
      shopx: lang === 'bn' ? '👓 রিয়েল-টাইম ৩ডি ভিউ ও এআর ফিটিং' : '👓 Real-time 3D Studio & AR Fitting',
      daraz: lang === 'bn' ? '❌ শুধুমাত্র সাধারণ টু-ডি ছবি' : '❌ Flat 2D photos only',
      icon: Sparkles,
      highlight: false,
    },
    {
      feature: lang === 'bn' ? 'সেলারদের জন্য SaaS স্টোর ও ০% কমিশন' : 'SaaS Vendor Hub & Zero Commission Option',
      shopx: lang === 'bn' ? '🏢 নিজস্ব সাবডোমেইন, ওয়েবহুক ও পিওএস' : '🏢 Dedicated Storefront, Webhooks & Thermal POS',
      daraz: lang === 'bn' ? '🐢 ১৫-২০% উচ্চ কমিশন ফি' : '🐢 High 15-20% commission cuts',
      icon: Award,
      highlight: false,
    },
  ];

  return (
    <section className="py-8 max-w-7xl mx-auto px-4">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'তুলনামূলক শ্রেষ্ঠত্ব' : 'ShopX Superiority Matrix'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bn' ? (
              <>কেন ShopX বাংলাদেশের <span className="text-emerald-700">সেরা ই-কমার্স ও SaaS প্ল্যাটফর্ম?</span></>
            ) : (
              <>Why ShopX is the <span className="text-emerald-700">#1 Marketplace in Bangladesh?</span></>
            )}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn'
              ? 'নিরাপত্তা, সুপারফাস্ট ডেলিভারি ও আধুনিক এআই প্রযুক্তির নিখুঁত মেলবন্ধন।'
              : 'Uncompromising speed, 100% verified authenticity, and next-gen AI shopping convenience.'}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Header Row */}
          <div className="grid grid-cols-12 p-4 bg-slate-50 border-b border-slate-200 items-center text-xs font-extrabold uppercase tracking-wider">
            <div className="col-span-4 text-slate-600">
              {lang === 'bn' ? 'ফিচার ও নিশ্চয়তা' : 'Feature / Guarantee'}
            </div>
            <div className="col-span-4 text-center text-emerald-700 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span className="font-extrabold text-sm">ShopX Supermall</span>
            </div>
            <div className="col-span-4 text-center text-slate-500 font-bold">
              {lang === 'bn' ? 'দারাজ / অন্যান্য মার্কেট' : 'Traditional (Daraz)'}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {comparisonData.map((row, idx) => {
              const Icon = row.icon;
              return (
                <div
                  key={idx}
                  className={`grid grid-cols-12 p-4 items-center text-xs transition hover:bg-slate-50/80 ${
                    row.highlight ? 'bg-emerald-50/20' : ''
                  }`}
                >
                  <div className="col-span-4 flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-slate-100 text-slate-700 hidden sm:flex">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-slate-800">{row.feature}</span>
                  </div>

                  {/* ShopX Column */}
                  <div className="col-span-4 text-center px-2">
                    <span className="inline-block px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                      {row.shopx}
                    </span>
                  </div>

                  {/* Daraz / Others Column */}
                  <div className="col-span-4 text-center px-2">
                    <span className="inline-block px-3 py-1.5 rounded-xl bg-slate-100 text-slate-500 text-xs">
                      {row.daraz}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
