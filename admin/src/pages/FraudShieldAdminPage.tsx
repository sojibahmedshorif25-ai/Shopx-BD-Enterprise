import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  UserX,
  Phone,
  Eye,
  CheckCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { api } from '../services/api';

export const FraudShieldAdminPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFraudStats();
  }, []);

  const fetchFraudStats = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/fraud-shield');
      if (res.data.success) {
        setData(res.data.fraudStats);
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
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
              AI Fraud Shield & Risk Prevention Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Security & Anti-Fraud Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated screening for fake COD orders, suspicious high-value orders, and customer risk scoring.
          </p>
        </div>

        <button
          onClick={fetchFraudStats}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Scan</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">Active High-Risk Flags</span>
            <div className="w-8 h-8 rounded-xl bg-rose-950/80 text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-white font-mono mt-2">{data?.totalSuspiciousOrders || 0}</h3>
          <p className="text-[11px] text-rose-400 mt-1 font-semibold">Flagged for verification</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">Blacklisted Accounts</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950/80 text-amber-400 flex items-center justify-center">
              <UserX className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-white font-mono mt-2">{data?.blacklistedAccounts || 0}</h3>
          <p className="text-[11px] text-amber-400 mt-1 font-semibold">Zero-tolerance banned</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">Firewall & 2FA Status</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-base font-black text-emerald-400 font-mono mt-2">100% Armed & Active</h3>
          <p className="text-[11px] text-slate-400 mt-1">256-Bit SSL & SMTP OTP Enabled</p>
        </div>
      </div>

      {/* High-Risk Orders Screened Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black text-white">Screened High-Value & High-Risk Orders</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Live Risk Score</span>
        </div>

        {/* Mobile Screen Cards */}
        <div className="block sm:hidden space-y-3">
          {(data?.highRiskOrders || []).map((ord: any) => (
            <div
              key={ord._id}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-emerald-400">#{ord.orderId}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px] font-bold">
                  ⚠️ High Value Check
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-white">{ord.customerInfo?.name}</p>
                <p className="text-[11px] font-mono text-slate-400">{ord.customerInfo?.phone} • {ord.customerInfo?.city}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                <div>
                  <span className="text-[10px] text-slate-500 block">Total Amount</span>
                  <span className="text-sm font-black text-white font-mono">৳{Number(ord.totalAmount).toLocaleString()}</span>
                  <span className="text-[10px] text-amber-400 font-bold uppercase ml-1.5">({ord.paymentMethod})</span>
                </div>

                <a
                  href={`tel:${ord.customerInfo?.phone}`}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-emerald-700/20"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Customer
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Screen Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 min-w-[700px]">
            <thead className="text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 bg-slate-950/50">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone & Location</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Method</th>
                <th className="p-3">Risk Assessment</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {(data?.highRiskOrders || []).map((ord: any) => (
                <tr key={ord._id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-emerald-400">#{ord.orderId}</td>
                  <td className="p-3 font-bold text-white">{ord.customerInfo?.name}</td>
                  <td className="p-3 font-mono">
                    <p className="text-slate-200">{ord.customerInfo?.phone}</p>
                    <span className="text-[10px] text-slate-400">{ord.customerInfo?.city}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-white">৳{Number(ord.totalAmount).toLocaleString()}</td>
                  <td className="p-3 uppercase font-bold text-amber-400">{ord.paymentMethod}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px] font-bold">
                      ⚠️ High Value Order Check
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <a
                      href={`tel:${ord.customerInfo?.phone}`}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> Call to Verify
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
