"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { useBazaarStore } from "@/lib/store";

export const AIRecommendations: React.FC = () => {
  const { language } = useBazaarStore();
  const [loading, setLoading] = useState(true);

  // Simulate TanStack Query 5min stale time fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00C853]/10 flex items-center justify-center text-[#00C853]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-gray-900 flex items-center gap-1.5">
              <span>{language === "bn" ? "আপনার জন্য বাছাই করা" : "AI Picked For You"}</span>
              <span className="text-xs text-amber-500">✨</span>
            </h2>
            <p className="text-[11px] text-gray-500">
              {language === "bn" ? "আপনার সাম্প্রতিক ব্রাউজিং ও শীর্ষ বিক্রির উপর ভিত্তি করে" : "Personalized smart recommendation"}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        /* Skeleton Loaders (No spinners per requirements) */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 space-y-3">
              <div className="w-full aspect-square rounded-lg skeleton-shimmer" />
              <div className="h-4 w-3/4 rounded skeleton-shimmer" />
              <div className="h-3 w-1/2 rounded skeleton-shimmer" />
              <div className="h-5 w-2/3 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.slice(0, 5).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </section>
  );
};
