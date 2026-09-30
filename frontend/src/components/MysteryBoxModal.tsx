import React, { useState } from 'react';
import { Gift, X, Sparkles, Trophy, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MysteryBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const rewards = [
  { code: 'MYSTERY150', title: '৳১৫০ ইনস্ট্যান্ট ক্যাশ ডিসকাউন্ট', min: '৳১,২০০ ক্রয়ে প্রযোজ্য' },
  { code: 'EIDGIFT200', title: '৳২০০ স্পেশাল গিফট ভাউচার', min: 'যেকোনো অর্ডারে প্রযোজ্য' },
  { code: 'FREESHIPX', title: '১০০% ফ্রি হোম ডেলিভারি ভাউচার', min: 'সারাদেশে ফ্রি শিপিং' },
  { code: 'VIPHONEY50', title: 'খাঁটি মধুতে ৳১০০ ফ্ল্যাট অফ', min: 'অর্গানিক ফুড ক্যাটাগরি' },
];

export const MysteryBoxModal: React.FC<MysteryBoxModalProps> = ({ isOpen, onClose }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [reward, setReward] = useState<typeof rewards[0] | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleOpenBox = () => {
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(randomReward);
    setIsOpened(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
    });
  };

  const handleCopyCode = () => {
    if (!reward) return;
    navigator.clipboard.writeText(reward.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border border-purple-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-center overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOpened ? (
          <div className="py-6 space-y-6">
            <div className="relative inline-block">
              <div className="w-28 h-28 mx-auto bg-gradient-to-tr from-purple-600 to-pink-500 rounded-3xl p-5 text-white flex items-center justify-center shadow-2xl shadow-purple-500/40 animate-bounce">
                <Gift className="w-16 h-16" />
              </div>
              <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg">
                FREE GIFT
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">ShopX লাকি মিস্ট্রি বক্স 🎁</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                বক্সটি খুলুন এবং জিতে নিন ইনস্ট্যান্ট ক্যাশ ডিসকাউন্ট ভাউচার অথবা ফ্রি শিপিং কুপন!
              </p>
            </div>

            <button
              onClick={handleOpenBox}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-slate-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-2xl shadow-orange-500/30 hover:scale-105 transition"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>মিস্ট্রি বক্স খুলুন (Open Box)</span>
            </button>
          </div>
        ) : (
          <div className="py-6 space-y-5 animate-in zoom-in duration-300">
            <div className="w-16 h-16 mx-auto bg-amber-400/20 border border-amber-400/40 text-amber-400 rounded-2xl flex items-center justify-center">
              <Trophy className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                অভিনন্দন! আপনি জিতেছেন 🎉
              </span>
              <h3 className="text-lg font-black text-white mt-1">{reward?.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{reward?.min}</p>
            </div>

            {/* Voucher Code Box */}
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="text-left">
                <span className="text-[10px] text-slate-500 uppercase font-bold">প্রমো কোড</span>
                <p className="font-mono font-black text-base text-orange-400 tracking-wider">
                  {reward?.code}
                </p>
              </div>

              <button
                onClick={handleCopyCode}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition"
            >
              কেনাকাটা শুরু করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
