import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store, ShieldCheck, CheckCircle2, ArrowRight, Zap, TrendingUp, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { api } from '../services/api';

export const VendorRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';

  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        phone,
        password,
        role: 'vendor',
        storeName,
        address,
      });

      if (res.data.success) {
        setSuccess(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || (isBn ? 'সেলার রেজিস্ট্রেশনে সমস্যা হয়েছে।' : 'Seller registration failed. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="bg-white/20 text-white text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              {isBn ? 'ShopX BD সেলার হাব' : 'ShopX BD Seller & SaaS Hub'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black mt-2 leading-tight">
            {isBn ? 'আপনার দোকান শুরু করুন এবং লাখো ক্রেতার কাছে পৌঁছান!' : 'Start Your Store & Reach Millions of Active Buyers!'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 mt-2 max-w-xl">
            {isBn
              ? '০% হিডেন চার্জ, মাত্র ৫% ফ্ল্যাট কমিশন, ৪৮ ঘণ্টার মধ্যে দ্রুত ব্যাংক ও বিকাশ পে-আউট।'
              : '0% hidden charges, flat 5% commission, automated 64-district delivery & fast 48h payouts.'}
          </p>
        </div>
        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg relative z-10">
          <Store className="w-10 h-10 text-amber-300" />
        </div>
      </div>

      {/* Form & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Benefits (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isBn ? 'কেন ShopX BD তে সেলার হবেন?' : 'Why Sell on ShopX BD?'}
            </h3>

            <div className="flex items-start gap-3 text-xs">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 font-black">
                1
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {isBn ? 'সারাদেশে ডেলিভারি ও রাইডার সাপোর্ট' : 'Nationwide 64-District Logistics'}
                </p>
                <p className="text-gray-400">
                  {isBn ? 'আপনাকে পার্সেল প্যাকিং ছাড়া কিছুই করতে হবে না।' : 'DEX riders pick up directly from your doorstep.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 font-black">
                2
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {isBn ? 'AI ডেসক্রিপশন জেনারেটর' : 'Google Gemini AI Copywriter'}
                </p>
                <p className="text-gray-400">
                  {isBn ? 'Google Gemini AI দিয়ে ১ ক্লিকে পণ্যের হাই-কনভার্টিং বর্ণনা ও ট্যাগ তৈরি।' : 'Generate high-converting SEO copy and product tags in 1 click.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 font-black">
                3
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {isBn ? 'দ্রুত বিকাশ / ব্যাংক পেমেন্ট' : 'Fast Bank & bKash Escrow Payout'}
                </p>
                <p className="text-gray-400">
                  {isBn ? 'অর্ডার ডেলিভারির সাথে সাথে আপনার ওয়ালেটে ব্যালেন্স জমা।' : 'Direct automated wallet settlements after every delivery.'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Seller Login Box */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-white space-y-3">
            <h4 className="font-bold text-sm text-slate-200">
              {isBn ? 'ইতিমধ্যে নিবন্ধিত সেলার?' : 'Already a Registered Seller?'}
            </h4>
            <p className="text-xs text-slate-400">
              {isBn ? 'সরাসরি সেলার ড্যাশবোর্ডে লগইন করে পণ্য ও অর্ডার ম্যানেজ করুন।' : 'Log in directly to your seller dashboard to manage catalog & orders.'}
            </p>
            <a
              href="http://localhost:5174/login"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-orange-400 rounded-xl font-bold text-xs border border-slate-700 transition"
            >
              <span>{isBn ? 'সেলার পোর্টাল লগইন' : 'Seller Portal Login'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Form (7 cols) */}
        <div className="md:col-span-7">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
            {success ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {isBn ? 'অভিনন্দন! আপনার সেলার একাউন্ট তৈরি হয়েছে।' : 'Congratulations! Your Seller Account is Ready.'}
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  {isBn
                    ? 'আপনি এখন সরাসরি সেলার ড্যাশবোর্ডে লগইন করে পণ্য আপলোড ও অর্ডার পরিচালনা করতে পারেন।'
                    : 'You can now log in to the Seller Center to upload products and start selling immediately.'}
                </p>
                <div className="pt-2">
                  <a
                    href="http://localhost:5174/login"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-105 transition"
                  >
                    <span>{isBn ? 'সেলার ড্যাশবোর্ডে যান ↗' : 'Enter Seller Center ↗'}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {isBn ? 'সেলার রেজিস্ট্রেশন ফর্ম' : 'Seller Onboarding Form'}
                  </h2>
                  <Link
                    to="/login"
                    className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
                  >
                    <span>{isBn ? 'সেলার লগইন?' : 'Already a Seller?'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'দোকানের নাম (Store / Brand Name)' : 'Store / Brand Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBn ? 'যেমন: সুন্দরবন অর্গানিক বিডি' : 'e.g. Sundarban Pure Organic BD'}
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-orange-500 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? 'মালিকের নাম' : 'Owner Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isBn ? 'যেমন: মোঃ শরিফ আহমেদ' : 'e.g. Sharif Ahmed'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-orange-500 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? 'মোবাইল নম্বর' : 'Phone Number'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-orange-500 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seller@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-orange-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'পাসওয়ার্ড' : 'Account Password'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-orange-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'দোকানের ঠিকানা / ওয়্যারহাউস' : 'Store Address / Warehouse Location'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBn ? 'মার্কেট / রোড / থানা / জেলা...' : 'Market / Road / Thana / District...'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-orange-500 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-orange-500/20 transition flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? (isBn ? 'রেজিস্ট্রেশন হচ্ছে...' : 'Registering Store...') : (isBn ? 'দোকান রেজিস্ট্রেশন সম্পন্ন করুন' : 'Complete Seller Registration')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
