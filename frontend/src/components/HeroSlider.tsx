import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
  Heart,
  Plus,
  Check,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCartStore } from '../store/useCartStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

export const HeroSlider: React.FC = () => {
  const { lang } = useLanguageStore();
  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      kicker: 'MEGA TECH & GADGET FEST',
      title: 'Flagship Smartphones, Laptops & Smart Gadgets',
      titleBn: 'ফ্ল্যাগশিপ স্মার্টফোন, ল্যাপটপ ও স্মার্ট গ্যাজেট',
      sub: 'Official Apple, Sony, Dyson & Samsung with 1-Year brand warranty.',
      subBn: '১ বছর অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি সহ ১০০% জেনুইন গ্যাজেট ও অ্যাক্সেসরিজ।',
      btnText: 'Shop Gadgets',
      btnTextBn: 'গ্যাজেট কিনুন',
      link: '/products?category=smartphones-tablets',
      badge: 'Up to 40% OFF',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    },
    {
      kicker: '100% PURE & ORGANIC FOODS',
      title: 'Raw Sundarbans Honey, Cow Ghee & Daily Grocery',
      titleBn: 'সুন্দরবনের খাঁটি মধু, গাওয়া ঘি ও নিত্যদিনের গ্রোসারি',
      sub: 'Lab-tested organic foods direct from authentic rural farms to your table.',
      subBn: 'BSTI ও BCSIR ল্যাব টেস্টে পরীক্ষিত নির্ভেজাল পুষ্টিকর অর্গানিক ফুডস।',
      btnText: 'Shop Organic',
      btnTextBn: 'অর্গানিক কিনুন',
      link: '/products?category=organic-foods',
      badge: 'Lab Certified 100%',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    },
    {
      kicker: 'LUXURY FASHION & LIFESTYLE',
      title: 'Designer Panjabis, Royal Attars & Watches',
      titleBn: 'ডিজাইনার পাঞ্জাবি, রাজকীয় আতর ও প্রিমিয়াম ঘড়ি',
      sub: 'Elevate your signature look with handpicked apparel & French fragrances.',
      subBn: 'আভিজাত্যের ছোঁয়ায় প্রিমিয়াম রাজকীয় সিল্ক পাঞ্জাবি ও অরিজিনাল সুগন্ধি।',
      btnText: 'Explore Fashion',
      btnTextBn: 'ফ্যাশন দেখুন',
      link: '/products?category=fashion-lifestyle',
      badge: 'New Season 2026',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
    },
  ];

  // Auto slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Deals of the day countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 36, seconds: 24 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(heroSearch)}`);
    } else {
      navigate('/products');
    }
  };

  const dealProducts = [
    {
      id: 'deal-tech-1',
      title: 'Sony WH-1000XM5 ANC Headphone',
      unit: 'Official 1-Yr Warranty',
      price: 34500,
      oldPrice: 39900,
      discount: '14% OFF',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
      rating: 4.9,
    },
    {
      id: 'deal-food-1',
      title: 'Sundarbans Raw Wild Honey',
      unit: '1 kg Bottle (Lab Tested)',
      price: 1450,
      oldPrice: 1800,
      discount: '19% OFF',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&auto=format&fit=crop&q=80',
      rating: 5.0,
    },
    {
      id: 'deal-fashion-1',
      title: 'Royal Silk Embroidered Panjabi',
      unit: 'Pure Silk / Size 40-44',
      price: 4200,
      oldPrice: 5500,
      discount: '24% OFF',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&auto=format&fit=crop&q=80',
      rating: 4.9,
    },
    {
      id: 'deal-tech-2',
      title: 'Anker 65W GaN Fast Charger 3-Port',
      unit: 'Ultra Fast / Type-C',
      price: 2650,
      oldPrice: 3200,
      discount: '17% OFF',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&auto=format&fit=crop&q=80',
      rating: 4.8,
    },
  ];

  const handleAddToCart = (item: any) => {
    addItem({
      _id: item.id,
      title: item.title,
      price: item.price,
      thumbnail: item.image,
      stock: 50,
      category: 'deals',
      banglaTitle: item.title,
      description: item.title,
      images: [item.image],
    } as any);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const activeSlide = heroSlides[currentSlide];

  return (
    <section className="max-w-7xl mx-auto px-4 pt-4 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT & CENTER HERO BANNER (Dynamic Multi-Category) */}
        <div className="lg:col-span-8 bg-[#f2f9f5] rounded-3xl p-6 sm:p-10 border border-emerald-100 flex flex-col justify-between relative overflow-hidden shadow-sm min-h-[420px]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center z-10 my-auto">
            {/* Left Copy & Search */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-200/80 px-3 py-1 rounded-full">
                  {activeSlide.kicker}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full shadow-sm border border-emerald-200">
                  {activeSlide.badge}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-[1.2] tracking-tight">
                {lang === 'bn' ? activeSlide.titleBn : activeSlide.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                {lang === 'bn' ? activeSlide.subBn : activeSlide.sub}
              </p>

              {/* In-Hero Search Bar & CTA Button */}
              <form onSubmit={handleHeroSearchSubmit} className="flex items-center gap-2 max-w-md bg-white rounded-full p-1.5 shadow-md border border-slate-200 focus-within:border-emerald-600 transition">
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder={lang === 'bn' ? 'কী পণ্য খুঁজছেন?' : 'Search in 50,000+ products...'}
                  className="w-full bg-transparent text-xs sm:text-sm px-4 text-slate-800 outline-none placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm transition whitespace-nowrap"
                >
                  <span>{lang === 'bn' ? activeSlide.btnTextBn : activeSlide.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Interactive Image with Badge */}
            <div className="md:col-span-5 relative flex justify-center items-center">
              <div className="relative group">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-64 sm:w-72 h-64 sm:h-72 object-cover rounded-3xl shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -top-3 -right-3 bg-white px-3.5 py-1.5 rounded-2xl shadow-lg border border-emerald-100 flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800">100% Genuine Brands</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                </div>
              </div>
            </div>
          </div>

          {/* Slider Indicators */}
          <div className="flex items-center justify-between pt-4 border-t border-emerald-200/60 z-10 mt-4">
            <div className="flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === i ? 'w-8 bg-emerald-700' : 'w-2 bg-emerald-200'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 text-slate-600 text-xs font-medium">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>24-Hour Express Shipping</span>
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash on Delivery & 0% EMI</span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT DEALS OF THE DAY (Multi-Department Flash Sales) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
            {/* Header & Live Countdown */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Deals Of The Day</span>
                </h3>
                <p className="text-[10px] text-slate-400">Multi-category flash offers</p>
              </div>

              {/* Countdown boxes */}
              <div className="flex items-center gap-1 font-mono text-xs font-black">
                <span className="bg-emerald-700 text-white px-1.5 py-0.5 rounded-md">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-slate-400">:</span>
                <span className="bg-emerald-700 text-white px-1.5 py-0.5 rounded-md">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-slate-400">:</span>
                <span className="bg-emerald-700 text-white px-1.5 py-0.5 rounded-md">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* 4 Clean Deal Items List */}
            <div className="grid grid-cols-2 gap-3 my-3">
              {dealProducts.map((item) => (
                <div
                  key={item.id}
                  className="border border-slate-100 rounded-2xl p-2.5 bg-slate-50/50 hover:bg-emerald-50/40 hover:border-emerald-200 transition group flex flex-col justify-between"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-20 object-cover rounded-xl bg-white mb-1.5 group-hover:scale-105 transition"
                    />
                    <span className="absolute top-1 left-1 bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md">
                      {item.discount}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] text-slate-400 font-medium truncate block">{item.unit}</span>
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.title}</h4>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xs font-black text-emerald-700 font-mono">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through font-mono">
                        {formatPrice(item.oldPrice)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-2 w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1 shadow-sm transition"
                  >
                    {addedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-white" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 text-white" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <Link
              to="/products?filter=deals"
              className="text-center text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline pt-2 border-t border-slate-100 flex items-center justify-center gap-1"
            >
              <span>View All Mega Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Side Promo Mini Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-4 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                  Code: SHOPX100
                </span>
                <h4 className="text-xs font-extrabold mt-1">Flat ৳100 Off on First Order</h4>
              </div>
              <Link
                to="/products"
                className="mt-2 text-[10px] font-bold bg-white text-emerald-900 py-1.5 px-3 rounded-lg text-center shadow hover:bg-emerald-50 transition"
              >
                Shop Now →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-200">
                  SaaS Multi-Vendor Hub
                </span>
                <h4 className="text-xs font-extrabold mt-1">Start Selling on ShopX BD</h4>
              </div>
              <Link
                to="/vendor-register"
                className="mt-2 text-[10px] font-bold bg-white text-orange-950 py-1.5 px-3 rounded-lg text-center shadow hover:bg-orange-50 transition"
              >
                Open Store →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
