import React from 'react';
import { X, Crown, ShieldCheck, Sparkles, Truck, Gift, Zap, Headphones, Check } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useAuthStore } from '../store/useAuthStore';

interface VIPLoyaltyClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VIPLoyaltyClubModal: React.FC<VIPLoyaltyClubModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguageStore();
  const { user } = useAuthStore();

  if (!isOpen) return null;

  const currentTier = 'Gold VIP';
  const progressPercent = 72; // 72% towards Platinum

  const tiers = [
    {
      name: 'Bronze Member',
      banglaName: 'ব্রোঞ্জ মেম্বার',
      requirement: '৳০ - ৳৫,০০০',
      color: 'from-amber-700 to-yellow-800',
      border: 'border-amber-700/40',
      perks: ['১x ShopX Coins প্রতি ১০০ টাকায়', 'স্ট্যান্ডার্ড ডেলিভারি সুবিধা', 'ডেইলি লাকি স্পিন ও স্ক্র্যাচ কার্ড'],
    },
    {
      name: 'Silver VIP',
      banglaName: 'সিলভার ভিআইপি',
      requirement: '৳৫,০০০ - ৳২০,০০০',
      color: 'from-slate-400 to-slate-600',
      border: 'border-slate-400/40',
      perks: ['১.২৫x ShopX Coins আর্নিং', '৳১০০ জন্মদিনের গিফট ভাউচার', 'মাসিক স্পেশাল ডিসকাউন্ট কোড'],
    },
    {
      name: 'Gold VIP (Current)',
      banglaName: 'গোল্ড ভিআইপি (বর্তমান)',
      requirement: '৳২০,০০০ - ৳৫০,০০০',
      color: 'from-amber-400 to-yellow-600',
      border: 'border-amber-400/60 shadow-amber-500/20 shadow-lg ring-1 ring-amber-400/50',
      isCurrent: true,
      perks: ['প্রতি মাসে ৩টি অর্ডারে ফ্রি ডেলিভারি', '১.৫x ShopX Coins আর্নিং', 'ফ্ল্যাশ সেলে ৩০ মিনিট আগে আর্লি অ্যাক্সেস', 'এক্সক্লুসিভ গোল্ড হেল্পলাইন সাপোর্ট'],
    },
    {
      name: 'Platinum Elite',
      banglaName: 'প্লাটিনাম এলিট',
      requirement: '৳৫০,০০০ - ৳১,০০,০০০',
      color: 'from-cyan-400 to-blue-600',
      border: 'border-cyan-400/40',
      perks: ['প্রতি মাসে ১০টি অর্ডারে ফ্রি ডেলিভারি', '২x ডাবল ShopX Coins', '৭ দিনের বদলে ১৪ দিনের নো-কোয়েশ্চেন রিটার্ন', 'ভিআইপি গিফট বক্স প্রতিটি উৎসবে'],
    },
    {
      name: 'Diamond King VIP',
      banglaName: 'ডায়মন্ড কিং ভিআইপি',
      requirement: '৳১,০০,০০০+',
      color: 'from-purple-400 to-pink-600',
      border: 'border-purple-400/40',
      perks: ['সারাজীবন সকল অর্ডারে ১০০% ফ্রি ডেলিভারি', '৩x ট্রিপল ShopX Coins', 'ডেডিকেটেড ভিআইপি রিলেশনশিপ ম্যানেজার', 'আন্তর্জাতিক ব্র্যান্ড অর্ডারে ফ্রি এয়ার এক্সপ্রেস'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
            <Crown className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              {lang === 'bn' ? 'ShopX ভিআইপি রয়্যাল ক্লাব' : 'ShopX Royal VIP Club'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100">
              {lang === 'bn' ? 'রয়্যাল গ্রাহক সুবিধা ও রিওয়ার্ড টায়ার' : 'Exclusive VIP Rewards & Member Tiers'}
            </h2>
          </div>
        </div>

        {/* Current VIP Status Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-5 mb-6 shadow-inner relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'আপনার বর্তমান স্ট্যাটাস:' : 'Current Membership Status:'}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xl font-black text-amber-400">👑 Gold VIP Member</span>
                <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Tier 3
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'bn'
                  ? 'আর মাত্র ৳৮,৫০০ শপিং করলেই আনলক হবে প্লাটিনাম এলিট মেম্বারশিপ!'
                  : 'Shop just ৳8,500 more to unlock Platinum Elite privileges!'}
              </p>
            </div>

            <div className="sm:w-48">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Gold</span>
                <span className="text-cyan-400 font-bold">Platinum (72%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`bg-slate-950/80 border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                tier.border
              } ${tier.isCurrent ? 'bg-slate-900/90' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-tr ${tier.color}`}
                    />
                    <h3 className="font-bold text-sm text-slate-100">
                      {lang === 'bn' ? tier.banglaName : tier.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                    {tier.requirement}
                  </span>
                </div>

                <ul className="space-y-1.5 mt-3">
                  {tier.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-300 flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tier.isCurrent && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1" /> একটিভ মেম্বারশিপ
                  </span>
                  <span className="text-[11px] text-slate-400">ভাউচার কোড: VIPGOLD</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
