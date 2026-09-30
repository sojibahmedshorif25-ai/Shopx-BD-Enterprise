"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  ShieldCheck,
  TrendingDown,
  Truck,
  RotateCcw,
  CheckCircle2,
  Heart,
  ShoppingCart,
  Zap,
  Share2,
  MessageCircle,
  Copy,
  AlertTriangle,
  Play,
  Eye,
  CreditCard,
  Building2,
  Sparkles,
  HelpCircle,
  Plus,
  Minus,
  Check,
} from "lucide-react";
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
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { PriceHistoryModal } from "@/components/PriceHistoryModal";
import { DarazComparisonModal } from "@/components/DarazComparisonModal";
import { OrderTrackingModal } from "@/components/OrderTrackingModal";
import { MobileNav } from "@/components/MobileNav";
import { useBazaarStore } from "@/lib/store";
import { products, districts } from "@/lib/data";
import { formatBDT, toBnNumber, translations } from "@/lib/i18n";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const {
    language,
    addToCart,
    wishlist,
    toggleWishlist,
    selectedDistrict,
    setSelectedDistrict,
    selectedThana,
    setSelectedThana,
    setIsCheckoutOpen,
  } = useBazaarStore();

  const t = translations[language];

  // Find product by slug or default to first product
  const product = products.find((p) => p.slug === slug) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Awesome Navy");
  const [selectedStorage, setSelectedStorage] = useState("128GB");
  const [quantity, setQuantity] = useState(1);
  const [priceHistoryRange, setPriceHistoryRange] = useState<"30d" | "90d" | "all">("90d");
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews" | "qa">("desc");
  const [copiedLink, setCopiedLink] = useState(false);
  const [postcode, setPostcode] = useState("1209");

  // Simulated live viewers via websocket
  const [liveViewers, setLiveViewers] = useState(14);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers((prev) => Math.max(8, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isWishlisted = wishlist.includes(product.id);
  const minPrice = Math.min(...product.priceHistory.map((p) => p.price));
  const isAllTimeLow = product.price <= minPrice;

  // Filter price history based on range
  const filteredHistory =
    priceHistoryRange === "30d"
      ? product.priceHistory.slice(-3)
      : product.priceHistory;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FC]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#FF4500]">
            {language === "bn" ? "হোম" : "Home"}
          </Link>
          <span>/</span>
          <span className="hover:text-[#FF4500] cursor-pointer">
            {language === "bn" ? product.categoryBn : product.category}
          </span>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-xs">
            {language === "bn" ? product.titleBn : product.titleEn}
          </span>
        </div>

        {/* TOP SECTION: 60% Left Gallery, 40% Right Product Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN — 60% (desktop), full-width (mobile) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image with Zoom cue */}
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm group">
              <Image
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.titleEn}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {product.isBazaarMall && (
                  <span className="bg-[#1A1F36] text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00C853]" />
                    BazaarMall
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-[#FF4500] text-white text-xs font-extrabold px-2 py-0.5 rounded shadow-md">
                    -{language === "bn" ? toBnNumber(product.discountPercent) : product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Image Counter (e.g. 1/3) */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full font-price">
                {language === "bn"
                  ? `${toBnNumber(selectedImage + 1)} / ${toBnNumber(product.images.length)}`
                  : `${selectedImage + 1} / ${product.images.length}`}
              </div>
            </div>

            {/* Thumbnail Strip + Video Overlay */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    selectedImage === idx
                      ? "border-[#FF4500] scale-105 shadow-md"
                      : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  {idx === 1 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                      <Play className="w-5 h-5 fill-white text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Social Sharing & Report Link */}
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-600">
                <Share2 className="w-4 h-4 text-gray-500" />
                <span className="font-semibold">
                  {language === "bn" ? "শেয়ার করুন:" : "Share:"}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#00C853]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? (language === "bn" ? "কপি হয়েছে" : "Copied") : (language === "bn" ? "লিংক কপি" : "Copy")}</span>
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(product.titleEn)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button className="text-gray-400 hover:text-red-500 text-[11px] flex items-center gap-1 cursor-pointer">
                <AlertTriangle className="w-3 h-3" />
                <span>{language === "bn" ? "এই তালিকা রিপোর্ট করুন" : "Report listing"}</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN — 40% (desktop), stacked (mobile) */}
          <div className="lg:col-span-5 space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
            {/* Brand + Live Viewers */}
            <div className="flex items-center justify-between text-xs">
              <span className="bg-[#FF4500]/10 text-[#FF4500] font-bold px-2.5 py-0.5 rounded">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5 text-orange-600 font-semibold text-[11px] bg-orange-50 px-2.5 py-1 rounded-full animate-pulse">
                <Eye className="w-3.5 h-3.5" />
                <span>
                  {language === "bn"
                    ? `${toBnNumber(liveViewers)} জন এখন দেখছেন`
                    : `${liveViewers} people viewing now`}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-lg sm:text-xl font-black font-display text-gray-900 leading-snug">
              {language === "bn" ? product.titleBn : product.titleEn}
            </h1>

            {/* Rating & Verified Buyer Count Badge */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                <span>{language === "bn" ? toBnNumber(product.rating) : product.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">
                {language === "bn" ? toBnNumber("1247") : "1,247"} {language === "bn" ? "রিভিউ" : "Reviews"}
              </span>
              <span className="text-gray-300">|</span>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                {language === "bn" ? "ভেরিফাইড পারচেজ: ৮৯২" : "Verified Purchases: 892"}
              </span>
            </div>

            {/* PRICE SECTION */}
            <div className="bg-gradient-to-r from-orange-50/90 to-amber-50/70 p-4 rounded-xl border border-orange-200/80 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black font-price text-[#FF4500]">
                  {formatBDT(product.price, language)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-gray-400 line-through font-price">
                    {formatBDT(product.originalPrice, language)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-[#00C853] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                    -{language === "bn" ? toBnNumber(product.discountPercent) : product.discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-600 font-medium">
                {language === "bn"
                  ? "🔥 গত ৭ দিনে দাম ১৫% কমেছে (সর্বনিম্ন রেকর্ড)"
                  : "🔥 Price dropped 15% in the last 7 days (All-Time Low)"}
              </p>
            </div>

            {/* ★★★ 90-DAY PRICE HISTORY CHART (KEY DARAZ DIFFERENTIATOR) ★★★ */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-[#FF4500]" />
                  <span className="text-xs font-bold text-gray-900">
                    {language === "bn" ? "স্বচ্ছ ৯০ দিনের মূল্য ইতিহাস" : "90-Day Price Tracker"}
                  </span>
                </div>
                {/* Range Toggle */}
                <div className="flex bg-white rounded-lg p-0.5 border border-gray-200 text-[10px] font-bold">
                  {(["30d", "90d", "all"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setPriceHistoryRange(r)}
                      className={`px-2 py-0.5 rounded ${
                        priceHistoryRange === r
                          ? "bg-[#1A1F36] text-white"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Embedded Recharts Graph */}
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      formatter={(val: any) => [formatBDT(Number(val ?? 0), language), "Price"]}
                      contentStyle={{ backgroundColor: "#1A1F36", color: "#fff", borderRadius: "6px", fontSize: "11px" }}
                    />
                    <Line type="monotone" dataKey="price" stroke="#FF4500" strokeWidth={2.5} dot={{ r: 3, fill: "#FF4500" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[10px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853] shrink-0" />
                <span>
                  {language === "bn"
                    ? `সর্বনিম্ন মূল্য: ${formatBDT(minPrice, language)} (কোনো কৃত্রিম ছাড় নেই)`
                    : `Verified lowest rate: ${formatBDT(minPrice, language)} (Zero manipulated strikes)`}
                </span>
              </div>
            </div>

            {/* Variant Selector (Colors & Storage) */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1.5">
                  {language === "bn" ? "কালার:" : "Color:"} <span className="text-[#FF4500]">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {["Awesome Navy", "Ice Blue", "Lilac"].map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        selectedColor === col
                          ? "border-[#FF4500] bg-orange-50 text-[#FF4500] font-bold"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1.5">
                  {language === "bn" ? "স্টোরেজ:" : "Storage:"}
                </label>
                <div className="flex gap-2">
                  {["128GB", "256GB"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStorage(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        selectedStorage === st
                          ? "border-[#FF4500] bg-orange-50 text-[#FF4500] font-bold"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Stepper & Stock Warning */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold font-price text-gray-900">
                  {language === "bn" ? toBnNumber(quantity) : quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-xs font-bold text-[#FF3B3B]">
                {language === "bn"
                  ? `মাত্র ${toBnNumber(product.stock)} টি বাকি আছে!`
                  : `Only ${product.stock} items left in stock!`}
              </span>
            </div>

            {/* Postcode Delivery Estimator */}
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#FF4500]" />
                  <span>{language === "bn" ? "ডেলিভারি এরিয়া চেক" : "Delivery Estimator"}</span>
                </div>
                <span className="text-[#00C853] font-semibold">
                  {selectedDistrict.id === "dhaka" ? "৳৬০ (২৪-৪৮ ঘণ্টা)" : "৳১২০ (২-৩ দিন)"}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="পোস্টকোড (যেমন: 1209)"
                  className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#FF4500] font-price"
                />
                <button className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                  {language === "bn" ? "চেক" : "Check"}
                </button>
              </div>
              <span className="text-[11px] text-gray-600 block">
                {language === "bn"
                  ? "ডেলিভারি পূর্বাভাস: আগামীকালের মধ্যে আপনার দরজায় পৌঁছাবে।"
                  : "Estimated delivery: Reaching your doorstep by tomorrow."}
              </span>
            </div>

            {/* Seller Card */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#1A1F36] text-white flex items-center justify-center font-bold">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{product.seller.name}</h4>
                  <span className="text-[10px] text-gray-500 block">
                    ⭐ {product.seller.rating} | {product.seller.shipOnTime}% on-time | 99% positive
                  </span>
                </div>
              </div>
              <button className="text-xs font-bold text-[#FF4500] hover:underline">
                {language === "bn" ? "স্টোর দেখুন" : "Visit Store"}
              </button>
            </div>

            {/* bKash EMI Calculator */}
            <div className="bg-pink-50/70 border border-pink-200 p-3 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#E2136E]" />
                <span className="font-semibold text-gray-800">
                  {language === "bn"
                    ? `bKash EMI তে মাত্র ${formatBDT(Math.round(product.price / 6), language)}/মাস থেকে`
                    : `bKash 0% EMI starting at ${formatBDT(Math.round(product.price / 6), language)}/month`}
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#E2136E] bg-white px-2 py-0.5 rounded border border-pink-200">
                0% Interest
              </span>
            </div>

            {/* Desktop CTA Action Buttons */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border-2 transition-colors cursor-pointer ${
                  isWishlisted
                    ? "border-[#FF3B3B] bg-red-50 text-[#FF3B3B]"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-[#1A1F36] hover:bg-[#121626] text-white py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t.addToCart}</span>
              </button>

              <button
                onClick={() => {
                  addToCart(product, quantity);
                  setIsCheckoutOpen(true);
                }}
                className="flex-1 bg-[#FF4500] hover:bg-[#E03D00] text-white py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF4500]/30 active:scale-95 transition-transform cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>{t.buyNow}</span>
              </button>
            </div>
          </div>
        </div>

        {/* BELOW THE FOLD: TABS (Description | Specifications | Reviews | Q&A) */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Tabs Bar */}
          <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
            {[
              { id: "desc", nameBn: "বিবরণ (Description)", nameEn: "Description" },
              { id: "specs", nameBn: "স্পেসিফিকেশন", nameEn: "Specifications" },
              { id: "reviews", nameBn: "ক্রেতাদের রিভিউ (Reviews)", nameEn: "Customer Reviews" },
              { id: "qa", nameBn: "প্রশ্নোত্তর (Q&A)", nameEn: "Questions & Answers" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#FF4500] text-[#FF4500] bg-white"
                    : "border-transparent text-gray-600 hover:text-black"
                }`}
              >
                {language === "bn" ? tab.nameBn : tab.nameEn}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "desc" && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <p>{language === "bn" ? product.descriptionBn : product.descriptionEn}</p>
                <h4 className="font-bold text-gray-900 pt-2">{t.highlights}:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(language === "bn" ? product.keyFeaturesBn : product.keyFeaturesEn).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="flex justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="font-bold text-gray-600">{k}</span>
                    <span className="text-gray-900 font-medium">{v}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* AI Review Summary Box */}
                <div className="bg-purple-50/70 border border-purple-200 p-4 rounded-xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-purple-900 block">
                      {language === "bn" ? "AI জেনারেটেড রিভিউ সামারি" : "AI Review Insights Summary"}
                    </span>
                    <p className="text-purple-800 leading-relaxed">
                      {language === "bn"
                        ? "বেশিরভাগ ক্রেতা বলেছেন: দ্রুত ২৪ ঘণ্টার ডেলিভারি, নিখুঁত ক্যামেরা পারফরম্যান্স এবং ১০০% জেনুইন প্যাকেজিং। কোনো ধরনের হিডেন চার্জ পাওয়া যায়নি।"
                        : "Verified buyers highlight ultra-fast 24h doorstep delivery, original manufacturer seal, and zero surprise fees."}
                    </p>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-3">
                  {product.reviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-gray-900">{r.author}</span>
                          <span className="text-[10px] text-gray-500 block">{r.district} • {r.date}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(r.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-700">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "qa" && (
              <div className="space-y-4 text-xs">
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-900 font-medium">
                  {language === "bn"
                    ? "সেলার গ্যারান্টি: যেকোনো প্রশ্নের উত্তর ২৪ ঘণ্টার মধ্যে দেওয়া বাধ্যতামূলক।"
                    : "Seller SLA Guarantee: Responses guaranteed within 24 hours."}
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                  <div className="font-bold text-gray-900">
                    Q: এই প্রোডাক্টে কি অফিশিয়াল স্যামসাং বাংলাদেশ ১ বছরের ওয়ারেন্টি আছে?
                  </div>
                  <div className="text-gray-700 pl-4 border-l-2 border-[#00C853]">
                    <span className="font-bold text-[#00C853]">Ans (সেলার):</span> জ্বী, শতভাগ অফিসিয়াল ওয়ারেন্টি কার্ড ও ভ্যাট চালান সহ ডেলিভারি হবে।
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold font-display text-gray-900">
            {language === "bn" ? "একসাথে কিনুন এবং সাশ্রয় করুন (Bundle Deal)" : "Frequently Bought Together"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-3 flex flex-wrap items-center gap-3">
              <div className="p-2 border border-gray-200 rounded-xl bg-gray-50 text-center w-36">
                <span className="text-[10px] text-gray-500 block">মূল পণ্য</span>
                <span className="text-xs font-bold font-price text-[#FF4500]">{formatBDT(product.price, language)}</span>
              </div>
              <span className="font-bold text-gray-400">+</span>
              <div className="p-2 border border-gray-200 rounded-xl bg-gray-50 text-center w-36">
                <span className="text-[10px] text-gray-500 block">25W Fast Charger</span>
                <span className="text-xs font-bold font-price text-gray-800">৳ ১,৪৫০</span>
              </div>
              <span className="font-bold text-gray-400">+</span>
              <div className="p-2 border border-gray-200 rounded-xl bg-gray-50 text-center w-36">
                <span className="text-[10px] text-gray-500 block">Tempered Glass</span>
                <span className="text-xs font-bold font-price text-gray-800">৳ ৩৫০</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-gray-500 block">কম্বাইন্ড প্রাইস</span>
              <span className="text-lg font-black font-price text-[#FF4500] block mb-2">
                {formatBDT(product.price + 1800, language)}
              </span>
              <button
                onClick={() => addToCart(product, 1)}
                className="w-full bg-[#00C853] hover:bg-[#00B048] text-white py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                {language === "bn" ? "সবগুলো একসাথে যোগ করুন" : "Add All 3 to Cart"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* STICKY BOTTOM BAR ON MOBILE (CRO Standard) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 p-3 flex items-center gap-2 z-40 shadow-xl">
        <button
          onClick={() => toggleWishlist(product.id)}
          className="p-2.5 rounded-xl border border-gray-300 text-gray-700"
          aria-label="Wishlist"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-[#FF3B3B] text-[#FF3B3B]" : ""}`} />
        </button>

        <button
          onClick={() => addToCart(product, quantity)}
          className="flex-1 bg-[#1A1F36] text-white py-2.5 rounded-xl font-bold text-xs"
        >
          {t.addToCart}
        </button>

        <button
          onClick={() => {
            addToCart(product, quantity);
            setIsCheckoutOpen(true);
          }}
          className="flex-1 bg-[#FF4500] text-white py-2.5 rounded-xl font-bold text-xs"
        >
          {t.buyNow}
        </button>
      </div>

      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <PriceHistoryModal />
      <DarazComparisonModal />
      <OrderTrackingModal />
    </div>
  );
}
