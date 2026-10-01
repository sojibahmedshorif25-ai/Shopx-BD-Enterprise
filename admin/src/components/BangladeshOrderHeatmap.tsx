import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Compass,
  Activity,
  Truck,
  Globe,
  Radio,
  Eye,
  Printer,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

interface LiveOrderOrigin {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  district: string;
  division: string;
  thana: string;
  amount: number;
  paymentMethod: string;
  ipOrigin: string;
  coordinates: { x: number; y: number }; // percentage on SVG map
  timestamp: string;
  status: 'placed' | 'confirmed' | 'dispatched' | 'delivered';
}

export const BangladeshOrderHeatmap: React.FC = () => {
  const { lang } = useAdminLanguageStore();
  const isBn = lang === 'bn';

  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [activePin, setActivePin] = useState<LiveOrderOrigin | null>(null);

  // Live Simulated High-Velocity Nationwide Orders stream
  const [liveOrders, setLiveOrders] = useState<LiveOrderOrigin[]>([
    {
      id: 'ord-101',
      orderNumber: 'SX-994821',
      customerName: 'সজিব আহমেদ (Sojib Ahmed)',
      phone: '01942-791004',
      district: 'কুড়িগ্রাম (Kurigram)',
      division: 'রংপুর (Rangpur)',
      thana: 'রৌমারী (Rowmari)',
      amount: 4500,
      paymentMethod: 'bKash Auto',
      ipOrigin: '103.134.88.24 (Rangpur Optical)',
      coordinates: { x: 42, y: 18 }, // Kurigram / Rowmari coordinates
      timestamp: '১ মিনিট আগে',
      status: 'confirmed',
    },
    {
      id: 'ord-102',
      orderNumber: 'SX-994820',
      customerName: 'তানভীর হাসান (Tanvir Hasan)',
      phone: '01712-491823',
      district: 'ঢাকা (Dhaka)',
      division: 'ঢাকা (Dhaka)',
      thana: 'ধানমন্ডি (Dhanmondi)',
      amount: 2890,
      paymentMethod: 'Cash on Delivery',
      ipOrigin: '103.205.71.12 (Dhaka Fiber)',
      coordinates: { x: 50, y: 52 }, // Dhaka coordinates
      timestamp: '৩ মিনিট আগে',
      status: 'dispatched',
    },
    {
      id: 'ord-103',
      orderNumber: 'SX-994819',
      customerName: 'মেহজাবিন চৌধুরী (Mehjabin)',
      phone: '01819-382910',
      district: 'চট্টগ্রাম (Chattogram)',
      division: 'চট্টগ্রাম (Chattogram)',
      thana: 'জিইসি মোড় (GEC Circle)',
      amount: 6200,
      paymentMethod: 'Nagad Direct',
      ipOrigin: '103.92.10.45 (Chattogram Port ISP)',
      coordinates: { x: 74, y: 72 }, // Chattogram coordinates
      timestamp: '৬ মিনিট আগে',
      status: 'placed',
    },
    {
      id: 'ord-104',
      orderNumber: 'SX-994818',
      customerName: 'আরিফুল ইসলাম (Ariful Islam)',
      phone: '01730-882911',
      district: 'সিলেট (Sylhet)',
      division: 'সিলেট (Sylhet)',
      thana: 'জিন্দাবাজার (Zindabazar)',
      amount: 3450,
      paymentMethod: 'bKash Auto',
      ipOrigin: '118.179.44.19 (Sylhet CyberNet)',
      coordinates: { x: 78, y: 34 }, // Sylhet coordinates
      timestamp: '৮ মিনিট আগে',
      status: 'confirmed',
    },
    {
      id: 'ord-105',
      orderNumber: 'SX-994817',
      customerName: 'মাহমুদ আলম (Mahmud Alam)',
      phone: '01511-992813',
      district: 'রাজশাহী (Rajshahi)',
      division: 'রাজশাহী (Rajshahi)',
      thana: 'মতিহার (Motihar)',
      amount: 1950,
      paymentMethod: 'Cash on Delivery',
      ipOrigin: '103.111.45.62 (Rajshahi Broadband)',
      coordinates: { x: 26, y: 40 }, // Rajshahi coordinates
      timestamp: '১১ মিনিট আগে',
      status: 'dispatched',
    },
    {
      id: 'ord-106',
      orderNumber: 'SX-994816',
      customerName: 'নুসরাত জাহান (Nusrat Jahan)',
      phone: '01911-238491',
      district: 'খুলনা (Khulna)',
      division: 'খুলনা (Khulna)',
      thana: 'সোনাডাঙ্গা (Sonadanga)',
      amount: 5120,
      paymentMethod: 'bKash Auto',
      ipOrigin: '103.88.22.90 (Khulna Link)',
      coordinates: { x: 38, y: 74 }, // Khulna coordinates
      timestamp: '১৪ মিনিট আগে',
      status: 'confirmed',
    },
  ]);

  const divisionStats = [
    { nameEn: 'Dhaka', nameBn: 'ঢাকা', share: 44, volume: '৳২,১৬,০০০', count: 82, color: 'emerald' },
    { nameEn: 'Chattogram', nameBn: 'চট্টগ্রাম', share: 22, volume: '৳১,০৮,০০০', count: 41, color: 'blue' },
    { nameEn: 'Rangpur (HQ)', nameBn: 'রংপুর (হেড অফিস)', share: 14, volume: '৳৬৮,৫০০', count: 26, color: 'amber' },
    { nameEn: 'Rajshahi', nameBn: 'রাজশাহী', share: 8, volume: '৳৩৯,২০০', count: 15, color: 'purple' },
    { nameEn: 'Sylhet', nameBn: 'সিলেট', share: 5, volume: '৳২৪,৫০০', count: 9, color: 'teal' },
    { nameEn: 'Khulna', nameBn: 'খুলনা', share: 4, volume: '৳১৯,৬০০', count: 8, color: 'orange' },
    { nameEn: 'Mymensingh', nameBn: 'ময়মনসিংহ', share: 2, volume: '৳৯,৮০০', count: 4, color: 'rose' },
    { nameEn: 'Barishal', nameBn: 'বরিশাল', share: 1, volume: '৳৪,৯০০', count: 2, color: 'indigo' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              {isBn ? '৬৪ জেলা লাইভ জিও-ট্রেসার ও অর্ডার রাডার' : '64-District Live Geo-Tracer & Order Origin Radar'}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <span>{isBn ? 'গ্রাহক অর্ডার লাইভ অরিজিন ম্যাপ (বাংলাদেশ)' : 'Customer Live Order Geolocation Radar'}</span>
          </h2>
          <p className="text-xs text-slate-400">
            {isBn
              ? 'সারাদেশের সকল জেলা ও উপজেলা থেকে কাস্টমাররা যেখান থেকে অর্ডার দিচ্ছেন তাদের লাইভ আইপি লোকেশন, ডিভিশন ভলিউম এবং ম্যাপ ট্র্যাকিং।'
              : 'Real-time telemetry showing live customer order origins, geo-IP coordinates, and division dispatch shares across Bangladesh.'}
          </p>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">
              {isBn ? 'সেন্ট্রাল হেডকোয়ার্টার' : 'Central HQ'}
            </p>
            <p className="text-xs font-black text-emerald-400 font-mono">
              রৌমারী, কুড়িগ্রাম, রংপুর
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-black text-xs">
            HQ
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Live Incoming Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Bangladesh SVG Radar Map Canvas */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800/90 p-5 relative overflow-hidden flex flex-col justify-between shadow-inner min-h-[420px]">
          {/* Radar Background & Grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Top Map HUD Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE GEO-TELEMETRY • BD GRID</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              64 Districts • 8 Divisions Covered
            </span>
          </div>

          {/* Simulated Bangladesh Country Outline & Live Radar Pins */}
          <div className="relative my-4 h-72 sm:h-80 w-full flex items-center justify-center">
            {/* SVG Bangladesh Map Path Vector Graphic */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full max-h-72 stroke-emerald-800/40 fill-slate-900/60 drop-shadow-[0_0_25px_rgba(16,185,129,0.15)]"
            >
              {/* Stylized Bangladesh Boundary Contour */}
              <polygon
                points="36,12 48,15 56,22 72,20 84,30 82,44 76,56 78,74 72,88 58,82 46,88 34,80 32,66 22,54 24,36 34,22"
                strokeWidth="1.2"
                stroke="#10b981"
                fill="#041f17"
                fillOpacity="0.45"
              />
              {/* Division internal boundary lines */}
              <line x1="36" y1="22" x2="52" y2="40" stroke="#064e3b" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="52" y1="40" x2="76" y2="56" stroke="#064e3b" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="52" y1="40" x2="46" y2="88" stroke="#064e3b" strokeWidth="0.8" strokeDasharray="2 2" />
            </svg>

            {/* Hub Head Office Marker (Rowmari, Kurigram) */}
            <div
              className="absolute z-20 flex flex-col items-center"
              style={{ left: '42%', top: '18%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-lg shadow-amber-400/50 ring-2 ring-amber-300">
                  HQ
                </div>
                <div className="absolute -inset-1 rounded-full border border-amber-400 animate-ping pointer-events-none" />
              </div>
              <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full mt-1 whitespace-nowrap shadow">
                রৌমারী হেডকোয়ার্টার
              </span>
            </div>

            {/* Live Incoming Order Pins on Map */}
            {liveOrders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => setActivePin(ord)}
                className="absolute z-30 cursor-pointer group flex flex-col items-center transition hover:scale-125"
                style={{
                  left: `${ord.coordinates.x}%`,
                  top: `${ord.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/80 ring-2 ring-emerald-300 animate-pulse">
                    <MapPin className="w-3 h-3 fill-white" />
                  </div>
                  <div className="absolute -inset-1.5 rounded-full border border-emerald-400/80 animate-ping pointer-events-none" />
                </div>
                <span className="text-[9px] font-bold bg-slate-950/90 text-white px-1.5 py-0.5 rounded border border-slate-700 mt-1 whitespace-nowrap opacity-90 group-hover:opacity-100 shadow">
                  {ord.district.split(' ')[0]} (৳{ord.amount})
                </span>
              </div>
            ))}
          </div>

          {/* Active Pin Detailed Card Preview */}
          {activePin && (
            <div className="relative z-20 bg-slate-900 border border-emerald-500/60 p-3.5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-emerald-400">#{activePin.orderNumber}</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    {activePin.paymentMethod}
                  </span>
                </div>
                <p className="text-xs font-bold text-white">
                  {activePin.customerName} • {activePin.phone}
                </p>
                <p className="text-[11px] text-slate-400">
                  {activePin.thana}, {activePin.district} ({activePin.division})
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  IP Geo: {activePin.ipOrigin}
                </p>
              </div>

              <div className="text-right sm:self-center">
                <span className="text-base font-black text-white font-mono block">
                  ৳{activePin.amount}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">{activePin.timestamp}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right 5 cols: 8-Division Volume Share & Live Telemetry Feed */}
        <div className="lg:col-span-5 space-y-4">
          {/* Division Breakdown Bars */}
          <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? 'বিভাগভিত্তিক সেলস ভলিউম ও শেয়ার' : 'Division-wise Order Shares'}</span>
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">100% Nationwide</span>
            </div>

            <div className="space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {divisionStats.map((div, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">
                      {isBn ? div.nameBn : div.nameEn}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">
                      {div.volume} ({div.share}%) • {div.count} {isBn ? 'অর্ডার' : 'orders'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${div.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Recent Customer Orders Origin List */}
          <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{isBn ? 'সর্বশেষ গ্রাহক অর্ডারের উৎস' : 'Live Order Telemetry Feed'}</span>
              </h4>
              <span className="text-[10px] font-mono text-slate-400">Live Pulse</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
              {liveOrders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => setActivePin(ord)}
                  className={`p-2.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-2 ${
                    activePin?.id === ord.id
                      ? 'bg-emerald-950/60 border-emerald-500'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center font-mono font-black text-xs flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white truncate max-w-[140px] sm:max-w-[160px]">
                        {ord.customerName}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {ord.district} • <span className="text-emerald-400">{ord.timestamp}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-black text-xs text-white">৳{ord.amount}</span>
                    <span className="block text-[9px] text-slate-400">{ord.paymentMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
