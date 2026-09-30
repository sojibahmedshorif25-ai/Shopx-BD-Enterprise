import React, { useState, useEffect } from 'react';
import {
  Ticket,
  Plus,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Search,
  Sparkles,
  Percent,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const CouponsAdminPage: React.FC = () => {
  const { lang } = useAdminLanguageStore();
  const isBn = lang === 'bn';

  const [coupons, setCoupons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create Modal State
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'fixed' | 'percentage'>('fixed');
  const [discountAmount, setDiscountAmount] = useState(50);
  const [minOrderAmount, setMinOrderAmount] = useState(500);
  const [maxDiscount, setMaxDiscount] = useState(100);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/admin/coupons');
      if (res.data.success) {
        setCoupons(res.data.coupons);
      }
    } catch (err) {
      console.error('Failed to load coupons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.post('/admin/coupons', {
        code,
        discountType,
        discountAmount,
        minOrderAmount,
        maxDiscount: discountType === 'percentage' ? maxDiscount : undefined,
      });
      setShowModal(false);
      setCode('');
      fetchCoupons();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create coupon.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!window.confirm(isBn ? 'আপনি কি নিশ্চিত এই কুপনটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this coupon?')) {
      return;
    }
    try {
      await api.delete(`/admin/coupons/${id}`);
      fetchCoupons();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Delete failed.');
    }
  };

  return (
    <div className="p-3.5 sm:p-6 space-y-5 max-w-full overflow-hidden animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-900/60 p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
            <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0" />
            <span>{isBn ? 'ভাউচার ও প্রোমো কোড হাব' : 'Vouchers & Promo Codes Hub'}</span>
          </h1>
          <p className="text-xs text-amber-200/70 mt-1 max-w-2xl">
            {isBn
              ? 'গ্রাহকদের জন্য ক্যাম্পেইন ভাউচার, ফ্ল্যাট ছাড় ও শতাংশ ডিসকাউন্ট নিয়ন্ত্রণ করুন।'
              : 'Create and manage promotional discount vouchers, campaign codes & limits.'}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>{isBn ? 'নতুন ভাউচার তৈরি' : 'Create Voucher'}</span>
        </button>
      </div>

      {/* Coupons List */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin text-amber-500 mx-auto" />
        </div>
      ) : coupons.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
          <Ticket className="w-10 h-10 text-slate-500 mx-auto" />
          <p className="font-bold text-slate-300">{isBn ? 'কোনো সক্রিয় ভাউচার পাওয়া যায়নি।' : 'No active vouchers found.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-700/80 p-5 rounded-3xl shadow-lg transition space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-base px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl tracking-wider">
                  {coupon.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300">
                  Active
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-300">
                <p className="text-base font-black text-white">
                  {coupon.discountType === 'percentage' ? `${coupon.discountAmount}% Discount` : `৳${coupon.discountAmount} Flat Off`}
                </p>
                <p className="text-slate-400 text-[11px]">
                  Min Spend: <strong className="text-white">৳{coupon.minOrderAmount || 0}</strong>
                  {coupon.maxDiscount && ` • Max Cap: ৳${coupon.maxDiscount}`}
                </p>
                <p className="text-[11px] text-slate-500">
                  Used: <strong className="text-amber-400">{coupon.usedCount || 0} times</strong>
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">ShopX Platform Campaign</span>
                <button
                  onClick={() => handleDeleteCoupon(coupon._id)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-950 text-red-400 transition"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {isBn ? 'নতুন প্রোমো ভাউচার তৈরি করুন' : 'Create Promo Voucher'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {isBn ? 'কুপন কোড (Promo Code)' : 'Voucher Code'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SHOPX25"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 text-amber-300 outline-none focus:border-amber-500 font-mono font-black tracking-wider text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? 'ডিসকাউন্ট টাইপ' : 'Discount Type'}
                  </label>
                  <select
                    value={discountType}
                    onChange={(e: any) => setDiscountType(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none"
                  >
                    <option value="fixed">{isBn ? 'নির্দিষ্ট টাকা (Fixed BDT)' : 'Fixed BDT'}</option>
                    <option value="percentage">{isBn ? 'শতাংশ (Percentage %)' : 'Percentage (%)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? 'ছাড়ের পরিমাণ' : 'Discount Value'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? 'সর্বনিম্ন অর্ডার মূল্য' : 'Min Order Spend (৳)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none font-mono"
                  />
                </div>

                {discountType === 'percentage' && (
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      {isBn ? 'সর্বোচ্চ ছাড়ের সীমা (Max Cap)' : 'Max Discount Cap (৳)'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(Number(e.target.value))}
                      className="w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none font-mono"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-1/2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow transition flex items-center justify-center gap-1.5"
                >
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>{isSaving ? (isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBn ? 'ভাউচার প্রকাশ করুন' : 'Publish Voucher')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
