import React, { useState, useEffect } from 'react';
import {
  Boxes,
  AlertTriangle,
  PackageX,
  TrendingDown,
  RefreshCw,
  Plus,
  Minus,
  Search,
  CheckCircle2,
  Store,
  Layers,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const InventoryAdminPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { lang } = useAdminLanguageStore();
  const isBn = lang === 'bn';

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/inventory');
      if (res.data.success) {
        setData(res.data.stats);
        setProducts(res.data.products || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStock = async (id: string, newStock: number) => {
    try {
      setUpdatingId(id);
      const res = await api.put(`/admin/inventory/${id}/stock`, { stock: newStock });
      if (res.data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, stock: newStock } : p))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase());
    if (filter === 'low') return matchesSearch && p.stock > 0 && p.stock <= 5;
    if (filter === 'out') return matchesSearch && p.stock === 0;
    return matchesSearch;
  });

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              {isBn ? 'রিয়েলটাইম ইনভেন্টরি ও ওয়্যারহাউস হাব' : 'Realtime Inventory & Warehouse Hub'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isBn ? 'স্টক ও ইনভেন্টরি কন্ট্রোল' : 'Inventory & Stock Console'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? 'সকল প্রোডাক্টের স্টক লেভেল, ঘাটতি অ্যালার্ট এবং জরুরি রিস্টক পরিচালনা করুন।'
              : 'Monitor live SKU inventory levels, out-of-stock triggers, and instant replenishment.'}
          </p>
        </div>

        <button
          onClick={fetchInventory}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700/60 shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isBn ? 'রিফ্রেশ ডাটা' : 'Sync Inventory'}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">{isBn ? 'মোট ক্যাটালগ SKU' : 'Total Catalog SKUs'}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-white font-mono mt-2">{data?.totalSKUs || 0}</h3>
          <p className="text-[11px] text-emerald-400 mt-1 font-semibold">{isBn ? 'অ্যাক্টিভ প্রোডাক্ট' : 'Active listed items'}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">{isBn ? 'কম স্টক অ্যালার্ট' : 'Low Stock (≤5)'}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950/80 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-amber-400 font-mono mt-2">{data?.lowStockCount || 0}</h3>
          <p className="text-[11px] text-amber-400 mt-1 font-semibold">{isBn ? 'দ্রুত রিস্টক প্রয়োজন' : 'Needs replenishment'}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">{isBn ? 'স্টক আউট' : 'Out of Stock (0)'}</span>
            <div className="w-8 h-8 rounded-xl bg-rose-950/80 text-rose-400 flex items-center justify-center">
              <PackageX className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-rose-400 font-mono mt-2">{data?.outOfStockCount || 0}</h3>
          <p className="text-[11px] text-rose-400 mt-1 font-semibold">{isBn ? 'অর্ডার ব্লকড' : 'Sales currently paused'}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">{isBn ? 'মোট ওয়্যারহাউস ভ্যালু' : 'Inventory Asset Value'}</span>
            <div className="w-8 h-8 rounded-xl bg-teal-950/80 text-teal-400 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-xl font-black text-white font-mono mt-2">
            ৳{Number(data?.totalInventoryValue || 0).toLocaleString()}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">{isBn ? 'বর্তমান হোল্ডিং ভ্যালু' : 'Estimated asset valuation'}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80 w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'সকল SKU' : 'All SKUs'} ({products.length})
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === 'low'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              {isBn ? 'কম স্টক' : 'Low Stock'} ({data?.lowStockCount || 0})
            </button>
            <button
              onClick={() => setFilter('out')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === 'out'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              {isBn ? 'স্টক আউট' : 'Out of Stock'} ({data?.outOfStockCount || 0})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isBn ? 'SKU বা টাইটেল সার্চ করুন...' : 'Search by title or SKU...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 bg-slate-950/50">
              <tr>
                <th className="p-3.5">Product & SKU</th>
                <th className="p-3.5">Vendor / Seller</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Units Sold</th>
                <th className="p-3.5">Live Stock</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Instant Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      {p.thumbnail && (
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-10 h-10 rounded-xl object-cover bg-slate-800 border border-slate-700/60 flex-shrink-0"
                        />
                      )}
                      <div>
                        <p className="font-bold text-white max-w-xs truncate">{p.title}</p>
                        <p className="text-[10px] font-mono text-emerald-400">SKU: {p.sku || 'N/A'}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <p className="font-semibold text-slate-200">{p.vendor?.storeName || 'ShopX Direct'}</p>
                    <span className="text-[10px] text-slate-500">{p.vendor?.phone || 'HQ Warehouse'}</span>
                  </td>

                  <td className="p-3.5 font-mono font-bold text-white">৳{Number(p.price).toLocaleString()}</td>

                  <td className="p-3.5 font-mono text-slate-400">{p.soldCount || 0} units</td>

                  <td className="p-3.5 font-mono">
                    <span
                      className={`text-sm font-black ${
                        p.stock === 0
                          ? 'text-rose-400'
                          : p.stock <= 5
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {p.stock}
                    </span>{' '}
                    <span className="text-[10px] text-slate-500">units</span>
                  </td>

                  <td className="p-3.5">
                    {p.stock === 0 ? (
                      <span className="px-2.5 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/60 text-[10px] font-bold">
                        ❌ Out of Stock
                      </span>
                    ) : p.stock <= 5 ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/60 text-[10px] font-bold">
                        ⚠️ Low Inventory
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-[10px] font-bold">
                        ✓ In Stock
                      </span>
                    )}
                  </td>

                  <td className="p-3.5 text-right">
                    <div className="inline-flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        onClick={() => handleUpdateStock(p._id, Math.max(0, p.stock - 5))}
                        disabled={updatingId === p._id || p.stock === 0}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition"
                        title="-5 Units"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="px-2 text-xs font-mono font-bold text-white min-w-[28px] text-center">
                        {p.stock}
                      </span>

                      <button
                        onClick={() => handleUpdateStock(p._id, p.stock + 10)}
                        disabled={updatingId === p._id}
                        className="p-1 rounded-lg hover:bg-emerald-950/80 text-emerald-400 hover:text-emerald-300 transition"
                        title="+10 Units"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleUpdateStock(p._id, p.stock + 50)}
                        disabled={updatingId === p._id}
                        className="px-2 py-0.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-[10px] font-bold transition ml-1"
                        title="+50 Restock"
                      >
                        +50
                      </button>
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
