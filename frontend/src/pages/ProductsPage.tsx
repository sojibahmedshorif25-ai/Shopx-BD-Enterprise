import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { QuickOrderModal } from '../components/QuickOrderModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Product } from '../types';
import { api } from '../services/api';
import { useLanguageStore } from '../store/useLanguageStore';
import {
  Crown,
  Sparkles,
  Truck,
  Star,
  Zap,
  Flame,
  RotateCcw,
  SlidersHorizontal,
  Tag,
  ArrowRight,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useLanguageStore();

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const isDeals = searchParams.get('filter') === 'deals' || searchParams.get('deals') === 'true';
  const isFlash = searchParams.get('flash') === 'true';
  const isMall = searchParams.get('mall') === 'true';

  const [sortBy, setSortBy] = useState('createdAt');
  const [priceRange, setPriceRange] = useState('');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [mallOnly, setMallOnly] = useState(isMall);
  const [dealsOnly, setDealsOnly] = useState(isDeals || isFlash);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);

  const [quickOrderProduct, setQuickOrderProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categoryPills = [
    { slug: '', label: lang === 'bn' ? 'সকল পণ্য' : 'All Products' },
    { slug: 'smartphones-tablets', label: lang === 'bn' ? '📱 স্মার্টফোন' : '📱 Smartphones' },
    { slug: 'laptops-computers', label: lang === 'bn' ? '💻 ল্যাপটপ ও পিসি' : '💻 Laptops & PC' },
    { slug: 'electronics-gadgets', label: lang === 'bn' ? '🎧 গ্যাজেটস ও অডিও' : '🎧 Gadgets' },
    { slug: 'organic-foods', label: lang === 'bn' ? '🌿 খাঁটি খাদ্য' : '🌿 Organic Foods' },
    { slug: 'fashion-lifestyle', label: lang === 'bn' ? '👕 ফ্যাশন' : '👕 Fashion' },
    { slug: 'beauty-care', label: lang === 'bn' ? '💄 বিউটি ও আতর' : '💄 Beauty' },
    { slug: 'home-kitchen', label: lang === 'bn' ? '🏠 হোম অ্যাপ্লায়েন্স' : '🏠 Home & Kitchen' },
    { slug: 'gaming-consoles', label: lang === 'bn' ? '🎮 গেমিং ও ড্রোন' : '🎮 Gaming & Drones' },
    { slug: 'watches-accessories', label: lang === 'bn' ? '⌚ ঘড়ি ও জুয়েলারি' : '⌚ Watches' },
  ];

  useEffect(() => {
    setMallOnly(isMall);
    setDealsOnly(isDeals || isFlash);
  }, [isMall, isDeals, isFlash]);

  useEffect(() => {
    const fetchFiltered = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('limit', '50');
        if (category) queryParams.append('category', category);
        if (search) queryParams.append('search', search);
        if (dealsOnly || isDeals || isFlash) queryParams.append('deals', 'true');
        if (organicOnly) queryParams.append('isOrganic', 'true');
        if (sortBy) queryParams.append('sortBy', sortBy);

        if (priceRange === 'under_500') {
          queryParams.append('maxPrice', '500');
        } else if (priceRange === '500_1500') {
          queryParams.append('minPrice', '500');
          queryParams.append('maxPrice', '1500');
        } else if (priceRange === 'above_1500') {
          queryParams.append('minPrice', '1500');
        }

        const res = await api.get(`/products?${queryParams.toString()}`);
        if (res.data?.success) {
          let list = res.data.data as Product[];
          if (mallOnly) {
            list = list.filter((p) => p.brand && p.brand !== 'Local');
          }
          if (freeDeliveryOnly) {
            list = list.filter((p) => (p.price || 0) > 1000);
          }
          if (dealsOnly) {
            list = list.filter((p) => p.isFlashSale || (p.discountPrice && p.discountPrice < p.price));
          }
          setProducts(list);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiltered();
  }, [category, search, isDeals, isFlash, sortBy, priceRange, organicOnly, mallOnly, dealsOnly, freeDeliveryOnly]);

  const handleCategorySelect = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug) {
      newParams.set('category', slug);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const getPageTitle = () => {
    if (search) return lang === 'bn' ? `অনুসন্ধানের ফলাফল: "${search}"` : `Search Results for: "${search}"`;
    if (dealsOnly || isDeals || isFlash) return lang === 'bn' ? '🔥 মেগা ডিলস ও ফ্ল্যাশ সেল অফার' : '🔥 Mega Deals & Flash Sale Rush';
    if (mallOnly || isMall) return lang === 'bn' ? '👑 ShopX মল (১০০% অফিশিয়াল ব্র্যান্ড স্টোর)' : '👑 ShopX Mall (100% Official Brands)';
    if (category) {
      const match = categoryPills.find((c) => c.slug === category);
      return match ? match.label : (lang === 'bn' ? `ক্যাটাগরি: ${category}` : `Category: ${category}`);
    }
    return lang === 'bn' ? 'সকল পণ্য ক্যাটালগ' : 'All Flagship Products';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Deals Header Banner if in Deals Mode */}
      {(dealsOnly || isDeals || isFlash) && (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest bg-yellow-400 text-slate-950 px-3 py-1 rounded-full shadow">
              {lang === 'bn' ? 'সীমিত সময়ের মেগা অফার' : 'LIMITED TIME MEGA DEALS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {lang === 'bn' ? 'সুপার মেগা ডিলস ও ছাড়' : 'Super Mega Deals & Rush Offers'}
            </h2>
            <p className="text-xs text-red-100 max-w-lg">
              {lang === 'bn'
                ? 'স্মার্টফোন, গ্যাজেট, খাঁটি খাদ্য ও ফ্যাশনে সর্বোচ্চ ৫০% পর্যন্ত বিশেষ মূল্যছাড় ও ফ্রি ডেলিভারি।'
                : 'Save up to 50% OFF on flagship smartphones, gadgets, BSTI-certified organics & fashion.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-slate-950 flex flex-col items-center justify-center font-black shadow-lg">
              <span className="text-[9px] uppercase">{lang === 'bn' ? 'সর্বোচ্চ' : 'Up to'}</span>
              <span className="text-xl leading-none">50%</span>
              <span className="text-[9px] uppercase">{lang === 'bn' ? 'ছাড়' : 'OFF'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Header & Filter Controls Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {getPageTitle()}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {products.length} {lang === 'bn' ? 'টি ভেরিফায়েড পণ্য পাওয়া গেছে' : 'verified products available'}
          </p>
        </div>

        {/* Filter Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Deals Toggle Filter */}
          <button
            onClick={() => setDealsOnly(!dealsOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition ${
              dealsOnly
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-yellow-300" />
            <span>{lang === 'bn' ? 'মেগা ডিলস' : 'Deals'}</span>
          </button>

          {/* ShopX Mall Filter */}
          <button
            onClick={() => setMallOnly(!mallOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition ${
              mallOnly
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'ShopX মল' : 'ShopX Mall'}</span>
          </button>

          {/* Organic Only Filter */}
          <button
            onClick={() => setOrganicOnly(!organicOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              organicOnly
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            🌿 {lang === 'bn' ? 'খাঁটি খাদ্য' : 'Organic'}
          </button>

          {/* Free Delivery Filter */}
          <button
            onClick={() => setFreeDeliveryOnly(!freeDeliveryOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition ${
              freeDeliveryOnly
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'ফ্রি ডেলিভারি' : 'Free Shipping'}</span>
          </button>

          {/* Price Range Filter */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 outline-none font-medium"
          >
            <option value="">{lang === 'bn' ? 'সকল বাজেট' : 'All Prices'}</option>
            <option value="under_500">{lang === 'bn' ? '৳৫০০ এর নিচে' : 'Under ৳500'}</option>
            <option value="500_1500">{lang === 'bn' ? '৳৫০০ - ৳১,৫০০' : '৳500 - ৳1,500'}</option>
            <option value="above_1500">{lang === 'bn' ? '৳১,৫০০ এর উপরে' : 'Above ৳1,500'}</option>
          </select>

          {/* Sort By Filter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 outline-none font-bold"
          >
            <option value="createdAt">{lang === 'bn' ? 'নতুন পণ্য (Newest)' : 'Newest Arrivals'}</option>
            <option value="popular">{lang === 'bn' ? 'জনপ্রিয় (Best Selling)' : 'Best Selling'}</option>
            <option value="price_asc">{lang === 'bn' ? 'দাম: কম থেকে বেশি' : 'Price: Low to High'}</option>
            <option value="price_desc">{lang === 'bn' ? 'দাম: বেশি থেকে কম' : 'Price: High to Low'}</option>
            <option value="rating">{lang === 'bn' ? 'সেরা রেটিং (Top Rated)' : 'Customer Rating'}</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categoryPills.map((pill) => {
          const isActive = (pill.slug === '' && !category) || category === pill.slug;
          return (
            <button
              key={pill.slug}
              onClick={() => handleCategorySelect(pill.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400 font-bold">
          {lang === 'bn' ? 'পণ্য লোড হচ্ছে...' : 'Loading verified products...'}
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-500 font-bold text-sm">
            {lang === 'bn' ? 'এই ফিল্টারে কোনো পণ্য পাওয়া যায়নি।' : 'No products matched the selected filters.'}
          </p>
          <button
            onClick={() => {
              setOrganicOnly(false);
              setMallOnly(false);
              setDealsOnly(false);
              setFreeDeliveryOnly(false);
              setPriceRange('');
              handleCategorySelect('');
            }}
            className="mt-3 px-5 py-2 bg-emerald-700 text-white font-bold text-xs rounded-full shadow"
          >
            {lang === 'bn' ? 'সব ফিল্টার ক্লিয়ার করুন' : 'Reset All Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onQuickOrder={(p) => setQuickOrderProduct(p)}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Modals for Quick Order & View */}
      <QuickOrderModal
        product={quickOrderProduct}
        onClose={() => setQuickOrderProduct(null)}
      />

      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onQuickOrder={(p) => setQuickOrderProduct(p)}
      />
    </div>
  );
};
