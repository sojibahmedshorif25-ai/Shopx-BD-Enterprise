import React, { useState, useEffect } from 'react';
import {
  Image,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const BannersAdminPage: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const { lang } = useAdminLanguageStore();
  const isBn = lang === 'bn';

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    banglaTitle: '',
    banglaSubtitle: '',
    image: '',
    linkUrl: '/products',
    position: 'hero',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/banners');
      if (res.data.success) {
        setBanners(res.data.banners || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      subtitle: '',
      banglaTitle: '',
      banglaSubtitle: '',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop',
      linkUrl: '/products',
      position: 'hero',
      order: banners.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: any) => {
    setEditingBanner(b);
    setFormData({
      title: b.title,
      subtitle: b.subtitle || '',
      banglaTitle: b.banglaTitle || '',
      banglaSubtitle: b.banglaSubtitle || '',
      image: b.image,
      linkUrl: b.linkUrl || '/products',
      position: b.position || 'hero',
      order: b.order || 0,
      isActive: b.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBanner) {
        await api.put(`/admin/banners/${editingBanner._id}`, formData);
      } else {
        await api.post('/admin/banners', formData);
      }
      setIsModalOpen(false);
      fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this banner?')) return;
    try {
      await api.delete(`/admin/banners/${id}`);
      fetchBanners();
    } catch (err) {
      console.error(err);
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
              {isBn ? 'হিরো স্লাইডার ও ব্যানার ম্যানেজার' : 'Hero Sliders & Promotional Banners'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isBn ? 'ব্যানার ও ক্যাম্পেইন কনসোল' : 'Banners & Hero Showcase'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? 'হোমপেজের হিরো স্লাইডার, মেগা ক্যাম্পেইন ব্যানার ও স্পেশাল অফার কার্ড ম্যানেজ করুন।'
              : 'Add, update, reorder and publish dynamic promotional hero banners across all store portals.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBanners}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-700/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'নতুন ব্যানার যোগ করুন' : 'Create New Banner'}</span>
          </button>
        </div>
      </div>

      {/* Grid of Active Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((b) => (
          <div
            key={b._id}
            className="bg-slate-900/90 border border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-black border border-white/20">
                    Order: #{b.order || 0}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md ${
                      b.isActive
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {b.isActive ? 'Active Live' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
                  Position: {b.position}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug">{b.title}</h3>
                {b.banglaTitle && (
                  <p className="text-xs text-slate-300 font-semibold">{b.banglaTitle}</p>
                )}
                {b.subtitle && (
                  <p className="text-xs text-slate-400 line-clamp-2">{b.subtitle}</p>
                )}
                <div className="pt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                  <span className="truncate">{b.linkUrl}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">
                {new Date(b.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(b)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400 hover:text-white transition"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <h2 className="text-lg font-black text-white">
              {editingBanner ? 'Edit Promotional Banner' : 'Create New Promotional Banner'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Banner Title (English)</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Mega Summer Tech Sale Up to 40% OFF"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Banner Title (বাংলা)</label>
                <input
                  type="text"
                  value={formData.banglaTitle}
                  onChange={(e) => setFormData({ ...formData, banglaTitle: e.target.value })}
                  placeholder="উদা: মেগা সামার টেক সেল ৪০% পর্যন্ত ছাড়"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Image URL (High-Res 1200x500)</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Position / Placement</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                  >
                    <option value="hero">Hero Main Slider</option>
                    <option value="promo_top">Top Promotional Bar</option>
                    <option value="promo_middle">Middle Category Banner</option>
                    <option value="sidebar">Sidebar Spotlight</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Display Priority Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Destination Target Link</label>
                <input
                  type="text"
                  value={formData.linkUrl}
                  onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                  placeholder="/products or /category/electronics"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="isActive" className="text-slate-300 font-bold">
                  Publish Banner Live
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black transition"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
