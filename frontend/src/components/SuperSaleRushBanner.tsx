import React, { useState, useEffect } from 'react';
import { Zap, Flame, Clock, Gift, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCartStore } from '../store/useCartStore';

export const SuperSaleRushBanner: React.FC = () => {
  const { lang } = useLanguageStore();
  const { setCoupon } = useCartStore();

  const calculateRushTimeLeft = () => {
    const now = new Date();
    const target = new Date();
    target.setHours(23, 59, 59, 999);
    const diff = Math.max(0, target.getTime() - now.getTime());
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateRushTimeLeft());
  const [claimedPercent, setClaimedPercent] = useState(87);
  const [couponClaimed, setCouponClaimed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateRushTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaimCoupon = () => {
    setCoupon('RUSH300', 300);
    setCouponClaimed(true);
    setTimeout(() => setCouponClaimed(false), 3500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-2">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-orange-950 to-amber-950 border border-red-500/40 p-5 sm:p-6 shadow-2xl">
        {/* Glow */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 top-0 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Title & Countdown */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-red-500/30 flex-shrink-0 animate-pulse">
              <Flame className="w-8 h-8 fill-slate-950" />
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-red-500 text-white font-black text-[10px] uppercase tracking-wider animate-bounce">
                  ⚡ 11.11 MEGA RUSH
                </span>
                <span className="text-orange-400 font-bold text-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'সীমিত স্টক অফার' : 'Limited Stock Rush'}</span>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {lang === 'bn' ? 'সুপার ফ্ল্যাশ সেল — সর্বোচ্চ ৮০% পর্যন্ত ছাড়!' : 'Super Flash Rush — Up to 80% Instant Discount!'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {lang === 'bn'
                  ? 'আজকের সেরা ডিলগুলো স্টক শেষ হওয়ার আগেই লুফে নিন!'
                  : 'Claim your extra ৳300 instant voucher before the timer hits zero.'}
              </p>
            </div>
          </div>

          {/* Middle: Timer & Stock Depletion Meter */}
          <div className="flex flex-col items-center gap-2 w-full lg:w-72">
            {/* Countdown Blocks */}
            <div className="flex items-center gap-2 text-white font-mono font-black text-sm">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Ends In:</span>
              </span>
              <div className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-orange-400">
                {String(timeLeft.hours).padStart(2, '0')}h
              </div>
              <span>:</span>
              <div className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-orange-400">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </div>
              <span>:</span>
              <div className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-orange-400">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </div>
            </div>

            {/* Stock Claimed Bar */}
            <div className="w-full">
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>{lang === 'bn' ? 'স্টক সংগৃহীত:' : 'Stock Claimed:'}</span>
                <span className="font-bold text-orange-400 font-mono">{claimedPercent}% Claimed</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900/90 rounded-full overflow-hidden border border-slate-700/60">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${claimedPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Instant Voucher Button */}
          <div className="flex-shrink-0">
            <button
              onClick={handleClaimCoupon}
              className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition transform active:scale-95 ${
                couponClaimed
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:to-red-400 text-slate-950 shadow-orange-500/30'
              }`}
            >
              {couponClaimed ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>{lang === 'bn' ? '৳৩০০ ভাউচার চালু হয়েছে!' : '৳300 Voucher Applied!'}</span>
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5 fill-slate-950" />
                  <span>{lang === 'bn' ? '৳৩০০ ক্যাশ ভাউচার সংগ্রহ করুন' : 'Claim ৳300 Rush Coupon'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
