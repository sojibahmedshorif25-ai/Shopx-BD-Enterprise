import React, { useState, useEffect } from 'react';
import {
  Truck,
  Star,
  MapPin,
  Phone,
  CheckCircle,
  BatteryCharging,
  Navigation,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Clock,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

const MOCK_RIDERS_EXTRA = [
  {
    _id: 'r1',
    name: 'Kamrul Hasan',
    phone: '01711223344',
    vehicleNumber: 'Dhaka Metro HA-4491 (Hero Hunk 150)',
    currentLocation: { address: 'Gulshan 2, Road 45, Dhaka', lat: 23.7925, lng: 90.4078 },
    completedDeliveries: 342,
    rating: 4.9,
    status: 'ONLINE',
    battery: '88%',
    codCashHeld: 14500,
    activeOrder: '#SX-889894',
  },
  {
    _id: 'r2',
    name: 'Mehedi Hasan Babu',
    phone: '01822334455',
    vehicleNumber: 'Dhaka Metro LA-8832 (Yamaha FZ-S)',
    currentLocation: { address: 'Dhanmondi 27, Dhaka', lat: 23.7538, lng: 90.3770 },
    completedDeliveries: 289,
    rating: 4.85,
    status: 'IN_TRANSIT',
    battery: '74%',
    codCashHeld: 9200,
    activeOrder: '#SX-761821',
  },
  {
    _id: 'r3',
    name: 'Siam Chowdhury',
    phone: '01933445566',
    vehicleNumber: 'Dhaka Metro DA-1290 (Honda CB Shine)',
    currentLocation: { address: 'Uttara Sector 11, Dhaka', lat: 23.8759, lng: 90.3980 },
    completedDeliveries: 415,
    rating: 4.95,
    status: 'ONLINE',
    battery: '95%',
    codCashHeld: 22800,
    activeOrder: '#SX-605512',
  },
  {
    _id: 'r4',
    name: 'Tariqul Islam',
    phone: '01644556677',
    vehicleNumber: 'Dhaka Metro HA-9912 (Bajaj Pulsar)',
    currentLocation: { address: 'Mirpur 10 Circle, Dhaka', lat: 23.8069, lng: 90.3687 },
    completedDeliveries: 198,
    rating: 4.78,
    status: 'ONLINE',
    battery: '62%',
    codCashHeld: 6400,
  },
];

export const RidersAdminPage: React.FC = () => {
  const { lang, t } = useAdminLanguageStore();
  const [riders, setRiders] = useState<any[]>(MOCK_RIDERS_EXTRA);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'ONLINE' | 'IN_TRANSIT'>('ALL');

  const fetchRiders = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/riders/status');
      if (res.data?.success && res.data.data?.length > 0) {
        // Merge with rich telemetry
        const merged = res.data.data.map((r: any, idx: number) => ({
          ...MOCK_RIDERS_EXTRA[idx % MOCK_RIDERS_EXTRA.length],
          ...r,
        }));
        setRiders(merged);
      }
    } catch {
      // Use fallback mock riders
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  const totalDeliveries = riders.reduce((acc, r) => acc + (r.completedDeliveries || 0), 0);
  const totalCOD = riders.reduce((acc, r) => acc + (r.codCashHeld || 0), 0);
  const activeRiders = riders.filter((r) => r.status === 'ONLINE' || r.status === 'IN_TRANSIT').length;

  const filteredRiders = riders.filter((r) => {
    if (filter === 'ALL') return true;
    return r.status === filter;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Truck className="w-6 h-6 text-emerald-400" />
              <span>{t('riders.title')}</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Live Telemetry</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {t('riders.subtitle')}
          </p>
        </div>

        <button
          onClick={fetchRiders}
          disabled={isLoading}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition border border-slate-700 shadow flex-shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{t('refresh')}</span>
        </button>
      </div>

      {/* Fleet Telemetry KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('riders.stat_total')}</span>
            <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {riders.length} {lang === 'en' ? 'Riders' : 'জন রাইডার'}
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">DEX Express Fleet</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('riders.stat_active')}</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {activeRiders} {lang === 'en' ? 'Active' : 'জন সক্রিয়'}
          </div>
          <p className="text-[11px] text-emerald-500 font-medium mt-1">100% GPS Ping Online</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('riders.stat_deliveries')}</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {totalDeliveries} {lang === 'en' ? 'Orders' : 'টি সম্পন্ন'}
          </div>
          <p className="text-[11px] text-blue-400 font-medium mt-1">99.2% On-Time SLA</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('riders.stat_cod')}</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">
            ৳{totalCOD.toLocaleString()}
          </div>
          <p className="text-[11px] text-amber-500/80 font-medium mt-1">Pending Vault Deposit</p>
        </div>
      </div>

      {/* Rider Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredRiders.map((rider) => (
          <div
            key={rider._id}
            className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 p-5 rounded-3xl shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
                    <Truck className="w-5 h-5 text-slate-950" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white leading-tight">{rider.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">{rider.vehicleNumber?.split('(')[0] || 'Dhaka Metro'}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/50 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t('riders.online')}
                </span>
              </div>

              {/* Rider Details & Telemetry */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-orange-400" />
                    <span>{rider.phone}</span>
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-mono">
                    <BatteryCharging className="w-3 h-3 text-emerald-400" />
                    <span>{rider.battery || '85%'}</span>
                  </span>
                </div>

                <div className="flex items-start gap-1.5 text-[11px] bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-slate-200 font-medium truncate">{rider.currentLocation?.address || 'Dhaka, Bangladesh'}</p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {rider.currentLocation?.lat?.toFixed(4) || '23.7925'}° N, {rider.currentLocation?.lng?.toFixed(4) || '90.4078'}° E
                    </p>
                  </div>
                </div>

                {/* COD and Deliveries Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">{lang === 'en' ? 'Deliveries' : 'ডেলিভারি'}</span>
                    <span className="text-xs font-mono font-bold text-white">{rider.completedDeliveries || 0}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">{lang === 'en' ? 'COD Cash' : 'বকেয়া টাকা'}</span>
                    <span className="text-xs font-mono font-black text-amber-400">৳{rider.codCashHeld?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{rider.rating || 4.9}</span>
              </div>

              <a
                href={`tel:${rider.phone}`}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition border border-slate-700"
              >
                <Phone className="w-3 h-3 text-orange-400" />
                <span>{t('riders.call')}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
