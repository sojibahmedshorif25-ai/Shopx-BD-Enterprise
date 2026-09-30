import React, { useState, useEffect } from 'react';
import { X, Smartphone, Sparkles, Trophy, Copy, CheckCircle2, Gift } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface ShakeAndWinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShakeAndWinModal: React.FC<ShakeAndWinModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguageStore();
  const [shakeCount, setShakeCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [copied, setCopied] = useState(false);

  const couponCode = 'SHAKE150';

  const triggerManualShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      const nextCount = shakeCount + 1;
      setShakeCount(nextCount);
      if (nextCount >= 3) {
        setHasWon(true);
      }
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-center">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {hasWon ? (
          <div className="py-4 space-y-4 animate-scaleUp">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-amber-500/30 animate-bounce">
              <Trophy className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full uppercase border border-amber-500/20">
                🎉 অভিনন্দন! আপনি জিতেছেন
              </span>
              <h3 className="text-2xl font-black text-slate-100 mt-2">
                {lang === 'bn' ? 'ফ্ল্যাট ৳১৫০ ছাড় ভাউচার!' : 'Flat ৳150 Instant Voucher!'}
              </h3>
            </div>

            <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 text-left">কুপন কোড (৳১৫০ ছাড়)</p>
                <p className="text-lg font-black font-mono text-amber-400 tracking-wider">
                  {couponCode}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1 transition"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xs rounded-xl shadow-lg transition"
            >
              {lang === 'bn' ? 'শপিং চালিয়ে যান' : 'Continue Shopping'}
            </button>
          </div>
        ) : (
          <div className="py-2 space-y-5">
            <div
              onClick={triggerManualShake}
              className={`w-28 h-28 rounded-3xl bg-slate-950 border-2 border-dashed border-amber-500/50 flex flex-col items-center justify-center mx-auto cursor-pointer select-none transition-transform duration-300 ${
                isShaking ? 'animate-shake scale-110 border-amber-400 bg-amber-500/10' : 'hover:scale-105'
              }`}
            >
              <Smartphone className={`w-12 h-12 text-amber-400 ${isShaking ? 'animate-spin' : ''}`} />
              <span className="text-[10px] font-bold text-slate-400 mt-1">
                {3 - shakeCount} {lang === 'bn' ? 'টি ঝাঁকুনি বাকি' : 'shakes left'}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-100">
                {lang === 'bn' ? 'মোবাইল ঝাঁকান ও ভাউচার জিতুন!' : 'Shake Your Phone & Win Vouchers!'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                {lang === 'bn'
                  ? 'উপরে ক্লিক করে অথবা আপনার ফোনটি ৩ বার ঝাঁকিয়ে জিতে নিন আকর্ষণীয় ক্যাশ ডিসকাউন্ট ভাউচার!'
                  : 'Tap the phone or shake your mobile device 3 times to uncover guaranteed prizes!'}
              </p>
            </div>

            <button
              onClick={triggerManualShake}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-105 transition flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'bn' ? 'এখনই ঝাঁকান (Shake Now)' : 'Shake Now (Tap to Shake)'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
