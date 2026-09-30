import React, { useState } from 'react';
import { Award, ShieldCheck, FileCheck, CheckCircle2, Download, X, Eye } from 'lucide-react';

interface LabCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
}

export const LabCertificateModal: React.FC<LabCertificateModalProps> = ({
  isOpen,
  onClose,
  productTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-lg w-full p-6 text-slate-900 dark:text-white shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
              BSTI & BCSIR অনুমোদিত ল্যাব টেস্ট
            </span>
            <h3 className="text-base font-black mt-0.5">১০০% বিশুদ্ধতা ও কোয়ালিটি সার্টিফিকেট</h3>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="p-4 bg-emerald-50/60 dark:bg-slate-800/80 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-3 text-xs">
          <div className="flex justify-between pb-2 border-b border-emerald-200/60 dark:border-slate-700">
            <span className="text-gray-500">পরীক্ষিত পণ্য:</span>
            <strong className="text-emerald-700 dark:text-emerald-400">{productTitle}</strong>
          </div>

          <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>চিনির মিশ্রণ (Sugar/Adulteration):</strong> ০.০০% (সম্পূর্ণ প্রাকৃতিক)</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>আর্দ্রতা (Moisture):</strong> আন্তর্জাতিক মানসম্মত ১৮.২%</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>প্রিজারভেটিভ বা কেমিক্যাল:</strong> সম্পূর্ণ মুক্ত (Chemical-free)</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>ল্যাব রিপোর্ট আইডি:</strong> #SX-LAB-2026-9842</span>
            </p>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-4 leading-relaxed text-center">
          আমরা প্রতিটি ব্যাচের পণ্য বিজ্ঞানাগারে পরীক্ষা করে তবেই ক্রেতার কাছে সরবরাহ করি। কোয়ালিটিতে সন্দেহ থাকলে ১০০% টাকা রিফান্ড গ্যারান্টি।
        </p>

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/20"
        >
          যাচাই সম্পন্ন, ধন্যবাদ
        </button>
      </div>
    </div>
  );
};
