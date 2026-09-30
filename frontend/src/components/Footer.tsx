import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const Footer: React.FC = () => {
  const { lang } = useLanguageStore();

  return (
    <footer className="bg-[#0f1f17] text-slate-300 pt-14 pb-8 border-t border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Column */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-600/30">
              SX
            </div>
            <div>
              <div className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5 leading-none">
                Shop<span className="text-emerald-400">X</span>
                <span className="text-[9px] bg-emerald-700/80 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  MALL
                </span>
              </div>
              <p className="text-[11px] text-emerald-400/90 font-medium mt-1">
                {lang === 'bn' ? 'মাল্টি-ভেন্ডর সুপারমল ও SaaS হাব' : 'Supermall & SaaS Commerce Hub'}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'bn'
              ? 'বাংলাদেশের শীর্ষস্থানীয় মাল্টি-ভেন্ডর ই-কমার্স প্ল্যাটফর্ম। ১০০% জেনুইন ফ্ল্যাগশিপ গ্যাজেট, খাঁটি অর্গানিক ফুড ও ফ্যাশন সরাসরি আপনার দোরগোড়ায়।'
              : "Bangladesh's premier SaaS multi-vendor e-commerce platform. Official flagship tech, BSTI-certified organic food & designer lifestyle delivered nationwide."}
          </p>
          <div className="flex items-center gap-3 pt-1 text-slate-400">
            <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-xs hover:text-white cursor-pointer transition">
              f
            </span>
            <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-xs hover:text-white cursor-pointer transition">
              𝕏
            </span>
            <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-xs hover:text-white cursor-pointer transition">
              in
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3.5">
            {lang === 'bn' ? 'কুইক লিংকস' : 'Quick Navigation'}
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link to="/" className="hover:text-emerald-400 transition">
                {lang === 'bn' ? 'হোম পেজ' : 'Home Page'}
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-emerald-400 transition">
                {lang === 'bn' ? 'সকল পণ্য ক্যাটালগ' : 'All Product Catalog'}
              </Link>
            </li>
            <li>
              <Link to="/products?filter=deals" className="hover:text-emerald-400 transition">
                {lang === 'bn' ? 'ফ্ল্যাশ সেল ও ডিলস' : 'Flash Deals & Offers'}
              </Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:text-emerald-400 transition">
                {lang === 'bn' ? 'অর্ডার ট্র্যাকিং (লাইভ ম্যাপ)' : 'Live Order Tracking'}
              </Link>
            </li>
            <li>
              <Link to="/vendor-register" className="hover:text-emerald-400 transition font-bold text-emerald-400">
                {lang === 'bn' ? '🚀 SaaS সেলার রেজিস্ট্রেশন' : '🚀 Launch SaaS Storefront'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Major Departments */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3.5">
            {lang === 'bn' ? 'জনপ্রিয় ডিপার্টমেন্ট' : 'Top Departments'}
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link to="/products?category=smartphones-tablets" className="hover:text-emerald-400 transition">
                {lang === 'bn' ? 'স্মার্টফোন ও ট্যাবলেট' : 'Smartphones & Tablets'}
              </Link>
            </li>
            <li>
              <Link to="/products?category=electronics-gadgets" className="hover:text-emerald-400 transition">
                {lang === 'bn' ? 'স্মার্ট গ্যাজেটস ও অডিও' : 'Tech Gadgets & Audio'}
              </Link>
            </li>
            <li>
              <Link to="/products?category=organic-foods" className="hover:text-emerald-400 transition">
                {lang === 'bn' ? 'খাঁটি মধু ও অর্গানিক ফুড' : 'Pure Organic Foods & Honey'}
              </Link>
            </li>
            <li>
              <Link to="/products?category=fashion-lifestyle" className="hover:text-emerald-400 transition">
                {lang === 'bn' ? 'ফ্যাশন ও রয়্যাল পাঞ্জাবি' : 'Fashion & Luxury Apparel'}
              </Link>
            </li>
            <li>
              <Link to="/products?category=home-kitchen" className="hover:text-emerald-400 transition">
                {lang === 'bn' ? 'হোম ও কিচেন অ্যাপ্লায়েন্স' : 'Home Appliances & Living'}
              </Link>
            </li>
            <li>
              <Link to="/products?category=beauty-care" className="hover:text-emerald-400 transition">
                {lang === 'bn' ? 'বিউটি ও রাজকীয় আতর' : 'Beauty & Royal Fragrances'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Get in Touch & Guarantees */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3.5">
            {lang === 'bn' ? 'গ্রাহক সেবা ও যোগাযোগ' : 'Customer Helpline'}
          </h4>
          <div className="space-y-2.5 text-xs text-slate-400">
            <p className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>+880 1942 791004 ({lang === 'bn' ? '২৪/৭ সাপোর্ট' : '24/7 Support'})</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>support@shopxbd.com</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">{lang === 'bn' ? 'হেড অফিস:' : 'Head Office:'}</strong>{' '}
                {lang === 'bn' ? 'রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ' : 'Rowmari, Kurigram, Rangpur, Bangladesh'}
              </span>
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-[11px] text-emerald-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'bn' ? '১০০% ক্যাশ অন ডেলিভারি' : '100% Cash on Delivery & 0% EMI'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-emerald-950 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          © 2026 ShopX BD Supermall. {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}{' '}
          <span className="text-slate-400">
            ({lang === 'bn' ? 'হেড অফিস: রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ' : 'Head Office: Rowmari, Kurigram, Rangpur, Bangladesh'})
          </span>
        </p>
        <div className="flex gap-4 text-slate-400">
          <Link to="/about" className="hover:text-emerald-400 transition">
            {lang === 'bn' ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}
          </Link>
          <Link to="/about" className="hover:text-emerald-400 transition">
            {lang === 'bn' ? 'শর্তাবলী' : 'Terms & Conditions'}
          </Link>
          <Link to="/contact" className="hover:text-emerald-400 transition">
            {lang === 'bn' ? 'সাপোর্ট হাব' : 'FAQ & Support'}
          </Link>
        </div>
      </div>
    </footer>
  );
};
