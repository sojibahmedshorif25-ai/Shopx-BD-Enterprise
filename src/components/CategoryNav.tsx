"use client";

import React from "react";
import {
  Grid,
  Smartphone,
  Shirt,
  Tv,
  ShoppingBag,
  Sparkles,
  Activity,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { categoryList } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Grid: <Grid className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Tv: <Tv className="w-4 h-4" />,
  ShoppingBag: <ShoppingBag className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
};

export const CategoryNav: React.FC = () => {
  const { language, selectedCategory, setSelectedCategory } = useBazaarStore();

  return (
    <div className="bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none no-scrollbar">
          {categoryList.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#FF4500] text-white shadow-sm shadow-[#FF4500]/30 scale-[1.02]"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <span className={isSelected ? "text-white" : "text-gray-500"}>
                  {iconMap[cat.icon]}
                </span>
                <span>{language === "bn" ? cat.nameBn : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
