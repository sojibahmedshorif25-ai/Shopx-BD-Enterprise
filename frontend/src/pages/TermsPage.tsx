import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, CheckCircle2, Clock, Truck, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const TermsPage: React.FC = () => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-slate-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-emerald-600 transition">
            {isBn ? 'হোম' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">
            {isBn ? 'শর্তাবলী ও নীতিমালা' : 'Terms & Conditions'}
          </span>
        </nav>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2.5 rounded-2xl bg-emerald-700/60 border border-emerald-500/40 text-emerald-300">
              <FileText className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              ShopX BD Enterprise Legal
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {isBn ? 'ব্যবহারের শর্তাবলী ও ক্রেতা সুরক্ষা নীতিমালা' : 'Terms of Service & Buyer Protection'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {isBn
              ? 'ShopX BD প্ল্যাটফর্ম ব্যবহার করার মাধ্যমে আপনি আমাদের স্বচ্ছ কেনাকাটা, ক্যাশ অন ডেলিভারি ও ওয়ারেন্টি নীতিমালা মেনে নিচ্ছেন।'
              : 'By using ShopX BD, you agree to our 100% authentic product standards, express dispatch policies, and verified transaction guarantees.'}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-emerald-300/90 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {isBn ? 'সর্বশেষ সংস্করণ: অক্টোবর ২০২৬' : 'Last Updated: October 2026'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {isBn ? 'BSTI ও ই-কমার্স ভোক্তা অধিকার অ্যাক্ট সম্মত' : 'Compliant with BD Consumer Rights Protection Act'}
            </span>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-black text-sm flex items-center justify-center">
                ১
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {isBn ? '১. পণ্য অর্ডার ও ডেলিভারি নীতি' : '1. Order Placement & Nationwide Delivery'}
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isBn
                ? 'গ্রাহক আমাদের প্ল্যাটফর্মে সঠিক নাম, ঠিকানা ও সচল মোবাইল নম্বর দিয়ে অর্ডার কনফার্ম করবেন। ঢাকা মেট্রো ও রৌমারী সেন্ট্রাল হাব এলাকায় ২৪ ঘণ্টা এবং অন্যান্য ৬৪ জেলায় ৪৮ থেকে ৭২ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়।'
                : 'Customers must provide authentic contact info and delivery addresses. Orders within Dhaka City and Rowmari Central Hub are delivered within 24 hours; all other 64 districts are fulfilled within 48 to 72 hours via our express DEX logistics network.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs">
                <strong className="text-emerald-900 dark:text-emerald-300 font-bold block mb-1">
                  {isBn ? '🚚 ঢাকা ও রৌমারী হাব রেট:' : '🚚 Dhaka & Rowmari Hub Rate:'}
                </strong>
                <p className="text-slate-600 dark:text-slate-400">
                  {isBn ? 'মাত্র ৳৬০ এক্সপ্রেস চার্জ • ২৪ ঘণ্টায় হোম ডেলিভারি' : 'Flat ৳60 Express Charge • 24h Guaranteed Doorstep'}
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 text-xs">
                <strong className="text-blue-900 dark:text-blue-300 font-bold block mb-1">
                  {isBn ? '📦 সারাদেশে ডেলিভারি রেট:' : '📦 Nationwide Delivery Rate:'}
                </strong>
                <p className="text-slate-600 dark:text-slate-400">
                  {isBn ? '৳১২০ এক্সপ্রেস চার্জ • ৪৮-৭২ ঘণ্টায় ৬৪ জেলায় ডেলিভারি' : '৳120 Express Charge • 48-72h Across All 64 Districts'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 font-black text-sm flex items-center justify-center">
                ২
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {isBn ? '২. ক্যাশ অন ডেলিভারি ও পেমেন্ট সিকিউরিটি' : '2. Cash on Delivery & Payment Security'}
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isBn
                ? 'ShopX BD গ্রাহকদের শতভাগ নিরাপত্তায় ক্যাশ অন ডেলিভারি (COD) সুবিধা প্রদান করে। আপনি রাইডারের উপস্থিতিতে পার্সেল চেক করে মূল্য পরিশোধ করতে পারবেন। এছাড়া বিকাশ, নগদ, রকেট ও ভিসা/মাস্টারকার্ডের মাধ্যমে SSL 256-বিট এনক্রিপশনে অনলাইন পেমেন্ট সম্পূর্ণ নিরাপদ।'
                : 'ShopX BD provides 100% Cash on Delivery (COD) peace of mind. Customers can inspect their packaged order before completing payment to the courier. Online payments via bKash, Nagad, Rocket, and cards are protected by 256-bit SSL encryption.'}
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-400 font-black text-sm flex items-center justify-center">
                ৩
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {isBn ? '৩. ৭ দিনের সহজ রিটার্ন ও রিফান্ড পলিসি' : '3. 7-Day Easy Return & Refund Policy'}
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isBn
                ? 'যদি কোনো পণ্য ক্ষতিগ্রস্ত, মেয়াদোত্তীর্ণ অথবা বর্ণনার সাথে অমিল পাওয়া যায়, গ্রাহক ৭ দিনের মধ্যে রিটার্ন রিকোয়েস্ট করতে পারবেন। আমাদের রাইডার ফ্রি পিকআপ করবে এবং ৩ কার্যদিবসের মধ্যে আপনার বিকাশ/ব্যাংক একাউন্টে ফুল রিফান্ড প্রদান করা হবে।'
                : 'If a product is damaged, defective, or mismatched, customers can initiate a return within 7 calendar days. Our courier collects the item directly from your doorstep at zero cost, and a full refund is dispatched within 3 business days via bKash or original payment method.'}
            </p>
          </div>

          {/* Section 4: Corporate Head Office & Helpline */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                {isBn ? 'হেড অফিস ও গ্রাহক সহায়তা কেন্দ্র' : 'Head Office & Customer Support'}
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-700 text-emerald-300 font-mono font-bold">
                24/7 Helpline
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div>
                <p className="font-bold text-white mb-1">🏢 {isBn ? 'কর্পোরেট ঠিকানা:' : 'Headquarters:'}</p>
                <p className="text-slate-400">
                  {isBn ? 'রৌমারী, কুড়িগ্রাম, রংপুর বিভাগ, বাংলাদেশ' : 'Rowmari, Kurigram, Rangpur Division, Bangladesh'}
                </p>
              </div>
              <div>
                <p className="font-bold text-white mb-1">📞 {isBn ? 'জরুরি হেল্পলাইন:' : 'Direct Hotline:'}</p>
                <a href="tel:+8801942791004" className="text-emerald-400 font-mono font-bold hover:underline">
                  +880 1942-791004
                </a>
                <p className="text-slate-400 text-xs mt-0.5">Email: support@shopxbd.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
