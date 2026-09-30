import React from 'react';
import { ShieldCheck, Zap, RotateCcw, CreditCard, Headphones } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const TrustGuaranteeBar: React.FC = () => {
  const { lang } = useLanguageStore();

  const guarantees = [
    {
      icon: ShieldCheck,
      title: lang === 'bn' ? '১০০% জেনুইন গ্যারান্টি' : '100% Genuine Brands',
      subtitle: lang === 'bn' ? 'বিএসটিআই ও ল্যাব সার্টিফাইড' : 'BSTI & Lab Certified',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      icon: Zap,
      title: lang === 'bn' ? 'সুপার এক্সপ্রেস ডেলিভারি' : 'Express Doorstep Delivery',
      subtitle: lang === 'bn' ? 'ঢাকা ২৪ ঘণ্টা, সারাদেশে ৪৮ ঘণ্টা' : '24h in Dhaka, 48h Nationwide',
      bg: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      icon: RotateCcw,
      title: lang === 'bn' ? '৭ দিনের সহজ রিটার্ন' : '7-Day Easy Returns',
      subtitle: lang === 'bn' ? 'পণ্য দেখে পেমেন্টের সুবিধা' : 'Inspect before payment',
      bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      icon: CreditCard,
      title: lang === 'bn' ? 'নিরাপদ পেমেন্ট ও COD' : 'Safe Payments & COD',
      subtitle: lang === 'bn' ? 'বিকাশ, নগদ ও ক্যাশ অন ডেলিভারি' : 'bKash, Nagad & Cash on Delivery',
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      icon: Headphones,
      title: lang === 'bn' ? '২৪/৭ কাস্টমার সাপোর্ট' : '24/7 Dedicated Helpline',
      subtitle: lang === 'bn' ? 'হটলাইন: 01942791004' : 'Hotline: 01942791004',
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {guarantees.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-3xl bg-white border border-slate-100/90 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3.5`}
            >
              <div
                className={`w-12 h-12 rounded-2xl ${item.bg} border flex items-center justify-center flex-shrink-0 shadow-sm`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 truncate">{item.title}</h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

