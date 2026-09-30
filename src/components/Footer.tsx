"use client";

import React from "react";
import {
  ShieldCheck,
  Headphones,
  Truck,
  RotateCcw,
  CheckCircle,
  Building,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

export const Footer: React.FC = () => {
  const { language, setIsDarazComparisonOpen } = useBazaarStore();
  const t = translations[language];

  return (
    <footer className="bg-[#1A1F36] text-white pt-12 pb-24 md:pb-12 border-t border-gray-800">
      {/* 4 Trust Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF4500]/20 flex items-center justify-center text-[#FF4500] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white">
                {language === "bn" ? "১০০% আসল প্রোডাক্ট" : "100% Genuine Products"}
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {language === "bn" ? "ভেরিফাইড ট্রেড লাইসেন্স প্রাপ্ত মল" : "Strict vendor verification"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00C853]/20 flex items-center justify-center text-[#00C853] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white">
                {language === "bn" ? "৭ দিনের সহজ রিটার্ন" : "7 Days Easy Return"}
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {language === "bn" ? "ইনস্ট্যান্ট ওয়ালেট রিফান্ড সুবিধা" : "Instant wallet refunds"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white">
                {language === "bn" ? "সারা দেশে ফাস্ট ডেলিভারি" : "Fast Nationwide Delivery"}
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {language === "bn" ? "৬৪ জেলায় স্বচ্ছ ডেলিভারি চার্জ" : "Transparent shipping fees"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white">
                {language === "bn" ? "২৪/৭ কাস্টমার কেয়ার" : "24/7 Dedicated Support"}
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {language === "bn" ? "হটলাইন: ১৬৭৮৯ (টোল ফ্রি)" : "Hotline: 16789"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Compliance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & DBID Certificate */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF4500] flex items-center justify-center text-white font-black text-base">
              BX
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Bazaar<span className="text-[#FF4500]">X</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            {t.tagline}
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-[11px] text-emerald-400 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#00C853] shrink-0" />
            <span>DBID No: 984120934 (Ministry of Commerce Registered)</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2 text-xs text-gray-400">
          <h4 className="font-bold text-sm text-white">{language === "bn" ? "গ্রাহক সেবা" : "Customer Care"}</h4>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-white transition-colors">{t.helpCenter}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t.returnPolicy}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t.trackOrder}</a></li>
            <li>
              <button
                onClick={() => setIsDarazComparisonOpen(true)}
                className="text-[#FF4500] hover:underline font-semibold"
              >
                {language === "bn" ? "কেন বাজারএক্স সেরা?" : "BazaarX vs Daraz"}
              </button>
            </li>
          </ul>
        </div>

        {/* Payment Partners in Bangladesh */}
        <div className="space-y-2 text-xs text-gray-400">
          <h4 className="font-bold text-sm text-white">{language === "bn" ? "পেমেন্ট পার্টনারস" : "Payment Partners"}</h4>
          <p className="text-[11px]">
            {language === "bn"
              ? "১০০% সুরক্ষিত পেমেন্ট গেটওয়ে সাপোর্ট:"
              : "Bank grade 256-bit encrypted checkout:"}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bg-[#E2136E] text-white text-[10px] font-bold px-2.5 py-1 rounded">bKash</span>
            <span className="bg-[#F7921E] text-white text-[10px] font-bold px-2.5 py-1 rounded">Nagad</span>
            <span className="bg-[#8C3494] text-white text-[10px] font-bold px-2.5 py-1 rounded">Rocket</span>
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded">Visa</span>
            <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded">Mastercard</span>
          </div>
        </div>

        {/* App & Hotline */}
        <div className="space-y-3 text-xs text-gray-400">
          <h4 className="font-bold text-sm text-white">{language === "bn" ? "জরুরি যোগাযোগ" : "Emergency Helpline"}</h4>
          <p className="text-[11px]">
            {language === "bn"
              ? "যেকোনো মতামত বা অনুসন্ধানের জন্য কল করুন ১৬৭৮৯ নম্বরে।"
              : "For immediate assistance, dial 16789 (Toll Free)."}
          </p>
          <div className="text-xl font-bold font-price text-[#00C853]">
            16789
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        {t.copyright}
      </div>
    </footer>
  );
};
