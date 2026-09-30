"use client";

import React from "react";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FlashDeals } from "@/components/FlashDeals";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { AIRecommendations } from "@/components/home/AIRecommendations";
import { BrandRow } from "@/components/home/BrandRow";
import { TrustStrip } from "@/components/home/TrustStrip";
import { AppDownloadNewsletter } from "@/components/home/AppDownloadNewsletter";
import { ProductCard } from "@/components/ProductCard";
import { PriceHistoryModal } from "@/components/PriceHistoryModal";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { DarazComparisonModal } from "@/components/DarazComparisonModal";
import { OrderTrackingModal } from "@/components/OrderTrackingModal";
import { SellerBanner } from "@/components/SellerBanner";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { useBazaarStore } from "@/lib/store";
import { products } from "@/lib/data";
import { Sparkles, PackageOpen } from "lucide-react";
import { translations } from "@/lib/i18n";

export default function Home() {
  const { language, searchQuery, selectedCategory, setSelectedCategory } =
    useBazaarStore();
  const t = translations[language];

  // Filtering products based on category and search query
  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === "all" || prod.category === selectedCategory;

    const matchesSearch =
      searchQuery.trim() === "" ||
      prod.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.titleBn.includes(searchQuery) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F8FC] antialiased">
      {/* 1. STICKY NAVBAR & CATEGORY STRIP */}
      <Header />
      <CategoryNav />

      {/* When browsing homepage without filters */}
      {selectedCategory === "all" && searchQuery === "" ? (
        <>
          {/* 2. HERO CAROUSEL (16:6 desktop, 3:2 mobile, WCAG manual) */}
          <HeroCarousel />

          {/* 3. FLASH SALE BAR with Live Red Timer */}
          <FlashDeals />

          {/* 4. 12-CATEGORY GRID (6x2 desktop, 4x3 mobile) */}
          <CategoryGrid />

          {/* 5. AI RECOMMENDATION ROW with Skeleton Loaders */}
          <AIRecommendations />

          {/* 6. VERIFIED BRAND STOREFRONTS */}
          <BrandRow />

          {/* 7. TRUST STRIP (4 Pillars) */}
          <TrustStrip />

          {/* 8. SELLER PORTAL PROMO & APP DOWNLOAD NEWSLETTER */}
          <SellerBanner />
          <AppDownloadNewsletter />
        </>
      ) : (
        /* Filtered Catalog View */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF4500]/10 flex items-center justify-center text-[#FF4500]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-black font-display text-gray-900">
                  {language === "bn" ? "বাছাইকৃত পণ্যসমূহ" : "Filtered Catalog"}
                </h2>
                <p className="text-xs text-gray-500">
                  {language === "bn"
                    ? "১০০% যাচাইকৃত ও ৯০ দিনের স্বচ্ছ প্রাইস ট্র্যাকিং যুক্ত"
                    : "Verified items with trade-licensed sellers"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCategory("all")}
              className="text-xs font-semibold text-[#FF4500] hover:underline cursor-pointer"
            >
              {language === "bn" ? "সকল ক্যাটাগরি ও অফার দেখুন" : "Show All Offers"}
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3">
              <PackageOpen className="w-16 h-16 text-gray-300 mx-auto" />
              <h3 className="text-base font-bold text-gray-800">
                {language === "bn"
                  ? "কোনো পণ্য খুঁজে পাওয়া যায়নি"
                  : "No matching products found"}
              </h3>
              <button
                onClick={() => setSelectedCategory("all")}
                className="bg-[#FF4500] text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                {language === "bn" ? "রিসেট ফিল্টার" : "Reset Filters"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* FOOTER */}
      <Footer />

      {/* MOBILE PWA NAVIGATION BAR */}
      <MobileNav />

      {/* GLOBAL MODALS */}
      <PriceHistoryModal />
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <DarazComparisonModal />
      <OrderTrackingModal />
    </main>
  );
}
