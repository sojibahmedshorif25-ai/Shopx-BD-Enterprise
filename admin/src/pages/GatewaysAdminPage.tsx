import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  RefreshCw,
  Zap,
  Server,
  Truck,
  CreditCard,
  Mail,
  ShieldCheck,
  Wifi,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const GatewaysAdminPage: React.FC = () => {
  const [gateways, setGateways] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useAdminLanguageStore();
  const isBn = lang === 'bn';

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/gateways');
      if (res.data.success) {
        setGateways(res.data.gateways || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              {isBn ? 'পেমেন্ট ও লজিস্টিকস গেটওয়ে হেলথ' : 'Payment & Courier API Health Monitor'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isBn ? 'গেটওয়ে ও থার্ড-পার্টি ইন্টিগ্রেশন স্ট্যাটাস' : 'Gateway & Integration Health Console'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? 'বিকাশ, নগদ, স্ট্রাইপ, স্টিডফাস্ট, পাঠাও এবং জিমেইল এসএমটিপি কানেকশনের রিয়েলটাইম পিং ও লেটেন্সি।'
              : 'Live operational status, latency metrics, and uptime across all external microservice APIs.'}
          </p>
        </div>

        <button
          onClick={fetchGateways}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700/60 shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isBn ? 'পিং ও রিফ্রেশ' : 'Ping All Gateways'}</span>
        </button>
      </div>

      {/* Grid of Gateways */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {gateways.map((gw, idx) => (
          <div
            key={idx}
            className="bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4 transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    gw.type === 'Payment'
                      ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                      : gw.type === 'Logistics'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                      : 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60'
                  }`}
                >
                  {gw.type === 'Payment' ? (
                    <CreditCard className="w-5 h-5" />
                  ) : gw.type === 'Logistics' ? (
                    <Truck className="w-5 h-5" />
                  ) : (
                    <Mail className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{gw.name}</h3>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">{gw.type} Hub</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-[10px] font-bold font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {gw.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                <span className="text-[10px] text-slate-500 block font-semibold">Response Latency</span>
                <span className="text-xs font-mono font-black text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Zap className="w-3 h-3" /> {gw.latency}
                </span>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                <span className="text-[10px] text-slate-500 block font-semibold">30-Day SLA Uptime</span>
                <span className="text-xs font-mono font-black text-white flex items-center gap-1 mt-0.5">
                  <Activity className="w-3 h-3 text-cyan-400" /> {gw.uptime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
