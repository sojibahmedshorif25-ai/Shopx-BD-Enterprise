import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Send,
  MessageCircle,
  RefreshCw,
  Clock,
  DollarSign,
  User,
  Phone,
  CheckCircle2,
  Sparkles,
  Ticket,
  AlertCircle,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const AbandonedCartsAdminPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [carts, setCarts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { lang } = useAdminLanguageStore();
  const isBn = lang === 'bn';

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/abandoned-carts');
      if (res.data.success) {
        setData(res.data.stats);
        setCarts(res.data.abandonedCarts || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendRecoveryOffer = async (id: string, phone: string, name: string) => {
    try {
      setSendingId(id);
      const res = await api.post(`/admin/abandoned-carts/${id}/recover`, {
        couponCode: 'RECOVER10',
        discountPercent: 10,
      });

      if (res.data.success) {
        setSuccessMessage(`Recovery offer dispatched to ${name} (${phone})!`);
        setCarts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, recoveryStatus: 'Discount_Sent' } : c))
        );
        setTimeout(() => setSuccessMessage(null), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              {isBn ? 'কার্ট রিকভারি ও সেলস রি-এনগেজমেন্ট' : 'Cart Recovery & Sales Conversion Engine'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isBn ? 'অ্যাবান্ডনড কার্ট রিকভারি হাব' : 'Abandoned Cart Recovery'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? 'যে সকল কাস্টমার কার্টে পণ্য রেখে চেকআউট সম্পন্ন করেননি তাদের অটোমেটিক ডিসকাউন্ট অফার পাঠান।'
              : 'Recover lost revenue by sending automated SMS & WhatsApp recovery discounts to abandoned shoppers.'}
          </p>
        </div>

        <button
          onClick={fetchCarts}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700/60 shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isBn ? 'রিফ্রেশ কার্ট ডাটা' : 'Scan Abandoned Carts'}</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-bold">{successMessage}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">Pending Abandoned Carts</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950/80 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-white font-mono mt-2">{data?.totalAbandoned || 0}</h3>
          <p className="text-[11px] text-amber-400 mt-1 font-semibold">Shoppers waiting for checkout</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">Potential Lost Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-rose-950/80 text-rose-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-rose-400 font-mono mt-2">
            ৳{Number(data?.potentialRevenue || 0).toLocaleString()}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 font-semibold">Recoverable pipeline value</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">Recovered Shoppers</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-emerald-400 font-mono mt-2">{data?.recoveredCount || 0}</h3>
          <p className="text-[11px] text-emerald-400 mt-1 font-semibold">Orders successfully completed</p>
        </div>
      </div>

      {/* Abandoned Carts List Container */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-black text-white">{isBn ? 'অ্যাবান্ডনড কার্ট লিস্ট' : 'Active Cart Sessions'}</h3>

        {/* Mobile View */}
        <div className="block sm:hidden space-y-3">
          {carts.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-amber-400">{c.id}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    c.recoveryStatus === 'Discount_Sent'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                  }`}
                >
                  {c.recoveryStatus}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-white">{c.customerName}</p>
                <p className="text-[11px] font-mono text-slate-400">{c.phone} • {c.city}</p>
              </div>

              <div className="text-xs text-slate-300 space-y-1 bg-slate-900 p-2.5 rounded-xl">
                {c.items.map((item: any, idx: number) => (
                  <p key={idx} className="truncate">
                    • {item.title} (x{item.quantity}) - ৳{item.price}
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                <div>
                  <span className="text-[10px] text-slate-500 block">Cart Total</span>
                  <span className="text-sm font-black text-white font-mono">৳{Number(c.cartTotal).toLocaleString()}</span>
                </div>

                <button
                  onClick={() => handleSendRecoveryOffer(c.id, c.phone, c.customerName)}
                  disabled={sendingId === c.id}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send Offer</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 min-w-[760px]">
            <thead className="text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 bg-slate-950/50">
              <tr>
                <th className="p-3.5">Cart ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Cart Items</th>
                <th className="p-3.5">Total Value</th>
                <th className="p-3.5">Last Active</th>
                <th className="p-3.5">Recovery Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {carts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 font-mono font-bold text-amber-400">{c.id}</td>
                  <td className="p-3.5">
                    <p className="font-bold text-white">{c.customerName}</p>
                    <span className="text-[10px] font-mono text-slate-400">{c.phone}</span>
                  </td>
                  <td className="p-3.5 text-slate-300 max-w-xs">
                    {c.items.map((it: any, i: number) => (
                      <p key={i} className="truncate text-[11px]">
                        {it.title} (x{it.quantity})
                      </p>
                    ))}
                  </td>
                  <td className="p-3.5 font-mono font-black text-white">৳{Number(c.cartTotal).toLocaleString()}</td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-400">
                    {new Date(c.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.recoveryStatus === 'Discount_Sent'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                      }`}
                    >
                      {c.recoveryStatus}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleSendRecoveryOffer(c.id, c.phone, c.customerName)}
                        disabled={sendingId === c.id}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-emerald-700/20"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Send 10% OFF</span>
                      </button>

                      <a
                        href={`https://wa.me/88${c.phone.replace(/^0/, '')}?text=Hello%20${c.customerName},%20we%20noticed%20you%20left%20items%20in%20your%20ShopX%20cart.%20Use%20code%20RECOVER10%20for%2010%%20OFF!`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-xl bg-emerald-950/80 text-emerald-400 hover:bg-emerald-900 border border-emerald-800/60 transition"
                        title="Direct WhatsApp"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </a>
                    </div>
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
