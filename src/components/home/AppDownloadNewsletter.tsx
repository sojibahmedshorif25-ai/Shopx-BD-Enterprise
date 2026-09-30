"use client";

import React, { useState } from "react";
import { Smartphone, Mail, CheckCircle2, ArrowRight, Download, QrCode } from "lucide-react";
import { useBazaarStore } from "@/lib/store";

export const AppDownloadNewsletter: React.FC = () => {
  const { language } = useBazaarStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* App Download Promo */}
        <div className="lg:col-span-7 bg-[#1A1F36] text-white rounded-2xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 border border-gray-800 shadow-lg">
          <div className="space-y-2 max-w-sm">
            <span className="bg-[#FF4500] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {language === "bn" ? "বাজারএক্স সুপার অ্যাপ" : "BazaarX Super App"}
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              {language === "bn"
                ? "অ্যাপে প্রথম অর্ডারে পাচ্ছেন ১০০ টাকা ছাড়!"
                : "Get ৳100 OFF on your first App order!"}
            </h3>
            <p className="text-xs text-gray-300">
              {language === "bn"
                ? "সুপার ফাস্ট ৩জি লো-ডাটা মোড, লাইভ কুরিয়ার জিপিএস ট্র্যাকিং ও ইনস্ট্যান্ট নোটিফিকেশন।"
                : "Ultra-fast low-bandwidth mode, live GPS courier tracking, and instant alerts."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl text-black text-center shadow-sm">
              <QrCode className="w-16 h-16 mx-auto text-gray-800" />
              <span className="text-[9px] font-bold block mt-1">
                {language === "bn" ? "স্ক্যান করে ইনস্টল" : "Scan to Install"}
              </span>
            </div>
          </div>
        </div>

        {/* Newsletter Promo */}
        <div className="lg:col-span-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 sm:p-8 border border-orange-200/80 flex flex-col justify-center space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#FF4500]" />
            <h3 className="text-base font-bold font-display text-gray-900">
              {language === "bn" ? "সেরা ডিলগুলোর আপডেট নিন" : "Subscribe to Deal Alerts"}
            </h3>
          </div>
          <p className="text-xs text-gray-600">
            {language === "bn"
              ? "সাপ্তাহিক ফ্ল্যাশ সেল ও ডিসকাউন্ট ভাউচার সরাসরি আপনার ইনবক্সে।"
              : "Never miss verified price drops and exclusive seasonal vouchers."}
          </p>

          {subscribed ? (
            <div className="bg-emerald-100 text-emerald-800 p-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
              <span>
                {language === "bn"
                  ? "ধন্যবাদ! সাবস্ক্রিপশন সফল হয়েছে।"
                  : "Subscribed successfully! Thank you."}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === "bn" ? "আপনার ইমেইল অ্যাড্রেস..." : "Enter your email..."}
                className="flex-1 px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF4500]"
              />
              <button
                type="submit"
                className="bg-[#FF4500] hover:bg-[#E03D00] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {language === "bn" ? "সাবস্ক্রাইব" : "Join"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
