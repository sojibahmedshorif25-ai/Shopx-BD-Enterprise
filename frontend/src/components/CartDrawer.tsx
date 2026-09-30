import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check, Sparkles, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();
  const {
    items,
    isDrawerOpen,
    setDrawerOpen,
    removeItem,
    updateQuantity,
    getSubTotal,
    getDeliveryFee,
    getTotal,
    couponCode,
    discount,
    setCoupon,
  } = useCartStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isDrawerOpen) return null;

  const subTotal = getSubTotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  const FREE_DELIVERY_THRESHOLD = 2000;
  const progressPercent = Math.min(100, Math.round((subTotal / FREE_DELIVERY_THRESHOLD) * 100));
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subTotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (!inputCoupon.trim()) return;

    if (inputCoupon.toUpperCase() === 'SHOPX100' || inputCoupon.toUpperCase() === 'WELCOME100') {
      if (subTotal >= 1000) {
        setCoupon('SHOPX100', 100);
        setCouponSuccess(lang === 'bn' ? 'কুপন সফল! ৳১০০ ডিসকাউন্ট প্রযোজ্য।' : 'Coupon applied! Flat ৳100 discount applied.');
      } else {
        setCouponError(lang === 'bn' ? 'SHOPX100 কুপনের জন্য নূন্যতম ৳১,০০০ অর্ডার প্রয়োজন।' : 'Minimum order ৳1,000 required for SHOPX100.');
      }
    } else if (inputCoupon.toUpperCase() === 'EID50' || inputCoupon.toUpperCase() === 'SAVE50') {
      setCoupon(inputCoupon.toUpperCase(), 50);
      setCouponSuccess(lang === 'bn' ? 'কুপন সফল! ৳৫০ ডিসকাউন্ট প্রযোজ্য।' : 'Coupon applied! Flat ৳50 discount applied.');
    } else {
      setCouponError(lang === 'bn' ? 'অবৈধ কুপন কোড (Invalid Coupon)' : 'Invalid Coupon Code. Try SHOPX100');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* 1. Header matching clean Antixor / ShopX style */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#f8fafc]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  {lang === 'bn' ? `শপিং কার্ট (${items.length} আইটেম)` : `Shopping Cart (${items.length} items)`}
                </h3>
                <p className="text-[10px] text-slate-400">
                  {lang === 'bn' ? 'নির্ভেজাল পণ্য সরাসরি আপনার ঘরে' : '100% Genuine & Express Delivery'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Delivery Progress Bar */}
          {items.length > 0 && (
            <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-100">
              <div className="flex items-center justify-between text-xs text-emerald-900 font-bold mb-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-700" />
                  {remainingForFreeDelivery === 0
                    ? lang === 'bn' ? '🎉 আপনি ফ্রি ডেলিভারি পেয়েছেন!' : '🎉 You unlocked Free Delivery!'
                    : lang === 'bn'
                    ? `আর ${formatPrice(remainingForFreeDelivery)} যোগ করলে ফ্রি ডেলিভারি!`
                    : `Add ${formatPrice(remainingForFreeDelivery)} more for Free Shipping!`}
                </span>
                <span className="text-[10px] font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* 3. Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-700">
                  {lang === 'bn' ? 'আপনার কার্ট এখন খালি আছে' : 'Your cart is currently empty'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  {lang === 'bn' ? 'আমাদের সেরা অফার ও পণ্যগুলো ঘুরে দেখুন' : 'Explore our top flagship tech, fashion, foods & deals'}
                </p>
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate('/products');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
                >
                  {lang === 'bn' ? 'শপিং শুরু করুন' : 'Start Shopping Now'}
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product._id}-${item.selectedVariant || ''}-${idx}`}
                  className="flex gap-3 p-3 bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 shadow-sm transition"
                >
                  <img
                    src={item.product.thumbnail || item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-xl bg-[#f8fafc] border border-slate-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                          {lang === 'bn' && item.product.banglaTitle ? item.product.banglaTitle : item.product.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.product._id, item.selectedVariant)}
                          className="text-slate-300 hover:text-rose-500 transition p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.selectedVariant && (
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-medium mt-0.5 inline-block">
                          {item.selectedVariant}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                      <span className="text-xs font-extrabold text-emerald-800 font-mono">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Clean Quantity Selector */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-[#f8fafc]">
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity - 1, item.selectedVariant)
                          }
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-200 transition rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold font-mono text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1, item.selectedVariant)
                          }
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-200 transition rounded-r-lg"
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

          {/* 4. Footer & Coupon & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-[#f8fafc] space-y-3">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? 'কুপন কোড (যেমন: SHOPX100)' : 'Coupon code (e.g. SHOPX100)'}
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full text-xs py-2.5 pl-8 pr-3 rounded-xl border border-slate-200 bg-white focus:border-emerald-600 outline-none uppercase font-mono shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  {lang === 'bn' ? 'প্রয়োগ' : 'Apply'}
                </button>
              </form>

              {couponSuccess && <p className="text-[11px] text-emerald-700 font-bold">{couponSuccess}</p>}
              {couponError && <p className="text-[11px] text-rose-500 font-bold">{couponError}</p>}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>{lang === 'bn' ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                  <span className="font-mono font-bold text-slate-800">{formatPrice(subTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Charge:'}</span>
                  <span className="font-mono font-bold text-slate-800">{formatPrice(deliveryFee)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{lang === 'bn' ? `কুপন ডিসকাউন্ট (${couponCode}):` : `Discount (${couponCode}):`}</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>{lang === 'bn' ? 'সর্বমোট বিল:' : 'Total Amount:'}</span>
                  <span className="font-mono text-emerald-800">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-emerald-700/20 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <span>{lang === 'bn' ? 'অর্ডার সম্পন্ন করুন →' : 'Proceed to Checkout →'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
