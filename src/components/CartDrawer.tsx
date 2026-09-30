"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { useBazaarStore } from "@/lib/store";
import { formatBDT, toBnNumber, translations } from "@/lib/i18n";

export const CartDrawer: React.FC = () => {
  const {
    language,
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    selectedDistrict,
    setIsCheckoutOpen,
  } = useBazaarStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  if (!isCartOpen) return null;

  const t = translations[language];
  const FREE_SHIPPING_THRESHOLD = 999;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const isFreeDelivery = subtotal >= FREE_SHIPPING_THRESHOLD;
  const isDhaka = selectedDistrict.id === "dhaka";
  const standardShippingFee = isDhaka ? 60 : 120;
  const shippingFee = cart.length === 0 ? 0 : isFreeDelivery ? 0 : standardShippingFee;
  const grandTotal = Math.max(0, subtotal + shippingFee - couponDiscount);

  const freeDeliveryProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "BAZAARX100" || couponCode.toUpperCase() === "BAZAARXFIRST") {
      setCouponApplied(true);
      setCouponDiscount(100);
    } else {
      alert(language === "bn" ? "ভুল কুপন কোড! ট্রাই করুন: BAZAARX100" : "Invalid coupon! Try: BAZAARX100");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-gray-200">
          {/* Drawer Header */}
          <div className="bg-[#1A1F36] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF4500]" />
              <h2 className="text-base font-bold font-display">
                {t.cart} ({language === "bn" ? toBnNumber(cart.length) : cart.length} {t.items})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-orange-50/80 px-5 py-3 border-b border-orange-100">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-gray-700">
                {isFreeDelivery
                  ? (language === "bn" ? "🎉 অভিনন্দন! আপনি ফ্রি ডেলিভারি পেয়েছেন" : "🎉 Congratulations! Free Delivery Unlocked")
                  : (language === "bn"
                      ? `আর ${formatBDT(FREE_SHIPPING_THRESHOLD - subtotal, language)} শপিং করলেই ফ্রি ডেলিভারি!`
                      : `Add ${formatBDT(FREE_SHIPPING_THRESHOLD - subtotal, language)} more for Free Shipping!`)}
              </span>
              <span className="text-[#FF4500] font-price">
                {freeDeliveryProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#00C853] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
                <p className="text-base font-bold text-gray-700">{t.emptyCart}</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#FF4500] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
                >
                  {t.startShopping}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.titleEn}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-gray-900 line-clamp-2">
                        {language === "bn" ? item.product.titleBn : item.product.titleEn}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-[#FF3B3B] transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold font-price text-[#FF4500]">
                        {formatBDT(item.product.price * item.quantity, language)}
                      </span>

                      <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold font-price text-gray-900">
                          {language === "bn" ? toBnNumber(item.quantity) : item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="bg-white p-5 border-t border-gray-200 space-y-3 shrink-0">
              {/* Promo code */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={language === "bn" ? "কুপন কোড (যেমন: BAZAARX100)" : "Promo code (e.g. BAZAARX100)"}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs uppercase focus:outline-none focus:border-[#FF4500]"
                />
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  {t.applyCoupon}
                </button>
              </form>

              {couponApplied && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
                  <span>{language === "bn" ? "৳১০০ ডিসকাউন্ট প্রযোজ্য হয়েছে!" : "৳100 Voucher Applied!"}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-price font-bold text-gray-900">{formatBDT(subtotal, language)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.deliveryFee} ({selectedDistrict.nameEn})</span>
                  <span className="font-price font-bold text-gray-900">
                    {shippingFee === 0 ? (
                      <span className="text-[#00C853] font-bold">FREE</span>
                    ) : (
                      formatBDT(shippingFee, language)
                    )}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#00C853] font-semibold">
                    <span>{t.discount}</span>
                    <span className="font-price">-{formatBDT(couponDiscount, language)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold text-gray-900">
                  <span>{t.grandTotal}</span>
                  <span className="font-price text-[#FF4500] text-base">
                    {formatBDT(grandTotal, language)}
                  </span>
                </div>
              </div>

              {/* Proceed button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-[#00C853] hover:bg-[#00B048] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <span>{t.proceedToCheckout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
