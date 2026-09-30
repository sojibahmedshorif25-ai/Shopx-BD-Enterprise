import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Trophy, Copy, Check, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguageStore } from '../store/useLanguageStore';

interface ScratchCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScratchCardModal: React.FC<ScratchCardModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguageStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const isDrawing = useRef(false);

  const promoCode = 'LUCKY250';
  const discountAmount = '৳২৫০ ছাড়';

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Fill canvas with gold/silver scratch surface
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#f59e0b');
        gradient.addColorStop(0.5, '#ea580c');
        gradient.addColorStop(1, '#d97706');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add text on canvas
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ঘষে গোপন কোডটি দেখুন', canvas.width / 2, canvas.height / 2 + 5);
      }
    }
  }, [isOpen]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] === 0) transparentPixels++;
    }

    const percent = (transparentPixels / (imgData.data.length / 4)) * 100;
    if (percent > 45) {
      setIsScratched(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleMouseDown = () => {
    isDrawing.current = true;
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    scratch(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    scratch(x, y);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl w-full max-w-sm p-6 shadow-2xl relative text-center space-y-4 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
          <h3 className="text-lg font-black text-white">
            {lang === 'bn' ? 'স্ক্র্যাচ ও সারপ্রাইজ ভাউচার!' : 'Scratch & Win Voucher!'}
          </h3>
        </div>

        <p className="text-xs text-slate-400">
          {lang === 'bn'
            ? 'আঙুল দিয়ে গোল্ডেন কার্ডটি ঘষে আপনার বিশেষ ছাড়ের কোড বের করুন'
            : 'Scratch the golden card to reveal your exclusive secret discount code'}
        </p>

        {/* Scratch Card Area */}
        <div className="relative w-[260px] h-[130px] mx-auto rounded-2xl overflow-hidden border border-amber-500/50 shadow-xl bg-slate-950 flex items-center justify-center">
          {/* Underlying Hidden Reward */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 bg-gradient-to-tr from-amber-950 to-orange-950">
            <span className="text-amber-400 font-black text-lg font-mono tracking-wider">{promoCode}</span>
            <span className="text-white text-xs font-bold mt-0.5">{discountAmount}</span>
            <span className="text-[10px] text-slate-400 mt-1">যেকোনো অর্ডারে প্রযোজ্য</span>
          </div>

          {/* Canvas Scratch Surface */}
          <canvas
            ref={canvasRef}
            width={260}
            height={130}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            className={`absolute inset-0 cursor-pointer touch-none transition-opacity duration-500 ${
              isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
        </div>

        {/* Action Button after scratch */}
        {isScratched && (
          <div className="space-y-3 animate-in fade-in">
            <button
              onClick={() => {
                navigator.clipboard.writeText(promoCode);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 transition hover:scale-105"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Code Copied') : (lang === 'bn' ? 'কোডটি কপি করুন' : 'Copy Promo Code')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
