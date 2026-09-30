import React, { useState } from 'react';
import {
  X,
  Truck,
  Zap,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  Building,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

interface SaaSMultiCourierDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COURIER_PARTNERS = [
  {
    id: 'shopx_rocket',
    name: 'ShopX Rocket In-House Fleet',
    nameBn: 'ShopX রকেট এক্সপ্রেস ফ্লিট',
    type: 'Hyper-Local (Dhaka City)',
    speed: '⚡ 50 Minutes Guaranteed',
    speedBn: '⚡ ৫০ মিনিটে নিশ্চিত ডেলিভারি',
    rate: 60,
    successRate: '99.4%',
    trackingType: 'Live GPS Map & Rider Direct Call',
    status: 'OPTIMAL_ACTIVE',
    highlight: true,
  },
  {
    id: 'steadfast',
    name: 'Steadfast Courier API',
    nameBn: 'স্টেডফাস্ট কুরিয়ার এপিআই',
    type: 'Nationwide (64 Districts)',
    speed: '24-48 Hours Hub-to-Door',
    speedBn: '২৪-৪৮ ঘণ্টায় জেলা পর্যায়ে',
    rate: 110,
    successRate: '94.8%',
    trackingType: 'Automated Webhook Real-time SMS',
    status: 'CONNECTED',
    highlight: false,
  },
  {
    id: 'pathao',
    name: 'Pathao Courier Pro',
    nameBn: 'পাঠাও কুরিয়ার প্রো',
    type: 'Nationwide Express',
    speed: '24 Hours Division Capitals',
    speedBn: '২৪ ঘণ্টায় বিভাগীয় শহরে',
    rate: 120,
    successRate: '93.6%',
    trackingType: 'Instant Consignment API',
    status: 'CONNECTED',
    highlight: false,
  },
  {
    id: 'redx',
    name: 'RedX Logistics',
    nameBn: 'রেডএক্স লজিস্টিকস',
    type: 'Remote Upazilas & Thanas',
    speed: '48-72 Hours Nationwide',
    speedBn: '৪৮-৭২ ঘণ্টায় প্রত্যন্ত অঞ্চলে',
    rate: 130,
    successRate: '91.2%',
    trackingType: 'Standard API Sync',
    status: 'CONNECTED',
    highlight: false,
  },
];

export const SaaSMultiCourierDispatchModal: React.FC<SaaSMultiCourierDispatchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();
  const [selectedPartner, setSelectedPartner] = useState(COURIER_PARTNERS[0]);
  const [isDispatched, setIsDispatched] = useState(false);

  if (!isOpen) return null;

  const handleDispatchOrder = () => {
    setIsDispatched(true);
    setTimeout(() => {
      setIsDispatched(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-orange-500/20 flex-shrink-0">
            <Truck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-white">
                {lang === 'bn'
                  ? 'মাল্টি-কুরিয়ার অটোমেটেড ডিসপ্যাচ ও রেট রাউটার'
                  : 'Multi-Courier Automated Rate & Dispatch Engine'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-black border border-orange-500/40">
                SaaS Logistics
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn'
                ? 'এআই স্বয়ংক্রিয়ভাবে সবচেয়ে দ্রুততম ও কম খরচের কুরিয়ার বেছে নিয়ে কনসাইনমেন্ট বুক করে।'
                : 'Intelligent multi-carrier routing: Auto-select fastest transit time & highest delivery success rate.'}
            </p>
          </div>
        </div>

        {/* Courier List Grid */}
        <div className="space-y-3">
          {COURIER_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                selectedPartner.id === partner.id
                  ? 'bg-orange-500/10 border-orange-500 ring-1 ring-orange-500 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                    partner.highlight
                      ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                      : 'bg-slate-800 text-slate-200'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-black text-white">
                      {lang === 'bn' ? partner.nameBn : partner.name}
                    </h4>
                    {partner.highlight && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-black rounded-full uppercase">
                        AI Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{partner.type} • <span className="text-amber-400 font-medium">{partner.speed}</span></p>
                </div>
              </div>

              <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">{lang === 'bn' ? 'ডেলিভারি রেট:' : 'Delivery Fee:'}</span>
                  <span className="text-sm font-black text-orange-400 font-mono">
                    {formatPrice(partner.rate)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Success Rate:</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {partner.successRate}
                  </span>
                </div>
                {selectedPartner.id === partner.id && (
                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Selected Route: <strong className="text-white">{selectedPartner.name}</strong> ({formatPrice(selectedPartner.rate)})
          </div>

          <button
            onClick={handleDispatchOrder}
            disabled={isDispatched}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:from-orange-400 hover:to-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center space-x-2 transition transform active:scale-95 disabled:opacity-50"
          >
            {isDispatched ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>{lang === 'bn' ? 'কনসাইনমেন্ট এপিআই প্রস্তুত!' : 'Consignment Dispatched via API!'}</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>{lang === 'bn' ? '১-ক্লিকে কুরিয়ার বুক ও লেবেল প্রিন্ট' : 'Auto-Book Consignment & Print Label'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
