"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Download, Zap } from "lucide-react";
import { useBazaarStore } from "@/lib/store";

export const HeroCarousel: React.FC = () => {
  const { language, setSelectedCategory, setIsDarazComparisonOpen } = useBazaarStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "slide-1",
      badgeBn: "🔥 মেগা ফ্ল্যাশ ডিল",
      badgeEn: "🔥 Mega Flash Deal",
      titleBn: "কোনো ভুয়া ডিসকাউন্ট নেই। ৯০ দিনের আসল মূল্য দেখে কিনুন।",
      titleEn: "Zero Fake Discounts. Check Verified 90-Day Price History.",
      descBn: "স্বচ্ছ ডেলিভারি ফি, ১-ক্লিক ইনস্ট্যান্ট রিফান্ড, এবং ১০০% জেনুইন বাজার মল ভেরিফাইড প্রোডাক্ট।",
      descEn: "Upfront delivery rates, 1-click instant wallet refunds, and 100% verified authentic brand warranty.",
      ctaBn: "ডিল এক্সপ্লোর করুন",
      ctaEn: "Explore Deals",
      bgGradient: "from-[#1A1F36] via-[#283152] to-[#1A1F36]",
      accentColor: "#FF4500",
      action: () => setSelectedCategory("electronics"),
    },
    {
      id: "slide-2",
      badgeBn: "✨ নতুন কালেকশন ২০২৬",
      badgeEn: "✨ New Arrivals 2026",
      titleBn: "খাঁটি তাঁতের শাড়ি ও ঐতিহ্যবাহী দেশীয় হস্তশিল্প",
      titleEn: "Authentic Tangail Handloom Sarees & Heritage Crafts",
      descBn: "সরাসরি টাঙ্গাইল ও জামদানি তাঁতিদের থেকে সংগৃহীত। ১০০% প্রিমিয়াম সুতি ফেব্রিক।",
      descEn: "Direct from master weavers in Bangladesh with guaranteed color fastness.",
      ctaBn: "কালেকশন দেখুন",
      ctaEn: "Shop Handloom",
      bgGradient: "from-[#1F2937] via-[#374151] to-[#111827]",
      accentColor: "#00C853",
      action: () => setSelectedCategory("fashion"),
    },
    {
      id: "slide-3",
      badgeBn: "📱 বাজারএক্স সুপার অ্যাপ",
      badgeEn: "📱 BazaarX Super App",
      titleBn: "সুপার ফাস্ট ৩জি লো-ডাটা মোড ও ইনস্ট্যান্ট ক্যাশব্যাক",
      titleEn: "Super Fast Low-Data PWA Mode & Instant Cashback",
      descBn: "বিকাশ ও নগদে প্রতিটি অর্ডারে ১% নিশ্চিত ক্যাশব্যাক এবং লাইভ কুরিয়ার ট্র্যাকিং।",
      descEn: "Get 1% instant cashback on bKash/Nagad and live real-time courier rider tracking.",
      ctaBn: "অ্যাপ ফিচার দেখুন",
      ctaEn: "Learn More",
      bgGradient: "from-[#1A1F36] via-[#1E293B] to-[#0F172A]",
      accentColor: "#FFB800",
      action: () => setIsDarazComparisonOpen(true),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const active = slides[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-4">
      {/* 16:6 on desktop, 3:2 on mobile */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${active.bgGradient} text-white p-6 sm:p-10 shadow-xl border border-gray-800 transition-all duration-500 min-h-[220px] sm:min-h-[300px] flex flex-col justify-center`}>
        {/* Glow Effects */}
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-[#FF4500]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-[#00C853]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold backdrop-blur-md">
            <span>{language === "bn" ? active.badgeBn : active.badgeEn}</span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black font-display leading-tight tracking-tight text-white">
            {language === "bn" ? active.titleBn : active.titleEn}
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl font-normal leading-relaxed">
            {language === "bn" ? active.descBn : active.descEn}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={active.action}
              className="bg-[#FF4500] hover:bg-[#E03D00] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#FF4500]/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>{language === "bn" ? active.ctaBn : active.ctaEn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Manual Prev/Next Controls (WCAG agency compliance) */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all z-20 cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all z-20 cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? "w-6 bg-[#FF4500]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
