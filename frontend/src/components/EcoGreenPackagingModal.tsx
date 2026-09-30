import React from 'react';
import {
  Leaf,
  TreePine,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
  Recycle,
  Globe2,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface EcoGreenPackagingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EcoGreenPackagingModal: React.FC<EcoGreenPackagingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-md">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  {isBn ? 'সবুজ প্রকৃতি ও কার্বন অফসেট' : '100% Eco-Friendly & Carbon Neutral'}
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                {isBn ? 'পরিবেশবান্ধব ও রিসাইকেল্ড প্যাকেজিং' : 'Green Packaging & Tree Planting'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Content */}
        <div className="space-y-3 text-xs text-slate-300">
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Recycle className="w-4 h-4" />
              <span>{isBn ? '১০০% রিসাইকেলযোগ্য বায়োডিগ্রেডেবল বক্স' : '100% Biodegradable & Recyclable'}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isBn
                ? 'ShopX BD এর সকল পার্সেল প্লাস্টিক-মুক্ত পরিবেশবান্ধব পাটের ব্যাগ ও ক্রাফট পেপার বক্সে নিরাপদে প্যাক করা হয়।'
                : 'All parcels are wrapped using plastic-free, biodegradable kraft materials that dissolve naturally.'}
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <TreePine className="w-4 h-4" />
              <span>{isBn ? 'প্রতি ১০টি অর্ডারে ১টি বৃক্ষরোপণ প্রকল্প' : '1 Tree Planted Every 10 Orders'}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isBn
                ? 'আপনার প্রতিটি কেনাকাটার একটি অংশ সুন্দরবন ও উত্তরবঙ্গে সবুজায়নে বৃক্ষরোপণে অনুদান হিসেবে যুক্ত হয়।'
                : 'A dedicated portion of proceeds funds reforestation in the Sundarbans and northern Bangladesh.'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition shadow-lg shadow-emerald-700/20"
        >
          {isBn ? 'ধন্যবাদ, চালিয়ে যান' : 'Proud to Support Green Shopping'}
        </button>
      </div>
    </div>
  );
};
