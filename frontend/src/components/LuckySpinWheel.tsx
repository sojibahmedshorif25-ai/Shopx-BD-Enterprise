import React, { useState } from 'react';
import { Gift, X, Sparkles, Coins, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../store/useCartStore';

const prizes = [
  { label: '৳১০০ ছাড়', code: 'SHOPX100', discount: 100, color: 'from-orange-500 to-amber-500' },
  { label: '১০% মেগা ছাড়', code: 'EID50', discount: 50, color: 'from-purple-600 to-indigo-600' },
  { label: '৫০টি লয়ালটি কয়েন', code: 'COINS50', discount: 0, coins: 50, color: 'from-emerald-500 to-teal-600' },
  { label: 'ফ্রি ডেলিভারি ভাউচার', code: 'FREEDELIV', discount: 60, color: 'from-blue-600 to-cyan-500' },
  { label: '৳৫০ ক্যাশব্যাক', code: 'WELCOME50', discount: 50, color: 'from-pink-500 to-rose-600' },
];

export const LuckySpinWheel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<any>(null);
  const { setCoupon } = useCartStore();

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const extraTurns = 5 * 360;
    const segmentAngle = 360 / prizes.length;
    const targetRotation = extraTurns + (prizes.length - randomIndex) * segmentAngle - segmentAngle / 2;

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = prizes[randomIndex];
      setWonPrize(prize);
      if (prize.discount > 0) {
        setCoupon(prize.code, prize.discount);
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 4000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 p-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group ring-4 ring-amber-400/30 animate-bounce"
        title="লাকি স্পিন ও অফার"
      >
        <Gift className="w-6 h-6 text-white" />
        <span className="text-xs font-black hidden group-hover:inline transition-all">
          লাকি স্পিন হুইল! 🎁
        </span>
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center text-white relative shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-lg">ShopX লাকি স্পিন ও উইন</h3>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              চাকা ঘুরিয়ে জিতে নিন মেগা ডিসকাউন্ট ভাউচার ও ফ্রি কয়েন!
            </p>

            {/* Wheel Canvas Graphic */}
            <div className="relative w-56 h-56 mx-auto mb-6 flex items-center justify-center">
              {/* Pointer */}
              <div className="absolute -top-3 z-30 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-amber-400 filter drop-shadow-md" />

              {/* Rotating Circle */}
              <div
                className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden relative transition-transform duration-[4000ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  background: 'conic-gradient(#f97316 0% 20%, #9333ea 20% 40%, #10b981 40% 60%, #0284c7 60% 80%, #ec4899 80% 100%)',
                }}
              >
                {/* Center Cap */}
                <div className="absolute inset-16 bg-slate-950 rounded-full border-2 border-amber-400 flex items-center justify-center z-20 shadow-inner">
                  <Coins className="w-6 h-6 text-amber-400 animate-spin" />
                </div>
              </div>
            </div>

            {/* Won Prize Result */}
            {wonPrize && (
              <div className="p-3.5 bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-500/40 rounded-2xl mb-4 animate-in zoom-in">
                <p className="text-xs font-bold text-emerald-400">🎉 অভিনন্দন! আপনি জিতেছেন:</p>
                <p className="text-lg font-black text-white mt-0.5">{wonPrize.label}</p>
                {wonPrize.code && wonPrize.discount > 0 && (
                  <p className="text-[11px] text-amber-300 font-mono mt-1">
                    কুপন কোড: <strong>{wonPrize.code}</strong> (কার্টে যুক্ত হয়েছে)
                  </p>
                )}
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 text-sm transition disabled:opacity-50"
            >
              {isSpinning ? 'চাকা ঘুরছে...' : 'স্পিন করুন (Spin Now!)'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
