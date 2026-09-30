import React, { useState } from 'react';
import { X, Gift, CreditCard, Sparkles, CheckCircle2, Copy, Send, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

interface GiftCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftCardsModal: React.FC<GiftCardsModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('Enjoy shopping your favorite products on ShopX BD!');
  const [purchasedCode, setPurchasedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const amounts = [500, 1000, 2000, 5000, 10000];

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'GIFT-SX-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000);
    setPurchasedCode(code);
  };

  const handleCopy = () => {
    if (purchasedCode) {
      navigator.clipboard.writeText(purchasedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-black shadow-lg shadow-purple-500/20">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              Instant E-Gift Voucher
            </span>
            <h2 className="text-xl font-black text-slate-100">
              {lang === 'bn' ? 'ShopX ডিজিটাল গিফট কার্ড' : 'ShopX Digital Gift Cards'}
            </h2>
          </div>
        </div>

        {purchasedCode ? (
          <div className="space-y-4 text-center animate-scaleUp">
            <div className="p-6 bg-gradient-to-tr from-purple-900/60 to-indigo-900/60 border border-purple-500/40 rounded-3xl text-center space-y-3 relative overflow-hidden">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full">
                ShopX Official E-Gift Card
              </span>
              <h3 className="text-3xl font-black text-white font-mono">
                {formatPrice(selectedAmount)}
              </h3>
              <p className="text-xs text-purple-200">
                বৈধতার মেয়াদ: আজীবন (Lifetime Validity)
              </p>
            </div>

            <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block">সিক্রেট গিফট কার্ড পিন কোড:</span>
                <span className="text-base font-black font-mono text-amber-400 tracking-wider">
                  {purchasedCode}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs rounded-xl flex items-center space-x-1 transition"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-xs rounded-xl shadow-lg transition"
            >
              {lang === 'bn' ? 'সম্পন্ন হয়েছে' : 'Done & Continue Shopping'}
            </button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-4">
            {/* Select Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {lang === 'bn' ? 'গিফট কার্ডের মূল্যমান নির্বাচন করুন:' : 'Select Gift Amount:'}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-black font-mono border transition-all ${
                      selectedAmount === amt
                        ? 'bg-purple-600 border-purple-400 text-white shadow-md ring-2 ring-purple-400/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {formatPrice(amt)}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Email */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                {lang === 'bn' ? 'প্রাপকের ইমেইল এড্রেস (ইমেইলে কোড পাঠানো হবে):' : "Recipient's Email Address:"}
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="friend@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:border-purple-500"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                {lang === 'bn' ? 'পার্সোনাল গ্রিটিংস মেসেজ:' : 'Personal Gift Message:'}
              </label>
              <textarea
                rows={2}
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-purple-500/20 transition flex items-center justify-center space-x-2"
            >
              <span>{lang === 'bn' ? `গিফট কার্ড কিনুন (${formatPrice(selectedAmount)})` : `Purchase Card (${formatPrice(selectedAmount)})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
