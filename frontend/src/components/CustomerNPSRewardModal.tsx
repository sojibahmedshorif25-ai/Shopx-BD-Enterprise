import React, { useState } from 'react';
import {
  HeartHandshake,
  Gift,
  Star,
  CheckCircle2,
  X,
  Sparkles,
  Smile,
  Copy,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface CustomerNPSRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerNPSRewardModal: React.FC<CustomerNPSRewardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';
  const [rating, setRating] = useState(10);
  const [feedback, setFeedback] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsClaimed(true);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('NPS50');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-md">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  {isBn ? 'কাস্টমার মতামত ও রিওয়ার্ড' : 'Customer Feedback & Reward'}
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                {isBn ? 'আপনার অভিজ্ঞতা জানান, পান ৳৫০ ছাড়' : 'Share Experience & Win ৳50 OFF'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isClaimed ? (
          <div className="p-5 bg-slate-950 border border-emerald-600/40 rounded-2xl text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-sm font-black text-white">
                {isBn ? 'আপনার মতামতের জন্য ধন্যবাদ!' : 'Thank you for your valuable feedback!'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {isBn
                  ? 'নিচের প্রোমোকোডটি ব্যবহার করে পরবর্তী যেকোনো অর্ডারে পান ইনস্ট্যান্ট ৳৫০ ডিসকাউন্ট।'
                  : 'Here is your ৳50 discount reward voucher code for your next order.'}
              </p>
            </div>

            <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl flex items-center justify-between">
              <span className="font-mono text-base font-black text-emerald-300">NPS50</span>
              <button
                onClick={handleCopyCoupon}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-2 text-center">
                {isBn
                  ? '১ থেকে ১০ স্কেলে আপনি কি বন্ধুদের ShopX BD রেকমেন্ড করবেন?'
                  : 'How likely are you to recommend ShopX BD to a friend or colleague? (0-10)'}
              </label>

              <div className="grid grid-cols-10 gap-1 bg-slate-950 p-2 rounded-xl border border-slate-800">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={`py-2 rounded-lg font-mono font-bold transition ${
                      rating === num
                        ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                {isBn ? 'আপনার মূল্যবান পরামর্শ বা কোনো চাওয়া:' : 'Any suggestions to make our service even better:'}
              </label>
              <textarea
                rows={3}
                placeholder={isBn ? 'যেমন: ডেলিভারি গতি, প্যাকেজিং কোয়ালিটি...' : 'e.g. Delivery speed, packaging quality, product variety...'}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>{isBn ? 'ফিডব্যাক জমা দিন ও ৳৫০ ভাউচার পান' : 'Submit Feedback & Claim ৳50 Voucher'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
