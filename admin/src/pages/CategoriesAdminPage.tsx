import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Search,
  Sparkles,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const CategoriesAdminPage: React.FC = () => {
  const { lang } = useAdminLanguageStore();
  const isBn = lang === 'bn';

  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [banglaName, setBanglaName] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('ShoppingBag');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/admin/categories');
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingCat(null);
    setName('');
    setBanglaName('');
    setSlug('');
    setIcon('ShoppingBag');
    setIsFeatured(true);
    setShowModal(true);
  };

  const handleOpenEditModal = (cat: any) => {
    setEditingCat(cat);
    setName(cat.name);
    setBanglaName(cat.banglaName || '');
    setSlug(cat.slug);
    setIcon(cat.icon || 'ShoppingBag');
    setIsFeatured(cat.isFeatured ?? true);
    setShowModal(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (editingCat) {
        await api.put(`/admin/categories/${editingCat._id}`, {
          name,
          banglaName,
          slug,
          icon,
          isFeatured,
        });
      } else {
        await api.post('/admin/categories', {
          name,
          banglaName,
          slug,
          icon,
          isFeatured,
        });
      }
      setShowModal(false);
      fetchCategories();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save category.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm(isBn ? 'আপনি কি নিশ্চিত এই ক্যাটাগরিটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this category?')) {
      return;
    }
    try {
      await api.delete(`/admin/categories/${id}`);
      fetchCategories();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Delete failed.');
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.banglaName && c.banglaName.includes(searchQuery))
  );

  return (
    <div className="p-3.5 sm:p-6 space-y-5 max-w-full overflow-hidden animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-900/60 p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0" />
            <span>{isBn ? 'ক্যাটাগরি ও ডিপার্টমেন্ট কন্ট্রোল' : 'Categories & Taxonomy Hub'}</span>
          </h1>
          <p className="text-xs text-emerald-200/70 mt-1 max-w-2xl">
            {isBn
              ? 'স্টোরফ্রন্ট ক্যাটাগরি, আইকন, ও বাংলা নামকরণ নিয়ন্ত্রণ ও সাজান।'
              : 'Manage e-commerce categories, bilingual naming, hierarchy & featured tags.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchCategories}
            disabled={isLoading}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition border border-slate-700 shadow"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-2xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'নতুন ক্যাটাগরি যোগ করুন' : 'Add Category'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-3xl flex items-center justify-between gap-3 shadow">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={isBn ? 'ক্যাটাগরি খুঁজুন...' : 'Search categories...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-3 rounded-2xl border border-slate-700 bg-slate-800 text-xs text-white outline-none focus:border-emerald-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-bold pr-2">
          {filteredCategories.length} {isBn ? 'টি ক্যাটাগরি' : 'Categories'}
        </span>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-500 mx-auto" />
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
          <Layers className="w-10 h-10 text-slate-500 mx-auto" />
          <p className="font-bold text-slate-300">{isBn ? 'কোনো ক্যাটাগরি পাওয়া যায়নি।' : 'No categories found.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat._id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-800/80 p-5 rounded-3xl shadow-lg transition space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center font-black text-lg shadow">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">{cat.name}</h3>
                    {cat.banglaName && (
                      <p className="text-xs text-emerald-400 font-bold">{cat.banglaName}</p>
                    )}
                  </div>
                </div>

                {cat.isFeatured && (
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/50 text-[10px] font-black px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="font-mono text-[11px]">slug: /{cat.slug}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEditModal(cat)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-950 text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Edit/Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingCat ? (isBn ? 'ক্যাটাগরি সম্পাদনা' : 'Edit Category') : (isBn ? 'নতুন ক্যাটাগরি তৈরি' : 'Create New Category')}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {isBn ? 'ক্যাটাগরি নাম (English)' : 'Category Name (English)'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Foods"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingCat) {
                      setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {isBn ? 'বাংলা নাম (Bangla Name)' : 'Bangla Name'}
                </label>
                <input
                  type="text"
                  placeholder="যেমন: অর্গানিক খাবার"
                  value={banglaName}
                  onChange={(e) => setBanglaName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  placeholder="organic-foods"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-emerald-500 font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="catFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600"
                />
                <label htmlFor="catFeatured" className="font-bold text-slate-300 cursor-pointer">
                  {isBn ? 'হোমপেজে ফিচার্ড হিসেবে প্রদর্শন করুন' : 'Show on homepage featured categories'}
                </label>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow transition flex items-center justify-center gap-1.5"
                >
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>{isSaving ? (isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBn ? 'সংরক্ষণ করুন' : 'Save Category')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
