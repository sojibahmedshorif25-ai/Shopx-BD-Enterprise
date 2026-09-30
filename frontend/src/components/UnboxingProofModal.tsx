import React from 'react';
import { X, PackageCheck, ShieldCheck, CheckCircle2, AlertTriangle, PhoneCall } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface UnboxingProofModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnboxingProofModal: React.FC<UnboxingProofModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguageStore();

  if (!isOpen) return null;

  const checklist = [
    { title: '১. রাইডারের সামনে পার্সেল খুলুন', sub: 'ডেলিভারি বয় উপস্থিত থাকাকালে বক্স ও সিকিউরিটি সিল চেক করুন।' },
    { title: '২. পণ্যের সঠিকতা যাচাই করুন', sub: 'অর্ডারের সাথে মিল রেখে ব্র‍্যান্ড, কালার ও কোয়ালিটি দেখে নিন।' },
    { title: '৩. সন্তুষ্ট হলে টাকা পরিশোধ করুন', sub: 'পণ্য পছন্দ হলেই কেবল ক্যাশ বা বিকাশ/নগদে পেমেন্ট করুন।' },
    { title: '৪. সমস্যা থাকলে তাৎক্ষণিক রিটার্ন', sub: 'কোনো ত্রুটি থাকলে কোনো ফি ছাড়াই তৎক্ষণাৎ রাইডারকে পণ্য ফিরিয়ে দিন।' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
            <PackageCheck className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              ShopX 100% Trust Guarantee
            </span>
            <h2 className="text-xl font-black text-slate-100">
              {lang === 'bn' ? 'পণ্য দেখে টাকা দেওয়ার নিশ্চয়তা' : 'Open & Inspect Before Payment'}
            </h2>
          </div>
        </div>

        {/* 4 Point Checklist */}
        <div className="space-y-3 mb-6">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-start space-x-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs text-slate-100">{item.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hotline Assistance */}
        <div className="bg-orange-950/30 border border-orange-500/30 rounded-2xl p-4 flex items-center justify-between text-xs mb-6">
          <div className="flex items-center space-x-2.5 text-orange-300">
            <PhoneCall className="w-4 h-4" />
            <span>ডেলিভারির সময় যেকোনো সহায়তায়: <strong>01942791004</strong></span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs rounded-xl shadow-lg transition"
        >
          {lang === 'bn' ? 'আমি বুঝেছি ও একমত' : 'I Understand & Agree'}
        </button>
      </div>
    </div>
  );
};
