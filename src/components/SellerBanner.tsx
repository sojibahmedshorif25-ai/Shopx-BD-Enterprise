"use client";

import React from "react";
import { Store, Sparkles, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import { useBazaarStore } from "@/lib/store";

export const SellerBanner: React.FC = () => {
  const { language } = useBazaarStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#1A1F36] via-[#2A314E] to-[#1A1F36] p-6 sm:p-8 text-white flex flex-wrap items-center justify-between gap-6 border border-gray-700 shadow-xl relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C853]/20 border border-[#00C853]/40 text-[#00C853] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "বাজারএক্স সেলার সেন্টার ২.০" : "BazaarX Seller Center 2.0"}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            {language === "bn"
              ? "দারাজের চেয়ে দ্বিগুণ দ্রুত পেমেন্ট ও ০% কমিশন"
              : "Sell on BazaarX with 0% Commission & Next-Day Payouts"}
          </h2>

          <p className="text-xs sm:text-sm text-gray-300">
            {language === "bn"
              ? "বিকাশ ও ব্যাংক একাউন্টে দৈনিক সেটেলমেন্ট, এআই প্রাইসিং অ্যাসিস্ট্যান্ট এবং ১ কোটি সম্ভাব্য গ্রাহকের কাছে পণ্য বিক্রির সুযোগ।"
              : "Daily automated settlements via bKash or direct bank deposit, built-in AI inventory forecast, and reach millions of verified buyers."}
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button className="bg-[#00C853] hover:bg-[#00B048] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform cursor-pointer">
            <Store className="w-4 h-4" />
            <span>{language === "bn" ? "সেলার হিসেবে যোগ দিন" : "Become a Seller"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
