"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Star } from "lucide-react";
import { verifiedBrands } from "@/lib/data";
import { useBazaarStore } from "@/lib/store";
import { toBnNumber } from "@/lib/i18n";

export const BrandRow: React.FC = () => {
  const { language, setSelectedCategory } = useBazaarStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-display text-gray-900">
            {language === "bn" ? "অফিসিয়াল ব্র্যান্ড স্টোর" : "Official Verified Brand Stores"}
          </h2>
          <p className="text-[11px] text-gray-500">
            {language === "bn" ? "১০০% অফিসিয়াল ওয়ারেন্টি ও আসল পণ্যের নিশ্চয়তা" : "Direct brand warranty & 100% authentic inventory"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {verifiedBrands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => setSelectedCategory("electronics")}
            className="group bg-white p-3.5 rounded-xl border border-gray-200 hover:border-[#FF4500]/60 hover:shadow-md transition-all flex flex-col items-center text-center cursor-pointer"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-100 mb-2 group-hover:scale-105 transition-transform bg-gray-50">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="font-bold text-xs text-gray-900 line-clamp-1">{brand.name}</h3>
            <span className="text-[10px] text-gray-500 line-clamp-1">{brand.tagline}</span>

            <div className="mt-2 inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-[#00C853]" />
              <span>{language === "bn" ? "যাচাইকৃত ব্র্যান্ড" : "Verified Brand"}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
