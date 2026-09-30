import React, { useState } from 'react';
import { X, Users, Copy, CheckCircle2, Share2, Sparkles, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

interface SharedCartRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SharedCartRoomModal: React.FC<SharedCartRoomModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();
  const [copied, setCopied] = useState(false);
  const [splitCount, setSplitCount] = useState(3);

  if (!isOpen) return null;

  const roomLink = 'https://shopxbd.com/room/' + Math.floor(100000 + Math.random() * 900000);
  const totalCartValue = 4850;
  const perPersonAmount = Math.round(totalCartValue / splitCount);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-indigo-500/20">
            <Users className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              Co-Shopping & Split Bill
            </span>
            <h2 className="text-xl font-black text-slate-100">
              {lang === 'bn' ? 'বন্ধুদের সাথে একসাথে শপিং ও বিল স্প্লিট' : 'Shop Together & Split Bill'}
            </h2>
          </div>
        </div>

        {/* Room Share Link */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 mb-5">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            {lang === 'bn' ? 'শেয়ার্ড কার্ট রুমের প্রাইভেট লিংক:' : 'Private Shared Cart Room Link:'}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={roomLink}
              className="flex-1 bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-mono px-3 py-2.5 rounded-xl focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1.5 shrink-0 transition"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
            </button>
          </div>
        </div>

        {/* Split Bill Calculator */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold">{lang === 'bn' ? 'মোট কার্ট বিল:' : 'Total Cart Value:'}</span>
            <span className="text-base font-black text-white font-mono">{formatPrice(totalCartValue)}</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
            <span className="text-slate-400 font-semibold">{lang === 'bn' ? 'কতজন বন্ধু মিলে ভাগ করবেন?' : 'Split between friends:'}</span>
            <div className="flex items-center space-x-2">
              {[2, 3, 4, 5].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setSplitCount(cnt)}
                  className={`w-8 h-8 rounded-xl font-bold text-xs border transition ${
                    splitCount === cnt
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-black'
                      : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border border-cyan-500/30 rounded-xl text-center">
            <p className="text-[11px] text-slate-400">জনপ্রতি পরিশোধ করতে হবে:</p>
            <h4 className="text-2xl font-black text-cyan-400 font-mono mt-0.5">
              {formatPrice(perPersonAmount)} / person
            </h4>
          </div>
        </div>

        {/* WhatsApp Share Button */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `Hey! Let's shop together on ShopX BD with a joint cart and split the bill. Join my cart room here: ${roomLink}`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-600/20"
        >
          <Share2 className="w-4 h-4" />
          <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে বন্ধুদের ইনভাইট পাঠান' : 'Invite Friends via WhatsApp'}</span>
        </a>
      </div>
    </div>
  );
};
