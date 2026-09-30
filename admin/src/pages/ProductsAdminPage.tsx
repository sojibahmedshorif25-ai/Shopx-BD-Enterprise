import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, ShieldCheck, Flame, Search, RefreshCw, Box, Tag } from 'lucide-react';
import { api } from '../services/api';
import { AddProductModal } from '../components/AddProductModal';
import { useAdminAuthStore } from '../store/useAdminAuthStore';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const ProductsAdminPage: React.FC = () => {
  const { user } = useAdminAuthStore();
  const { lang, t } = useAdminLanguageStore();
  const isAdmin = user?.role === 'admin';

  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      if (isAdmin) {
        const res = await api.get('/products?limit=50');
        if (res.data.success) setProducts(res.data.data);
      } else {
        const res = await api.get('/vendor/products');
        if (res.data.success) setProducts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isAdmin]);

  const handleDelete = async (id: string) => {
    if (!window.confirm(lang === 'en' ? 'Are you sure you want to delete this product?' : 'আপনি কি নিশ্চিতভাবে এই পণ্যটি মুছে ফেলতে চান?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(lang === 'en' ? 'Product deletion failed.' : 'পণ্য ডিলিট ব্যর্থ হয়েছে।');
    }
  };

  const filtered = products.filter((p) =>
    (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.banglaTitle || '').includes(search) ||
    (p.sku || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Box className="w-6 h-6 text-orange-400" />
            <span>{t('products.title')}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'en' ? `Total ${products.length} live catalog SKUs active in marketplace` : `সর্বমোট ${products.length} টি পণ্য সক্রিয় রয়েছে`}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>{t('products.add_new')}</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input
          type="text"
          placeholder={t('products.search_placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs py-3 pl-10 pr-4 rounded-2xl border border-slate-800 bg-slate-900 text-white outline-none focus:border-orange-500 shadow-inner transition"
        />
      </div>

      {/* Mobile Card View (For small screens < 768px) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-start gap-3 shadow-lg"
          >
            <img
              src={item.thumbnail || item.images?.[0] || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&auto=format&fit=crop'}
              alt={item.title}
              className="w-16 h-16 rounded-xl object-cover bg-slate-800 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-xs text-white line-clamp-2">{item.title}</h4>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 rounded-xl bg-rose-950/40 text-rose-400 hover:bg-rose-900 hover:text-white transition flex-shrink-0"
                  title="Delete Product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.sku}</p>

              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-orange-400 text-xs">
                    ৳{item.discountPrice || item.price}
                  </span>
                  {item.discountPrice && (
                    <span className="text-[10px] text-slate-500 line-through">
                      ৳{item.price}
                    </span>
                  )}
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    item.stock > 5
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                      : 'bg-rose-950/80 text-rose-400 border border-rose-800/40'
                  }`}
                >
                  {lang === 'en' ? `Stock: ${item.stock}` : `স্টক: ${item.stock} টি`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Products Table (For screens >= 768px) */}
      <div className="hidden md:block bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 min-w-[220px]">{t('products.th_product')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('products.th_category')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('products.th_price')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('products.th_stock')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('products.th_sold')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('products.th_tags')}</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((item) => (
                <tr key={item._id} className="hover:bg-slate-800/50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.thumbnail || item.images?.[0] || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&auto=format&fit=crop'}
                        alt={item.title}
                        className="w-11 h-11 rounded-2xl object-cover bg-slate-800 flex-shrink-0 border border-slate-700/60"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-white max-w-xs truncate">{item.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{item.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300 font-mono whitespace-nowrap">{item.categorySlug}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="font-bold text-orange-400 font-mono">
                      ৳{item.discountPrice || item.price}
                    </span>
                    {item.discountPrice && (
                      <span className="text-[10px] text-slate-500 line-through ml-1.5 font-mono">
                        ৳{item.price}
                      </span>
                    )}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${
                        item.stock > 5
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40'
                          : 'bg-rose-950/80 text-rose-400 border-rose-800/40'
                      }`}
                    >
                      {item.stock} {t('products.stock_left')}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 font-bold font-mono whitespace-nowrap">{item.soldCount || 0}</td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex gap-1.5">
                      {item.isOrganic && (
                        <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          🌿 {t('products.organic')}
                        </span>
                      )}
                      {item.isFlashSale && (
                        <span className="bg-rose-950/80 text-rose-300 border border-rose-800/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          🔥 {t('products.flash')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 text-rose-400 hover:text-white transition"
                      title={t('delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={fetchProducts}
      />
    </div>
  );
};
