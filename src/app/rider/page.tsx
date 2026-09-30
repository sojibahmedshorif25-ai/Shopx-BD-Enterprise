"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bike,
  Phone,
  Navigation,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  DollarSign,
  WifiOff,
  Wifi,
  Package,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { formatBDT } from "@/lib/i18n";

export default function RiderPWAPortal() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<"tasks" | "earnings">("tasks");
  const [deliveryStatus, setDeliveryStatus] = useState<"assigned" | "arrived" | "completed">("assigned");

  return (
    <div className="min-h-screen bg-[#F7F8FC] pb-16 flex flex-col max-w-md mx-auto border-x border-gray-200 shadow-xl">
      {/* Top Rider Header */}
      <div className="bg-[#1A1F36] text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FF4500] flex items-center justify-center font-bold">
            <Bike className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-xs block">মো: কাউসার হোসেন (রাইডার)</span>
            <span className="text-[10px] text-emerald-400">ধানমন্ডি হাব • BX-RIDER-482</span>
          </div>
        </div>

        {/* Offline / Online toggle */}
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
            isOnline
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
              : "bg-red-500/20 text-red-300 border-red-500/40"
          }`}
        >
          {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
          <span>{isOnline ? "অনলাইন" : "অফলাইন মোড"}</span>
        </button>
      </div>

      {/* Offline Mode Alert banner if offline */}
      {!isOnline && (
        <div className="bg-amber-500 text-black text-[11px] font-bold px-4 py-1.5 flex items-center justify-center gap-1.5">
          <WifiOff className="w-3.5 h-3.5" />
          <span>অফলাইন মোড সক্রিয় — ডেলিভারি ডাটা লোকালি সংরক্ষিত হচ্ছে</span>
        </div>
      )}

      {/* Main Container */}
      <div className="p-4 space-y-4 flex-1">
        {/* Earnings KPI Bar */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] text-gray-500 block">আজকের আয়</span>
            <span className="text-base font-black font-price text-[#00C853]">৳ ১,৪৫০</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] text-gray-500 block">সম্পন্ন</span>
            <span className="text-base font-black font-price text-gray-900">১২ টি</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] text-gray-500 block">বাকি আছে</span>
            <span className="text-base font-black font-price text-[#FF4500]">৩ টি</span>
          </div>
        </div>

        {/* ACTIVE DELIVERY CARD (Current Task) */}
        <div className="bg-white rounded-2xl border-2 border-[#FF4500] p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="bg-[#FF4500] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              চলতি ডেলিভারি (Active)
            </span>
            <span className="text-xs font-price font-bold text-gray-800">
              BX-BD-894210
            </span>
          </div>

          {/* Customer & Address Details */}
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-sm">তানভীর আহমেদ</span>
              {/* COD Big Red Badge */}
              <span className="bg-[#FF3B3B] text-white font-price font-black px-2.5 py-1 rounded-lg text-xs shadow-sm">
                COD: ৳ ৪৬,৯৯৯ সংগ্রহ করুন
              </span>
            </div>

            <p className="text-gray-600 flex items-start gap-1 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF4500] shrink-0 mt-0.5" />
              <span>বাড়ি ১২, রোড ৫, ব্লক বি, ধানমন্ডি, ঢাকা (২য় তলা)</span>
            </p>
          </div>

          {/* Action: Call & Google Maps Navigation */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="tel:01712345678"
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>কল করুন (0171...)</span>
            </a>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="bg-[#1A1F36] hover:bg-black text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              <span>ম্যাপ নেভিগেশন</span>
            </a>
          </div>

          {/* Status Progression Buttons */}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            {deliveryStatus === "assigned" && (
              <button
                onClick={() => setDeliveryStatus("arrived")}
                className="w-full bg-[#FF4500] hover:bg-[#E03D00] text-white py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer"
              >
                [পৌঁছেছি / Arrived at Customer]
              </button>
            )}

            {deliveryStatus === "arrived" && (
              <div className="space-y-2">
                <div className="bg-orange-50 border border-orange-200 p-2 rounded-lg text-center text-xs font-bold text-gray-800">
                  গ্রাহকের OTP ভেরিফাই করুন: <span className="font-price text-[#FF4500]">৪৮২৯</span>
                </div>
                <button
                  onClick={() => setDeliveryStatus("completed")}
                  className="w-full bg-[#00C853] hover:bg-[#00B048] text-white py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                >
                  [ডেলিভারি ও পেমেন্ট সম্পন্ন হয়েছে]
                </button>
              </div>
            )}

            {deliveryStatus === "completed" && (
              <div className="bg-emerald-100 text-emerald-800 p-3 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
                <span>ডেলিভারি সফলভাবে সম্পন্ন হয়েছে!</span>
              </div>
            )}
          </div>
        </div>

        {/* Payout Withdrawal Button */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
          <div className="flex justify-between font-bold">
            <span>উত্তোলনযোগ্য ব্যালেন্স:</span>
            <span className="font-price text-[#00C853] text-sm">৳ ১,৪৫০</span>
          </div>
          <button className="w-full bg-[#E2136E] text-white py-2.5 rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-1.5">
            <span>bKash এ উইথড্র করুন (Instant Payout)</span>
          </button>
        </div>

        {/* Back to store */}
        <div className="text-center pt-2">
          <Link href="/" className="text-xs font-bold text-gray-500 hover:text-black">
            গ্রাহক স্টোরে ফিরুন
          </Link>
        </div>
      </div>
    </div>
  );
}
