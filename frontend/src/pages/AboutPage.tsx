import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  Award,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  HeartHandshake,
  Store,
  Layers,
  Globe2,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const AboutPage: React.FC = () => {
  const { lang } = useLanguageStore();

  const stats = [
    { value: '১০,০০০+', valueEn: '10,000+', label: lang === 'bn' ? 'অথেনটিকেটেড পণ্য' : 'Verified Products' },
    { value: '৫০,০০০+', valueEn: '50,000+', label: lang === 'bn' ? 'সন্তুষ্ট গ্রাহক' : 'Happy Shoppers' },
    { value: '৬৪', valueEn: '64', label: lang === 'bn' ? 'জেলায় সক্রিয় ডেলিভারি' : 'Districts Covered' },
    { value: '৯৯.৪%', valueEn: '99.4%', label: lang === 'bn' ? 'অন-টাইম ডেলিভারি রেট' : 'On-Time Delivery Rate' },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      title: lang === 'bn' ? '১০০% অরিজিনাল ও ভেজালমুক্ত' : '100% Authentic & Lab Tested',
      desc:
        lang === 'bn'
          ? 'অ্যাপল, সনি থেকে শুরু করে সুন্দরবনের খাঁটি মধু ও সরিষার তেল — প্রতিটি পণ্যের কোয়ালিটি ও ল্যাব টেস্ট নিশ্চিত করে সরবরাহ করা হয়।'
          : 'From flagship smartphones to BSTI-certified pure mustard oil and raw honey — every single product is 100% authentic and quality tested.',
    },
    {
      icon: Truck,
      color: 'from-blue-500 to-cyan-600',
      bgLight: 'bg-blue-50 border-blue-200 text-blue-900',
      title: lang === 'bn' ? '৬৪ জেলায় সুপারফাস্ট ডেলিভারি' : '64-District High-Speed Dispatch',
      desc:
        lang === 'bn'
          ? 'ঢাকায় ২৪ ঘণ্টার মধ্যে এবং বাংলাদেশের যেকোনো জেলা বা উপজেলায় ৪৮ ঘণ্টার মধ্যে নির্ভরযোগ্য হোম ডেলিভারি ও লাইভ জিপিএস ট্র্যাকিং।'
          : 'Within 24 hours in Dhaka and 48 hours across all 64 districts with real-time GPS rider map simulation and SMS alerts.',
    },
    {
      icon: HeartHandshake,
      color: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50 border-amber-200 text-amber-900',
      title: lang === 'bn' ? '১৪ দিনের ইজি রিটার্ন ও রিফান্ড' : '14-Day Doorstep Returns',
      desc:
        lang === 'bn'
          ? 'কোনো কারণে পণ্য অপছন্দ বা ত্রুটিযুক্ত হলে ঝামেলামুক্ত দোরগোড়ায় রিটার্ন ও ইনস্ট্যান্ট মানি-ব্যাক গ্যারান্টি।'
          : 'Zero-risk shopping with hassle-free doorstep pickup, instant replacement, or direct bank refund.',
    },
    {
      icon: Store,
      color: 'from-purple-500 to-indigo-600',
      bgLight: 'bg-purple-50 border-purple-200 text-purple-900',
      title: lang === 'bn' ? 'সেলার ও লোকাল উদ্যোক্তা SaaS হাব' : 'Empowering Local SaaS Merchants',
      desc:
        lang === 'bn'
          ? 'বাংলাদেশের স্থানীয় কৃষক, হস্তশিল্পী ও ব্র্যান্ড মালিকদের হাই-টেক ই-কমার্স স্টোরফ্রন্ট পরিচালনার পূর্ণাঙ্গ ডিজিটাল প্ল্যাটফর্ম।'
          : 'Equipping Bangladeshi farmers, artisans, and retailers with enterprise-grade cloud storefronts, analytics, and instant payouts.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* 1. Hero Section */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-bold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>{lang === 'bn' ? 'আমাদের গল্প ও লক্ষ্য' : 'Our Story & Vision'}</span>
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {lang === 'bn' ? 'বাংলাদেশের #১ স্মার্ট সুপারমল ও' : "Bangladesh's #1 Smart Supermall &"}{' '}
            <span className="text-emerald-400">{lang === 'bn' ? 'মাল্টি-ভেন্ডর ইকোসিস্টেম' : 'Multi-Vendor SaaS Hub'}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
            {lang === 'bn'
              ? 'ShopX BD শুরু হয়েছিল একটি লক্ষ্য নিয়ে — বাংলাদেশের প্রতিটি পরিবারের কাছে ১০০% খাঁটি, নিরাপদ এবং জেনুইন পণ্য পৌঁছে দেওয়া। আমরা কৃত্রিম বুদ্ধিমত্তা (AI), আধুনিক লাইভ ট্র্যাকিং এবং উন্নত ক্লাউড আর্কিটেকচার ব্যবহার করে দেশের ই-কমার্স অভিজ্ঞতাকে নতুন উচ্চতায় নিয়ে এসেছি।'
              : 'ShopX BD was born to deliver 100% authentic, adulteration-free, and officially certified products to every household in Bangladesh with cutting-edge AI, GPS logistics, and ethical merchant empowerment.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition"
            >
              <span>{lang === 'bn' ? 'ক্যাটালগ এক্সপ্লোর করুন' : 'Explore Flagship Catalog'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full backdrop-blur-md transition"
            >
              <span>{lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Our Team'}</span>
            </Link>
          </div>
        </div>

        {/* Decorative ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Key Stats Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((st, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center space-y-1 hover:shadow-md transition"
          >
            <p className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
              {lang === 'bn' ? st.value : st.valueEn}
            </p>
            <p className="text-xs font-bold text-slate-600">{st.label}</p>
          </div>
        ))}
      </div>

      {/* 3. Core Pillars */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'bn' ? 'আমাদের মূল বিশ্বাস ও প্রতিশ্রুতি' : 'Our Guiding Pillars & Promises'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'bn'
              ? 'গ্রাহক সন্তুষ্টি ও পণ্যের বিশুদ্ধতাই আমাদের সর্বোচ্চ অগ্রাধিকার'
              : 'Built on radical transparency, authentic curation, and lightning-fast logistics'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className={`p-6 sm:p-8 rounded-3xl border ${p.bgLight} shadow-sm space-y-3 transition duration-200 hover:-translate-y-1`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center shadow-md`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold">{p.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Official Certifications & Compliance */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              {lang === 'bn' ? 'আইনগত ও গুণগত স্বীকৃতি' : 'OFFICIAL LICENSES & ACCREDITATION'}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {lang === 'bn' ? '১০০% সরকার অনুমোদিত ও লাইসেন্সপ্রাপ্ত' : '100% Government Registered & Certified'}
            </h3>
            <p className="text-xs text-slate-500 max-w-xl">
              {lang === 'bn'
                ? 'ShopX BD বাংলাদেশ সরকারের সকল ই-কমার্স ও খাদ্য নিরাপত্তা নীতিমালা মেনে বিশ্বমানের সেবা প্রদান করে আসছে।'
                : 'ShopX BD operates in full compliance with BSTI, Ministry of Commerce, and National Consumer Rights Protection regulations.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[11px] font-black text-slate-800 block">BSTI Tested</span>
              <span className="text-[10px] text-emerald-600 font-bold">✓ Grade-A Pure</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[11px] font-black text-slate-800 block">Trade License</span>
              <span className="text-[10px] text-slate-500 font-mono">TRAD/DNCC/049182</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[11px] font-black text-slate-800 block">DBID Registered</span>
              <span className="text-[10px] text-emerald-600 font-bold">✓ Verified Merchant</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Corporate Headquarters & National Grid */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 border border-emerald-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-900/60 border border-emerald-700/60 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'bn' ? 'কর্পোরেট হেডকোয়ার্টার' : 'CORPORATE HEADQUARTERS'}</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {lang === 'bn' ? '🏢 প্রধান কার্যালয় ও সেন্ট্রাল কমান্ড সেন্টার' : '🏢 Global Head Office & Central Hub'}
          </h3>
          <p className="text-sm font-semibold text-emerald-300">
            {lang === 'bn' ? 'রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ' : 'Rowmari, Kurigram, Rangpur, Bangladesh'}
          </p>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            {lang === 'bn'
              ? 'সারাদেশে ৬৪ জেলার হাই-স্পিড এক্সপ্রেস ডেলিভারি নেটওয়ার্ক, অত্যাধুনিক AI রাউটিং ও ২৪/৭ গ্রাহক সেবা এখান থেকেই সরাসরি নিয়ন্ত্রিত হয়।'
              : 'Orchestrating high-speed automated dispatch across all 64 districts with AI route intelligence and 24/7 client support.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            to="/contact"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition text-center"
          >
            {lang === 'bn' ? 'হেড অফিসে যোগাযোগ করুন' : 'Connect with Headquarters'}
          </Link>
        </div>
      </div>
    </div>
  );
};
