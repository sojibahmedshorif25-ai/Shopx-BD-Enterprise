"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Lock,
  Truck,
  CreditCard,
  Wallet,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Tag,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { formatBDT, toBnNumber, translations } from "@/lib/i18n";
import { districts } from "@/lib/data";

export default function CheckoutPage() {
  const { language, cart, clearCart, selectedDistrict, selectedThana } = useBazaarStore();
  const t = translations[language];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [deliverySpeed, setDeliverySpeed] = useState<"today" | "tomorrow" | "standard">("tomorrow");

  // Step 1: Address Details
  const [name, setName] = useState("Rahim Uddin");
  const [phone, setPhone] = useState("01712345678");
  const [address, setAddress] = useState("House 24, Road 7, Sector 3, Uttara");
  const [districtId, setDistrictId] = useState("dhaka");
  const [thana, setThana] = useState("Uttara");

  // Step 2: Payment Details
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket" | "card" | "cod">("bkash");
  const [cardNumber, setCardNumber] = useState("4321 •••• •••• 8842");
  const [cardHolder, setCardHolder] = useState("RAHIM UDDIN");
  const [useWallet, setUseWallet] = useState(false);
  const [coupon, setCoupon] = useState("BAZAARX100");
  const [couponApplied, setCouponApplied] = useState(true);

  // Step 3: Success state
  const [orderComplete, setOrderComplete] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 999;
  const baseShipping = districtId === "dhaka" ? 60 : 120;
  const speedSurcharge = deliverySpeed === "today" ? 30 : 0;
  const shippingFee = isFreeDelivery ? speedSurcharge : baseShipping + speedSurcharge;
  const discount = couponApplied ? 100 : 0;
  const vatAmount = Math.round(subtotal * 0.05); // 5% VAT
  const walletDeduction = useWallet ? Math.min(250, subtotal) : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee + vatAmount - discount - walletDeduction);

  const handlePlaceOrder = () => {
    const id = `BX-BD-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingId(id);
    setOrderComplete(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    clearCart();
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#FF4500] text-white flex items-center justify-center font-extrabold text-lg">
              BX
            </div>
            <span className="text-xl font-black text-[#1A1F36]">
              Bazaar<span className="text-[#FF4500]">X</span> Checkout
            </span>
          </Link>
          <div className="flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
            <Lock className="w-3.5 h-3.5 text-[#00C853]" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* 3-Step Progress Stepper */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#FF4500]" : "text-gray-400"}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-[#FF4500] text-white" : "bg-gray-100"}`}>
                1
              </span>
              <span>{language === "bn" ? "ডেলিভারি ঠিকানা" : "1. Address"}</span>
            </div>
            <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? "bg-[#FF4500]" : "bg-gray-200"}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#FF4500]" : "text-gray-400"}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-[#FF4500] text-white" : "bg-gray-100"}`}>
                2
              </span>
              <span>{language === "bn" ? "পেমেন্ট মাধ্যম" : "2. Payment"}</span>
            </div>
            <div className={`flex-1 h-0.5 mx-3 ${step === 3 ? "bg-[#FF4500]" : "bg-gray-200"}`} />
            <div className={`flex items-center gap-2 ${step === 3 ? "text-[#FF4500]" : "text-gray-400"}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? "bg-[#FF4500] text-white" : "bg-gray-100"}`}>
                3
              </span>
              <span>{language === "bn" ? "রিভিউ ও কনফার্ম" : "3. Review"}</span>
            </div>
          </div>
        </div>

        {orderComplete ? (
          /* Success Screen */
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00C853] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black font-display text-gray-900">
                {t.orderSuccess}
              </h2>
              <p className="text-xs text-gray-600">
                {language === "bn"
                  ? `আপনার কনফার্মেশন কোড পাঠানো হয়েছে ${phone} নম্বরে।`
                  : `Confirmation SMS dispatched to ${phone}.`}
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl max-w-sm mx-auto">
              <span className="text-xs text-gray-500 block mb-1">{t.trackingId}</span>
              <span className="text-xl font-black font-price text-[#FF4500] tracking-wider">
                {trackingId}
              </span>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <Link
                href="/"
                className="bg-[#1A1F36] text-white px-6 py-2.5 rounded-xl font-bold text-xs"
              >
                {t.startShopping}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Step Body */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              {/* STEP 1: Address */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold font-display text-gray-900">
                    {language === "bn" ? "ডেলিভারি ঠিকানা ও সময় নির্ধারণ" : "Delivery Address & Schedule"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-gray-600 block mb-1 font-medium">পুরো নাম:</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500]"
                      />
                    </div>

                    <div>
                      <label className="text-gray-600 block mb-1 font-medium">ফোন নম্বর:</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500] font-price"
                      />
                    </div>

                    <div>
                      <label className="text-gray-600 block mb-1 font-medium">জেলা:</label>
                      <select
                        value={districtId}
                        onChange={(e) => setDistrictId(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500] bg-white font-semibold"
                      >
                        {districts.map((d) => (
                          <option key={d.id} value={d.id}>
                            {language === "bn" ? d.nameBn : d.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-gray-600 block mb-1 font-medium">থানা / উপজেলা:</label>
                      <input
                        type="text"
                        value={thana}
                        onChange={(e) => setThana(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-gray-600 block mb-1 font-medium">রাস্তার ঠিকানা / বাসা নম্বর:</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500]"
                      />
                    </div>
                  </div>

                  {/* Delivery Speed Picker */}
                  <div className="pt-2 space-y-2">
                    <label className="text-xs font-bold text-gray-800 block">
                      {language === "bn" ? "ডেলিভারি সময়সীমা:" : "Delivery Speed:"}
                    </label>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <label
                        onClick={() => setDeliverySpeed("today")}
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          deliverySpeed === "today"
                            ? "border-[#FF4500] bg-orange-50 font-bold text-[#FF4500]"
                            : "border-gray-200 text-gray-700"
                        }`}
                      >
                        <span>⚡ আজকেই ডেলিভারি (+৳৩০)</span>
                        <span className="text-[10px] text-gray-500 block font-normal">ঢাকা সিটিতে ৬ ঘণ্টার মধ্যে</span>
                      </label>

                      <label
                        onClick={() => setDeliverySpeed("tomorrow")}
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          deliverySpeed === "tomorrow"
                            ? "border-[#00C853] bg-emerald-50 font-bold text-[#00C853]"
                            : "border-gray-200 text-gray-700"
                        }`}
                      >
                        <span>🚚 নিয়মিত ডেলিভারি (আগামীকাল)</span>
                        <span className="text-[10px] text-gray-500 block font-normal">স্ট্যান্ডার্ড ২৪-৪৮ ঘণ্টা</span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-[#FF4500] hover:bg-[#E03D00] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>{language === "bn" ? "পরবর্তী ধাপ: পেমেন্ট নির্বাচন করুন" : "Continue to Payment"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: Payment */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold font-display text-gray-900">
                    {language === "bn" ? "পেমেন্ট মাধ্যম নির্বাচন" : "Select Payment Gateway"}
                  </h3>

                  {/* BazaarX Wallet Toggle */}
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-[#00C853]" />
                      <span className="font-semibold text-emerald-900">
                        BazaarX Wallet Balance: ৳ ২৫০
                      </span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useWallet}
                        onChange={(e) => setUseWallet(e.target.checked)}
                        className="rounded text-[#00C853]"
                      />
                      <span className="font-bold text-xs">ব্যবহার করুন</span>
                    </label>
                  </div>

                  {/* Gateways */}
                  <div className="space-y-2.5">
                    {/* bKash (Primary) */}
                    <div
                      onClick={() => setPaymentMethod("bkash")}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        paymentMethod === "bkash"
                          ? "border-[#E2136E] bg-pink-50/70 shadow-sm"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#E2136E]">bKash Direct Payment</span>
                        <span className="bg-[#E2136E] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                          1% Instant Cashback
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        বিকাশ অ্যাপে সরাসরি অথোরাইজেশন ও রিফান্ড সুবিধা
                      </p>
                    </div>

                    {/* Nagad */}
                    <div
                      onClick={() => setPaymentMethod("nagad")}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        paymentMethod === "nagad"
                          ? "border-[#F7921E] bg-orange-50/70 shadow-sm"
                          : "border-gray-200"
                      }`}
                    >
                      <span className="font-bold text-xs text-[#F7921E]">Nagad Payment Gateway</span>
                      <p className="text-[11px] text-gray-500 mt-1">নগদ একাউন্ট থেকে তাৎক্ষণিক পেমেন্ট</p>
                    </div>

                    {/* Card Preview */}
                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-blue-600 bg-blue-50/70 shadow-sm"
                          : "border-gray-200"
                      }`}
                    >
                      <span className="font-bold text-xs text-blue-800">ShurjoPay / Cards (Visa/Mastercard/Amex)</span>
                      <p className="text-[11px] text-gray-500 mt-1">Saved card: {cardNumber}</p>
                    </div>

                    {/* Cash on Delivery */}
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        paymentMethod === "cod"
                          ? "border-[#00C853] bg-emerald-50/70 shadow-sm"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-gray-900">ক্যাশ অন ডেলিভারি (COD)</span>
                        <span className="text-[10px] text-gray-500">৳২০ সার্ভিস চার্জ অন্তর্ভুক্ত</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করুন</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-3 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100"
                    >
                      পূর্ববর্তী
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-[#FF4500] hover:bg-[#E03D00] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>{language === "bn" ? "পরবর্তী ধাপ: অর্ডার রিভিউ" : "Review Order"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Review & Confirm */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-base font-bold font-display text-gray-900">
                    {language === "bn" ? "অর্ডার সারাংশ ও চূড়ান্ত নিশ্চিতকরণ" : "Order Review & Confirmation"}
                  </h3>

                  {/* Summary Box */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div>
                        <span className="font-bold text-gray-800 block">ডেলিভারি ঠিকানা:</span>
                        <span className="text-gray-600">{name} ({phone}), {address}, {thana}, {districtId}</span>
                      </div>
                      <button onClick={() => setStep(1)} className="text-[#FF4500] font-bold hover:underline">
                        সম্পাদনা
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-gray-800 block">পেমেন্ট মাধ্যম:</span>
                        <span className="text-gray-600 uppercase font-semibold">{paymentMethod}</span>
                      </div>
                      <button onClick={() => setStep(2)} className="text-[#FF4500] font-bold hover:underline">
                        পরিবর্তন
                      </button>
                    </div>
                  </div>

                  {/* Items Mini List */}
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-xs">
                        <span className="font-semibold text-gray-800 truncate max-w-xs">{item.product.titleEn} (x{item.quantity})</span>
                        <span className="font-price font-bold text-[#FF4500]">{formatBDT(item.product.price * item.quantity, language)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="px-4 py-3 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100"
                    >
                      পূর্ববর্তী
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-[#00C853] hover:bg-[#00B048] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-transform cursor-pointer"
                    >
                      <span>{t.placeOrder} ({formatBDT(grandTotal, language)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Transparent Price Breakdown (Zero Hidden Fees) */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00C853]" />
                <span>স্বচ্ছ মূল্য তালিকা (No Hidden Fees)</span>
              </h3>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>পণ্য মূল্য:</span>
                  <span className="font-price font-bold text-gray-900">{formatBDT(subtotal, language)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি ফি:</span>
                  <span className="font-price font-bold text-gray-900">
                    {shippingFee === 0 ? <span className="text-[#00C853]">FREE</span> : formatBDT(shippingFee, language)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ভ্যাট (৫% সরকারি নিয়ম):</span>
                  <span className="font-price font-bold text-gray-900">{formatBDT(vatAmount, language)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#00C853] font-bold">
                    <span>ভাউচার ছাড়:</span>
                    <span className="font-price">-{formatBDT(discount, language)}</span>
                  </div>
                )}
                {walletDeduction > 0 && (
                  <div className="flex justify-between text-purple-600 font-bold">
                    <span>ওয়ালেট সমন্বয়:</span>
                    <span className="font-price">-{formatBDT(walletDeduction, language)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-sm text-gray-900">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span className="font-price text-[#FF4500] text-base">
                    {formatBDT(grandTotal, language)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
