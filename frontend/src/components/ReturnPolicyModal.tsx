import React, { useState } from 'react';
import { RotateCcw, X, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface ReturnPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReturnPolicyModal: React.FC<ReturnPolicyModalProps> = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('পণ্য পছন্দ হয়নি / সাইজ সমস্যা');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 text-white space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">৭ দিনের সহজ রিটার্ন ও রিফান্ড পলিসি</h3>
              <p className="text-[11px] text-slate-400">১০০% মানি-ব্যাক ও রিপ্লেসমেন্ট গ্যারান্টি</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-white">রিটার্ন আবেদন গৃহীত হয়েছে!</h4>
            <p className="text-xs text-slate-400">
              অর্ডার #{orderId}-এর জন্য আমাদের সাপোর্ট টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে এবং রাইডার পার্সেল সংগ্রহ করবে।
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
            >
              ঠিক আছে
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-slate-300">
              <p className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                আমাদের সহজ রিটার্ন নিয়মাবলী:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                <li>ডেলিভারি পাওয়ার ৭ দিনের মধ্যে যেকোনো ত্রুটি বা অমিল থাকলে রিটার্ন করা যাবে।</li>
                <li>অরিজিনাল প্যাকেজিং ও মেমোসহ পণ্য ফেরত দিতে হবে।</li>
                <li>রিটার্ন যাচাই শেষে ২-২৪ ঘণ্টার মধ্যে বিকাশ/নগদে রিফান্ড প্রদান করা হবে।</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">অর্ডার নম্বর (Order ID)</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: SX-123456"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">রিটার্ন করার কারণ</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500"
                >
                  <option value="পণ্য পছন্দ হয়নি / সাইজ সমস্যা">পণ্য পছন্দ হয়নি / সাইজ সমস্যা</option>
                  <option value="পণ্য ক্ষতিগ্রস্ত / ভাঙা পাওয়া গেছে">পণ্য ক্ষতিগ্রস্ত / ভাঙা পাওয়া গেছে</option>
                  <option value="ভুল পণ্য ডেলিভারি হয়েছে">ভুল পণ্য ডেলিভারি হয়েছে</option>
                  <option value="কোয়ালিটি প্রত্যাশামাফিক নয়">কোয়ালিটি প্রত্যাশামাফিক নয়</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-extrabold rounded-2xl transition flex items-center justify-center gap-2 text-xs shadow-lg"
              >
                <span>রিটার্ন আবেদন জমা দিন</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
