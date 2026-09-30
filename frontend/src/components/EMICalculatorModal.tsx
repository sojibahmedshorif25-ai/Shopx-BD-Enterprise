import React, { useState } from 'react';
import { CreditCard, X, Calculator, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface EMICalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
}

const banks = [
  'City Bank (Amex)',
  'BRAC Bank',
  'Eastern Bank (EBL)',
  'Standard Chartered',
  'Dutch-Bangla Bank (DBBL)',
  'Mutual Trust Bank (MTB)',
];

export const EMICalculatorModal: React.FC<EMICalculatorModalProps> = ({
  isOpen,
  onClose,
  price,
}) => {
  const [selectedMonths, setSelectedMonths] = useState(6);
  const [selectedBank, setSelectedBank] = useState(banks[0]);

  if (!isOpen) return null;

  const monthlyInstallment = Math.round(price / selectedMonths);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-slate-900 dark:text-white shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black">০% ইএমআই কিস্তি ক্যালকুলেটর</h3>
            <p className="text-xs text-gray-400">০% সুদে সহজ মাসিক কিস্তিতে পণ্য কিনুন</p>
          </div>
        </div>

        {/* Total Price Snapshot */}
        <div className="p-4 bg-indigo-50/60 dark:bg-slate-800/80 rounded-2xl border border-indigo-100 dark:border-slate-700 mb-4 flex justify-between items-center text-xs">
          <span className="text-gray-500">পণ্যের মোট মূল্য:</span>
          <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">৳{price}</span>
        </div>

        {/* Bank Picker */}
        <div className="space-y-3 text-xs mb-4">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              ক্রেডিট কার্ডের ব্যাংক নির্বাচন করুন:
            </label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none dark:text-white"
            >
              {banks.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Tenor Month Tabs */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              কিস্তির সময়সীমা:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[3, 6, 9, 12].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMonths(m)}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    selectedMonths === m
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                      : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {m} মাস
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Monthly Breakdown */}
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center mb-5">
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-bold">প্রতি মাসে পরিশোধযোগ্য কিস্তি:</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
            ৳{monthlyInstallment} <span className="text-xs font-normal">/ মাস</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-1">০% ইন্টারেস্ট | কোনো হিডেন প্রসেসিং ফি নেই</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-lg"
        >
          ঠিক আছে, বুঝেছি
        </button>
      </div>
    </div>
  );
};
