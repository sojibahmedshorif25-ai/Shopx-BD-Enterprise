import React, { useState } from 'react';
import { X, Calendar, Gift, Sparkles, CheckCircle2, Award, Zap, Coins, Flame } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCartStore } from '../store/useCartStore';

interface DailyLoginStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STREAK_DAYS = [
  { day: 1, reward: '50 Coins', icon: '🪙', claimed: true },
  { day: 2, reward: '100 Coins', icon: '🪙', claimed: true },
  { day: 3, reward: 'Free Delivery', icon: '🚚', claimed: false, current: true },
  { day: 4, reward: '150 Coins', icon: '🪙', claimed: false },
  { day: 5, reward: '৳100 Voucher', icon: '🎟️', claimed: false },
  { day: 6, reward: '250 Coins', icon: '🪙', claimed: false },
  { day: 7, reward: '৳500 Super Box', icon: '🎁', claimed: false, grand: true }
];

export const DailyLoginStreakModal: React.FC<DailyLoginStreakModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const { setCoupon } = useCartStore();

  const [claimedDay3, setClaimedDay3] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(3);

  if (!isOpen) return null;

  const handleClaimToday = () => {
    setCoupon('STREAKFREE', 60);
    setClaimedDay3(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-center">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black shadow-xl shadow-amber-500/30 mx-auto mb-4 animate-bounce">
          <Flame className="w-9 h-9 fill-slate-950" />
        </div>

        <h2 className="text-2xl font-black text-white">
          {lang === 'bn' ? 'দৈনিক লগইন স্ট্রিক ও রিওয়ার্ড' : '7-Day Daily Login Streak'}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {lang === 'bn' ? 'প্রতিদিন অ্যাপ ভিজিট করুন এবং ফ্রি কয়েন ও ক্যাশ ভাউচার সংগ্রহ করুন' : 'Check in daily to build your streak and unlock up to ৳500 mega cash prize.'}
        </p>

        {/* Current Streak Counter */}
        <div className="mt-4 py-2 px-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 inline-flex items-center space-x-2 text-amber-300 font-bold text-xs">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>{lang === 'bn' ? `বর্তমান স্ট্রিক: ৩ দিন 🔥` : `Active Streak: Day ${currentStreak} of 7 🔥`}</span>
        </div>

        {/* 7-Day Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-6">
          {STREAK_DAYS.map(item => {
            const isDone = item.day < 3 || (item.day === 3 && claimedDay3);
            const isToday = item.day === 3 && !claimedDay3;

            return (
              <div
                key={item.day}
                className={`p-2 rounded-2xl border flex flex-col items-center justify-between text-xs transition ${
                  isDone
                    ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                    : isToday
                    ? 'bg-gradient-to-b from-amber-500/20 to-orange-500/20 border-amber-400 text-white ring-2 ring-amber-400 shadow-lg scale-105'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <span className="text-[10px] font-bold text-slate-400">Day {item.day}</span>
                <span className="text-xl my-1">{item.icon}</span>
                <span className="text-[10px] font-bold truncate w-full text-center">{item.reward}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-1" />}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            onClick={handleClaimToday}
            disabled={claimedDay3}
            className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 transition transform active:scale-95 shadow-xl ${
              claimedDay3
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 cursor-default'
                : 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-amber-500/30'
            }`}
          >
            {claimedDay3 ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>{lang === 'bn' ? 'আজকের ফ্রি ডেলিভারি টোকেন সংরক্ষিত!' : "Day 3 Claimed: Free Delivery Token Saved!"}</span>
              </>
            ) : (
              <>
                <Gift className="w-5 h-5 fill-slate-950" />
                <span>{lang === 'bn' ? '৩য় দিনের ফ্রি ডেলিভারি টোকেন ক্লেইম করুন' : 'Claim Day 3 Free Delivery Token'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
