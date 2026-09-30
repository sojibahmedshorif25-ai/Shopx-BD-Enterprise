"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  Store,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { formatBDT } from "@/lib/i18n";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("sellers");

  const [sellersQueue, setSellersQueue] = useState([
    {
      id: "sel-req-01",
      storeName: "Apex Footwear Official",
      owner: "Syed Nasim Manzur",
      tradeLicense: "TRAD-DH-2024-9812",
      nid: "1988269123849123",
      status: "pending",
    },
    {
      id: "sel-req-02",
      storeName: "Dhaka Craft Weavers",
      owner: "Abdul Jalil",
      tradeLicense: "TRAD-TG-2023-4122",
      nid: "1991269874123591",
      status: "pending",
    },
  ]);

  const handleApproveSeller = (id: string) => {
    setSellersQueue((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-4 sm:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Admin Header */}
        <div className="bg-[#1A1F36] text-white p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-gray-800 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF4500] flex items-center justify-center font-black text-xl">
              BX
            </div>
            <div>
              <h1 className="text-xl font-bold font-display">
                BazaarX Super Admin Control Panel
              </h1>
              <span className="text-xs text-emerald-400">
                Ministry of Commerce & DBID Regulatory Compliance Engine
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-white font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>গ্রাহক স্টোরে ফিরুন</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00C853]" />
          </Link>
        </div>

        {/* 4 GMV & Core Platform Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-xs text-gray-500 font-medium">আজকের প্ল্যাটফর্ম GMV</span>
            <div className="text-2xl font-black font-price text-[#FF4500]">৳ ৮৪,৫২,০০০</div>
            <span className="text-[10px] text-emerald-600 font-bold">+১৪.৮% প্রবৃদ্ধি</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-xs text-gray-500 font-medium">মোট সক্রিয় গ্রাহক</span>
            <div className="text-2xl font-black font-price text-gray-900">১২,৮৪,২১০ জন</div>
            <span className="text-[10px] text-gray-400">৬৪ জেলায়</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-xs text-gray-500 font-medium">ভেরিফাইড সেলার সংখ্যা</span>
            <div className="text-2xl font-black font-price text-gray-900">৩,৪২০ টি</div>
            <span className="text-[10px] text-emerald-600 font-bold">১০০% ট্রেড লাইসেন্স প্রাপ্ত</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-xs text-gray-500 font-medium">ফ্রড ডিটেকশন অ্যালার্ট</span>
            <div className="text-2xl font-black font-price text-[#00C853]">০ টি সক্রিয় ঝুঁকি</div>
            <span className="text-[10px] text-emerald-600 font-bold">AI অটোমেটেড সিকিউরিটি</span>
          </div>
        </div>

        {/* Seller Verification Queue Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-[#FF4500]" />
              <h2 className="text-base font-bold font-display text-gray-900">
                সেলার ভেরিফিকেশন কিউ (NID & Trade License Audit)
              </h2>
            </div>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {sellersQueue.length} টি আবেদন অপেক্ষমাণ
            </span>
          </div>

          {sellersQueue.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              সবগুলো সেলার আবেদন যাচাই সম্পন্ন হয়েছে!
            </div>
          ) : (
            <div className="space-y-3">
              {sellersQueue.map((seller) => (
                <div
                  key={seller.id}
                  className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-gray-900">{seller.storeName}</h3>
                    <div className="text-gray-500 flex gap-3">
                      <span>মালিক: {seller.owner}</span>
                      <span>• NID: {seller.nid}</span>
                      <span className="text-emerald-700 font-semibold">• Trade License: {seller.tradeLicense}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveSeller(seller.id)}
                      className="bg-[#00C853] hover:bg-[#00B048] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>অনুমোদন করুন (Approve)</span>
                    </button>
                    <button
                      onClick={() => handleApproveSeller(seller.id)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-xl font-bold transition-colors cursor-pointer"
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
