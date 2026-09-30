"use client";

import React from "react";
import {
  X,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingDown,
  Truck,
  RotateCcw,
  Globe,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

export const DarazComparisonModal: React.FC = () => {
  const { language, isDarazComparisonOpen, setIsDarazComparisonOpen } =
    useBazaarStore();

  if (!isDarazComparisonOpen) return null;

  const comparisonRows = [
    {
      titleEn: "Price Transparency",
      titleBn: "মূল্য স্বচ্ছতা ও সততা",
      icon: <TrendingDown className="w-5 h-5 text-[#FF4500]" />,
      daraz: {
        en: "Fake discounts by inflating base price right before sales.",
        bn: "সেলের আগে কৃত্রিমভাবে দাম বাড়িয়ে দিয়ে ভূয়া ছাড় দেখানো হয়।",
      },
      bazaarx: {
        en: "Verified 90-Day Price History chart on every product.",
        bn: "প্রতিটি পণ্যে গত ৯০ দিনের আসল দামের রিয়েল-টাইম গ্রাফ রয়েছে।",
      },
    },
    {
      titleEn: "Delivery Charges",
      titleBn: "ডেলিভারি চার্জ ও স্বচ্ছতা",
      icon: <Truck className="w-5 h-5 text-blue-500" />,
      daraz: {
        en: "Hidden delivery & handling charges revealed only at final checkout step.",
        bn: "চেকআউটের শেষ ধাপে গিয়ে অপ্রত্যাশিত অতিরিক্ত ফি যোগ করা হয়।",
      },
      bazaarx: {
        en: "Upfront district/thana fee calculator directly on the product page.",
        bn: "প্রোডাক্ট পেজেই ঢাকা (৳৬০) ও ঢাকার বাইরের (৳১২০) নির্দিষ্ট চার্জ দৃশ্যমান।",
      },
    },
    {
      titleEn: "Bangla Localization",
      titleBn: "বাংলা ভাষা ও স্থানীয় অভিজ্ঞতা",
      icon: <Globe className="w-5 h-5 text-emerald-500" />,
      daraz: {
        en: "Poorly machine-translated Bengali with frequent untranslated sections.",
        bn: "অসম্পূর্ণ এবং ভাঙা ভাঙা গুগল ট্রান্সলেশন নির্ভর বাংলা।",
      },
      bazaarx: {
        en: "Native bilingual architecture (বাংলা + EN) with Bengali numerals.",
        bn: "১০০% নির্ভুল বাংলা শব্দমালা এবং বাংলা সংখ্যা (৳ ১২,৫০০) সাপোর্ট।",
      },
    },
    {
      titleEn: "Returns & Refunds",
      titleBn: "পণ্য ফেরত ও রিফান্ড পলিসি",
      icon: <RotateCcw className="w-5 h-5 text-purple-500" />,
      daraz: {
        en: "Complex forms, physical drop-off requirements, and 2-4 weeks delay.",
        bn: "জটিল ফর্ম পূরণ, নিজে গিয়ে ড্রপ অফ এবং রিফান্ড পেতে ২-৪ সপ্তাহ অপেক্ষা।",
      },
      bazaarx: {
        en: "1-Click return request with instant BazaarX Wallet credit within 1 hour.",
        bn: "১-ক্লিক রিটার্ন ও পিকআপের ১ ঘণ্টার মধ্যে ওয়ালেটে ইনস্ট্যান্ট রিফান্ড।",
      },
    },
    {
      titleEn: "Low-Bandwidth Mobile (2G/3G)",
      titleBn: "ধীরগতির ইন্টারনেটে পারফরম্যান্স",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      daraz: {
        en: "Heavy bundle sizes, slow rendering on budget Android devices.",
        bn: "অতিরিক্ত ভারী স্ক্রিপ্ট, কম বাজেটের স্মার্টফোনে স্লো কাজ করে।",
      },
      bazaarx: {
        en: "PWA-first architecture with Data Saver mode and sub-2s LCP on 3G.",
        bn: "PWA নির্ভর লাইটওয়েট ডিজাইন ও লো-ডাটা মোডে নিমেষেই পেজ লোড।",
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#1A1F36] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF4500]" />
            <h2 className="text-base sm:text-lg font-bold font-display">
              {language === "bn"
                ? "দারাজ থেকে বাজারএক্স কেন ১০০% সেরা ও বিশ্বস্ত?"
                : "Why BazaarX is Superior to Daraz"}
            </h2>
          </div>
          <button
            onClick={() => setIsDarazComparisonOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
            <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 text-center">
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                Daraz.com.bd
              </span>
              <p className="text-[11px] text-red-600 mt-0.5">
                {language === "bn" ? "পুরনো ও জটিল অভিজ্ঞতা" : "Common user frustrations & hidden fees"}
              </p>
            </div>
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-center">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#00C853]" />
                BazaarX.com.bd
              </span>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                {language === "bn" ? "স্বচ্ছ, দ্রুত ও বিশ্বস্ত সমাধান" : "Engineered for speed, honesty & trust"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  {row.icon}
                  <h3 className="font-bold text-xs sm:text-sm text-gray-900">
                    {language === "bn" ? row.titleBn : row.titleEn}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Daraz Flaw */}
                  <div className="bg-white p-3 rounded-lg border border-red-100 flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-gray-700 leading-relaxed">
                      {language === "bn" ? row.daraz.bn : row.daraz.en}
                    </p>
                  </div>

                  {/* BazaarX Superior Feature */}
                  <div className="bg-emerald-50/80 p-3 rounded-lg border border-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0 mt-0.5" />
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {language === "bn" ? row.bazaarx.bn : row.bazaarx.en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-gray-500 font-medium hidden sm:inline">
            {language === "bn" ? "বাজারএক্স — বাংলাদেশের নিজস্ব স্বচ্ছ প্ল্যাটফর্ম" : "BazaarX — Built for Bangladeshi Shoppers"}
          </span>
          <button
            onClick={() => setIsDarazComparisonOpen(false)}
            className="bg-[#FF4500] hover:bg-[#E03D00] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md ml-auto cursor-pointer"
          >
            {language === "bn" ? "কেনাকাটা শুরু করুন" : "Start Shopping Now"}
          </button>
        </div>
      </div>
    </div>
  );
};
