import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  Wrench,
  Truck,
  MapPin,
  Clock,
  QrCode,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface DigitalWarrantyLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalWarrantyLookupModal: React.FC<DigitalWarrantyLookupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';
  const [serialOrOrder, setSerialOrOrder] = useState('');
  const [warrantyResult, setWarrantyResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialOrOrder) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setWarrantyResult({
        orderId: serialOrOrder.toUpperCase().startsWith('SX') ? serialOrOrder.toUpperCase() : `SX-${serialOrOrder.toUpperCase()}`,
        productName: 'iPhone 16 Pro Max 256GB Desert Titanium',
        serialNumber: 'IMEI-354891029384756',
        purchaseDate: '2026-03-15',
        warrantyExpiry: '2027-03-15',
        status: 'Active (350 Days Remaining)',
        coverage: 'Official Brand Parts & Labor Warranty (Full Coverage)',
        serviceCenters: [
          { city: 'Dhaka', address: 'ShopX Care, Police Plaza Concord, Gulshan 1, Dhaka' },
          { city: 'Rangpur & Kurigram', address: 'ShopX Regional Hub, Rowmari, Kurigram, Rangpur' },
          { city: 'Chattogram', address: 'ShopX Center, GEC Circle, CDA Avenue, Chattogram' },
        ],
      });
    }, 800);
  };

  const handleClaimDoorstepService = () => {
    setClaimSuccess(true);
    setTimeout(() => setClaimSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  {isBn ? 'ডিজিটাল ওয়ারেন্টি ও সিরিয়াল ভেরিফায়ার' : 'Digital Warranty & RMA Serial Hub'}
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                {isBn ? 'অফিসিয়াল ওয়ারেন্টি স্ট্যাটাস চেক' : 'Verify Official Warranty & Service'}
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

        {/* Search Bar */}
        <form onSubmit={handleLookup} className="space-y-3">
          <label className="block text-xs font-bold text-slate-300">
            {isBn ? 'অর্ডার আইডি বা ডিভাইসের আইএমইআই (IMEI) / সিরিয়াল নম্বর লিখুন:' : 'Enter Order ID (#SX-...) or Device IMEI / Serial Number:'}
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. SX-119951 or 354891029384756"
                value={serialOrOrder}
                onChange={(e) => setSerialOrOrder(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
            >
              {isSearching ? (isBn ? 'যাচাই হচ্ছে...' : 'Verifying...') : (isBn ? 'যাচাই করুন' : 'Verify')}
            </button>
          </div>
        </form>

        {claimSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>
              {isBn
                ? 'ডোরস্টেপ পিক-আপ রিকুয়েস্ট সফল হয়েছে! আমাদের রাইডার আপনার ঠিকানায় পার্সেলটি সংগ্রহ করতে পৌঁছাবে।'
                : 'Doorstep pickup claim logged! Our DEX rider will collect the item from your doorstep for inspection.'}
            </span>
          </div>
        )}

        {/* Results Box */}
        {warrantyResult && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4 text-xs animate-in fade-in">
            <div className="flex items-start justify-between border-b border-slate-900 pb-3">
              <div>
                <span className="font-mono text-emerald-400 font-bold block">{warrantyResult.orderId}</span>
                <p className="font-black text-white text-sm mt-0.5">{warrantyResult.productName}</p>
                <p className="text-[10px] text-slate-400 font-mono">SN: {warrantyResult.serialNumber}</p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-mono font-bold text-[10px]">
                {warrantyResult.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-300">
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                <span className="text-[10px] text-slate-500 block font-semibold">Purchase Date</span>
                <span className="font-mono font-bold text-white">{warrantyResult.purchaseDate}</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                <span className="text-[10px] text-slate-500 block font-semibold">Warranty Valid Until</span>
                <span className="font-mono font-bold text-emerald-400">{warrantyResult.warrantyExpiry}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <p className="font-bold text-slate-400 text-[10px] uppercase">Service Centers (সার্ভিস সেন্টার):</p>
              {warrantyResult.serviceCenters.map((sc: any, idx: number) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>{sc.city}:</strong> {sc.address}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleClaimDoorstepService}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{isBn ? 'ডোরস্টেপ ওয়ারেন্টি সার্ভিস ক্লেইম করুন' : 'Claim Free Doorstep Repair Pickup'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
