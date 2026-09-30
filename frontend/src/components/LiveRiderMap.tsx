import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Navigation, Clock, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LiveRiderMapProps {
  orderId: string;
  riderName?: string;
  riderPhone?: string;
  vehicleNumber?: string;
  customerAddress: string;
  orderStatus: string;
}

export const LiveRiderMap: React.FC<LiveRiderMapProps> = ({
  orderId,
  riderName = 'কামরুল হাসান (Kamrul)',
  riderPhone = '01711223344',
  vehicleNumber = 'ঢাকা মেট্রো হ-৪৪৯১',
  customerAddress,
  orderStatus,
}) => {
  // Coordinates simulation for Dhaka route (Hub: Tejgaon -> Customer: Destination)
  const [progress, setProgress] = useState(65); // 0 to 100%
  const [etaMinutes, setEtaMinutes] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + 2;
      });
      setEtaMinutes((prev) => (prev > 2 ? prev - 1 : 2));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 text-white space-y-6 shadow-2xl overflow-hidden relative">
      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center animate-pulse">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg text-white">লাইভ রাইডার জিপিএস ট্র্যাকিং</h3>
              <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
                Active Live GPS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              অর্ডার নম্বর: <strong className="text-orange-400 font-mono">#{orderId}</strong>
            </p>
          </div>
        </div>

        {/* ETA Widget */}
        <div className="bg-slate-800/90 px-4 py-2 rounded-2xl border border-slate-700 flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-amber-400 animate-spin" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">আনুমানিক ডেলিভারি সময়</p>
            <p className="text-sm font-black text-amber-400">{etaMinutes} মিনিট বাকি</p>
          </div>
        </div>
      </div>

      {/* Simulated Live Dhaka Map Canvas Graphic */}
      <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center">
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* City Streets Simulation SVG */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-[2] fill-none">
          <path d="M 50 150 Q 180 50, 320 180 T 600 120" stroke="#1e293b" strokeWidth="12" />
          <path d="M 120 280 Q 250 180, 420 220 T 700 80" stroke="#1e293b" strokeWidth="8" />
          {/* Active Navigation Route Path (Neon Orange Glow) */}
          <path
            d="M 60 180 Q 220 80, 380 190 T 620 140"
            stroke="#f97316"
            strokeWidth="5"
            strokeDasharray="8 4"
            className="animate-pulse"
          />
        </svg>

        {/* Origin Warehouse Marker */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/50">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold bg-slate-900/90 border border-slate-700 px-2 py-0.5 rounded-full mt-1 text-blue-300">
            ShopX সেন্ট্রাল হাব
          </span>
        </div>

        {/* Live Moving Rider Bike Marker on Route */}
        <div
          className="absolute transition-all duration-1000 z-20 flex flex-col items-center"
          style={{
            left: `${progress}%`,
            top: '46%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/80 ring-4 ring-emerald-400/40 animate-bounce">
              <Truck className="w-6 h-6 fill-slate-950" />
            </div>
            {/* Pulsing Radar Ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-emerald-400/60 animate-ping pointer-events-none" />
          </div>
          <span className="text-[10px] font-black bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full mt-1.5 shadow-md flex items-center gap-1">
            <Navigation className="w-3 h-3 fill-slate-950" /> রাইডার গতিতে আছে
          </span>
        </div>

        {/* Customer Destination Marker */}
        <div className="absolute right-8 top-1/3 flex flex-col items-center z-10">
          <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/50">
            <MapPin className="w-5 h-5 fill-white" />
          </div>
          <span className="text-[10px] font-bold bg-slate-900/90 border border-slate-700 px-2 py-0.5 rounded-full mt-1 text-red-300 max-w-[120px] truncate text-center">
            {customerAddress || 'আপনার গন্তব্য'}
          </span>
        </div>
      </div>

      {/* Rider Profile & Call Card */}
      <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
            {riderName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-white">{riderName}</h4>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                ★ 4.9 রেটিং
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">গাড়ির নম্বর: {vehicleNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href={`tel:${riderPhone}`}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>সরাসরি কল দিন ({riderPhone})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
