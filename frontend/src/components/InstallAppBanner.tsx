import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles, Star } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const InstallAppBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useLanguageStore();

  useEffect(() => {
    const hasClosed = sessionStorage.getItem('shopx_pwa_banner_closed');
    if (!hasClosed) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('shopx_pwa_banner_closed', 'true');
  };

  const handleInstall = () => {
    alert(
      lang === 'bn'
        ? '📱 ShopX BD ওয়েব অ্যাপটি সফলভাবে আপনার ডিভাইসে যুক্ত হয়েছে! ব্রাউজার মেন্যু থেকে "Add to Home Screen" নির্বাচন করতে পারেন।'
        : '📱 ShopX BD Web App ready! Select "Add to Home Screen" in your browser menu for the 1-click native experience.'
    );
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-14 inset-x-0 z-30 px-4 animate-in slide-in-from-top duration-300">
      <div className="max-w-xl mx-auto bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-orange-500/40 rounded-2xl p-3 sm:px-4 sm:py-3 shadow-2xl flex items-center justify-between gap-3 text-white ring-2 ring-orange-500/20">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0 shadow-lg">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-xs sm:text-sm truncate">
                {lang === 'bn' ? 'ShopX BD মোবাইল অ্যাপ' : 'ShopX BD Mobile App'}
              </h4>
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded font-mono">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-300 truncate mt-0.5">
              {lang === 'bn' ? '৫ গুণ দ্রুত শপিং করুন এবং পান ৳২০০ ফ্রি কুপন!' : 'Shop 5x faster & get instant ৳200 voucher!'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleInstall}
            className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'ইনস্টল' : 'Install'}</span>
          </button>

          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
