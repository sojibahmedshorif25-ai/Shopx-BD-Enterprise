"use client";

import React, { useState, useEffect } from "react";
import { Zap, Flame, Clock, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { useBazaarStore } from "@/lib/store";
import { toBnNumber, translations } from "@/lib/i18n";

export const FlashDeals: React.FC = () => {
  const { language } = useBazaarStore();
  const t = translations[language];

  // Real-time flash deal countdown simulator
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashDeal);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#FF4500] to-[#FF6B35] rounded-t-2xl p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
            <Flame className="w-5 h-5 text-yellow-300 animate-bounce" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black font-display tracking-tight flex items-center gap-2">
              <span>{t.flashDeals}</span>
              <span className="text-xs font-semibold bg-yellow-400 text-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                {language === "bn" ? "সীমিত সময়" : "Limited Time"}
              </span>
            </h2>
            <p className="text-xs text-orange-100 hidden sm:block">
              {language === "bn"
                ? "৯০ দিনের সর্বনিম্ন মূল্যে আসল ব্র্যান্ডের পণ্য"
                : "Genuine brand items at guaranteed 90-day lowest prices"}
            </p>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
          <Clock className="w-4 h-4 text-yellow-300" />
          <span className="text-xs font-semibold text-orange-100">{t.endingIn}</span>
          <div className="flex items-center gap-1 font-price font-bold text-xs">
            <span className="bg-white text-[#1A1F36] px-1.5 py-0.5 rounded">
              {language === "bn"
                ? toBnNumber(String(timeLeft.hours).padStart(2, "0"))
                : String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span>:</span>
            <span className="bg-white text-[#1A1F36] px-1.5 py-0.5 rounded">
              {language === "bn"
                ? toBnNumber(String(timeLeft.minutes).padStart(2, "0"))
                : String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span>:</span>
            <span className="bg-white text-[#1A1F36] px-1.5 py-0.5 rounded">
              {language === "bn"
                ? toBnNumber(String(timeLeft.seconds).padStart(2, "0"))
                : String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Flash Products */}
      <div className="bg-white p-4 sm:p-6 rounded-b-2xl border-x border-b border-gray-200 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {flashProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
};
