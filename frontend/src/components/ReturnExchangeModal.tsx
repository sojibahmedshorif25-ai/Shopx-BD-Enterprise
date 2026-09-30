import React, { useState } from 'react';
import { X, RotateCcw, CheckCircle2, ShieldCheck, ArrowRight, Upload, AlertCircle } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface ReturnExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
}

export const ReturnExchangeModal: React.FC<ReturnExchangeModalProps> = ({
  isOpen,
  onClose,
  orderId = 'SX-849204',
}) => {
  const { lang } = useLanguageStore();
  const [returnType, setReturnType] = useState<'refund' | 'exchange'>('refund');
  const [reason, setReason] = useState('Damaged during delivery');
  const [refundMethod, setRefundMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [accountNumber, setAccountNumber] = useState('01942791004');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
              {lang === 'bn' ? '৭ দিনের সহজ রিটার্ন ও এক্সচেঞ্জ' : '7-Day Easy Return & Refund Portal'}
            </span>
            <h2 className="text-xl font-black text-slate-100">
              {lang === 'bn' ? 'রিটার্ন অথবা রিফান্ড রিকোয়েস্ট' : 'Request Return or Instant Refund'}
            </h2>
          </div>
        </div>

        {isSuccess ? (
          <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-slate-100">
              {lang === 'bn' ? 'রিটার্ন আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Return Ticket Submitted Successfully!'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              {lang === 'bn'
                ? 'আমাদের কাস্টমার কেয়ার টিম ২৪ ঘণ্টার মধ্যে রাইডার পাঠিয়ে পণ্যটি সংগ্রহ করবে এবং আপনার বিকাশ নম্বরে টাকা রিফান্ড সম্পন্ন করবে।'
                : 'Our support team will dispatch a pickup rider within 24 hours and issue your instant refund upon inspection.'}
            </p>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
              রিটার্ন ট্র্যাকিং আইডি: <strong>RTN-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Request Type Toggle */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {lang === 'bn' ? 'আবেদনের ধরন নির্বাচন করুন:' : 'Select Request Type:'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReturnType('refund')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    returnType === 'refund'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {lang === 'bn' ? 'টাকা ফেরত (Refund)' : 'Money Refund'}
                </button>
                <button
                  type="button"
                  onClick={() => setReturnType('exchange')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    returnType === 'exchange'
                      ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {lang === 'bn' ? 'পণ্য পরিবর্তন (Exchange)' : 'Item Exchange'}
                </button>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {lang === 'bn' ? 'রিটার্নের সুনির্দিষ্ট কারণ:' : 'Specific Reason:'}
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-orange-500"
              >
                <option value="Damaged during delivery">ডেলিভারির সময় ক্ষতিগ্রস্ত হয়েছে (Damaged)</option>
                <option value="Defective or not working">পণ্য কাজ করছে না বা ত্রুটিযুক্ত (Defective)</option>
                <option value="Wrong item received">ভুল পণ্য এসেছে (Wrong item)</option>
                <option value="Size does not fit">সাইজ মিলছে না (Size issue)</option>
                <option value="Quality not as expected">গুণগত মান আশানুরূপ নয় (Quality mismatch)</option>
              </select>
            </div>

            {/* Refund Account Info */}
            {returnType === 'refund' && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">{lang === 'bn' ? 'রিফান্ড মেথড:' : 'Refund Method:'}</span>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setRefundMethod('bkash')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        refundMethod === 'bkash' ? 'bg-pink-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      bKash
                    </button>
                    <button
                      type="button"
                      onClick={() => setRefundMethod('nagad')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        refundMethod === 'nagad' ? 'bg-orange-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Nagad
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs px-3.5 py-2 rounded-xl focus:outline-none focus:border-rose-500 font-mono"
                  required
                />
              </div>
            )}

            {/* Extra Comments */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {lang === 'bn' ? 'অতিরিক্ত বিবরণ (যদি থাকে):' : 'Additional Comments:'}
              </label>
              <textarea
                rows={2}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder={lang === 'bn' ? 'প্যাকেজের অবস্থা বা সমস্যা বিস্তারিত লিখুন...' : 'Describe package condition...'}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-black text-xs transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>প্রসেসিং হচ্ছে...</span>
              ) : (
                <>
                  <span>{lang === 'bn' ? 'আবেদন সাবমিট করুন' : 'Submit Return Ticket'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
