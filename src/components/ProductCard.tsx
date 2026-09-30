"use client";

import React from "react";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  TrendingDown,
  ShoppingCart,
  Heart,
  Eye,
} from "lucide-react";
import { Product } from "@/types";
import { useBazaarStore } from "@/lib/store";
import { formatBDT, toBnNumber, translations } from "@/lib/i18n";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    language,
    addToCart,
    wishlist,
    toggleWishlist,
    setActiveProductModal,
    setActivePriceHistoryProduct,
    isDataSaverActive,
  } = useBazaarStore();

  const isWishlisted = wishlist.includes(product.id);
  const t = translations[language];

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 hover:border-[#FF4500]/60 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden cursor-pointer"
        onClick={() => setActiveProductModal(product)}
      >
        <Image
          src={product.thumbnail}
          alt={language === "bn" ? product.titleBn : product.titleEn}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          loading="lazy"
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
            isDataSaverActive ? "blur-[0.5px]" : ""
          }`}
        />

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isBazaarMall && (
            <span className="bg-[#1A1F36] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3 text-[#00C853]" />
              Mall
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-[#FF4500] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
              -{language === "bn" ? toBnNumber(product.discountPercent) : product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors z-10 cursor-pointer ${
            isWishlisted
              ? "bg-[#FF3B3B] text-white"
              : "bg-white/80 hover:bg-white text-gray-700 hover:text-[#FF3B3B]"
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Quick View Floating Overlay */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 px-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="w-full bg-[#1A1F36]/90 hover:bg-[#1A1F36] text-white py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md backdrop-blur-sm cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "বিস্তারিত দেখুন" : "Quick View"}</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Brand and 90D Price Tracker Button */}
          <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
            <span className="text-gray-400 font-medium truncate">{product.brand}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePriceHistoryProduct(product);
              }}
              className="flex items-center gap-1 text-[#FF4500] hover:text-[#E03D00] font-bold bg-[#FF4500]/10 hover:bg-[#FF4500]/20 px-1.5 py-0.5 rounded transition-colors text-[10px] cursor-pointer shrink-0"
              title="View 90-day transparent price graph"
            >
              <TrendingDown className="w-3 h-3" />
              <span>{language === "bn" ? "৯০ দিনের দাম" : "90D History"}</span>
            </button>
          </div>

          {/* Title */}
          <h3
            onClick={() => setActiveProductModal(product)}
            className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 hover:text-[#FF4500] transition-colors cursor-pointer"
            title={language === "bn" ? product.titleBn : product.titleEn}
          >
            {language === "bn" ? product.titleBn : product.titleEn}
          </h3>

          {/* Rating and Sold count */}
          <div className="flex items-center gap-1.5 mt-1 text-[11px]">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
              <span>{language === "bn" ? toBnNumber(product.rating) : product.rating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-[10px]">
              {language === "bn" ? toBnNumber(product.soldCount) : product.soldCount} {t.sold}
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold font-price text-[#FF4500] leading-none">
              {formatBDT(product.price, language)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-gray-400 line-through font-price mt-0.5">
                {formatBDT(product.originalPrice, language)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-[#00C853] hover:bg-[#00B048] active:scale-90 text-white p-2 rounded-lg transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
            title={t.addToCart}
            aria-label={t.addToCart}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
