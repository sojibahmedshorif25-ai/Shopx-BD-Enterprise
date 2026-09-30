"use client";

import React, { useState } from "react";
import {
  X,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Package,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { toBnNumber } from "@/lib/i18n";

export const OrderTrackingModal: React.FC = () => {
  const { language, isOrderTrackingOpen, setIsOrderTrackingOpen } =
    useBazaarStore();

  const [searchId, setSearchId] = useState("BX-BD-894210");

  if (!isOrderTrackingOpen) return null;

  const trackingSteps = [
    {
      titleEn: "Order Placed & Confirmed",
      titleBn: "অর্ডার গ্রহণ ও কনফার্ম হয়েছে",
      timeEn: "Today, 10:15 AM",
      timeBn: "আজ, সকাল ১০:১৫",
      status: "completed",
    },
    {
      titleEn: "Packed by Verified Seller",
      titleBn: "সেলার প্যাকেজিং সম্পন্ন করেছেন",
      timeEn: "Today, 01:30 PM",
      timeBn: "আজ, দুপুর ১:৩০",
      status: "completed",
    },
    {
      titleEn: "Out for Delivery (BazaarX Express Rider)",
      titleBn: "ডেলিভারি রাইডারের কাছে হস্তান্তর হয়েছে",
      timeEn: "Estimated today by 6:00 PM",
      timeBn: "সম্ভাব্য সময়: আজ সন্ধ্যা ৬:০০",
      status: "current",
    },
    {
      titleEn: "Delivered & Inspected",
      titleBn: "পণ্য গ্রাহকের নিকট ডেলিভারি",
      timeEn: "Pending delivery",
      timeBn: "অপেক্ষমাণ",
      status: "upcoming",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1A1F36] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#FF4500]" />
            <h2 className="text-base font-bold font-display">
              {language === "bn" ? "লাইভ অর্ডার ট্র্যাকিং" : "Live Courier Tracking"}
            </h2>
          </div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Tracking Search Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="BX-BD-XXXXXX"
              className="flex-1 p-2.5 border border-gray-300 rounded-xl text-xs font-price font-bold uppercase focus:outline-none focus:border-[#FF4500]"
            />
            <button className="bg-[#FF4500] hover:bg-[#E03D00] text-white px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer">
              {language === "bn" ? "ট্র্যাক" : "Track"}
            </button>
          </div>

          {/* Delivery Rider & Courier Info */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                BX
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block">
                  {language === "bn" ? "রাইডার: মো: কাউসার হোসেন" : "Rider: Md. Kawsar Hossain"}
                </span>
                <span className="text-[11px] text-emerald-800 font-medium">
                  {language === "bn" ? "বাজারএক্স এক্সপ্রেস (ধানমন্ডি হাব)" : "BazaarX Express (Dhanmondi Hub)"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-500 block">
                {language === "bn" ? "ডেলিভারি OTP" : "Delivery OTP"}
              </span>
              <span className="font-price font-black text-sm text-[#FF4500] tracking-wider">
                {language === "bn" ? toBnNumber("4829") : "4829"}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4 pl-2">
            {trackingSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                {/* Connecting Line */}
                {idx < trackingSteps.length - 1 && (
                  <div
                    className={`absolute left-3.5 top-6 bottom-0 w-0.5 ${
                      step.status === "completed" ? "bg-[#00C853]" : "bg-gray-200"
                    }`}
                  />
                )}

                {/* Node Icon */}
                <div
                  className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    step.status === "completed"
                      ? "bg-[#00C853] text-white"
                      : step.status === "current"
                      ? "bg-[#FF4500] text-white animate-pulse"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step.status === "completed" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Step Details */}
                <div className="space-y-0.5">
                  <h4
                    className={`text-xs font-bold ${
                      step.status === "current"
                        ? "text-[#FF4500]"
                        : "text-gray-900"
                    }`}
                  >
                    {language === "bn" ? step.titleBn : step.titleEn}
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    {language === "bn" ? step.timeBn : step.timeEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
