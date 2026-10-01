import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Award,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const Footer: React.FC = () => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';

  return (
    <footer className="bg-gradient-to-b from-[#061a12] via-[#04130d] to-[#020617] text-slate-300 border-t border-emerald-900/60 transition-all">
      {/* 1. Value Proposition Banner */}
      <div className="border-b border-emerald-900/40 bg-emerald-950/40 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-emerald-900/20 border border-emerald-800/30">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700/30 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-600/30 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">
                {isBn ? '১০০% আসল পণ্যের গ্যারান্টি' : '100% Authentic Brands'}
              </h5>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn ? 'অফিসিয়াল ওয়ারেন্টি ও ভেরিফায়েড সেলার' : 'Official brand warranty & verified sellers'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl bg-emerald-900/20 border border-emerald-800/30">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700/30 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-600/30 shadow-inner">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">
                {isBn ? 'সারা বাংলাদেশে দ্রুত ডেলিভারি' : 'Nationwide Fast Delivery'}
              </h5>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn ? '৬৪ জেলায় ক্যাশ অন ডেলিভারি সুবিধা' : 'Cash on delivery across 64 districts'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl bg-emerald-900/20 border border-emerald-800/30">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700/30 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-600/30 shadow-inner">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">
                {isBn ? '৭ দিনের সহজ রিটার্ন নীতি' : '7 Days Easy Return'}
              </h5>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn ? 'দোরগোড়ায় রিটার্ন ও ইনস্ট্যান্ট রিফান্ড' : 'Doorstep pickup & instant refund'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl bg-emerald-900/20 border border-emerald-800/30">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700/30 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-600/30 shadow-inner">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">
                {isBn ? 'নিরাপদ পেমেন্ট ও ০% EMI' : '100% Secure Payment & EMI'}
              </h5>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn ? 'বিকাশ, নগদ, রকেট ও কার্ড সিকিউরিটি' : 'bKash, Nagad, cards & SSL secured'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Brand & Bio */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-950">
              SX
            </div>
            <div>
              <div className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-2">
                Shop<span className="text-emerald-400">X</span>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black tracking-widest uppercase">
                  OFFICIAL
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                {isBn ? 'অফিসিয়াল প্রিমিয়াম সুপারমল ও স্মার্ট কমার্স' : 'Official Supermall & Smart Commerce Platform'}
              </p>
            </div>
          </Link>

          <p className="text-sm text-slate-400 leading-relaxed">
            {isBn
              ? 'বাংলাদেশের শীর্ষস্থানীয় মাল্টি-ভেন্ডর ই-কমার্স ইকোসিস্টেম। ১০০% অফিসিয়াল ইলেকট্রনিক্স, BSTI সার্টিফাইড খাঁটি অর্গানিক ফুড এবং ফ্যাশন সরাসরি আপনার ঘরে পৌঁছে দিচ্ছে ShopX BD।'
              : "Bangladesh's premier SaaS multi-vendor e-commerce platform. Official flagship tech, BSTI-certified organic food & designer lifestyle delivered nationwide."}
          </p>

          {/* Social Links */}
          <div className="pt-2">
            <p className="text-xs font-bold text-slate-300 mb-2">
              {isBn ? 'আমাদের সাথে যুক্ত থাকুন:' : 'Follow Us:'}
            </p>
            <div className="flex items-center gap-2.5 text-slate-300">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-emerald-800/50 hover:border-emerald-400 hover:bg-emerald-950/80 hover:text-white flex items-center justify-center transition shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-emerald-800/50 hover:border-emerald-400 hover:bg-emerald-950/80 hover:text-white flex items-center justify-center transition shadow-sm"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-emerald-800/50 hover:border-emerald-400 hover:bg-emerald-950/80 hover:text-white flex items-center justify-center transition shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-emerald-800/50 hover:border-emerald-400 hover:bg-emerald-950/80 hover:text-white flex items-center justify-center transition shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-emerald-800/50 hover:border-emerald-400 hover:bg-emerald-950/80 hover:text-white flex items-center justify-center transition shadow-sm"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-4 rounded-full bg-emerald-500"></span>
            <span>{isBn ? 'কুইক নেভিগেশন' : 'Quick Navigation'}</span>
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li>
              <Link to="/" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span className="text-emerald-500 text-xs">▸</span>
                <span>{isBn ? 'হোম পেজ' : 'Home Page'}</span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span className="text-emerald-500 text-xs">▸</span>
                <span>{isBn ? 'সকল পণ্য ক্যাটালগ' : 'All Product Catalog'}</span>
              </Link>
            </li>
            <li>
              <Link to="/products?filter=deals" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span className="text-amber-400 text-xs">🔥</span>
                <span className="font-semibold text-amber-300">{isBn ? 'ফ্ল্যাশ সেল ও মেগা ডিলস' : 'Flash Deals & Offers'}</span>
              </Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span className="text-emerald-500 text-xs">▸</span>
                <span>{isBn ? 'অর্ডার ট্র্যাকিং (লাইভ ম্যাপ)' : 'Live Order Tracking'}</span>
              </Link>
            </li>
            <li>
              <Link to="/auth" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span className="text-emerald-500 text-xs">▸</span>
                <span>{isBn ? 'কাস্টমার লগইন / সাইন আপ' : 'Customer Sign In / Sign Up'}</span>
              </Link>
            </li>
            <li>
              <Link to="/vendor-register" className="hover:text-emerald-300 transition flex items-center gap-2 text-emerald-400 font-bold">
                <span>🚀</span>
                <span>{isBn ? 'SaaS সেলার শপ শুরু করুন' : 'Launch SaaS Storefront'}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Top Departments */}
        <div>
          <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-4 rounded-full bg-amber-400"></span>
            <span>{isBn ? 'শীর্ষ ক্যাটাগরি ও ডিপার্টমেন্ট' : 'Top Departments'}</span>
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li>
              <Link to="/products?category=smartphones-tablets" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span>📱</span>
                <span>{isBn ? 'স্মার্টফোন ও ট্যাবলেট' : 'Smartphones & Tablets'}</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=electronics-gadgets" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span>🎧</span>
                <span>{isBn ? 'স্মার্ট গ্যাজেটস ও অডিও' : 'Tech Gadgets & Audio'}</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=organic-foods" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span>🍯</span>
                <span>{isBn ? 'খাঁটি মধু ও অর্গানিক ফুড' : 'Pure Organic Foods & Honey'}</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=fashion-lifestyle" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span>👔</span>
                <span>{isBn ? 'ফ্যাশন ও প্রিমিয়াম পাঞ্জাবি' : 'Fashion & Luxury Apparel'}</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=home-kitchen" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span>🍳</span>
                <span>{isBn ? 'হোম ও কিচেন অ্যাপ্লায়েন্স' : 'Home Appliances & Living'}</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=beauty-care" className="hover:text-emerald-400 transition flex items-center gap-2">
                <span>💄</span>
                <span>{isBn ? 'বিউটি ও রাজকীয় আতর' : 'Beauty & Royal Fragrances'}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Customer Helpline & Corporate Head Office */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-4 rounded-full bg-emerald-500"></span>
            <span>{isBn ? 'কর্পোরেট হেড অফিস ও সাপোর্ট' : 'Corporate Office & Support'}</span>
          </h4>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/90 border border-emerald-900/40">
              <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  {isBn ? '🏢 হেড অফিস ঠিকানা:' : '🏢 Head Office Address:'}
                </p>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  {isBn ? 'রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ' : 'Rowmari, Kurigram, Rangpur, Bangladesh'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-emerald-900/40">
              <PhoneCall className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  {isBn ? '📞 ২৪/৭ হেল্পলাইন:' : '📞 24/7 Helpline:'}
                </p>
                <a
                  href="tel:+8801942791004"
                  className="text-xs font-mono font-bold text-emerald-400 hover:underline"
                >
                  +880 1942-791004
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-emerald-900/40">
              <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  {isBn ? '✉️ অফিশিয়াল ইমেইল:' : '✉️ Official Support:'}
                </p>
                <a
                  href="mailto:support@shopxbd.com"
                  className="text-xs font-mono text-slate-300 hover:text-white"
                >
                  support@shopxbd.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Payment Gateway Badges & Security Strip */}
      <div className="border-t border-emerald-900/50 bg-[#020906] py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
              {isBn ? 'নিরাপদ পেমেন্ট পার্টনার্স:' : 'Secured Payment Partners:'}
            </span>
            <span className="px-3 py-1 rounded-xl bg-pink-950/80 border border-pink-700/50 text-pink-300 text-xs font-black">
              bKash
            </span>
            <span className="px-3 py-1 rounded-xl bg-orange-950/80 border border-orange-700/50 text-orange-300 text-xs font-black">
              Nagad
            </span>
            <span className="px-3 py-1 rounded-xl bg-purple-950/80 border border-purple-700/50 text-purple-300 text-xs font-black">
              Rocket
            </span>
            <span className="px-3 py-1 rounded-xl bg-blue-950/80 border border-blue-700/50 text-blue-300 text-xs font-black">
              Upay
            </span>
            <span className="px-3 py-1 rounded-xl bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 text-xs font-black">
              VISA
            </span>
            <span className="px-3 py-1 rounded-xl bg-red-950/80 border border-red-700/50 text-red-300 text-xs font-black">
              MasterCard
            </span>
            <span className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-bold">
              💵 Cash on Delivery
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SSLCommerz 256-Bit SSL Encrypted</span>
            </span>
            <span>|</span>
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>BSTI Certified Quality</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © 2026 <strong>ShopX BD Enterprise</strong>. {isBn ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}{' '}
            <span className="text-slate-500">
              ({isBn ? 'হেড অফিস: রৌমারী, কুড়িগ্রাম, রংপুর' : 'Head Office: Rowmari, Kurigram, Rangpur, Bangladesh'})
            </span>
          </p>

          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <Link to="/about-us" className="hover:text-emerald-400 transition">
              {isBn ? 'আমাদের সম্পর্কে' : 'About Us'}
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-emerald-400 transition">
              {isBn ? 'শর্তাবলী' : 'Terms & Conditions'}
            </Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-emerald-400 transition">
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-emerald-400 transition">
              {isBn ? 'প্রশ্নোত্তর (FAQ)' : 'FAQ & Support'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

