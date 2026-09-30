"use client";

import React from "react";
import {
  Smartphone,
  Shirt,
  Tv,
  Sparkles,
  Activity,
  BookOpen,
  ShoppingBag,
  Gamepad2,
  Car,
  HeartPulse,
  PenTool,
  Dog,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { categoryGridList } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />,
  Shirt: <Shirt className="w-5 h-5 sm:w-6 sm:h-6" />,
  Tv: <Tv className="w-5 h-5 sm:w-6 sm:h-6" />,
  Sparkles: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
  Activity: <Activity className="w-5 h-5 sm:w-6 sm:h-6" />,
  BookOpen: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />,
  Gamepad2: <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />,
  Car: <Car className="w-5 h-5 sm:w-6 sm:h-6" />,
  HeartPulse: <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />,
  PenTool: <PenTool className="w-5 h-5 sm:w-6 sm:h-6" />,
  Dog: <Dog className="w-5 h-5 sm:w-6 sm:h-6" />,
};

export const CategoryGrid: React.FC = () => {
  const { language, selectedCategory, setSelectedCategory } = useBazaarStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-bold font-display text-gray-900">
          {language === "bn" ? "জনপ্রিয় ক্যাটাগরি" : "Explore Categories"}
        </h2>
        <span className="text-xs text-gray-500 font-medium">
          {language === "bn" ? "১২টি মূল বিভাগ" : "12 Key Departments"}
        </span>
      </div>

      {/* 6x2 on desktop, 4x3 on mobile */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3.5">
        {categoryGridList.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                isSelected
                  ? "bg-[#FF4500]/10 border-[#FF4500] text-[#FF4500] font-bold shadow-sm"
                  : "bg-white border-gray-200/80 hover:border-gray-300 text-gray-700"
              }`}
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                  isSelected ? "bg-[#FF4500] text-white" : cat.color
                }`}
              >
                {iconMap[cat.icon]}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-center line-clamp-1">
                {language === "bn" ? cat.nameBn : cat.nameEn}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
