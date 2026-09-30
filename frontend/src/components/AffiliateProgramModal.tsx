import React, { useState } from 'react';
import { X, DollarSign, Share2, Copy, CheckCircle2, TrendingUp, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface AffiliateProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateProgramModal: React.FC<AffiliateProgramModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguageStore();
  const [copied, setCopied] = useState(false);
  const [cashoutSuccess, setCashoutSuccess] = useState(false);
  const [cashoutLoading, setCashoutLoading] = useState(false);
  const [payoutPhone, setPayoutPhone] = useState('01942791004');
  const [payoutMethod, setPayoutMethod] = useState<'bkash' | 'nagad'>('bkash');

  const referralLink = 'https://shopxbd.com?ref=SX_VIP_' + Math.floor(100000 + Math.random() * 900000);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCashout = (e: React.FormEvent) => {
    e.preventDefault();
    setCashoutLoading(true);
    setTimeout(() => {
      setCashoutLoading(false);
      setCashoutSuccess(true);
      setTimeout(() => setCashoutSuccess(false), 4000);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Neon Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 font-black">
            <DollarSign className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {lang === 'bn' ? 'অ্যাফিলিয়েট ও রেফারেল প্রোগ্রাম' : 'ShopX Affiliate Partner Program'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100">
              {lang === 'bn' ? 'শেয়ার করুন ও আনলিমিটেড আয় করুন' : 'Share & Earn Up to 10% Commission'}
            </h2>
          </div>
        </div>

        {/* Earning Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center">
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'bn' ? 'বর্তমান ব্যালেন্স' : 'Available Balance'}
            </p>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">৳৩,৪৫০</p>
            <span className="text-[10px] text-emerald-500 flex items-center justify-center mt-0.5">
              <TrendingUp className="w-3 h-3 mr-1" /> +18.4% this week
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center">
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'bn' ? 'পেন্ডিং আয়' : 'Pending Clearance'}
            </p>
            <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">৳১,২০০</p>
            <span className="text-[10px] text-slate-500">৩টি ডেলিভারি বাকি</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center">
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'bn' ? 'মোট রেফারেল সেলস' : 'Total Orders'}
            </p>
            <p className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">৪৮ জন</p>
            <span className="text-[10px] text-cyan-500 flex items-center justify-center mt-0.5">
              <Users className="w-3 h-3 mr-1" /> Verified Clicks
            </span>
          </div>
        </div>

        {/* Share Link Card */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 mb-6">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            {lang === 'bn' ? 'আপনার ইউনিক রেফারেল লিংক (কপি করে শেয়ার করুন)' : 'Your Unique Partner Link (Share & Earn)'}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 bg-slate-900 border border-slate-700 text-emerald-400 text-xs sm:text-sm font-mono px-3 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center space-x-1.5 transition-all shrink-0"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'bn' ? 'কপি হয়েছে!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'কপি লিংক' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3 Step Process */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-400 font-bold text-xs flex items-center justify-center shrink-0">
              ১
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'bn' ? 'সোশ্যাল মিডিয়া বা বন্ধুদের লিংক দিন' : 'Share link on WhatsApp & Facebook'}
            </p>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
              ২
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'bn' ? 'কেউ পণ্য কিনলে ৫-১০% কমিশন পাবেন' : 'Get 5-10% commission on every order'}
            </p>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0">
              ৩
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'bn' ? 'বিকাশ ও নগদে সরাসরি টাকা তুলে নিন' : 'Withdraw directly to bKash / Nagad'}
            </p>
          </div>
        </div>

        {/* Instant Cashout Form */}
        <form onSubmit={handleCashout} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
          <h4 className="font-bold text-sm text-slate-200 mb-3 flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{lang === 'bn' ? 'ইনস্ট্যান্ট ক্যাশআউট রিকোয়েস্ট' : 'Instant Cashout Request'}</span>
          </h4>

          {cashoutSuccess ? (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'bn'
                  ? 'আপনার ক্যাশআউট রিকোয়েস্ট সফল হয়েছে! ২ ঘণ্টার মধ্যে বিকাশে টাকা পৌঁছে যাবে।'
                  : 'Cashout request submitted successfully! Funds will be dispatched to your account within 2 hours.'}
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">পেমেন্ট মেথড</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('bkash')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      payoutMethod === 'bkash'
                        ? 'bg-pink-600/20 border-pink-500 text-pink-300'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    bKash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('nagad')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      payoutMethod === 'nagad'
                        ? 'bg-orange-600/20 border-orange-500 text-orange-300'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    Nagad
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">একাউন্ট নম্বর</label>
                <input
                  type="text"
                  value={payoutPhone}
                  onChange={(e) => setPayoutPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-emerald-500 font-mono"
                  placeholder="01XXXXXXXXX"
                  required
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={cashoutLoading}
                  className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5 disabled:opacity-50"
                >
                  {cashoutLoading ? (
                    <span>প্রসেসিং...</span>
                  ) : (
                    <>
                      <span>{lang === 'bn' ? 'টাকা তুলুন (৳৩,৪৫০)' : 'Withdraw ৳3,450'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
