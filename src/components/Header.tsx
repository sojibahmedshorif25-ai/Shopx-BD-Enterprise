"use client";

import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  Globe,
  MapPin,
  Truck,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Zap,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { formatBDT, translations } from "@/lib/i18n";
import { districts } from "@/lib/data";

export const Header: React.FC = () => {
  const {
    language,
    toggleLanguage,
    selectedDistrict,
    setSelectedDistrict,
    selectedThana,
    setSelectedThana,
    cart,
    setIsCartOpen,
    wishlist,
    searchQuery,
    setSearchQuery,
    setIsDarazComparisonOpen,
    setIsOrderTrackingOpen,
    isDataSaverActive,
    toggleDataSaver,
  } = useBazaarStore();

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const t = translations[language];

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      {/* Top Reassurance & Quick Utility Bar */}
      <div className="bg-[#1A1F36] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 overflow-x-auto py-0.5">
            <button
              onClick={() => setIsDarazComparisonOpen(true)}
              className="flex items-center gap-1.5 bg-[#FF4500]/20 hover:bg-[#FF4500]/30 text-[#FF4500] font-semibold px-2.5 py-0.5 rounded-full border border-[#FF4500]/40 transition-colors cursor-pointer text-[11px]"
            >
              <Sparkles className="w-3 h-3 text-[#FF4500] animate-pulse" />
              <span>{language === "bn" ? "দারাজ বনাম বাজারএক্স" : "BazaarX vs Daraz"}</span>
            </button>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="text-gray-300 hidden md:inline font-medium">
              {t.priceTransparencyAlert}
            </span>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            {/* Low Data Mode Toggle (Rural BD low-bandwidth CRO) */}
            <button
              onClick={toggleDataSaver}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                isDataSaverActive
                  ? "bg-[#00C853] text-black font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
              title="Optimizes images and lowers asset weight for 2G/3G connections"
            >
              <Zap className="w-3 h-3" />
              <span>{language === "bn" ? "ডাটা সেভার" : "Data Saver"}</span>
              {isDataSaverActive && (
                <span className="text-[9px] bg-black text-white px-1 rounded ml-0.5">ON</span>
              )}
            </button>

            {/* Track Order */}
            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <Truck className="w-3 h-3 text-[#FF4500]" />
              <span>{t.trackOrder}</span>
            </button>

            {/* Portal Switchers */}
            <a
              href="/seller"
              className="text-gray-300 hover:text-emerald-400 font-medium transition-colors hidden sm:inline"
            >
              {language === "bn" ? "সেলার সেন্টার" : "Seller Center"}
            </a>
            <a
              href="/rider"
              className="text-gray-300 hover:text-amber-400 font-medium transition-colors hidden md:inline"
            >
              {language === "bn" ? "রাইডার পোর্টাল" : "Rider App"}
            </a>
            <a
              href="/admin"
              className="text-gray-300 hover:text-purple-400 font-medium transition-colors hidden lg:inline"
            >
              {language === "bn" ? "অ্যাডমিন" : "Admin"}
            </a>

            {/* Bilingual Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded border border-white/20 transition-colors font-medium text-xs cursor-pointer"
              aria-label="Toggle language"
            >
              <Globe className="w-3 h-3 text-[#00C853]" />
              <span>{language === "bn" ? "English (EN)" : "বাংলা (BN)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4500] to-[#FF6B35] flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-[#FF4500]/20 group-hover:scale-105 transition-transform">
                BX
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-[#1A1F36] leading-none">
                  Bazaar<span className="text-[#FF4500]">X</span>
                </span>
                <span className="text-[10px] font-semibold text-[#00C853] tracking-wider uppercase font-display mt-0.5">
                  {language === "bn" ? "স্বচ্ছ ও দ্রুত শপিং" : "Transparent & Fast"}
                </span>
              </div>
            </a>

            {/* Location Selector (District & Thana Upfront) */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50/80 hover:bg-gray-100/80 transition-colors text-left text-xs"
              >
                <MapPin className="w-4 h-4 text-[#FF4500] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-medium">
                    {t.deliverTo}
                  </span>
                  <span className="text-gray-900 font-semibold truncate max-w-[130px]">
                    {language === "bn" ? selectedDistrict.nameBn : selectedDistrict.nameEn},{" "}
                    {selectedThana}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
              </button>

              {/* District Dropdown Modal */}
              {isLocationOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-800">
                      {language === "bn" ? "ডেলিভারি লোকেশন ও ফি" : "Delivery Location & Fee"}
                    </span>
                    <button
                      onClick={() => setIsLocationOpen(false)}
                      className="text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {districts.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setSelectedDistrict(d);
                          setSelectedThana(d.thanas[0]);
                          setIsLocationOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          selectedDistrict.id === d.id
                            ? "bg-[#FF4500]/10 text-[#FF4500] font-bold"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div>
                          <span>{language === "bn" ? d.nameBn : d.nameEn}</span>
                          <span className="text-[10px] text-gray-400 block">
                            {d.deliveryEstimateDays}
                          </span>
                        </div>
                        <span className="font-price font-semibold text-[#00C853]">
                          {formatBDT(d.shippingFee, language)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar with Instant Autocomplete CRO */}
          <div className="flex-1 max-w-2xl mx-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-4 pr-24 py-2.5 rounded-lg border-2 border-gray-200 focus:border-[#FF4500] focus:outline-none text-sm transition-colors shadow-inner"
              />
              <button
                type="button"
                className="absolute right-1 top-1 bottom-1 bg-[#FF4500] hover:bg-[#E03D00] text-white px-4 rounded-md flex items-center justify-center font-medium text-xs transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 mr-1 hidden sm:inline" />
                <span>{t.searchBtn}</span>
              </button>
            </div>
          </div>

          {/* User Quick Actions: BazaarMall Badge, Wishlist, Cart Drawer */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* BazaarMall Official Badge Link */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#00C853]" />
              <span>{t.bazaarMall}</span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => {}}
              className="relative p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF3B3B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#FF4500] hover:bg-[#E03D00] text-white px-3.5 py-2 rounded-lg font-semibold text-xs shadow-md shadow-[#FF4500]/20 transition-all active:scale-95 cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1A1F36] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-price font-bold">
                {formatBDT(subtotal, language)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
