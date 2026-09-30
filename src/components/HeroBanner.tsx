"use client";

import React from "react";
import {
  ShieldCheck,
  TrendingDown,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

export const HeroBanner: React.FC = () => {
  const { language, setIsDarazComparisonOpen, setSelectedCategory } = useBazaarStore();
  const t = translations[language];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
      {/* Main Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1F36] via-[#242C4D] to-[#1A1F36] text-white p-6 sm:p-10 shadow-xl border border-gray-800">
        {/* Background glow graphics */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#FF4500]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-[#00C853]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4500]/20 border border-[#FF4500]/40 text-[#FF4500] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4500]" />
              <span>
                {language === "bn"
                  ? "দারাজের চেয়ে ১০০% স্বচ্ছ ও নির্ভরযোগ্য"
                  : "100% More Transparent than Daraz"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display leading-tight tracking-tight">
              {language === "bn" ? (
                <>
                  কোনো ভুয়া ডিসকাউন্ট নেই।{" "}
                  <span className="text-[#FF4500]">৯০ দিনের আসল মূল্য</span>{" "}
                  দেখে কিনুন।
                </>
              ) : (
                <>
                  Zero Fake Discounts. Check Verified{" "}
                  <span className="text-[#FF4500]">90-Day Price History</span>.
                </>
              )}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base max-w-xl font-normal">
              {language === "bn"
                ? "স্বচ্ছ ডেলিভারি ফি, ১-ক্লিক ইনস্ট্যান্ট রিফান্ড, এবং ১০০% জেনুইন বাজার মল ভেরিফাইড প্রোডাক্ট — পুরো বাংলাদেশে দ্রুততম ডেলিভারিতে।"
                : "Upfront shipping fees, 1-click instant wallet refunds, and 100% verified BazaarMall authentic products delivered nationwide."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedCategory("electronics")}
                className="bg-[#FF4500] hover:bg-[#E03D00] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#FF4500]/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>{language === "bn" ? "ডিল এক্সপ্লোর করুন" : "Explore Deals"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsDarazComparisonOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl font-semibold text-sm border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
              >
                <span>{language === "bn" ? "কেন বাজারএক্স সেরা?" : "Compare vs Daraz"}</span>
              </button>
            </div>
          </div>

          {/* Value Proposition Highlights Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-1.5 hover:border-[#FF4500]/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#FF4500]/20 flex items-center justify-center text-[#FF4500]">
                <TrendingDown className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {language === "bn" ? "৯০ দিনের প্রাইস ট্র্যাকার" : "90-Day Price Tracker"}
              </h3>
              <p className="text-[11px] text-gray-400">
                {language === "bn"
                  ? "আসল মূল্য যাচাই করে সাশ্রয় করুন"
                  : "Verify historical prices before buying"}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-1.5 hover:border-[#00C853]/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#00C853]/20 flex items-center justify-center text-[#00C853]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {language === "bn" ? "১০০% আসল মল" : "100% BazaarMall"}
              </h3>
              <p className="text-[11px] text-gray-400">
                {language === "bn"
                  ? "ট্রেড লাইসেন্স সত্যায়িত অফিশিয়াল স্টোর"
                  : "Verified authentic brand stores"}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-1.5 hover:border-blue-400/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Truck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {language === "bn" ? "স্বচ্ছ ডেলিভারি ফি" : "Transparent Shipping"}
              </h3>
              <p className="text-[11px] text-gray-400">
                {language === "bn"
                  ? "ঢাকা ৳৬০ / অন্যান্য জেলা ৳১২০"
                  : "Exact upfront shipping rates"}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-1.5 hover:border-amber-400/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {language === "bn" ? "ইনস্ট্যান্ট রিফান্ড" : "1-Click Refund"}
              </h3>
              <p className="text-[11px] text-gray-400">
                {language === "bn"
                  ? "১ ঘণ্টার মধ্যে সরাসরি ওয়ালেটে টাকা ফেরত"
                  : "Direct instant wallet refund"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
