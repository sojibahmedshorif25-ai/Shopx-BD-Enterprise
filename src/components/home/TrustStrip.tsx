"use client";

import React from "react";
import { ShieldCheck, Lock, RotateCcw, Truck } from "lucide-react";
import { useBazaarStore } from "@/lib/store";

export const TrustStrip: React.FC = () => {
  const { language } = useBazaarStore();

  const pillars = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#00C853]" />,
      titleBn: "যাচাইকৃত বিক্রেতা",
      titleEn: "Verified Sellers",
      subBn: "ট্রেড লাইসেন্স সত্যায়িত",
      subEn: "100% Genuine Stores",
      bg: "bg-emerald-50/70 border-emerald-200",
    },
    {
      icon: <Lock className="w-5 h-5 text-blue-600" />,
      titleBn: "নিরাপদ পেমেন্ট",
      titleEn: "Secure Payment",
      subBn: "বিকাশ, নগদ ও কার্ড",
      subEn: "bKash, Nagad & Cards",
      bg: "bg-blue-50/70 border-blue-200",
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-purple-600" />,
      titleBn: "সহজ রিটার্ন",
      titleEn: "Easy Returns",
      subBn: "ইনস্ট্যান্ট ওয়ালেট রিফান্ড",
      subEn: "Instant Wallet Refund",
      bg: "bg-purple-50/70 border-purple-200",
    },
    {
      icon: <Truck className="w-5 h-5 text-[#FF4500]" />,
      titleBn: "দ্রুত ডেলিভারি",
      titleEn: "Fast Nationwide",
      subBn: "২৪-৪৮ ঘণ্টায় সারা দেশে",
      subEn: "24-48h All 64 Districts",
      bg: "bg-orange-50/70 border-orange-200",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {pillars.map((p, idx) => (
          <div
            key={idx}
            className={`p-3 sm:p-4 rounded-xl border ${p.bg} flex items-center gap-3 transition-colors`}
          >
            <div className="p-2 rounded-lg bg-white shadow-xs shrink-0">{p.icon}</div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">
                {language === "bn" ? p.titleBn : p.titleEn}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 font-medium">
                {language === "bn" ? p.subBn : p.subEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
