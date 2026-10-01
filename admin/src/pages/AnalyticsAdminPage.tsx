import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  CreditCard,
  MapPin,
  Sparkles,
  Download,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Users,
} from 'lucide-react';
import { api } from '../services/api';
import { BangladeshOrderHeatmap } from '../components/BangladeshOrderHeatmap';

export const AnalyticsAdminPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '1y'>('30d');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/analytics');
      if (res.data.success) {
        setData(res.data.analytics);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBDT = (amount: number) => {
    return '৳' + Number(amount || 0).toLocaleString('en-BD');
  };

  const handleExportCSV = () => {
    if (!data) return;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Value\n' +
      `Total Revenue,${data.totalRevenue}\n` +
      `Total Orders,${data.totalOrdersCount}\n` +
      `Cash on Delivery Orders,${data.codCount}\n` +
      `Digital Payment Orders,${data.digitalPaymentCount}\n` +
      `Dhaka Region Orders,${data.dhakaOrders}\n` +
      `Outside Dhaka Orders,${data.outsideDhakaOrders}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ShopX_Analytics_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Live Business Intelligence & Financial Analytics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Financial & Sales Analytics Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-vendor GMV, district-wise dispatch volumes, and payment gateways performance across Bangladesh.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Audit</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400">Total Net GMV</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-white font-mono">{formatBDT(data?.totalRevenue || 0)}</h3>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% this month
            </span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400">Total Orders Fulfilled</span>
            <div className="w-9 h-9 rounded-2xl bg-blue-950/80 border border-blue-800 text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-white font-mono">{data?.totalOrdersCount || 0}</h3>
            <span className="text-[11px] text-blue-400 font-semibold flex items-center gap-1 mt-1">
              Across all 64 districts
            </span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400">COD vs Digital Share</span>
            <div className="w-9 h-9 rounded-2xl bg-purple-950/80 border border-purple-800 text-purple-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-black text-white font-mono">
              COD: {data?.codCount || 0} | Online: {data?.digitalPaymentCount || 0}
            </h3>
            <span className="text-[11px] text-purple-400 font-semibold flex items-center gap-1 mt-1">
              bKash, Nagad & SSL 100% Secured
            </span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400">Regional Coverage</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-950/80 border border-amber-800 text-amber-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-black text-white font-mono">
              Dhaka: {data?.dhakaOrders || 0} | Nationwide: {data?.outsideDhakaOrders || 0}
            </h3>
            <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 mt-1">
              Head Hub: Rowmari, Kurigram
            </span>
          </div>
        </div>
      </div>

      {/* Live Bangladesh Customer Order Origin Heatmap & Telemetry */}
      <BangladeshOrderHeatmap />

      {/* Top Products & Top Vendors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Selling Flagship Products */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Top Revenue Flagship Products</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Top 10 High Volume</span>
          </div>

          <div className="space-y-3">
            {(data?.topProducts || []).map((prod: any, i: number) => (
              <div
                key={prod.id || i}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center font-mono">
                    #{i + 1}
                  </span>
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-10 h-10 object-cover rounded-xl bg-slate-900 border border-slate-800"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white truncate max-w-[180px] sm:max-w-xs">{prod.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Unit: {formatBDT(prod.price)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-emerald-400 font-mono">{formatBDT(prod.revenue)}</p>
                  <span className="text-[10px] text-slate-400">{prod.soldCount} Units Sold</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top SaaS Vendors by Revenue */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Top SaaS Multi-Vendors</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Verified Stores</span>
          </div>

          <div className="space-y-3">
            {(data?.topVendors || []).map((vendor: any, i: number) => (
              <div
                key={vendor.id || i}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-emerald-950 text-emerald-400 font-black text-xs flex items-center justify-center font-mono">
                    #{i + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{vendor.storeName}</h4>
                    <span className="text-[10px] text-amber-400 flex items-center gap-1 font-bold">
                      ⭐ {vendor.rating || 4.9} Rating • {vendor.totalSales || 0} Total Orders
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-emerald-400 font-mono">{formatBDT(vendor.totalRevenue || 0)}</p>
                  <span className="text-[10px] text-slate-400 font-mono">Store GMV</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
