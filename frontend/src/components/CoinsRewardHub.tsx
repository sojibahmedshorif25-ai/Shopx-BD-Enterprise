import React, { useState } from 'react';
import { Coins, CheckCircle2, Award, Gift, Sparkles, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/useAuthStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { api } from '../services/api';

export const CoinsRewardHub: React.FC = () => {
  const { user, fetchCurrentUser } = useAuthStore();
  const { lang } = useLanguageStore();

  const todayStr = new Date().toISOString().split('T')[0];
  const [claimed, setClaimed] = useState<boolean>(() => {
    return localStorage.getItem('shopx_last_checkin_date') === todayStr || Boolean(user?.isCollectedToday);
  });
  const [currentStreak, setCurrentStreak] = useState<number>(user?.checkInStreak || 3);
  const [isLoading, setIsLoading] = useState(false);
  const userCoins = user?.loyaltyCoins || 150;

  React.useEffect(() => {
    if (user) {
      if (user.isCollectedToday || localStorage.getItem('shopx_last_checkin_date') === todayStr) {
        setClaimed(true);
      }
      if (user.checkInStreak) {
        setCurrentStreak(user.checkInStreak);
      }
    }
  }, [user]);

  const streakDays = [
    { day: 1, coins: 10, label: lang === 'bn' ? '১ম দিন' : 'Day 1' },
    { day: 2, coins: 20, label: lang === 'bn' ? '২য় দিন' : 'Day 2' },
    { day: 3, coins: 30, label: lang === 'bn' ? '৩য় দিন' : 'Day 3' },
    { day: 4, coins: 40, label: lang === 'bn' ? '৪র্থ দিন' : 'Day 4' },
    { day: 5, coins: 50, label: lang === 'bn' ? '৫ম দিন' : 'Day 5' },
    { day: 6, coins: 60, label: lang === 'bn' ? '৬ষ্ঠ দিন' : 'Day 6' },
    { day: 7, coins: 100, label: lang === 'bn' ? '৭ম দিন (মেগা)' : 'Day 7 (Mega)' },
  ];

  const handleClaimToday = async () => {
    if (claimed || isLoading) return;
    setIsLoading(true);

    try {
      const res = await api.post('/auth/daily-checkin');
      if (res.data?.success) {
        setClaimed(true);
        localStorage.setItem('shopx_last_checkin_date', todayStr);
        if (res.data.streak) setCurrentStreak(res.data.streak);
        fetchCurrentUser();
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
    } catch (err: any) {
      if (err.response?.data?.alreadyClaimed) {
        setClaimed(true);
        localStorage.setItem('shopx_last_checkin_date', todayStr);
      } else {
        setClaimed(true);
        localStorage.setItem('shopx_last_checkin_date', todayStr);
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getVIPTier = (coins: number) => {
    if (coins > 500) return { name: 'Platinum VIP', color: 'bg-purple-100 text-purple-800' };
    if (coins > 250) return { name: 'Gold VIP', color: 'bg-amber-100 text-amber-800' };
    if (coins > 100) return { name: 'Silver VIP', color: 'bg-slate-100 text-slate-800' };
    return { name: 'Bronze Shopper', color: 'bg-orange-100 text-orange-800' };
  };

  const vip = getVIPTier(userCoins);

  return (
    <section id="coins-hub-section" className="max-w-7xl mx-auto px-4 py-3">
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
        {/* Top Tier & Coins Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-sm">
              <Coins className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                  {lang === 'bn' ? 'ShopX কয়েন ও ভিআইপি ক্লাব' : 'ShopX Daily Coins & VIP Club'}
                </h3>
                <span className={`font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase ${vip.color}`}>
                  {vip.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'bn' ? 'আপনার বর্তমান ব্যালেন্স:' : 'Wallet Balance:'}{' '}
                <strong className="text-amber-600 font-mono text-sm">{userCoins} Coins</strong>{' '}
                <span className="text-slate-400 font-normal">
                  ({lang === 'bn' ? '১০০ কয়েন = ৳১০ ডিসকাউন্ট' : '100 Coins = ৳10 off'})
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClaimToday}
              disabled={claimed || isLoading}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 shadow-sm ${
                claimed
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 cursor-not-allowed font-extrabold'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow'
              }`}
            >
              {claimed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{lang === 'bn' ? 'আজকের কয়েন সংগৃহীত ✓ (দিনে ১ বার)' : 'Coins Collected Today ✓'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'আজকের কয়েন ক্লেইম করুন' : 'Claim Daily Coins'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 7-Day Daily Streak Progress */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>
                {lang === 'bn' ? '৭ দিনের ডেইলি চেক-ইন রিওয়ার্ড স্ট্রিক' : '7-Day Check-in Reward Streak'}
              </span>
            </p>
            <span className="text-[11px] text-amber-700 font-bold">
              {lang === 'bn' ? `স্ট্রিক: ${currentStreak} দিন সক্রিয় 🔥` : `Streak: ${currentStreak} Days Active 🔥`}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
            {streakDays.map((s) => {
              const isPast = s.day <= currentStreak;
              const isToday = s.day === currentStreak + 1;

              return (
                <div
                  key={s.day}
                  className={`p-3 rounded-2xl text-center border transition-all ${
                    isPast
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isToday
                      ? 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-300/60 shadow-sm'
                      : 'bg-slate-50 border-slate-100 text-slate-400'
                  }`}
                >
                  <p className="text-[10px] font-bold">{s.label}</p>
                  <div className="my-1.5 flex justify-center">
                    <Coins
                      className={`w-5 h-5 ${
                        isPast ? 'text-emerald-600' : isToday ? 'text-amber-600' : 'text-slate-300'
                      }`}
                    />
                  </div>
                  <p className="text-xs font-black">+{s.coins}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
