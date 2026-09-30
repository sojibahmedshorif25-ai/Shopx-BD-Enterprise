import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, KeyRound, Server, Clock, Sparkles } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const PrivacyPage: React.FC = () => {
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
            {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
          </span>
        </nav>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2.5 rounded-2xl bg-emerald-700/60 border border-emerald-500/40 text-emerald-300">
              <Lock className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              Data Security & 256-Bit SSL Protection
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {isBn ? 'কাস্টমার ডাটা প্রাইভেসি ও নিরাপত্তা নীতিমালা' : 'Customer Privacy & Data Protection Policy'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {isBn
              ? 'ShopX BD-তে আপনার ব্যক্তিগত তথ্য, ডেলিভারি এড্রেস এবং পেমেন্ট সিকিউরিটি ১০০% এনক্রিপ্টেড এবং সংরক্ষিত থাকে।'
              : 'Your personal data, delivery addresses, and payment transactions are strictly encrypted and protected with industry-grade security protocols.'}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-emerald-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {isBn ? 'সংস্করণ: অক্টোবর ২০২৬' : 'Effective: October 2026'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {isBn ? 'কোনো থার্ড-পার্টি ডাটা শেয়ারিং নেই' : 'Zero Third-Party Data Selling'}
            </span>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="space-y-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isBn ? '১. আমরা কোন তথ্যগুলো সংগ্রহ করি?' : '1. What Information Do We Collect?'}
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isBn
                ? 'অর্ডার প্রসেসিং এবং সঠিক ঠিকানায় পার্সেল পৌঁছে দেওয়ার জন্য আমরা শুধুমাত্র আপনার নাম, মোবাইল নম্বর, ইমেইল এবং ডেলিভারি ঠিকানা সংগ্রহ করি। আমরা কখনোই আপনার কোনো ব্যাংক পিন বা কার্ড পাসওয়ার্ড সংরক্ষণ করি না।'
                : 'We collect minimal necessary details including your name, mobile phone number, delivery address, and email to facilitate express dispatch and SMS shipment tracking. We NEVER store banking PINs or card CVVs.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isBn ? '২. টু-ফ্যাক্টর (2FA) ও অ্যাকাউন্ট সুরক্ষা' : '2. Two-Factor Authentication (2FA) & Protection'}
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isBn
                ? 'আপনার অ্যাকাউন্টকে সর্বোচ্চ সুরক্ষিত রাখতে আমরা ইমেইল ভেরিফিকেশন এবং ৬-সংখ্যার রিয়েল ওটিপি (OTP) কোড ব্যবস্থা ব্যবহার করি। কোনো আনঅথোরাইজড ব্যক্তি আপনার একাউন্টে প্রবেশ করতে পারবে না।'
                : 'All logins and crucial transactions are safeguarded with real 6-digit OTP verification dispatches via encrypted SMTP channels to ensure maximum account safety.'}
            </p>
          </div>

          {/* Card 3: Head office and contact */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-4">
            <h3 className="text-base sm:text-lg font-black text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              {isBn ? 'ডাটা প্রটেকশন অফিসার ও যোগাযোগ' : 'Data Protection Inquiries'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isBn
                ? 'আপনার অ্যাকাউন্ট ডাটা মুছে ফেলা বা প্রাইভেসি বিষয়ক যেকোনো তথ্যের জন্য আমাদের হেড অফিস বা হেল্পলাইনে যোগাযোগ করুন।'
                : 'For any privacy inquiries or account data erasure requests, contact our central corporate desk directly.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-300">
              <span>🏢 Rowmari, Kurigram, Rangpur, Bangladesh</span>
              <span>•</span>
              <a href="tel:+8801942791004" className="hover:underline text-white font-mono font-bold">
                📞 01942791004
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
