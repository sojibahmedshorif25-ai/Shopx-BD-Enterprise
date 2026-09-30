import React, { useState } from 'react';
import { X, Gift, Heart, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface GiftWrapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (giftDetails: any) => void;
}

export const GiftWrapModal: React.FC<GiftWrapModalProps> = ({ isOpen, onClose, onSave }) => {
  const { lang } = useLanguageStore();
  const [wrapStyle, setWrapStyle] = useState('royal_gold');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('Wishing you happiness, health and endless success!');
  const [hidePrice, setHidePrice] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const wrapOptions = [
    { id: 'royal_gold', title: 'Royal Golden Velvet', price: 90, color: 'from-amber-400 to-yellow-600' },
    { id: 'midnight_emerald', title: 'Midnight Emerald Luxury', price: 90, color: 'from-emerald-500 to-teal-700' },
    { id: 'ruby_romance', title: 'Ruby Romance Ribbon', price: 90, color: 'from-rose-500 to-pink-700' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({ wrapStyle, recipientName, senderName, message, hidePrice });
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
              {lang === 'bn' ? 'স্পেশাল গিফট র‍্যাপিং' : 'Premium Gift Wrap Service'}
            </span>
            <h2 className="text-xl font-black text-slate-100">
              {lang === 'bn' ? 'প্রিয়জনকে উপহার পাঠান' : 'Send as a Personalized Gift'}
            </h2>
          </div>
        </div>

        {isSaved ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <p className="font-bold text-slate-100 text-sm">
              {lang === 'bn' ? 'গিফট র‍্যাপিং যোগ করা হয়েছে!' : 'Gift Wrap Option Saved!'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            {/* Wrap Style Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {lang === 'bn' ? 'র‍্যাপিং স্টাইল ও রিবন পছন্দ করুন (+৳৯০):' : 'Select Wrap Style (+৳90):'}
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {wrapOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setWrapStyle(opt.id)}
                    className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all ${
                      wrapStyle === opt.id
                        ? 'border-pink-500 bg-pink-500/10 shadow-md ring-1 ring-pink-500/50'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${opt.color} mb-2 shadow-sm`} />
                    <span className="text-[11px] font-bold text-slate-200">{opt.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient & Sender Names */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">প্রাপকের নাম (To:)</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Recipient Name"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">প্রেরকের নাম (From:)</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-pink-500"
                  required
                />
              </div>
            </div>

            {/* Message on Card */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">কার্ডের শুভেচ্ছা বার্তা (Greeting Message)</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Hide Price Toggle */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="hidePrice"
                checked={hidePrice}
                onChange={(e) => setHidePrice(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-pink-600 focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="hidePrice" className="text-xs text-slate-300 cursor-pointer">
                {lang === 'bn' ? 'ইনভয়েস থেকে পণ্যের দাম গোপন রাখুন' : 'Conceal price on package invoice'}
              </label>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs shadow-lg shadow-pink-500/20 transition"
            >
              {lang === 'bn' ? 'গিফট অপশন কনফার্ম করুন' : 'Confirm Gift Wrap Details'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
