import React, { useState } from 'react';
import { X, Sparkles, Trophy, Copy, CheckCircle2, Award } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface GoldenEggGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoldenEggGameModal: React.FC<GoldenEggGameModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguageStore();
  const [smashedIndex, setSmashedIndex] = useState<number | null>(null);
  const [prize, setPrize] = useState<{ amount: number; code: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const eggs = [
    { id: 0, prize: { amount: 200, code: 'EGG200' } },
    { id: 1, prize: { amount: 300, code: 'EGG300' } },
    { id: 2, prize: { amount: 150, code: 'EGG150' } },
  ];

  const handleSmash = (index: number) => {
    if (smashedIndex !== null) return;
    setSmashedIndex(index);
    setTimeout(() => {
      setPrize(eggs[index].prize);
    }, 700);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-center">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            {lang === 'bn' ? 'ডেইলি গোল্ডেন এগ স্ম্যাশ' : 'Daily Golden Egg Smash'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 mt-2">
            {lang === 'bn' ? 'যেকোনো ১টি সোনার ডিম ভেঙে পুরস্কার জিতুন!' : 'Smash a Golden Egg to Win Mega Vouchers!'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {lang === 'bn'
              ? 'প্রতিদিনের লাকি স্পেশাল ডিম স্ম্যাশ করে জিতে নিন ৳৩০০ পর্যন্ত ক্যাশ ডিসকাউন্ট ভাউচার।'
              : 'Tap any golden egg to smash it open and reveal your guaranteed daily prize.'}
          </p>
        </div>

        {prize ? (
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-6 space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-amber-500/30">
              <Trophy className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'আপনি ডিম ভেঙে জিতেছেন:' : 'Egg Smashed! You Won:'}
              </p>
              <h3 className="text-3xl font-black text-amber-400 font-mono mt-1">
                ৳{prize.amount} {lang === 'bn' ? 'ক্যাশ ছাড় ভাউচার' : 'Cash Discount'}
              </h3>
            </div>

            <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block">কুপন কোড (৳{prize.amount} ছাড়)</span>
                <span className="text-base font-black font-mono text-amber-400 tracking-wider">
                  {prize.code}
                </span>
              </div>
              <button
                onClick={() => handleCopy(prize.code)}
                className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg flex items-center space-x-1"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xs rounded-xl shadow-lg transition"
            >
              {lang === 'bn' ? 'ভাউচার সংগ্রহ করুন' : 'Claim Voucher & Shop'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:gap-4 my-6">
            {eggs.map((egg) => {
              const isSelected = smashedIndex === egg.id;
              return (
                <div
                  key={egg.id}
                  onClick={() => handleSmash(egg.id)}
                  className={`group relative p-4 bg-slate-950/80 border rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 select-none ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/40 animate-shake'
                      : 'border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  {/* Golden Egg Shape */}
                  <div
                    className={`w-16 h-20 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-xl shadow-amber-500/20 flex items-center justify-center transition-transform ${
                      isSelected ? 'animate-bounce' : 'group-hover:rotate-6'
                    }`}
                  >
                    <Sparkles className="w-6 h-6 text-amber-950/60" />
                  </div>
                  <span className="text-xs font-bold text-slate-300 mt-2">
                    {lang === 'bn' ? `ডিম #${egg.id + 1}` : `Egg #${egg.id + 1}`}
                  </span>
                  <span className="text-[10px] text-amber-400/80 font-medium">
                    {lang === 'bn' ? 'ভাঙতে ট্যাপ করুন' : 'Tap to Smash'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
