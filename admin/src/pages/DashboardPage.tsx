import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  ShoppingCart,
  Store,
  Package,
  Truck,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { api } from '../services/api';
import { useAdminAuthStore } from '../store/useAdminAuthStore';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const DashboardPage: React.FC = () => {
  const { user } = useAdminAuthStore();
  const { lang, t } = useAdminLanguageStore();
  const isAdmin = user?.role === 'admin';

  const chartData = [
    { name: lang === 'en' ? 'Sat' : 'শনিবার', gmv: 45000, commission: 2250 },
    { name: lang === 'en' ? 'Sun' : 'রবিবার', gmv: 52000, commission: 2600 },
    { name: lang === 'en' ? 'Mon' : 'সোমবার', gmv: 61000, commission: 3050 },
    { name: lang === 'en' ? 'Tue' : 'মঙ্গলবার', gmv: 58000, commission: 2900 },
    { name: lang === 'en' ? 'Wed' : 'বুধবার', gmv: 74000, commission: 3700 },
    { name: lang === 'en' ? 'Thu' : 'বৃহস্পতিবার', gmv: 89000, commission: 4450 },
    { name: lang === 'en' ? 'Fri' : 'শুক্রবার', gmv: 112000, commission: 5600 },
  ];

  const [stats, setStats] = useState<any>({
    totalGMV: 491000,
    totalCommissionEarned: 24550,
    totalOrders: 184,
    totalProducts: 26,
    totalVendors: 4,
    totalRiders: 8,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (isAdmin) {
          const res = await api.get('/admin/stats');
          if (res.data.success) {
            setStats(res.data.stats);
          }
        } else {
          const res = await api.get('/vendor/dashboard');
          if (res.data.success) {
            setStats({
              totalGMV: res.data.data.stats.totalRevenue,
              totalCommissionEarned: res.data.data.stats.balance,
              totalOrders: res.data.data.stats.ordersCount,
              totalProducts: res.data.data.stats.productsCount,
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [isAdmin]);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {t('dash.welcome')} {user?.name || 'Administrator'}!
            </h1>
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-sm">
              {isAdmin ? t('super_admin') : t('vendor_portal')}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {t('dash.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-2 rounded-2xl border border-slate-700/80 shadow">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-200">{t('dash.ai_optimized')}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400">
                {isAdmin ? t('dash.kpi_gmv') : (lang === 'en' ? 'Total Store Revenue' : 'মোট বিক্রয় রাজস্ব')}
              </p>
              <h3 className="text-2xl font-black text-white mt-1 font-mono">
                ৳{stats.totalGMV?.toLocaleString() || '0'}
              </h3>
            </div>
            <div className="p-3 bg-emerald-950/60 text-emerald-400 rounded-2xl border border-emerald-800/40">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-emerald-400 font-bold mt-3 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> {t('dash.kpi_gmv_sub')}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400">
                {isAdmin ? t('dash.kpi_revenue') : (lang === 'en' ? 'Wallet Balance' : 'আপনার ওয়ালেট ব্যালেন্স')}
              </p>
              <h3 className="text-2xl font-black text-orange-400 mt-1 font-mono">
                ৳{stats.totalCommissionEarned?.toLocaleString() || '0'}
              </h3>
            </div>
            <div className="p-3 bg-orange-950/60 text-orange-400 rounded-2xl border border-orange-800/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-orange-400 font-bold mt-3">{t('dash.kpi_fee')}</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400">{t('dash.kpi_orders')}</p>
              <h3 className="text-2xl font-black text-white mt-1 font-mono">
                {stats.totalOrders || 0} {lang === 'en' ? 'Orders' : 'টি'}
              </h3>
            </div>
            <div className="p-3 bg-blue-950/60 text-blue-400 rounded-2xl border border-blue-800/40">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-blue-400 font-bold mt-3">{t('dash.kpi_tracking')}</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400">{t('dash.kpi_products')}</p>
              <h3 className="text-2xl font-black text-white mt-1 font-mono">
                {stats.totalProducts || 0} {lang === 'en' ? 'SKUs' : 'টি'}
              </h3>
            </div>
            <div className="p-3 bg-purple-950/60 text-purple-400 rounded-2xl border border-purple-800/40">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-purple-400 font-bold mt-3">{t('dash.kpi_organic')}</p>
        </div>
      </div>

      {/* Revenue Area Chart */}
      <div className="bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">{t('dash.sales_trend')}</h3>
            <p className="text-xs text-slate-400">{t('dash.sales_trend_sub')}</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" textAnchor="middle" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="gmv" stroke="#f97316" fillOpacity={1} fill="url(#gmvGrad)" name={lang === 'en' ? 'Sales (৳)' : 'বিক্রয় (৳)'} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
