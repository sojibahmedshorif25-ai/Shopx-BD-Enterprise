import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Crown,
  Globe,
  Store,
  Layers,
  Palette,
  CreditCard,
  Rocket,
  Check,
  Smartphone,
  ExternalLink,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

interface SaaSVendorStoreBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAAS_PLANS = [
  {
    id: 'starter',
    name: 'Starter Launchpad',
    nameBn: 'স্টার্টার ফ্রি',
    price: 0,
    period: 'Free Lifetime',
    periodBn: 'আজীবন ফ্রি',
    commission: '8% Marketplace Fee',
    commissionBn: '৮% মার্কেটপ্লেস ফি',
    color: 'border-slate-700 bg-slate-900/60',
    badge: 'Popular for Beginners',
    badgeBn: 'নতুনদের জন্য সেরা',
    features: [
      'Standard shopx.store/[store] URL',
      'Up to 50 Product Listings',
      'Standard 48-Hour Delivery',
      'Weekly Escrow Payouts',
      'Community Chat Support',
    ],
    featuresBn: [
      'স্ট্যান্ডার্ড shopx.store/[store] ইউআরএল',
      'সর্বোচ্চ ৫০টি পণ্য লিস্টিং',
      '৪৮ ঘণ্টায় সাধারণ ডেলিভারি',
      'সাপ্তাহিক ব্যাংক পে-আউট',
      'কমিউনিটি লাইভ চ্যাট সাপোর্ট',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Merchant Growth',
    nameBn: 'প্রো মার্চেন্ট গ্রোথ',
    price: 1999,
    period: '/month',
    periodBn: '/মাস',
    commission: '3.5% Low Fee',
    commissionBn: 'মাত্র ৩.৫% ফি',
    color: 'border-orange-500 bg-orange-500/10 shadow-orange-500/20 shadow-xl ring-1 ring-orange-500',
    badge: '🔥 MOST POPULAR',
    badgeBn: '🔥 সবচেয়ে জনপ্রিয়',
    popular: true,
    features: [
      'Custom Subdomain (brand.shopx.store)',
      'Unlimited Products + AI Catalog Writer',
      '⚡ 50-Min Rocket Express Fleet Priority',
      'Instant 24-Hour bKash/Nagad Auto-Disburse',
      'Pathao & Steadfast Auto-Courier Sync',
      'AI Fraud COD Detection Shield (99.4%)',
      'Custom Brand Themes & Color Customizer',
    ],
    featuresBn: [
      'কাস্টম সাবডোমেইন (brand.shopx.store)',
      'আনলিমিটেড প্রোডাক্ট ও এআই ক্যাটালগ জেনারেটর',
      '⚡ ৫০ মিনিটে সুপারফাস্ট এক্সপ্রেস ডেলিভারি',
      '২৪ ঘণ্টায় স্বয়ংক্রিয় বিকাশ/নগদ পে-আউট',
      'পাঠাও ও স্টেডফাস্ট অটো-কুরিয়ার সিঙ্ক',
      'এআই ফ্রড সিওডি ডিটেকশন শিল্ড (৯৯.৪%)',
      'কাস্টম ব্র্যান্ড থিম ও কালার কাস্টমাইজার',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Unicorn SaaS',
    nameBn: 'এন্টারপ্রাইজ ইউনিকর্ন SaaS',
    price: 4999,
    period: '/month',
    periodBn: '/মাস',
    commission: '1.2% VIP Flat Fee',
    commissionBn: 'মাত্র ১.২% ভিআইপি ফি',
    color: 'border-purple-500 bg-purple-500/10 shadow-purple-500/20 shadow-xl ring-1 ring-purple-500',
    badge: '👑 LARGE ENTERPRISE & D2C',
    badgeBn: '👑 শীর্ষ ব্র্যান্ডের জন্য',
    features: [
      'Custom Root Domain (yourbrand.com) + Free SSL',
      'Dedicated High-Speed CDN Edge Node',
      'Zero-Delay Real-Time Escrow Auto-Release',
      'Multi-Warehouse Multi-Staff POS Integration',
      'Automated Bulk Thermal Invoicing & Barcodes',
      'Dedicated Account Manager & SLA 99.99%',
      'Custom AI Chatbot trained on Your Products',
    ],
    featuresBn: [
      'কাস্টম রুট ডোমেইন (yourbrand.com) + ফ্রি SSL',
      'ডেডিকেটেড হাই-স্পিড ক্লাউড নোড',
      'রিয়েল-টাইম ইনস্ট্যান্ট এসক্রো রিলিজ',
      'মাল্টি-ওয়্যারহাউস ও পিওএস ইন্টিগ্রেশন',
      'স্বয়ংক্রিয় থার্মাল ইনভয়েস ও বারকোড',
      'ডেডিকেটেড একাউন্ট ম্যানেজার ও ২৪/৭ কল সাপোর্ট',
      'আপনার নিজস্ব পণ্যে ট্রেইন্ড কাস্টম এআই চ্যাটবট',
    ],
  },
];

const THEME_PRESETS = [
  { id: 'emerald', name: 'Organic Emerald', hex: '#10b981', gradient: 'from-emerald-500 to-teal-400' },
  { id: 'orange', name: 'Cyberpunk Flame', hex: '#f97316', gradient: 'from-orange-500 to-amber-400' },
  { id: 'violet', name: 'Royal Electric Violet', hex: '#8b5cf6', gradient: 'from-purple-500 to-indigo-400' },
  { id: 'crimson', name: 'Luxury Velvet Ruby', hex: '#f43f5e', gradient: 'from-rose-500 to-pink-500' },
  { id: 'cyan', name: 'Neo Tech Sky', hex: '#06b6d4', gradient: 'from-cyan-500 to-blue-500' },
];

export const SaaSVendorStoreBuilderModal: React.FC<SaaSVendorStoreBuilderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [selectedPlan, setSelectedPlan] = useState(SAAS_PLANS[1]);
  const [storeName, setStoreName] = useState('Sundarban Pure Honey & Foods');
  const [subdomain, setSubdomain] = useState('sundarban-pure');
  const [selectedTheme, setSelectedTheme] = useState(THEME_PRESETS[0]);
  const [storeCategory, setStoreCategory] = useState('organic-foods');
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionProgress, setProvisionProgress] = useState(0);
  const [provisionStepText, setProvisionStepText] = useState('');
  const [storeProvisioned, setStoreProvisioned] = useState(false);

  if (!isOpen) return null;

  const handleNameChange = (name: string) => {
    setStoreName(name);
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    setSubdomain(slug || 'my-store');
  };

  const handleStartProvisioning = () => {
    setIsProvisioning(true);
    setProvisionProgress(15);
    setProvisionStepText(lang === 'bn' ? '১. ক্লাউড মাল্টি-টেন্যান্ট ডাটাবেস প্রোভিশন হচ্ছে...' : '1. Provisioning Multi-Tenant Cloud Schema...');

    setTimeout(() => {
      setProvisionProgress(45);
      setProvisionStepText(lang === 'bn' ? '২. কাস্টম সাবডোমেইন ও SSL সার্টিফিকেট অ্যাক্টিভ হচ্ছে...' : '2. Allocating SSL Certificate & Edge Subdomain...');
    }, 900);

    setTimeout(() => {
      setProvisionProgress(75);
      setProvisionStepText(lang === 'bn' ? '৩. বিকাশ/নগদ অটো-ডিসবার্স এসক্রো ওয়ালেট কনফিগারেশন...' : '3. Configuring bKash/Nagad Automated Escrow Disburse...');
    }, 1800);

    setTimeout(() => {
      setProvisionProgress(95);
      setProvisionStepText(lang === 'bn' ? '৪. এআই শপিং অ্যাসিস্ট্যান্ট ও কুরিয়ার এপিআই সিঙ্ক হচ্ছে...' : '4. Syncing AI Shopping Agent & Steadfast/Pathao APIs...');
    }, 2600);

    setTimeout(() => {
      setProvisionProgress(100);
      setIsProvisioning(false);
      setStoreProvisioned(true);
    }, 3300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Ambient Neon Backlights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-orange-500/20 flex-shrink-0">
            <Rocket className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'bn'
                  ? 'ShopX SaaS মাল্টি-টেন্যান্ট স্টোরফ্রন্ট বিল্ডার'
                  : 'ShopX SaaS Multi-Tenant Cloud Store Builder'}
              </h2>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase">
                Zero-Code D2C
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn'
                ? '৬০ সেকেন্ডে নিজের ব্র্যান্ডের ই-কমার্স স্টোর চালু করুন — নিজস্ব ডোমেইন, এআই ক্যাটালগ ও ফুলফিলমেন্ট সহ।'
                : 'Launch your branded multi-vendor store in 60s with custom subdomain, AI catalog, automated bKash disburse & courier APIs.'}
            </p>
          </div>
        </div>

        {/* 3-Step Wizard Navigation */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6 text-xs font-bold">
          <button
            onClick={() => !storeProvisioned && setActiveStep(1)}
            className={`py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${
              activeStep === 1
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? '১. SaaS প্ল্যান' : '1. SaaS Plan'}</span>
          </button>

          <button
            onClick={() => !storeProvisioned && setActiveStep(2)}
            className={`py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${
              activeStep === 2
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? '২. ব্র্যান্ড কাস্টমাইজ' : '2. Brand Design'}</span>
          </button>

          <button
            onClick={() => setActiveStep(3)}
            className={`py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${
              activeStep === 3
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? '৩. ইনস্ট্যান্ট লঞ্চ' : '3. Instant Launch'}</span>
          </button>
        </div>

        {/* STEP 1: Select SaaS Plan */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAAS_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-5 rounded-3xl border cursor-pointer transition relative flex flex-col justify-between ${
                    selectedPlan.id === plan.id
                      ? plan.color
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div>
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-[10px] font-black rounded-full uppercase shadow-lg">
                        {lang === 'bn' ? plan.badgeBn : plan.badge}
                      </span>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-black text-white">
                        {lang === 'bn' ? plan.nameBn : plan.name}
                      </h3>
                      {selectedPlan.id === plan.id && (
                        <CheckCircle2 className="w-5 h-5 text-orange-400 fill-orange-400/20 flex-shrink-0" />
                      )}
                    </div>
                    <div className="mb-3">
                      <span className="text-2xl font-black text-white font-mono">
                        {plan.price === 0 ? (lang === 'bn' ? 'ফ্রি' : '৳0') : formatPrice(plan.price)}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        {lang === 'bn' ? plan.periodBn : plan.period}
                      </span>
                      <div className="text-[11px] font-bold text-emerald-400 mt-0.5">
                        {lang === 'bn' ? plan.commissionBn : plan.commission}
                      </div>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-300 mb-6">
                      {(lang === 'bn' ? plan.featuresBn : plan.features).map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setActiveStep(2);
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                      selectedPlan.id === plan.id
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {lang === 'bn' ? 'এই প্ল্যান নিয়ে এগিয়ে যান' : 'Select & Continue'}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveStep(2)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-orange-500/20 flex items-center space-x-2"
              >
                <span>{lang === 'bn' ? 'পরের ধাপ: স্টোর ডিজাইন' : 'Next: Brand Customizer'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Storefront Brand Customizer */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    {lang === 'bn' ? 'দোকানের নাম (Store Name):' : 'Branded Store Name:'}
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:border-orange-500 outline-none"
                    placeholder="e.g. Dhaka Organic Farms"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    {lang === 'bn' ? 'সাবডোমেইন লিংক (Instant Subdomain):' : 'Allocated Subdomain URL:'}
                  </label>
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden px-3 py-2 text-sm text-orange-400 font-mono">
                    <span className="text-slate-400">https://</span>
                    <input
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value)}
                      className="bg-transparent text-white font-bold outline-none flex-1 px-1"
                    />
                    <span className="text-slate-400">.shopx.store</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    {lang === 'bn' ? 'ব্র্যান্ড থিম কালার (Brand Accent Palette):' : 'Brand Theme Accent:'}
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {THEME_PRESETS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTheme(t)}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition ${
                          selectedTheme.id === t.id
                            ? 'border-white bg-slate-800 ring-2 ring-orange-500'
                            : 'border-slate-800 bg-slate-950'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full shadow-md"
                          style={{ backgroundColor: t.hex }}
                        />
                        <span className="text-[10px] text-slate-300 font-bold truncate max-w-full">
                          {t.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    {lang === 'bn' ? 'প্রধান ক্যাটাগরি (Primary Niche):' : 'Store Niche / Category:'}
                  </label>
                  <select
                    value={storeCategory}
                    onChange={(e) => setStoreCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 outline-none focus:border-orange-500"
                  >
                    <option value="organic-foods">🌿 100% Organic Pure Foods & Honey</option>
                    <option value="electronics">⚡ Tech Gadgets, Smartwatches & Audio</option>
                    <option value="fashion">👗 Lifestyle Fashion, Sarees & Panjabi</option>
                    <option value="beauty">💄 Halal Cosmetics & Skincare</option>
                    <option value="grocery">🛒 Fast Family Grocery & Daily Essentials</option>
                  </select>
                </div>
              </div>

              {/* Live Preview Screen */}
              <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 flex items-center space-x-1.5">
                    <Smartphone className="w-4 h-4 text-orange-400" />
                    <span>Live Tenant Storefront Mockup</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    Active Preview
                  </span>
                </div>

                {/* Mock Phone View */}
                <div className="my-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${selectedTheme.gradient} text-slate-950 flex items-center justify-center font-black text-xs shadow-md`}
                      >
                        {storeName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">{storeName}</h4>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {subdomain}.shopx.store
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-bold border border-amber-500/20">
                      ★ 4.9 Verified
                    </span>
                  </div>

                  <div
                    className={`h-16 rounded-xl bg-gradient-to-r ${selectedTheme.gradient} p-3 flex items-center justify-between text-slate-950`}
                  >
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider bg-black/20 px-1.5 py-0.5 rounded">
                        GRAND OPENING
                      </span>
                      <p className="text-xs font-black mt-0.5">FLAT 20% DISCOUNT</p>
                    </div>
                    <span className="text-xs font-bold bg-white text-slate-950 px-2.5 py-1 rounded-lg shadow">
                      Shop Now
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="block font-bold text-white">100% Guaranteed</span>
                      <span className="text-emerald-400 font-mono">Verified Products</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="block font-bold text-white">50-Min Delivery</span>
                      <span className="text-orange-400 font-mono">Rocket Express</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Selected Plan: <strong className="text-white">{selectedPlan.name}</strong></span>
                  <span className="font-mono text-emerald-400 font-bold">{selectedPlan.commission}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(1)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
              >
                ← {lang === 'bn' ? 'প্ল্যান পরিবর্তন করুন' : 'Change Plan'}
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-orange-500/20 flex items-center space-x-2"
              >
                <span>{lang === 'bn' ? 'পরের ধাপ: স্টোর অ্যাক্টিভেশন' : 'Proceed to Launch'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: 1-Click Multi-Tenant Provisioning & Credentials */}
        {activeStep === 3 && (
          <div className="space-y-6 text-center py-4">
            {!storeProvisioned ? (
              <div className="max-w-md mx-auto space-y-5">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-2xl shadow-orange-500/30 mx-auto animate-pulse">
                  <Cpu className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">
                    {lang === 'bn' ? 'স্টোর প্রোভিশনিং রেডি!' : 'Ready for 1-Click Multi-Tenant Provisioning!'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {lang === 'bn'
                      ? 'বাটনে চাপলেই এআই আপনার কাস্টম স্টোরফ্রন্ট, এসক্রো ওয়ালেট ও কুরিয়ার এপিআই সিঙ্ক সম্পন্ন করবে।'
                      : 'Click below to instantly provision cloud database, allocate subdomain & activate automated escrow.'}
                  </p>
                </div>

                {isProvisioning && (
                  <div className="space-y-2 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left">
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>{provisionStepText}</span>
                      <span className="font-mono text-orange-400">{provisionProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${provisionProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleStartProvisioning}
                  disabled={isProvisioning}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:from-orange-400 hover:to-emerald-400 text-slate-950 font-black text-sm rounded-2xl shadow-2xl shadow-orange-500/40 flex items-center justify-center space-x-2 transition transform active:scale-95 disabled:opacity-50"
                >
                  {isProvisioning ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{lang === 'bn' ? 'প্রোভিশন হচ্ছে...' : 'Provisioning Cloud Store...'}</span>
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      <span>
                        {lang === 'bn'
                          ? `১-ক্লিকে ${storeName} চালু করুন`
                          : `Launch ${storeName} Now`}
                      </span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="max-w-lg mx-auto space-y-6 text-center animate-fadeIn">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40 animate-bounce">
                  <CheckCircle2 className="w-12 h-12 stroke-[3]" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black uppercase">
                    🚀 Tenant Live & Operational
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    {lang === 'bn' ? 'অভিনন্দন! আপনার স্টোর লাইভ হয়েছে।' : 'Congratulations! Your Store is Live.'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {lang === 'bn'
                      ? 'আপনার কাস্টম সাবডোমেইন, এআই ক্যাটালগ ও এডমিন প্যানেল সক্রিয় করা হয়েছে।'
                      : 'Your isolated multi-tenant environment, bKash escrow, and courier fulfillment are active.'}
                  </p>
                </div>

                {/* Store Credentials Card */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-left space-y-3 shadow-xl">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
                    <span className="text-slate-400">Storefront URL:</span>
                    <a
                      href={`https://${subdomain}.shopx.store`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-orange-400 flex items-center space-x-1 hover:underline font-mono"
                    >
                      <span>https://{subdomain}.shopx.store</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
                    <span className="text-slate-400">SaaS Plan:</span>
                    <span className="font-bold text-white">{selectedPlan.name} ({formatPrice(selectedPlan.price)}/mo)</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
                    <span className="text-slate-400">Escrow Payout:</span>
                    <span className="font-bold text-emerald-400">Instant 24-Hour bKash Auto-Disburse</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Merchant Portal:</span>
                    <a
                      href="http://localhost:5174"
                      className="font-bold text-amber-400 hover:underline"
                    >
                      http://localhost:5174 (Vendor Admin) ↗
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="http://localhost:5174"
                    className="flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center space-x-2 hover:scale-105 transition"
                  >
                    <Store className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'সেলার ড্যাশবোর্ডে প্রবেশ করুন ↗' : 'Open Vendor Dashboard ↗'}</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl transition"
                  >
                    {lang === 'bn' ? 'বন্ধ করুন' : 'Done & Close'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
