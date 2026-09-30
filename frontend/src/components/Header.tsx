import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Truck,
  Sparkles,
  Globe,
  Store,
  Mic,
  X,
  PhoneCall,
  ShieldCheck,
  ChevronDown,
  MapPin,
  Menu,
  Layers,
  Sparkle,
  Gift,
  Users,
  FileText,
  DollarSign,
  Crown,
  Camera,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore, CURRENCIES, CurrencyCode } from '../store/useCurrencyStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { api } from '../services/api';
import { ImageSearchModal } from './ImageSearchModal';

interface HeaderProps {
  onOpenAI?: () => void;
  onOpenAffiliate?: () => void;
  onOpenVIP?: () => void;
  onOpenLive?: () => void;
  onOpenPriceMatch?: () => void;
  onOpenGiftCards?: () => void;
  onOpenVoiceCommander?: () => void;
  onOpenSharedCart?: () => void;
  onOpenPrescription?: () => void;
  onOpenTryOn?: () => void;
  onOpenExchange?: () => void;
  onOpenB2BQuote?: () => void;
  onOpenBudgetCart?: () => void;
  onOpenDailyStreak?: () => void;
  onOpenSaaSStoreBuilder?: () => void;
  onOpenFraudShield?: () => void;
  onOpenCourierDispatch?: () => void;
  onOpenWebhooks?: () => void;
  onOpenSmartUpsell?: () => void;
  onOpen3DStudio?: () => void;
  onOpenAuctionRoom?: () => void;
  onOpenDoorstepReturn?: () => void;
  onOpenAdCampaign?: () => void;
  onOpenRecruiter?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAI,
  onOpenAffiliate,
  onOpenVIP,
  onOpenLive,
  onOpenPriceMatch,
  onOpenGiftCards,
  onOpenVoiceCommander,
  onOpenSharedCart,
  onOpenPrescription,
  onOpenTryOn,
  onOpenExchange,
  onOpenB2BQuote,
  onOpenBudgetCart,
  onOpenDailyStreak,
  onOpenSaaSStoreBuilder,
  onOpenFraudShield,
  onOpenCourierDispatch,
  onOpenWebhooks,
  onOpenSmartUpsell,
  onOpen3DStudio,
  onOpenAuctionRoom,
  onOpenDoorstepReturn,
  onOpenAdCampaign,
  onOpenRecruiter,
}) => {
  const navigate = useNavigate();
  const { items, setDrawerOpen } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, logout } = useAuthStore();
  const { lang, setLang, toggleLang, t } = useLanguageStore();
  const { currency, setCurrency, formatPrice } = useCurrencyStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('Dhaka, Bangladesh');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Live search suggestions
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        const res = await api.get(`/products/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
        if (res.data?.success) {
          setSuggestions(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setShowCategoriesDropdown(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setShowServicesDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSuggestions([]);
    }
  };

  // Voice Search Web Speech API
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Please use Google Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      navigate(`/products?search=${encodeURIComponent(transcript)}`);
    };

    recognition.start();
  };

  const categoriesList = [
    { name: 'Smartphones & Tablets', bn: 'স্মার্টফোন ও ট্যাবলেট', icon: '📱', slug: 'smartphones-tablets', count: '180+ Flagships', bnCount: '১৮০+ মডেল' },
    { name: 'Laptops & Computers', bn: 'ল্যাপটপ ও পিসি', icon: '💻', slug: 'laptops-computers', count: '120+ Models', bnCount: '১২০+ মডেল' },
    { name: 'Pure Organic Foods & Grocery', bn: 'খাঁটি ও অর্গানিক খাদ্য', icon: '🌿', slug: 'organic-foods', count: '250+ Items', bnCount: '২৫০+ আইটেম' },
    { name: 'Smart Gadgets & Audio (TWS)', bn: 'স্মার্ট গ্যাজেটস ও অডিও', icon: '🎧', slug: 'electronics-gadgets', count: '300+ Gadgets', bnCount: '৩০০+ গ্যাজেট' },
    { name: 'Fashion & Luxury Apparel', bn: 'ফ্যাশন ও প্রিমিয়াম পোশাক', icon: '👕', slug: 'fashion-lifestyle', count: '450+ Trends', bnCount: '৪৫০+ কালেকশন' },
    { name: 'Home Appliances & Living', bn: 'হোম ও কিচেন অ্যাপ্লায়েন্স', icon: '🏠', slug: 'home-kitchen', count: '160+ Items', bnCount: '১৬০+ আইটেম' },
    { name: 'Beauty & Royal Fragrances', bn: 'বিউটি ও রাজকীয় সুগন্ধি', icon: '💄', slug: 'beauty-care', count: '190+ Scents', bnCount: '১৯০+ পারফিউম' },
    { name: 'Gaming, PS5 & Drones', bn: 'গেমিং, কনসোল ও ড্রোন', icon: '🎮', slug: 'gaming-consoles', count: '80+ Gears', bnCount: '৮০+ গেমিং গিয়ার' },
    { name: 'Watches & Accessories', bn: 'ঘড়ি ও জুয়েলারি', icon: '⌚', slug: 'watches-accessories', count: '140+ Luxury', bnCount: '১৪০+ লাক্সারি' },
    { name: 'B2B Wholesale & Bulk Supply', bn: 'B2B হোলসেল ও বাল্ক অর্ডার', icon: '🏢', slug: 'organic-foods', count: 'Bulk Tiers', bnCount: 'পাইকারি রেট' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm transition-all">
      {/* 1. Top Bar: Deliver Location, Hotline, Currency, Language */}
      <div className="bg-[#f8fafc] text-slate-600 text-xs py-1.5 px-4 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? '১০০% অরিজিনাল ব্র্যান্ড ও ক্যাশ অন ডেলিভারি' : '100% Authentic Brands, Official Warranty & COD'}</span>
            </span>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-600">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('hotline')}: <strong>01942791004</strong> (24/7 Helpline)</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* 4 Daraz Portals Navigation Links */}
            {/* 1. Become a Seller / Seller Center */}
            <Link
              to="/vendor-register"
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 transition"
            >
              <Store className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সেলার হাব' : 'Seller Hub'}</span>
            </Link>

            <span className="text-slate-300">|</span>

            {/* 2. DEX Rider Portal */}
            <Link
              to="/rider-portal"
              className="hidden lg:flex items-center gap-1 text-slate-600 hover:text-blue-600 font-semibold transition"
            >
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'bn' ? 'রাইডার হাব' : 'Rider Hub'}</span>
            </Link>

            <span className="hidden lg:inline text-slate-300">|</span>

            {/* 3. Super Admin Portal */}
            <a
              href="http://localhost:5174/login"
              target="_blank"
              rel="noreferrer"
              className="hidden xl:flex items-center gap-1 text-purple-700 hover:text-purple-800 font-bold transition"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'এডমিন পোর্টাল' : 'Admin 2FA'}</span>
            </a>

            <span className="hidden xl:inline text-slate-300">|</span>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center gap-1 text-slate-700 font-semibold hover:text-emerald-600 transition"
              >
                <span>{currency} ({CURRENCIES[currency]?.symbol})</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cCode) => (
                    <button
                      key={cCode}
                      onClick={() => {
                        setCurrency(cCode);
                        setShowCurrencyDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-emerald-50 hover:text-emerald-700 flex justify-between"
                    >
                      <span>{CURRENCIES[cCode].name}</span>
                      <span className="font-mono text-slate-400">{CURRENCIES[cCode].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-slate-300">|</span>

            {/* Clear Segmented Language Switcher [ EN | বাংলা ] */}
            <div className="flex items-center bg-slate-200/90 p-0.5 rounded-lg border border-slate-300">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 text-[11px] font-extrabold rounded-md transition ${
                  lang === 'en'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('bn')}
                className={`px-2 py-0.5 text-[11px] font-extrabold rounded-md transition ${
                  lang === 'bn'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="বাংলায় পরিবর্তন করুন"
              >
                বাং
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Center Header: Logo, Search Bar, Quick Action Icons */}
      <div className="py-3.5 px-4 max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Brand Logo: ShopX Supermall */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-lg shadow-md shadow-emerald-700/20 group-hover:scale-105 transition">
            <Sparkles className="w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <div className="font-extrabold text-2xl tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
              Shop<span className="text-emerald-700">X</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-extrabold uppercase tracking-wider">
                MALL
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-normal mt-1">
              {lang === 'bn' ? 'মাল্টি-ভেন্ডর সুপারমল' : 'Supermall & SaaS Hub'}
            </p>
          </div>
        </Link>

        {/* Big Clean Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-2xl">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'স্মার্টফোন, গ্যাজেট, ফ্যাশন, খাঁটি ফুড ও নিত্যপণ্য খুঁজুন...' : 'Search 50,000+ smartphones, tech gadgets, fashion, organic foods...'}
              className="w-full bg-[#f8fafc] border border-slate-200 focus:border-emerald-600 focus:bg-white rounded-full py-2.5 pl-5 pr-28 text-sm text-slate-800 outline-none transition-all placeholder-slate-400 shadow-sm"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-24 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* AI Camera Search */}
            <button
              type="button"
              onClick={() => setIsImageSearchOpen(true)}
              className="absolute right-16 p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-emerald-600 transition"
              title="AI Camera Search"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Voice Search */}
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`absolute right-10 p-1.5 rounded-full hover:bg-slate-200 transition ${
                isListening ? 'text-red-500 animate-ping' : 'text-slate-400 hover:text-emerald-600'
              }`}
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Green Circular Submit Button matching reference */}
            <button
              type="submit"
              className="absolute right-1 bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-full shadow-md shadow-emerald-600/20 transition flex items-center justify-center"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="p-2.5 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'bn' ? `পণ্য সাজেশন্স (${suggestions.length})` : `Products Found (${suggestions.length})`}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {suggestions.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item.slug}`}
                    onClick={() => setSuggestions([])}
                    className="flex items-center gap-3 p-2.5 hover:bg-emerald-50 transition border-b border-slate-50"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded-xl bg-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {lang === 'bn' && item.banglaTitle ? item.banglaTitle : item.title}
                      </p>
                      <p className="text-xs font-black text-emerald-600 font-mono">
                        {formatPrice(item.discountPrice || item.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Icons (Track, Wishlist, Account, Cart) matching reference image */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* 1. Track Order */}
          <Link
            to="/track-order"
            className="flex flex-col items-center text-slate-600 hover:text-emerald-600 transition group"
          >
            <div className="relative">
              <Truck className="w-5 h-5 group-hover:scale-110 transition" />
            </div>
            <span className="text-[11px] font-medium mt-0.5 hidden lg:inline-block">
              {lang === 'bn' ? 'ট্র্যাক অর্ডার' : 'Track Order'}
            </span>
          </Link>

          {/* 2. Wishlist */}
          <Link
            to="/products?filter=wishlist"
            className="flex flex-col items-center text-slate-600 hover:text-emerald-600 transition group relative"
          >
            <div className="relative">
              <Heart className="w-5 h-5 group-hover:scale-110 transition" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlistItems.length}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium mt-0.5 hidden lg:inline-block">
              {lang === 'bn' ? 'উইশলিস্ট' : 'Wishlist'}
            </span>
          </Link>

          {/* 3. Account */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex flex-col items-center text-slate-600 hover:text-emerald-600 transition group"
            >
              <User className="w-5 h-5 group-hover:scale-110 transition" />
              <span className="text-[11px] font-medium mt-0.5 hidden lg:inline-block">
                {user ? user.name.split(' ')[0] : lang === 'bn' ? 'অ্যাকাউন্ট' : 'Account'}
              </span>
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserDropdown(false)}
                      className="block px-4 py-2 text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      👤 {lang === 'bn' ? 'আমার প্রোফাইল ও ঠিকানা' : 'My Profile & Addresses'}
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserDropdown(false)}
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      📦 {lang === 'bn' ? 'আমার অর্ডারসমূহ' : 'My Orders'}
                    </Link>
                    {user.role === 'admin' && (
                      <a
                        href="http://localhost:5174"
                        target="_blank"
                        rel="noreferrer"
                        className="block px-4 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
                      >
                        👑 {lang === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Portal'}
                      </a>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold"
                    >
                      🚪 {lang === 'bn' ? 'লগআউট' : 'Sign Out'}
                    </button>
                  </>
                ) : (
                  <div className="p-3 space-y-2">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {lang === 'bn' ? 'দারাজ ৪টি পোর্টাল লগইন' : '4 Role Portals Login'}
                    </p>
                    <Link
                      to="/auth"
                      onClick={() => setShowUserDropdown(false)}
                      className="block w-full py-2 text-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      🛒 {lang === 'bn' ? 'কাস্টমার লগইন / সাইন আপ' : 'Customer Sign In'}
                    </Link>
                    <div className="pt-1 border-t border-slate-100 space-y-1">
                      <Link
                        to="/vendor-register"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        <Store className="w-3.5 h-3.5 text-orange-500" />
                        <span>{lang === 'bn' ? 'সেলার সেন্টার' : 'Seller Center'}</span>
                      </Link>
                      <a
                        href="http://localhost:5174/login"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold text-purple-700 hover:bg-purple-50 transition"
                      >
                        <Crown className="w-3.5 h-3.5 text-purple-600" />
                        <span>{lang === 'bn' ? 'সুপার এডমিন (2FA)' : 'Super Admin (2FA)'}</span>
                      </a>
                      <Link
                        to="/rider-portal"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold text-blue-700 hover:bg-blue-50 transition"
                      >
                        <Truck className="w-3.5 h-3.5 text-blue-600" />
                        <span>{lang === 'bn' ? 'ডেলিভারি রাইডার' : 'Delivery Rider App'}</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. Cart with Drawer Open */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3.5 py-2 rounded-2xl transition border border-emerald-200 group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {totalCartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-[10px] text-emerald-600 uppercase font-bold">
                {lang === 'bn' ? 'কার্ট' : 'Cart'}
              </span>
              <span className="block text-xs font-extrabold font-mono text-emerald-900">
                {formatPrice(totalCartPrice)}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Bottom Navigation Bar matching reference image */}
      <div className="border-t border-slate-100 bg-white px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Green "All Categories" Dropdown */}
          <div ref={categoriesRef} className="relative">
            <button
              onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
              className="flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-t-xl transition shadow-sm"
            >
              <Menu className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Categories Dropdown */}
            {showCategoriesDropdown && (
              <div className="absolute top-full left-0 w-72 bg-white border border-slate-200 rounded-b-2xl rounded-tr-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                {categoriesList.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products?category=${cat.slug}`}
                    onClick={() => setShowCategoriesDropdown(false)}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-emerald-50 transition text-slate-700 hover:text-emerald-700 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{cat.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{lang === 'bn' ? cat.bn : cat.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{lang === 'bn' ? cat.bnCount : cat.count}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Center Links matching reference image */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-700">
            <Link to="/" className="text-emerald-700 font-bold hover:text-emerald-800 transition">
              {lang === 'bn' ? 'হোম' : 'Home'}
            </Link>
            <Link to="/products" className="hover:text-emerald-600 transition">
              {lang === 'bn' ? 'শপ' : 'Shop'}
            </Link>
            <Link to="/products?filter=deals" className="hover:text-emerald-600 transition flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{lang === 'bn' ? 'হট ডিলস' : 'Deals'}</span>
            </Link>
            <Link to="/about" className="hover:text-emerald-600 transition">
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </Link>
            <Link to="/contact" className="hover:text-emerald-600 transition">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </Link>

            {/* Smart AI & SaaS Hub Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold text-xs hover:bg-emerald-100 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'স্মার্ট সার্ভিসেস' : 'Smart Hub'}</span>
                <ChevronDown className="w-3 h-3 text-emerald-600" />
              </button>

              {showServicesDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 text-xs">
                  <div className="p-2 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    {lang === 'bn' ? 'এআই ও SaaS পাওয়ার টুলস' : 'AI & SaaS Power Tools'}
                  </div>
                  <div className="space-y-1 mt-1">
                    <button
                      onClick={() => { onOpenAI?.(); setShowServicesDropdown(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 text-slate-700 hover:text-purple-700 flex items-center gap-2 font-medium"
                    >
                      🤖 {lang === 'bn' ? 'এআই পার্সোনাল অ্যাসিস্ট্যান্ট' : 'AI Shopping Assistant'}
                    </button>
                    <button
                      onClick={() => { onOpenBudgetCart?.(); setShowServicesDropdown(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 flex items-center gap-2 font-medium"
                    >
                      💡 {lang === 'bn' ? 'এআই বাজেট কার্ট বিল্ডার' : 'AI Budget Cart Builder'}
                    </button>
                    <button
                      onClick={() => { onOpenSaaSStoreBuilder?.(); setShowServicesDropdown(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-blue-50 text-slate-700 hover:text-blue-700 flex items-center gap-2 font-medium"
                    >
                      🚀 {lang === 'bn' ? 'SaaS ভেন্ডর স্টোর বিল্ডার' : 'SaaS Vendor Storefront'}
                    </button>
                    <button
                      onClick={() => { onOpenLive?.(); setShowServicesDropdown(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-slate-700 hover:text-rose-700 flex items-center gap-2 font-medium"
                    >
                      🎥 {lang === 'bn' ? 'লাইভ স্ট্রিম শপিং' : 'Live Stream Shopping'}
                    </button>
                    <button
                      onClick={() => { onOpenB2BQuote?.(); setShowServicesDropdown(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 flex items-center gap-2 font-medium"
                    >
                      🏢 {lang === 'bn' ? 'B2B হোলসেল কোটেশন' : 'B2B Wholesale Quotes'}
                    </button>
                    <button
                      onClick={() => { onOpenVIP?.(); setShowServicesDropdown(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-700 flex items-center gap-2 font-medium"
                    >
                      👑 {lang === 'bn' ? 'ভিআইপি রিওয়ার্ডস ক্লাব' : 'VIP Loyalty Club'}
                    </button>
                    <button
                      onClick={() => { onOpenRecruiter?.(); setShowServicesDropdown(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 text-orange-950 font-bold border border-orange-200 flex items-center gap-2 mt-1"
                    >
                      ⭐ {lang === 'bn' ? 'টেক লিড / সিভি আর্কিটেকচার' : 'System Architecture (CV / Blueprint)'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Deliver to Selector */}
          <div className="flex items-center gap-2 text-xs py-2">
            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-slate-500 font-medium">{lang === 'bn' ? 'ডেলিভারি এরিয়া:' : 'Deliver to:'}</span>
            <button
              onClick={() => setShowLocationModal(true)}
              className="text-slate-800 font-bold hover:text-emerald-700 flex items-center gap-1 underline underline-offset-2"
            >
              <span>{deliveryLocation}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Location Selector Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'bn' ? 'ডেলিভারি স্থান নির্বাচন করুন' : 'Select Delivery Location'}</span>
              </h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'bn' ? 'দ্রুততম ৩০ মিনিটে হোম ডেলিভারির জন্য আপনার এলাকা নির্বাচন করুন:' : 'Choose your delivery area for 30-minute fast doorstep delivery:'}
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Dhaka, Dhanmondi', 'Dhaka, Gulshan', 'Dhaka, Uttara', 'Dhaka, Mirpur', 'Chittagong, Nasirabad', 'Sylhet, Zindabazar'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setDeliveryLocation(loc);
                    setShowLocationModal(false);
                  }}
                  className={`p-3 rounded-2xl text-xs font-semibold text-left border transition ${
                    deliveryLocation === loc
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                      : 'border-slate-200 hover:border-emerald-300 text-slate-700'
                  }`}
                >
                  📍 {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Search Modal */}
      <ImageSearchModal
        isOpen={isImageSearchOpen}
        onClose={() => setIsImageSearchOpen(false)}
      />
    </header>
  );
};
