import React, { useState } from 'react';
import { X, Sparkles, UploadCloud, Loader2, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onProductAdded,
}) => {
  const { lang } = useAdminLanguageStore();

  const [title, setTitle] = useState('');
  const [banglaTitle, setBanglaTitle] = useState('');
  const [categorySlug, setCategorySlug] = useState('organic-foods');
  const [brand, setBrand] = useState('ShopX BD');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('20');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [isOrganic, setIsOrganic] = useState(false);
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Cloudinary image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const res = await api.post('/upload/multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success && res.data.urls) {
        setImages((prev) => [...prev, ...res.data.urls]);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || (lang === 'en' ? 'Image upload failed.' : 'ইমেজ আপলোড ব্যর্থ হয়েছে।'));
    } finally {
      setIsUploading(false);
    }
  };

  // 1-Click Gemini AI Description & SEO Generator
  const handleGenerateAIDescription = async () => {
    if (!title.trim()) {
      alert(lang === 'en' ? 'Please enter the product title first.' : 'অনুগ্রহ করে আগে পণ্যের নাম (Title) লিখুন।');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const res = await api.post('/ai/generate-description', {
        title,
        category: categorySlug,
      });

      if (res.data.success && res.data.data) {
        setShortDescription(res.data.data.shortDescription);
        setDescription(res.data.data.fullDescription);
        if (res.data.data.tags) {
          setTags(res.data.data.tags);
        }
      }
    } catch (err: any) {
      alert(lang === 'en' ? 'AI description generation failed.' : 'AI ডেসক্রিপশন তৈরিতে সমস্যা হয়েছে।');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !price) {
      alert(lang === 'en' ? 'Title and price are required.' : 'নাম এবং মূল্য আবশ্যক।');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title,
        banglaTitle: banglaTitle || title,
        categorySlug,
        brand,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock) || 10,
        shortDescription: shortDescription || `${title} - Premium Quality`,
        description: description || `${title} is now available on ShopX BD with fast delivery.`,
        isOrganic,
        isFlashSale,
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'],
        thumbnail: images[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
        tags,
      };

      const res = await api.post('/products', payload);
      if (res.data.success) {
        onProductAdded();
        onClose();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || (lang === 'en' ? 'Failed to create product.' : 'পণ্য তৈরি ব্যর্থ হয়েছে।'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <h3 className="text-base font-black text-white">
            {lang === 'en' ? 'Add New Marketplace Product' : 'নতুন পণ্য যুক্ত করুন (Add New Product)'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                {lang === 'en' ? 'Product Title (English)' : 'পণ্যের নাম (English)'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sundarbans Raw Honey 500g"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 shadow-inner"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                {lang === 'en' ? 'Product Title (Bangla)' : 'পণ্যের নাম (বাংলা)'}
              </label>
              <input
                type="text"
                placeholder={lang === 'en' ? 'e.g. সুন্দরবনের খাঁটি মধু ৫০০ গ্রাম' : 'যেমন: সুন্দরবনের খাঁটি মধু ৫০০ গ্রাম'}
                value={banglaTitle}
                onChange={(e) => setBanglaTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 shadow-inner"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">{lang === 'en' ? 'Category' : 'ক্যাটাগরি'}</label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500"
              >
                <option value="organic-foods">{lang === 'en' ? 'Organic & Pure Foods' : 'খাঁটি ও অর্গানিক ফুড'}</option>
                <option value="electronics-gadgets">{lang === 'en' ? 'Electronics & Tech Gadgets' : 'ইলেকট্রনিক্স ও গ্যাজেট'}</option>
                <option value="fashion-lifestyle">{lang === 'en' ? 'Fashion & Lifestyle' : 'ফ্যাশন ও লাইফস্টাইল'}</option>
                <option value="home-kitchen">{lang === 'en' ? 'Home & Kitchen' : 'হোম ও কিচেন'}</option>
                <option value="beauty-care">{lang === 'en' ? 'Beauty & Personal Care' : 'বিউটি ও কেয়ার'}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">{lang === 'en' ? 'Brand / Store' : 'ব্র্যান্ড'}</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                {lang === 'en' ? 'Regular Price (৳)' : 'নিয়মিত মূল্য (৳)'} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                placeholder="850"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                {lang === 'en' ? 'Special / Deal Price (৳)' : 'অফার / ডিসকাউন্ট মূল্য (৳)'}
              </label>
              <input
                type="number"
                placeholder="690"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">{lang === 'en' ? 'Stock Quantity' : 'স্টক পরিমাণ'}</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600"
                />
                <span className="font-bold text-emerald-400">🌿 {lang === 'en' ? 'Organic Pure' : 'খাঁটি অর্গানিক ফুড'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFlashSale}
                  onChange={(e) => setIsFlashSale(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600"
                />
                <span className="font-bold text-red-400">🔥 {lang === 'en' ? 'Flash Deal' : 'ফ্ল্যাশ সেল ডিল'}</span>
              </label>
            </div>
          </div>

          {/* Gemini AI Auto Copywriting Box */}
          <div className="bg-purple-950/40 p-4 rounded-2xl border border-purple-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span className="font-bold text-purple-200">
                  {lang === 'en' ? 'Google Gemini AI Copywriter' : 'Google Gemini AI ডেসক্রিপশন জেনারেটর'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleGenerateAIDescription}
                disabled={isGeneratingAI}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow"
              >
                {isGeneratingAI ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{isGeneratingAI ? (lang === 'en' ? 'Generating...' : 'AI লিখছে...') : (lang === 'en' ? '1-Click Auto Write' : '১-ক্লিকে তৈরি করুন')}</span>
              </button>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                {lang === 'en' ? 'Short Bullet Description' : 'সংক্ষিপ্ত বিবরণ (Short Description)'}
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder={lang === 'en' ? 'AI will auto-generate SEO bullet points...' : 'AI দিয়ে স্বয়ংক্রিয়ভাবে তৈরি হবে...'}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                {lang === 'en' ? 'Full Description & Highlights' : 'পূর্ণ বিবরণ (Full Description)'}
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={lang === 'en' ? 'AI generated marketing copy with specs...' : 'AI দিয়ে আকর্ষণীয় ফিচার ও উপকারিতা তৈরি হবে...'}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none"
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              {lang === 'en' ? 'Product Images (Cloudinary CDN)' : 'পণ্যের ছবি (Cloudinary Image Upload)'}
            </label>
            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-4 text-center hover:border-orange-500 transition bg-slate-950/40">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <UploadCloud className="w-8 h-8 text-orange-500" />
                <span className="text-slate-300 font-bold">
                  {isUploading ? (lang === 'en' ? 'Uploading to CDN...' : 'ছবি আপলোড হচ্ছে...') : (lang === 'en' ? 'Click to upload product photos' : 'ছবি আপলোড করতে ক্লিক করুন')}
                </span>
                <span className="text-[10px] text-slate-500">JPG, PNG, WebP Supported</span>
              </label>
            </div>

            {/* Uploaded Images Preview */}
            {images.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {images.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700 flex-shrink-0">
                    <img src={img} alt="upload" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 p-0.5 rounded-full bg-red-600 text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl transition"
          >
            {isSubmitting ? (lang === 'en' ? 'Publishing SKU...' : 'পণ্য সেভ হচ্ছে...') : (lang === 'en' ? 'Publish Product to Marketplace' : 'পণ্য পাবলিশ করুন')}
          </button>
        </form>
      </div>
    </div>
  );
};
