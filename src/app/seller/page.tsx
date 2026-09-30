"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  MessageSquare,
  BarChart3,
  DollarSign,
  Gift,
  Settings,
  AlertCircle,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Store,
  Clock,
  ArrowRight,
} from "lucide-react";
import { formatBDT, toBnNumber } from "@/lib/i18n";

const revenueData = [
  { day: "Day 1", gmv: 42000 },
  { day: "Day 5", gmv: 68000 },
  { day: "Day 10", gmv: 59000 },
  { day: "Day 15", gmv: 95000 },
  { day: "Day 20", gmv: 124000 },
  { day: "Day 25", gmv: 110000 },
  { day: "Day 30", gmv: 148500 },
];

export default function SellerCenterDashboard() {
  const [activeNav, setActiveNav] = useState("overview");

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#1A1F36] text-white flex flex-col justify-between shrink-0 p-4 border-r border-gray-800">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF4500] to-[#FF6B35] flex items-center justify-center font-extrabold text-white text-lg">
              BX
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">
                BazaarX Seller
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">
                Samsung Flagship Store (Verified)
              </span>
            </div>
          </div>

          <nav className="space-y-1 text-xs">
            {[
              { id: "overview", labelBn: "ওভারভিউ", labelEn: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: "products", labelBn: "প্রোডাক্ট", labelEn: "Products", icon: <Package className="w-4 h-4" /> },
              { id: "orders", labelBn: "অর্ডার", labelEn: "Orders", icon: <ShoppingBag className="w-4 h-4" /> },
              { id: "inventory", labelBn: "ইনভেন্টরি", labelEn: "Inventory", icon: <Layers className="w-4 h-4" /> },
              { id: "chat", labelBn: "চ্যাট ও ইনবক্স", labelEn: "Chat", icon: <MessageSquare className="w-4 h-4" /> },
              { id: "analytics", labelBn: "অ্যানালিটিক্স", labelEn: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
              { id: "payouts", labelBn: "পেআউট ও ব্যালেন্স", labelEn: "Payouts", icon: <DollarSign className="w-4 h-4" /> },
              { id: "promotions", labelBn: "প্রমোশন ও ভাউচার", labelEn: "Promotions", icon: <Gift className="w-4 h-4" /> },
              { id: "settings", labelBn: "সেটিংস", labelEn: "Settings", icon: <Settings className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold transition-colors cursor-pointer ${
                  activeNav === item.id
                    ? "bg-[#FF4500] text-white shadow-md shadow-[#FF4500]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span>{item.labelBn}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Back to Customer Shop */}
        <div className="pt-4 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center justify-between text-xs text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span>গ্রাহক স্টোরে ফিরুন</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00C853]" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-display text-gray-900">
              সেলার ওভারভিউ ড্যাশবোর্ড
            </h1>
            <p className="text-xs text-gray-500">
              গত ৩০ দিনের বিক্রয় প্রতিবেদন ও রিয়েল-টাইম পারফরম্যান্স স্কোর
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/seller/products/new"
              className="bg-[#FF4500] hover:bg-[#E03D00] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#FF4500]/25 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন প্রোডাক্ট যোগ করুন (AI অ্যাসিস্ট্যান্ট)</span>
            </Link>
          </div>
        </div>

        {/* 4 Animated KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] text-gray-500 font-medium">আজকের মোট বিক্রয় (GMV)</span>
            <div className="text-xl font-black font-price text-[#FF4500]">
              ৳ ১,৪৮,৫০০
            </div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +১৮.২% বৃদ্ধি
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] text-gray-500 font-medium">অর্ডার সংখ্যা (Orders)</span>
            <div className="text-xl font-black font-price text-gray-900">
              ৩৮ টি
            </div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +৫ টি নতুন
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] text-gray-500 font-medium">কনভার্সন রেট (%)</span>
            <div className="text-xl font-black font-price text-gray-900">
              ৪.৮%
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">দারাজের চেয়ে ২ গুণ বেশি</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] text-gray-500 font-medium">গড় অর্ডার মূল্য (AOV)</span>
            <div className="text-xl font-black font-price text-[#00C853]">
              ৳ ৩,৯১০
            </div>
            <span className="text-[10px] text-gray-400">প্রতি অর্ডারে</span>
          </div>
        </div>

        {/* Action-Required Pending Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold text-red-800">
              🔴 ৩ টি অর্ডার অবিলম্বে processing প্রয়োজন
            </span>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="font-bold text-amber-800">
              🟡 ২ টি প্রোডাক্ট কম স্টকে (রি-স্টক করুন)
            </span>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-3.5 rounded-xl flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="font-bold text-orange-800">
              🟠 ৪ টি ক্রেতার প্রশ্নের উত্তর বাকি (SLA: 24h)
            </span>
          </div>
        </div>

        {/* 30-Day Revenue Recharts Graph */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-gray-900">
                ৩০ দিনের বিক্রয় প্রবণতা (Revenue Growth Curve)
              </h3>
              <p className="text-xs text-gray-500">বিকাশ ও ব্যাংক দৈনিক সেটেলমেন্ট সহ</p>
            </div>
            <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              মোট GMV: ৳ ৬,৪৬,৫০০
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4500" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF4500" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [formatBDT(Number(val ?? 0), "bn"), "বিক্রয়"]}
                  contentStyle={{ backgroundColor: "#1A1F36", color: "#fff", borderRadius: "8px", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="gmv" stroke="#FF4500" strokeWidth={3} fillOpacity={1} fill="url(#colorGmv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Products Table */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-gray-900">
            এই সপ্তাহের শীর্ষ বিক্রিত প্রোডাক্ট
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-200">
                <tr>
                  <th className="p-3">প্রোডাক্টের নাম</th>
                  <th className="p-3">মূল্য</th>
                  <th className="p-3">বিক্রিত সংখ্যা</th>
                  <th className="p-3">স্টক</th>
                  <th className="p-3">রেটিং</th>
                  <th className="p-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                <tr>
                  <td className="p-3 font-bold text-gray-900">Samsung Galaxy A55 5G</td>
                  <td className="p-3 font-price text-[#FF4500] font-bold">৳ ৪৬,৯৯৯</td>
                  <td className="p-3">১৮৪ পিস</td>
                  <td className="p-3 text-emerald-600 font-bold">২৮ টি বাকি</td>
                  <td className="p-3">⭐ ৪.৮</td>
                  <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">সক্রিয়</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-900">Anker Soundcore Space One</td>
                  <td className="p-3 font-price text-[#FF4500] font-bold">৳ ৮,৮৫০</td>
                  <td className="p-3">২৬০ পিস</td>
                  <td className="p-3 text-amber-600 font-bold">১৯ টি বাকি</td>
                  <td className="p-3">⭐ ৪.৯</td>
                  <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">সক্রিয়</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-900">Xiaomi Smart Band 8</td>
                  <td className="p-3 font-price text-[#FF4500] font-bold">৳ ৩,৬৫০</td>
                  <td className="p-3">৯৪০ পিস</td>
                  <td className="p-3 text-emerald-600 font-bold">৫০ টি বাকি</td>
                  <td className="p-3">⭐ ৪.৮</td>
                  <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">সক্রিয়</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
