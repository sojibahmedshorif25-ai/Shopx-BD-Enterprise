import React, { useState } from 'react';
import {
  X,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Zap,
  Upload,
  ArrowRight,
  Truck,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

interface DoorstepReturnRefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: any;
}

export const DoorstepReturnRefundModal: React.FC<DoorstepReturnRefundModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [returnReason, setReturnReason] = useState('size_issue');
  const [refundMethod, setRefundMethod] = useState<'bkash' | 'nagad' | 'bank'>('bkash');
  const [walletNumber, setWalletNumber] = useState('01712345678');
  const [pickupSlot, setPickupSlot] = useState('Today (Within 2 Hours Rocket Pickup)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const orderId = order?._id || 'ORD-982145';
  const refundAmount = order?.totalAmount || 3200;

  const handleSubmitReturn = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
            <RotateCcw className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-white">
                {lang === 'bn' ? '৭ দিনের ডোরস্টেপ রিটার্ন ও ২-মিনিট রিফান্ড' : '7-Day Doorstep Return & 2-Min Instant Refund'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase">
                Zero Hassle
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn'
                ? 'রাইডার আপনার বাসা থেকে পার্সেল পিকআপ করার সাথে সাথে বিকাশ/নগদে ইনস্ট্যান্ট ক্যাশব্যাক।'
                : 'Rider picks up from your doorstep. 100% instant refund directly to your mobile wallet.'}
            </p>
          </div>
        </div>

        {!isCompleted ? (
          <div className="space-y-5">
            {/* Order Card Overview */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">Order Reference:</span>
                <span className="text-sm font-black text-white font-mono">{orderId}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block">Refundable Amount:</span>
                <span className="text-base font-black text-emerald-400 font-mono">
                  {formatPrice(refundAmount)}
                </span>
              </div>
            </div>

            {/* Step 1: Return Reason */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
                {lang === 'bn' ? '১. রিটার্নের কারণ বেছে নিন:' : '1. Select Return Reason:'}
              </label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 outline-none focus:border-emerald-500"
              >
                <option value="size_issue">📏 Size or Fitting Issue (Needs Replacement/Refund)</option>
                <option value="not_matching">🎨 Product Color/Style does not match photo</option>
                <option value="quality_issue">⚠️ Quality or Taste issue (Organic food guarantee)</option>
                <option value="changed_mind">🔄 Changed my mind / Ordered by mistake</option>
              </select>
            </div>

            {/* Step 2: Doorstep Pickup Slot */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
                {lang === 'bn' ? '২. রাইডার ডোরস্টেপ পিকআপ সময়:' : '2. Rider Doorstep Pickup Slot:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  '⚡ Today (Within 2 Hours Rocket Pickup)',
                  '📅 Tomorrow Morning (10 AM - 1 PM)',
                  '📅 Tomorrow Evening (4 PM - 8 PM)',
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPickupSlot(slot)}
                    className={`p-3 rounded-xl border text-left transition ${
                      pickupSlot === slot
                        ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Instant Refund Payout Method */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                {lang === 'bn' ? '৩. ইনস্ট্যান্ট রিফান্ড ওয়ালেট (২ মিনিটে ক্যাশব্যাক):' : '3. Instant Refund Wallet Destination:'}
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bkash', label: 'bKash Personal', color: 'text-pink-400' },
                  { id: 'nagad', label: 'Nagad Personal', color: 'text-orange-400' },
                  { id: 'bank', label: 'Bank Account', color: 'text-cyan-400' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setRefundMethod(m.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${
                      refundMethod === m.id
                        ? 'bg-emerald-500/10 border-emerald-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className={m.color}>{m.label}</span>
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={walletNumber}
                onChange={(e) => setWalletNumber(e.target.value)}
                placeholder="Wallet Account Number"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs sm:text-sm text-white font-mono outline-none focus:border-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitReturn}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition transform active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>{lang === 'bn' ? 'রিটার্ন প্রসেস হচ্ছে...' : 'Scheduling Rider & Disburse...'}</span>
              ) : (
                <>
                  <Truck className="w-4 h-4" />
                  <span>
                    {lang === 'bn'
                      ? `রিটার্ন বুক করুন (${formatPrice(refundAmount)} রিফান্ড)`
                      : `Confirm Return Request (${formatPrice(refundAmount)})`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/40 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 stroke-[3]" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                {lang === 'bn' ? 'ডোরস্টেপ রিটার্ন সফলভাবে কনফার্ম হয়েছে!' : 'Return & Pickup Confirmed!'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {lang === 'bn'
                  ? `রাইডার আজ আপনার ঠিকানায় পৌঁছাবে। পার্সেল হ্যান্ডওভারের সাথে সাথে ${walletNumber} নম্বরে ${formatPrice(refundAmount)} রিফান্ড সম্পন্ন হবে।`
                  : `Rider assigned for doorstep pickup. ${formatPrice(refundAmount)} will disburse to ${walletNumber} upon parcel scan.`}
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
            >
              {lang === 'bn' ? 'সম্পন্ন' : 'Done & Close'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
