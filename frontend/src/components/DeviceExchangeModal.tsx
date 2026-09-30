import React, { useState } from 'react';
import { X, Smartphone, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

interface DeviceExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceExchangeModal: React.FC<DeviceExchangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();

  const [deviceType, setDeviceType] = useState<'smartphone' | 'laptop'>('smartphone');
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('iPhone 13 Pro (128GB)');
  const [condition, setCondition] = useState<'flawless' | 'good' | 'average'>('flawless');
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);
  const [calculating, setCalculating] = useState(false);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      let base = deviceType === 'smartphone' ? 45000 : 55000;
      if (condition === 'good') base = Math.round(base * 0.85);
      if (condition === 'average') base = Math.round(base * 0.7);
      setEstimatedValue(base);
      setVoucherCode('TRADEIN-' + Math.floor(1000 + Math.random() * 9000));
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
            <RefreshCw className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              ShopX Trade-In & Buyback
            </span>
            <h2 className="text-xl font-black text-slate-100">
              {lang === 'bn' ? 'পুরাতন ডিভাইস এক্সচেঞ্জ ভ্যালু' : 'Old Device Exchange & Trade-In'}
            </h2>
          </div>
        </div>

        {estimatedValue ? (
          <div className="space-y-4 text-center animate-scaleUp">
            <div className="p-6 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                ✓ আনুমানিক এক্সচেঞ্জ মূল্য
              </span>
              <h3 className="text-3xl font-black text-emerald-400 font-mono">
                {formatPrice(estimatedValue)}
              </h3>
              <p className="text-xs text-slate-300">
                নতুন ফোন বা গ্যাজেট কেনার সময় এই টাকা সম্পূর্ণ ছাড় হিসেবে পাবেন!
              </p>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">এক্সচেঞ্জ ডিসকাউন্ট কোড:</span>
              <span className="font-mono font-bold text-amber-400">{voucherCode}</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs rounded-xl shadow-lg transition"
            >
              {lang === 'bn' ? 'নতুন পণ্য শপিং করুন' : 'Apply Discount & Shop New'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleCalculate} className="space-y-4">
            {/* Device Type */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeviceType('smartphone')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                  deviceType === 'smartphone'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                📱 স্মার্টফোন (Phone)
              </button>
              <button
                type="button"
                onClick={() => setDeviceType('laptop')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                  deviceType === 'laptop'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                💻 ল্যাপটপ (Laptop)
              </button>
            </div>

            {/* Brand & Model */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">ব্র্যান্ড (Brand)</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl focus:border-emerald-500"
                >
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="OnePlus">OnePlus</option>
                  <option value="HP/Dell">HP / Dell / Lenovo</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">মডেল (Model)</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Physical Condition */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1.5">ডিভাইসের শারীরিক অবস্থা:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'flawless', label: 'নতুনের মতো (Flawless)' },
                  { id: 'good', label: 'হালকা দাগ (Good)' },
                  { id: 'average', label: 'ব্যবহারজনিত দাগ (Average)' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCondition(c.id as any)}
                    className={`py-2 px-2 rounded-xl text-[10px] font-bold border transition ${
                      condition === c.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={calculating}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
            >
              {calculating ? (
                <span>মূল্য হিসাব হচ্ছে...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'এক্সচেঞ্জ মূল্য হিসাব করুন' : 'Calculate Trade-In Value'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
