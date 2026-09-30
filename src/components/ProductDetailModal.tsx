"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Star,
  ShieldCheck,
  TrendingDown,
  Truck,
  RotateCcw,
  CheckCircle,
  MapPin,
  Building2,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { formatBDT, toBnNumber, translations } from "@/lib/i18n";
import { districts } from "@/lib/data";

export const ProductDetailModal: React.FC = () => {
  const {
    language,
    activeProductModal,
    setActiveProductModal,
    setActivePriceHistoryProduct,
    addToCart,
    selectedDistrict,
    setSelectedDistrict,
    selectedThana,
    setSelectedThana,
    setIsCheckoutOpen,
  } = useBazaarStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!activeProductModal) return null;
  const product = activeProductModal;
  const t = translations[language];

  const minPrice = Math.min(...product.priceHistory.map((p) => p.price));
  const isAllTimeLow = product.price <= minPrice;

  // Delivery fee calculation
  const isDhaka = selectedDistrict.id === "dhaka";
  const shippingFee = isDhaka
    ? product.shipping.dhakaFee
    : product.shipping.outsideDhakaFee;
  const estimatedDays = isDhaka
    ? product.shipping.estimatedDhakaDays
    : product.shipping.estimatedOutsideDays;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-[#1A1F36] text-white px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-[#FF4500] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              BazaarX {product.isBazaarMall ? "Mall" : "Verified"}
            </span>
            <span className="text-xs text-gray-300 font-medium hidden sm:inline">
              {product.brand} • {language === "bn" ? product.categoryBn : product.category}
            </span>
          </div>
          <button
            onClick={() => setActiveProductModal(null)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Left: Gallery */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src={product.images[selectedImageIndex] || product.thumbnail}
                  alt={language === "bn" ? product.titleBn : product.titleEn}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? "border-[#FF4500] scale-105"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Verified Seller Info Box */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#1A1F36]" />
                    <span className="font-bold text-xs text-gray-900">
                      {language === "bn" ? product.seller.nameBn : product.seller.name}
                    </span>
                  </div>
                  {product.seller.tradeLicenseVerified && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#00C853]" />
                      {t.tradeLicenseVerified}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <span className="text-gray-400 block text-[10px]">{t.shipOnTime}</span>
                    <span className="font-bold text-gray-800">
                      {language === "bn"
                        ? toBnNumber(product.seller.shipOnTime)
                        : product.seller.shipOnTime}
                      %
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <span className="text-gray-400 block text-[10px]">{t.responseRate}</span>
                    <span className="font-bold text-gray-800">
                      {language === "bn"
                        ? toBnNumber(product.seller.chatResponseRate)
                        : product.seller.chatResponseRate}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Pricing, Specs & Upfront Fee Calculator */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h1 className="text-lg sm:text-2xl font-bold font-display text-gray-900 leading-snug">
                  {language === "bn" ? product.titleBn : product.titleEn}
                </h1>

                {/* Rating summary */}
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    <span>
                      {language === "bn" ? toBnNumber(product.rating) : product.rating} / 5.0
                    </span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">
                    {language === "bn"
                      ? toBnNumber(product.reviewCount)
                      : product.reviewCount}{" "}
                    {language === "bn" ? "ভেরিফাইড রিভিউ" : "Verified Reviews"}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-[#00C853] font-semibold">
                    {language === "bn"
                      ? `${toBnNumber(product.stock)} পিস স্টকে আছে`
                      : `${product.stock} In Stock`}
                  </span>
                </div>
              </div>

              {/* Price Banner with 90-Day Tracker CTA */}
              <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold font-price text-[#FF4500]">
                      {formatBDT(product.price, language)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through font-price">
                        {formatBDT(product.originalPrice, language)}
                      </span>
                    )}
                    {product.discountPercent > 0 && (
                      <span className="bg-[#FF4500] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        -{language === "bn" ? toBnNumber(product.discountPercent) : product.discountPercent}%
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-600 block mt-1">
                    {isAllTimeLow
                      ? (language === "bn" ? "🔥 এটি গত ৯০ দিনের সর্বনিম্ন মূল্য!" : "🔥 Verified lowest price in 90 days!")
                      : (language === "bn" ? "স্বচ্ছ ভেরিফাইড ডিসকাউন্ট" : "Verified authentic discount")}
                  </span>
                </div>

                <button
                  onClick={() => setActivePriceHistoryProduct(product)}
                  className="bg-[#1A1F36] hover:bg-[#121626] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
                >
                  <TrendingDown className="w-4 h-4 text-[#00C853]" />
                  <span>{language === "bn" ? "৯০ দিনের দামের গ্রাফ দেখুন" : "View 90-Day Price Chart"}</span>
                </button>
              </div>

              {/* Upfront Delivery Calculator (Direct Daraz Painkiller) */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    <Truck className="w-4 h-4 text-[#FF4500]" />
                    <span>{t.deliveryEstimator} (Upfront)</span>
                  </div>
                  <span className="text-[11px] text-[#00C853] font-semibold">
                    {t.freeDeliveryBanner}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">
                      {language === "bn" ? "জেলা নির্বাচন করুন:" : "Select District:"}
                    </label>
                    <select
                      value={selectedDistrict.id}
                      onChange={(e) => {
                        const d = districts.find((item) => item.id === e.target.value);
                        if (d) {
                          setSelectedDistrict(d);
                          setSelectedThana(d.thanas[0]);
                        }
                      }}
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#FF4500]"
                    >
                      {districts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {language === "bn" ? d.nameBn : d.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">
                      {language === "bn" ? "থানা / এলাকা:" : "Thana / Area:"}
                    </label>
                    <select
                      value={selectedThana}
                      onChange={(e) => setSelectedThana(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#FF4500]"
                    >
                      {selectedDistrict.thanas.map((th) => (
                        <option key={th} value={th}>
                          {th}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-500 block text-[11px]">{t.estimatedTime}</span>
                    <span className="font-bold text-gray-800">{estimatedDays}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 block text-[11px]">{t.deliveryFee}</span>
                    <span className="font-extrabold font-price text-[#FF4500]">
                      {formatBDT(shippingFee, language)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantees Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-50/70 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#00C853] shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block">{t.returnPolicy}</span>
                    <span className="text-[10px] text-gray-500">{t.instantRefundAvailable}</span>
                  </div>
                </div>

                <div className="bg-blue-50/70 border border-blue-200 p-2.5 rounded-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block">{t.warranty}</span>
                    <span className="text-[10px] text-gray-500">
                      {language === "bn" ? product.warrantyTextBn : product.warrantyTextEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity selector & Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold font-price text-gray-900">
                    {language === "bn" ? toBnNumber(quantity) : quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setActiveProductModal(null);
                  }}
                  className="flex-1 bg-[#1A1F36] hover:bg-[#121626] text-white py-3 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  {t.addToCart}
                </button>

                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setActiveProductModal(null);
                    setIsCheckoutOpen(true);
                  }}
                  className="flex-1 bg-[#00C853] hover:bg-[#00B048] text-white py-3 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
                >
                  {t.buyNow}
                </button>
              </div>
            </div>
          </div>

          {/* Key Features & Description */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-base font-bold font-display text-gray-900">
              {t.highlights}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
              {(language === "bn" ? product.keyFeaturesBn : product.keyFeaturesEn).map(
                (feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <CheckCircle className="w-4 h-4 text-[#00C853] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Reviews with Bangladeshi District Proof */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-display text-gray-900">
                {t.customerReviews}
              </h3>
              <span className="text-xs text-gray-500">
                {language === "bn" ? "১০০% যাচাইকৃত পণ্যগ্রহীতা" : "100% Verified Purchases"}
              </span>
            </div>

            <div className="space-y-3">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-gray-50/80 p-4 rounded-xl border border-gray-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">
                        {rev.author}
                      </span>
                      <span className="text-[10px] text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF4500]" />
                        {rev.district} • {rev.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
