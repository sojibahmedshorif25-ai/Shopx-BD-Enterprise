"use client";

import React from "react";
import {
  Home,
  Grid,
  Flame,
  ShoppingCart,
  Truck,
  Sparkles,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { formatBDT, translations } from "@/lib/i18n";

export const MobileNav: React.FC = () => {
  const {
    language,
    cart,
    setIsCartOpen,
    setIsOrderTrackingOpen,
    setIsDarazComparisonOpen,
    setSelectedCategory,
  } = useBazaarStore();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40 py-1.5 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => setSelectedCategory("all")}
          className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#FF4500] cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">
            {language === "bn" ? "হোম" : "Home"}
          </span>
        </button>

        {/* Categories */}
        <button
          onClick={() => setSelectedCategory("all")}
          className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#FF4500] cursor-pointer"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">
            {language === "bn" ? "ক্যাটাগরি" : "Category"}
          </span>
        </button>

        {/* Daraz Comparison Quick Badge */}
        <button
          onClick={() => setIsDarazComparisonOpen(true)}
          className="flex flex-col items-center gap-1 text-[#FF4500] cursor-pointer"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="text-[10px] font-bold">
            {language === "bn" ? "তুলনা" : "vs Daraz"}
          </span>
        </button>

        {/* Track */}
        <button
          onClick={() => setIsOrderTrackingOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#FF4500] cursor-pointer"
        >
          <Truck className="w-5 h-5" />
          <span className="text-[10px] font-medium">
            {language === "bn" ? "ট্র্যাকিং" : "Track"}
          </span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#FF4500] relative cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#FF4500] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">
            {language === "bn" ? "কার্ট" : "Cart"}
          </span>
        </button>
      </div>
    </div>
  );
};
