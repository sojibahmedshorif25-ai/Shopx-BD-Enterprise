"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  Layers,
  DollarSign,
  Package,
  Wand2,
} from "lucide-react";

export default function NewProductPage() {
  const [titleEn, setTitleEn] = useState("OnePlus Nord CE4 5G");
  const [titleBn, setTitleBn] = useState("ওয়ানপ্লাস নর্ড CE4 5G (৮জিবি/১২৮জিবি)");
  const [category, setCategory] = useState("electronics");
  const [price, setPrice] = useState("32999");
  const [comparePrice, setComparePrice] = useState("36999");
  const [costPrice, setCostPrice] = useState("29000");
  const [sku, setSku] = useState("ONEPLUS-CE4-128");
  const [stock, setStock] = useState("40");

  const [descriptionBn, setDescriptionBn] = useState(
    "ওয়ানপ্লাস নর্ড CE4 5G-তে রয়েছে স্ন্যাপড্রাগন 7 Gen 3 প্রসেসর, ১০০ ওয়াট সুপারভুক ফাস্ট চার্জিং এবং ৫০ মেগাপিক্সেল সনি LYT-600 OIS ক্যামেরা।"
  );
  const [descriptionEn, setDescriptionEn] = useState(
    "OnePlus Nord CE4 5G powered by Qualcomm Snapdragon 7 Gen 3, 100W SUPERVOOC fast charge, and 50MP Sony LYT-600 OIS camera."
  );
  const [bulletFeatures, setBulletFeatures] = useState([
    "Qualcomm Snapdragon 7 Gen 3 (4nm) Processor",
    "100W SUPERVOOC Flash Charge (1-100% in 29 mins)",
    "50MP Sony LYT-600 Camera with OIS",
    "120Hz Fluid AMOLED Display with Aqua Touch",
  ]);

  const [aiGenerating, setAiGenerating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Trigger AI assistant generator
  const handleGenerateAI = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setTitleBn(`${titleEn} (অফিসিয়াল বিডি ওয়ারেন্টি)`);
      setDescriptionBn(
        `প্রিমিয়াম ডিজাইনের ${titleEn}। এতে রয়েছে সর্বাধুনিক চিপসেট, দীর্ঘস্থায়ী ব্যাটারি ব্যাকআপ, সুপার-ফাস্ট চার্জিং এবং ১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি। দারাজের চেয়ে সেরা মূল্যে কিনুন।`
      );
      setDescriptionEn(
        `Experience flagship performance with the ${titleEn}. Built with aerospace-grade durability, high-refresh AMOLED screen, and official 1-year manufacturer warranty.`
      );
      setBulletFeatures([
        "High Performance Octa-Core Chipset",
        "Super Fast Charging with All-day Battery Life",
        "Ultra-Clear HDR Camera with Optical Image Stabilization",
        "1 Year Official Bangladesh Manufacturer Warranty",
      ]);
      setAiGenerating(false);
    }, 1000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/seller"
            className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সেলার ড্যাশবোর্ডে ফিরুন</span>
          </Link>

          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
            সেলার সেন্টার ২.০ (AI Assisted)
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Main Title & AI Helper Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold font-display text-gray-900">
                ১. প্রোডাক্টের নাম ও বিবরণ
              </h2>

              {/* ★★★ AI ASSISTANT BUTTON ★★★ */}
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={aiGenerating}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-500/20 active:scale-95 transition-transform cursor-pointer"
              >
                <Wand2 className={`w-4 h-4 ${aiGenerating ? "animate-spin" : ""}`} />
                <span>{aiGenerating ? "AI বিবরণ লিখছে..." : "AI দিয়ে বিবরণ তৈরি করুন"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  প্রোডাক্টের নাম (English Title):
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  বাংলা নাম (Bengali Title):
                </label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 block mb-1">
                  বাংলা বিবরণ (Bengali Description):
                </label>
                <textarea
                  rows={3}
                  value={descriptionBn}
                  onChange={(e) => setDescriptionBn(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 block mb-1">
                  ইংরেজি বিবরণ (English Description):
                </label>
                <textarea
                  rows={3}
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500]"
                />
              </div>
            </div>

            {/* AI Generated Bullet Points */}
            <div className="space-y-2 pt-2">
              <label className="font-bold text-xs text-gray-700 block">
                মূল বৈশিষ্ট্যসমূহ (Bullet Highlights):
              </label>
              {bulletFeatures.map((feat, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => {
                      const updated = [...bulletFeatures];
                      updated[idx] = e.target.value;
                      setBulletFeatures(updated);
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setBulletFeatures(bulletFeatures.filter((_, i) => i !== idx))}
                    className="text-gray-400 hover:text-red-500 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setBulletFeatures([...bulletFeatures, "New feature"])}
                className="text-xs font-bold text-[#FF4500] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>আরেকটি পয়েন্ট যোগ করুন</span>
              </button>
            </div>
          </div>

          {/* Pricing, Cost & SKU */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold font-display text-gray-900 border-b border-gray-100 pb-3">
              ২. মূল্য, খরচ ও ইনভেন্টরি
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">বিক্রয় মূল্য (৳):</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500] font-price font-bold text-[#FF4500]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">পূর্বের মূল্য (৳):</label>
                <input
                  type="number"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500] font-price"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">ক্রয় খরচ (৳ Cost):</label>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500] font-price"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">স্টক পরিমাণ (Stock):</label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500] font-price font-bold"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Mockup Zone */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold font-display text-gray-900 border-b border-gray-100 pb-3">
              ৩. প্রোডাক্টের ছবি আপলোড (Cloudinary / WebP)
            </h2>

            <div className="border-2 border-dashed border-gray-300 hover:border-[#FF4500] rounded-2xl p-8 text-center space-y-3 cursor-pointer bg-gray-50/50">
              <Upload className="w-10 h-10 text-gray-400 mx-auto" />
              <div>
                <span className="text-xs font-bold text-gray-800 block">
                  ছবি ড্র্যাগ করে আনুন অথবা ফাইল ব্রাউজ করুন
                </span>
                <span className="text-[11px] text-gray-500">
                  PNG, JPG, WebP সর্বোচ্চ 5MB (স্বয়ংক্রিয় WebP কনভার্ট হবে)
                </span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            {savedSuccess && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
                <span>প্রোডাক্টটি সফলভাবে সেভ ও পাবলিশ করা হয়েছে!</span>
              </div>
            )}

            <div className="ml-auto flex gap-3">
              <Link
                href="/seller"
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100"
              >
                বাতিল করুন
              </Link>
              <button
                type="submit"
                className="bg-[#00C853] hover:bg-[#00B048] text-white px-7 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>প্রোডাক্ট পাবলিশ করুন</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
