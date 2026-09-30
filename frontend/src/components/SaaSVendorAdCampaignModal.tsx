import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Share2,
  Copy,
  Check,
  Zap,
  Target,
  Megaphone,
  Download,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

interface SaaSVendorAdCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaaSVendorAdCampaignModal: React.FC<SaaSVendorAdCampaignModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();

  const [platform, setPlatform] = useState<'facebook' | 'instagram' | 'tiktok'>('facebook');
  const [productTitle, setProductTitle] = useState('Sundarban 100% Pure Organic Raw Honey');
  const [discountPercent, setDiscountPercent] = useState(20);
  const [copiedText, setCopiedText] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const generatedAdCopyBn = `🍯 সুন্দরবনের ১০০% খাঁটি প্রাকৃতিক চাকের মধু — কোনো ভেজাল নেই, সরাসরি বন থেকে সংগৃহীত!

🔥 বিশেষ মেগা অফার: এখন পাচ্ছেন ফ্ল্যাট ${discountPercent}% ডিসকাউন্ট!
✅ বিসিএসআইআর (BCSIR) ল্যাব টেস্ট সার্টিফিকেট ভেরিফাইড
🚚 ঢাকার মধ্যে ৫০ মিনিটে সুপারফাস্ট ডেলিভারি ও সারা দেশে ক্যাশ অন ডেলিভারি
📦 ডেলিভারি ম্যানের সামনে প্যাকেট খুলে টেস্ট করে পেমেন্ট করার ১০০% গ্যারান্টি!

👉 এখনি অর্ডার করুন: https://sundarban-pure.shopx.store/product/honey-1kg
📞 হটলাইন / হোয়াটসঅ্যাপ: 01942791004`;

  const generatedAdCopyEn = `🍯 100% Pure Raw Wild Honey from Sundarbans — Zero chemicals, 100% lab certified!

🔥 LIMITED TIME DEAL: Enjoy Flat ${discountPercent}% OFF Today!
✅ BCSIR Laboratory Certified & Pure
🚚 50-Minute Rocket Express Delivery in Dhaka City & 64-District COD
📦 Open Box Inspection: Taste & verify before paying!

👉 Order Now: https://sundarban-pure.shopx.store/product/honey-1kg
📞 Hotline: 01942791004`;

  const activeAdCopy = lang === 'bn' ? generatedAdCopyBn : generatedAdCopyEn;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeAdCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 flex items-center justify-center text-white font-black shadow-lg shadow-pink-500/20">
            <Megaphone className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-white">
                {lang === 'bn' ? 'এআই মার্কেটিং অ্যাড জেনারেটর' : 'SaaS AI Ad Campaign & Creative Studio'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[10px] font-black uppercase">
                Viral Ads
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn'
                ? 'ফেসবুক, ইনস্টাগ্রাম ও টিকটকের জন্য হাই-কনভার্টিং বিজ্ঞাপন কপি ও অডিয়েন্স সাজেশন্স।'
                : 'Instantly generate high-converting social media ads, targeting tags, and viral creatives.'}
            </p>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800 mb-5 text-xs font-bold">
          {(['facebook', 'instagram', 'tiktok'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`py-2 rounded-xl capitalize transition ${
                platform === p
                  ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p} Ad Campaign
            </button>
          ))}
        </div>

        {/* Ad Copy Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Generated High-ROI Ad Copy:</span>
            </span>

            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition border border-slate-700"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? 'Copied!' : 'Copy Ad Text'}</span>
            </button>
          </div>

          <textarea
            value={activeAdCopy}
            readOnly
            rows={9}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-xs font-sans text-slate-200 outline-none leading-relaxed custom-scrollbar shadow-inner"
          />
        </div>

        {/* AI Suggested Target Audience Tags */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400">
            <Target className="w-4 h-4" />
            <span>AI Suggested Facebook Ad Audience Targeting:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              'Organic Food Lovers Bangladesh',
              'Fitness & Healthy Diet Dhaka',
              'Online Shopping Shoppers (bKash/Nagad)',
              'Age: 22 - 55',
              'Location: Dhaka, Chittagong, Sylhet',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-950 border border-slate-700 text-slate-300 rounded-xl text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
