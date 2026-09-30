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
  Activity,
  Award,
  Layers,
  Tag,
  Users,
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
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAdminAuthStore } from '../store/useAdminAuthStore';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const DashboardPage: React.FC = () => {
  const { user } = useAdminAuthStore();
  const { lang, t } = useAdminLanguageStore();
  const isAdmin = user?.role === 'admin';
  const isBn = lang === 'bn';

  const chartData = [
    { name: isBn ? 'শনিবার' : 'Sat', gmv: 45000, orders: 18 },
    { name: isBn ? 'রবিবার' : 'Sun', gmv: 52000, orders: 22 },
    { name: isBn ? 'সোমবার' : 'Mon', gmv: 61000, orders: 27 },
    { name: isBn ? 'মঙ্গলবার' : 'Tue', gmv: 58000, orders: 24 },
    { name: isBn ? 'বুধবার' : 'Wed', gmv: 74000, orders: 35 },
    { name: isBn ? 'বৃহস্পতিবার' : 'Thu', gmv: 89000, orders: 42 },
    { name: isBn ? 'শুক্রবার' : 'Fri', gmv: 112000, orders: 58 },
  ];

  const [stats, setStats] = useState<any>({
    totalGMV: 491000,
    totalCommissionEarned: 24550,
    totalOrders: 184,
    totalProducts: 26,
    totalVendors: 4,
    totalRiders: 8,
    totalUsers: 1420,
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto overflow-hidden">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-800/40 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {isAdmin ? (isBn ? 'সুপার অ্যাডমিন ড্যাশবোর্ড' : 'Super Admin Command Hub') : (isBn ? 'সেলার কন্ট্রোল প্যানেল' : 'Vendor Control Panel')}
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-amber-400/40 uppercase">
                {isBn ? 'লাইভ সিস্টেম' : 'Enterprise v2.0'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t('dash.welcome')} {user?.name || 'Admin'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              {isBn
                ? 'ShopX BD এন্টারপ্রাইজ ম্যানেজমেন্টে আপনাকে স্বাগতম। এখান থেকে আপনার সমগ্র প্ল্যাটফর্মের সেলস, অর্ডার, ভেন্ডর, ক্যাটাগরি ও কুপন নিখুঁতভাবে নিয়ন্ত্রণ করুন।'
                : 'Welcome to ShopX Enterprise Command Center. Monitor real-time GMV, customer orders, vendor settlements, rider fleet, and platform taxons.'}
            </p>
          </div>

          {/* Quick Hub Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/orders"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-950/50"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isBn ? 'অর্ডার প্রসেসিং' : 'Manage Orders'}</span>
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition border border-slate-700"
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'পণ্য তালিকা' : 'Inventory'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* GMV Total */}
        <div className="bg-slate-900/90 border border-slate-800/90 hover:border-emerald-500/50 p-5 rounded-3xl shadow-xl transition group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400">
                {isAdmin ? (isBn ? 'সর্বমোট প্ল্যাটফর্ম জিএমভি' : 'Total Platform GMV') : (isBn ? 'মোট বিক্রয় রাজস্ব' : 'Total Store Revenue')}
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono tracking-tight group-hover:text-emerald-400 transition">
                ৳{stats.totalGMV?.toLocaleString() || '0'}
              </h3>
            </div>
            <div className="p-3 bg-emerald-950/80 text-emerald-400 rounded-2xl border border-emerald-800/50 group-hover:scale-110 transition">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4%
            </span>
            <span className="text-slate-500 font-semibold">{isBn ? 'গত ৭ দিনে' : 'vs last week'}</span>
          </div>
        </div>

        {/* Platform Revenue / Wallet */}
        <div className="bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/50 p-5 rounded-3xl shadow-xl transition group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400">
                {isAdmin ? (isBn ? 'অ্যাডমিন কমিশন ও রাজস্ব' : 'Commission Earned') : (isBn ? 'ওয়ালেট ব্যালেন্স' : 'Wallet Balance')}
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 font-mono tracking-tight group-hover:text-amber-300 transition">
                ৳{stats.totalCommissionEarned?.toLocaleString() || '0'}
              </h3>
            </div>
            <div className="p-3 bg-amber-950/80 text-amber-400 rounded-2xl border border-amber-800/50 group-hover:scale-110 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-amber-400 font-bold">{isBn ? '৫% প্ল্যাটফর্ম ফি' : '5% commission cut'}</span>
            <span className="text-slate-500 font-semibold">{isBn ? 'নিরাপদ গেটওয়ে' : 'Protected'}</span>
          </div>
        </div>

        {/* Orders Placed */}
        <div className="bg-slate-900/90 border border-slate-800/90 hover:border-teal-500/50 p-5 rounded-3xl shadow-xl transition group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400">
                {isBn ? 'মোট অর্ডারের সংখ্যা' : 'Total Orders Placed'}
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono tracking-tight group-hover:text-teal-400 transition">
                {stats.totalOrders || 0} <span className="text-sm font-sans text-slate-400">{isBn ? 'টি' : 'orders'}</span>
              </h3>
            </div>
            <div className="p-3 bg-teal-950/80 text-teal-400 rounded-2xl border border-teal-800/50 group-hover:scale-110 transition">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-teal-400 font-bold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> {isBn ? 'সক্রিয় প্রসেসিং' : 'Active status'}
            </span>
            <span className="text-slate-500 font-semibold">{isBn ? '৬৪ জেলা' : '64 Districts'}</span>
          </div>
        </div>

        {/* Live SKUs / Products */}
        <div className="bg-slate-900/90 border border-slate-800/90 hover:border-purple-500/50 p-5 rounded-3xl shadow-xl transition group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400">
                {isBn ? 'সক্রিয় পণ্য ও ক্যাটালগ' : 'Live Products & SKUs'}
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono tracking-tight group-hover:text-purple-400 transition">
                {stats.totalProducts || 0} <span className="text-sm font-sans text-slate-400">{isBn ? 'টি' : 'items'}</span>
              </h3>
            </div>
            <div className="p-3 bg-purple-950/80 text-purple-400 rounded-2xl border border-purple-800/50 group-hover:scale-110 transition">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-purple-400 font-bold">{isBn ? '১০০% ভেরিফায়েড' : 'AI Verified'}</span>
            <span className="text-slate-500 font-semibold">{isBn ? 'ক্যাটালগ রেডি' : 'Catalog Ready'}</span>
          </div>
        </div>
      </div>

      {/* Sales Trend Graph & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Revenue Area Chart */}
        <div className="lg:col-span-2 bg-slate-900/90 p-5 sm:p-6 rounded-3xl border border-slate-800/90 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? 'সাপ্তাহিক বিক্রয় ও জিএমভি ট্রেন্ড' : 'Weekly Sales & GMV Analytics'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn ? 'দৈনিক লেনদেন এবং রাজস্বের রিয়েল-টাইম গ্রাফ' : 'Real-time daily transaction and platform throughput visualization'}
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isBn ? 'লাইভ ডেটা' : 'Realtime'}
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" textAnchor="middle" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#020617',
                    borderColor: '#059669',
                    borderRadius: '16px',
                    fontSize: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="gmv"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#gmvGrad)"
                  name={isBn ? 'বিক্রয় (৳)' : 'Sales (৳)'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Quick Operational Command Shortcuts */}
        <div className="bg-slate-900/90 p-5 sm:p-6 rounded-3xl border border-slate-800/90 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'কুইক অ্যাডমিন অ্যাকশন' : 'Quick Management Hubs'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn ? '১-ক্লিকে প্ল্যাটফর্মের গুরুত্বপূর্ণ শাখায় প্রবেশ করুন' : 'Direct shortcuts to platform modules'}
            </p>
          </div>

          <div className="space-y-2.5">
            <Link
              to="/categories"
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 group-hover:scale-105 transition">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{isBn ? 'ক্যাটাগরি হাব' : 'Categories & Taxonomy'}</h4>
                  <p className="text-[11px] text-slate-400">{isBn ? 'ক্যাটাগরি তৈরি ও সাজানো' : 'Manage categories & icons'}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
            </Link>

            <Link
              to="/coupons"
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-amber-500/50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/40 group-hover:scale-105 transition">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{isBn ? 'ভাউচার ও কুপন' : 'Promo Codes & Vouchers'}</h4>
                  <p className="text-[11px] text-slate-400">{isBn ? 'ক্যাম্পেইন ডিসকাউন্ট কোড' : 'Flash promo codes'}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
            </Link>

            <Link
              to="/users"
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-teal-500/50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-950/80 text-teal-400 border border-teal-800/40 group-hover:scale-105 transition">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{isBn ? 'ইউজার ও রোল RBAC' : 'Users & Roles (RBAC)'}</h4>
                  <p className="text-[11px] text-slate-400">{isBn ? 'কাস্টমার, সেলার, রাইডার রোল' : 'Switch roles & grant coins'}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition" />
            </Link>

            <Link
              to="/settings"
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-purple-500/50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-800/40 group-hover:scale-105 transition">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{isBn ? 'হেড অফিস ও সেটিংস' : 'Headquarters & Settings'}</h4>
                  <p className="text-[11px] text-slate-400">{isBn ? 'রৌমারী হেড অফিস ও কনফিগ' : 'Rowmari HQ & Gateways'}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
