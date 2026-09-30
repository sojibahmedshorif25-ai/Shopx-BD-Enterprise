"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import {
  ShieldCheck,
  TrendingDown,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { formatBDT, toBnNumber, translations } from "@/lib/i18n";

export const PriceHistoryModal: React.FC = () => {
  const {
    language,
    activePriceHistoryProduct,
    setActivePriceHistoryProduct,
    addToCart,
  } = useBazaarStore();

  if (!activePriceHistoryProduct) return null;

  const product = activePriceHistoryProduct;
  const t = translations[language];

  const minPrice = Math.min(...product.priceHistory.map((p) => p.price));
  const maxPrice = Math.max(...product.priceHistory.map((p) => p.price));
  const currentPrice = product.price;
  const isAllTimeLow = currentPrice <= minPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1A1F36] text-white p-5 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-[#00C853] text-black text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {language === "bn" ? "বাজারএক্স প্রাইস গ্যারান্টি" : "Verified 90-Day Tracker"}
              </span>
              {isAllTimeLow && (
                <span className="bg-[#FF4500] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {language === "bn" ? "সর্বনিম্ন দামে পাচ্ছেন!" : "All-Time Low!"}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold font-display text-gray-100 line-clamp-1">
              {language === "bn" ? product.titleBn : product.titleEn}
            </h3>
          </div>
          <button
            onClick={() => setActivePriceHistoryProduct(null)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Summary Metric Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
              <span className="text-xs text-gray-600 block font-medium">
                {t.currentPrice}
              </span>
              <span className="text-lg font-extrabold font-price text-[#FF4500]">
                {formatBDT(currentPrice, language)}
              </span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
              <span className="text-xs text-gray-600 block font-medium">
                {t.lowestPrice} (90D)
              </span>
              <span className="text-lg font-extrabold font-price text-[#00C853]">
                {formatBDT(minPrice, language)}
              </span>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
              <span className="text-xs text-gray-600 block font-medium">
                {t.highestPrice} (90D)
              </span>
              <span className="text-lg font-extrabold font-price text-gray-700">
                {formatBDT(maxPrice, language)}
              </span>
            </div>
          </div>

          {/* Recharts 90-Day Trend */}
          <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-[#FF4500]" />
                {language === "bn" ? "গত ৯০ দিনের মূল্যের গতিপ্রকৃতি" : "Price Movement (Last 90 Days)"}
              </span>
              <span className="text-[11px] text-gray-500">
                {language === "bn" ? "দৈনিক ভেরিফাইড ডাটা" : "Daily Verified Audit"}
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={product.priceHistory}
                  margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    tickLine={false}
                    axisLine={{ stroke: "#cbd5e1" }}
                  />
                  <YAxis
                    domain={["dataMin - 500", "dataMax + 500"]}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    tickFormatter={(val) => (language === "bn" ? toBnNumber(val) : val)}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(val: any) => [
                      formatBDT(Number(val ?? 0), language),
                      language === "bn" ? "মূল্য" : "Price",
                    ]}
                    contentStyle={{
                      backgroundColor: "#1A1F36",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                      border: "none",
                    }}
                  />
                  <ReferenceLine
                    y={minPrice}
                    stroke="#00C853"
                    strokeDasharray="3 3"
                    label={{
                      value: language === "bn" ? "সর্বনিম্ন রেট" : "Lowest",
                      fill: "#00C853",
                      fontSize: 10,
                      position: "right",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#FF4500"
                    strokeWidth={3}
                    dot={{ fill: "#FF4500", r: 5, strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 7, fill: "#00C853", stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daraz Anti-Manipulation Guarantee Callout */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#00C853] shrink-0 mt-0.5" />
            <div className="text-xs text-gray-700 space-y-1">
              <p className="font-bold text-gray-900">
                {language === "bn"
                  ? "স্বচ্ছ ডিসকাউন্ট নীতি — কোনো কৃত্রিম বাড়তি দাম নেই"
                  : "Transparent Discount Policy — Verified Price Integrity"}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {language === "bn"
                  ? "দারাজের মতো সেল শুরুর আগে দাম বাড়িয়ে দিয়ে কৃত্রিম ছাড় দেখানো বাজারএক্সে সম্পূর্ণ নিষিদ্ধ। এই পণ্যের ডিসকাউন্ট আসল ও পরীক্ষিত।"
                  : "Unlike platforms that artificially double base prices before campaigns, BazaarX automatically audits product price logs to prevent manipulated discounts."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">
              {language === "bn" ? "অর্ডার করতে চান?" : "Ready to buy?"}
            </span>
            <span className="text-base font-extrabold font-price text-[#FF4500]">
              {formatBDT(currentPrice, language)}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                addToCart(product, 1);
                setActivePriceHistoryProduct(null);
              }}
              className="bg-[#00C853] hover:bg-[#00B048] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              {language === "bn" ? "এই দামে কিনুন" : "Add to Cart at This Price"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
