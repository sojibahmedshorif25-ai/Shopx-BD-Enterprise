"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  X,
  CreditCard,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  ArrowRight,
  Wallet,
  Sparkles,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { formatBDT, toBnNumber, translations } from "@/lib/i18n";
import { districts } from "@/lib/data";

export const CheckoutModal: React.FC = () => {
  const {
    language,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    selectedDistrict,
    selectedThana,
    setIsOrderTrackingOpen,
  } = useBazaarStore();

  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket" | "card" | "cod">("bkash");
  const [customerName, setCustomerName] = useState("Rahim Uddin");
  const [customerPhone, setCustomerPhone] = useState("01712345678");
  const [customerAddress, setCustomerAddress] = useState("House 12, Road 5, Block B");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  if (!isCheckoutOpen) return null;

  const t = translations[language];
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 999;
  const isDhaka = selectedDistrict.id === "dhaka";
  const shippingFee = cart.length === 0 ? 0 : isFreeDelivery ? 0 : isDhaka ? 60 : 120;
  const grandTotal = subtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrackingId = `BX-BD-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingNumber(newTrackingId);
    setOrderPlaced(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1A1F36] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#00C853]" />
            <h2 className="text-base font-bold font-display">
              {orderPlaced
                ? (language === "bn" ? "অর্ডার সম্পন্ন হয়েছে" : "Order Completed")
                : (language === "bn" ? "নিরাপদ চেকআউট ও পেমেন্ট" : "Secure Checkout & Payment")}
            </h2>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setOrderPlaced(false);
            }}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {orderPlaced ? (
            /* Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00C853] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold font-display text-gray-900">
                  {t.orderSuccess}
                </h3>
                <p className="text-xs text-gray-600">
                  {language === "bn"
                    ? `আপনার কনফার্মেশন SMS পাঠানো হয়েছে ${customerPhone} নম্বরে।`
                    : `Order confirmation SMS sent to ${customerPhone}.`}
                </p>
              </div>

              {/* Tracking ID Badge */}
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl max-w-sm mx-auto">
                <span className="text-xs text-gray-500 block mb-1">{t.trackingId}</span>
                <span className="text-lg font-black font-price text-[#FF4500] tracking-wider">
                  {trackingNumber}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setOrderPlaced(false);
                    setIsOrderTrackingOpen(true);
                  }}
                  className="bg-[#FF4500] hover:bg-[#E03D00] text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>{t.trackNow}</span>
                </button>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setOrderPlaced(false);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  {t.startShopping}
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Shipping Address */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#FF4500]" />
                  <span>{language === "bn" ? "ডেলিভারি ঠিকানা" : "Delivery Address"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-gray-600 block mb-1 font-medium">
                      {language === "bn" ? "আপনার নাম:" : "Full Name:"}
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500]"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600 block mb-1 font-medium">
                      {language === "bn" ? "মোবাইল নম্বর (OTP ও SMS):" : "Mobile Phone (For OTP/SMS):"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500] font-price"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-gray-600 block mb-1 font-medium">
                      {language === "bn"
                        ? `বিস্তারিত ঠিকানা (${selectedThana}, ${selectedDistrict.nameBn}):`
                        : `Street Address (${selectedThana}, ${selectedDistrict.nameEn}):`}
                    </label>
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4500]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector (Bangladeshi Gateways) */}
              <div className="space-y-3 border-t border-gray-200 pt-5">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-[#00C853]" />
                  <span>{t.selectPayment}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* bKash */}
                  <label
                    onClick={() => setPaymentMethod("bkash")}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "bkash"
                        ? "border-[#E2136E] bg-pink-50/50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "bkash"}
                      onChange={() => setPaymentMethod("bkash")}
                      className="mt-1 text-[#E2136E]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#E2136E]">bKash Direct</span>
                        <span className="bg-[#E2136E] text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                          1% Cashback
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-500 block mt-0.5">
                        {language === "bn" ? "বিকাশ অ্যাপে সরাসরি পেমেন্ট" : "Instant direct app authorization"}
                      </span>
                    </div>
                  </label>

                  {/* Nagad */}
                  <label
                    onClick={() => setPaymentMethod("nagad")}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "nagad"
                        ? "border-[#F7921E] bg-orange-50/50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "nagad"}
                      onChange={() => setPaymentMethod("nagad")}
                      className="mt-1 text-[#F7921E]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#F7921E]">Nagad Pay</span>
                      <span className="text-[11px] text-gray-500 block mt-0.5">
                        {language === "bn" ? "নগদ পেমেন্ট গেটওয়ে" : "Fast & zero additional charge"}
                      </span>
                    </div>
                  </label>

                  {/* ShurjoPay / Cards */}
                  <label
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-blue-600 bg-blue-50/50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mt-1 text-blue-600"
                    />
                    <div>
                      <span className="font-bold text-xs text-blue-800">ShurjoPay / Cards</span>
                      <span className="text-[11px] text-gray-500 block mt-0.5">
                        Visa, MasterCard, Amex, Nexus
                      </span>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-[#00C853] bg-emerald-50/50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 text-[#00C853]"
                    />
                    <div>
                      <span className="font-bold text-xs text-gray-900">{t.cashOnDelivery}</span>
                      <span className="text-[11px] text-gray-500 block mt-0.5">
                        {language === "bn" ? "ডেলিভারি ম্যানের সামনে পণ্য দেখে মূল্য পরিশোধ" : "Pay cash after physical verification"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Price Breakdown Footer */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>{t.subtotal}</span>
                  <span className="font-price font-bold text-gray-900">{formatBDT(subtotal, language)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t.deliveryFee}</span>
                  <span className="font-price font-bold text-gray-900">
                    {shippingFee === 0 ? <span className="text-[#00C853]">FREE</span> : formatBDT(shippingFee, language)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-sm text-gray-900">
                  <span>{t.grandTotal}</span>
                  <span className="font-price text-[#FF4500] text-base">
                    {formatBDT(grandTotal, language)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00C853] hover:bg-[#00B048] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
              >
                <span>{t.placeOrder}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
