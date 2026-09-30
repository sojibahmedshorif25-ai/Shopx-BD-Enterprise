import React from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  Zap,
  Coins,
  Ticket,
  Video,
  Gift,
  Users,
  Sparkles,
  Truck,
  ShieldCheck,
  Scale,
  Camera,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface ShopXChannelsBarProps {
  onOpenLive?: () => void;
  onOpenSpin?: () => void;
  onOpenVIP?: () => void;
  onOpenDailyStreak?: () => void;
  onOpenImageSearch?: () => void;
  onOpenAI?: () => void;
  onOpenCompare?: () => void;
}

export const ShopXChannelsBar: React.FC<ShopXChannelsBarProps> = ({
  onOpenLive,
  onOpenSpin,
  onOpenVIP,
  onOpenDailyStreak,
  onOpenImageSearch,
  onOpenAI,
  onOpenCompare,
}) => {
  const { lang } = useLanguageStore();

  const channels = [
    {
      id: 'mall',
      title: lang === 'bn' ? 'ShopX মল' : 'ShopX Mall',
      subtitle: lang === 'bn' ? '১০০% অরিজিনাল' : '100% Authentic',
      icon: Crown,
      badge: 'OFFICIAL',
      color: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200 text-amber-900',
      badgeBg: 'bg-amber-500 text-white',
      link: '/products?mall=true',
    },
    {
      id: 'flash',
      title: lang === 'bn' ? 'ফ্ল্যাশ সেল' : 'Flash Sale',
      subtitle: lang === 'bn' ? 'লিমিটেড অফার' : 'Live Countdown',
      icon: Zap,
      badge: 'RUSH',
      color: 'from-rose-500 to-orange-500',
      bgLight: 'bg-rose-50 hover:bg-rose-100/80 border-rose-200 text-rose-900',
      badgeBg: 'bg-rose-600 text-white',
      action: () => {
        const el = document.getElementById('flash-sale-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'coins',
      title: lang === 'bn' ? 'কয়েন রিওয়ার্ড' : 'Daily Coins',
      subtitle: lang === 'bn' ? '৭ দিনের স্ট্রিক' : 'Earn Free Tk',
      icon: Coins,
      badge: '+৳৫০',
      color: 'from-yellow-400 to-amber-500',
      bgLight: 'bg-amber-50/90 hover:bg-amber-100 border-amber-200 text-amber-900',
      badgeBg: 'bg-amber-600 text-white',
      action: () => {
        if (onOpenDailyStreak) onOpenDailyStreak();
        else {
          const el = document.getElementById('coins-hub-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      id: 'vouchers',
      title: lang === 'bn' ? 'ভাউচার সেন্টার' : 'Voucher Center',
      subtitle: lang === 'bn' ? 'ফ্রি ডেলিভারি' : '1-Click Collect',
      icon: Ticket,
      badge: 'FREE',
      color: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 text-emerald-900',
      badgeBg: 'bg-emerald-600 text-white',
      action: () => {
        const el = document.getElementById('voucher-center-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'live',
      title: lang === 'bn' ? 'ShopX লাইভ' : 'ShopX Live',
      subtitle: lang === 'bn' ? 'ভিডিও শপিং' : 'Live Host Deals',
      icon: Video,
      badge: 'LIVE',
      color: 'from-red-600 to-rose-600',
      bgLight: 'bg-red-50 hover:bg-red-100/80 border-red-200 text-red-900',
      badgeBg: 'bg-red-600 text-white animate-pulse',
      action: onOpenLive,
    },
    {
      id: 'spin',
      title: lang === 'bn' ? 'লাকি স্পিন' : 'Lucky Spin',
      subtitle: lang === 'bn' ? 'উপহার জিতুন' : 'Daily Wheel',
      icon: Gift,
      badge: 'WIN',
      color: 'from-purple-500 to-indigo-600',
      bgLight: 'bg-purple-50 hover:bg-purple-100/80 border-purple-200 text-purple-900',
      badgeBg: 'bg-purple-600 text-white',
      action: onOpenSpin,
    },
    {
      id: 'team',
      title: lang === 'bn' ? 'টিম বাই' : 'Team Buy',
      subtitle: lang === 'bn' ? 'গ্রুপে ২০% ছাড়' : 'Group Discounts',
      icon: Users,
      badge: 'SAVE',
      color: 'from-blue-500 to-cyan-600',
      bgLight: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200 text-blue-900',
      badgeBg: 'bg-blue-600 text-white',
      action: () => {
        const el = document.getElementById('team-buy-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'ai-search',
      title: lang === 'bn' ? 'AI ফটো সার্চ' : 'AI Visual Search',
      subtitle: lang === 'bn' ? 'ছবি দিয়ে খুঁজুন' : 'Search by Photo',
      icon: Camera,
      badge: 'AI',
      color: 'from-teal-500 to-emerald-600',
      bgLight: 'bg-teal-50 hover:bg-teal-100/80 border-teal-200 text-teal-900',
      badgeBg: 'bg-teal-600 text-white',
      action: onOpenImageSearch,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 pt-2 pb-4">
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
          {channels.map((ch) => {
            const Icon = ch.icon;
            const content = (
              <div
                className={`group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer ${ch.bgLight}`}
              >
                {/* Badge */}
                {ch.badge && (
                  <span
                    className={`absolute -top-2 -right-1 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm ${ch.badgeBg}`}
                  >
                    {ch.badge}
                  </span>
                )}

                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${ch.color} text-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition duration-300 mb-2`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                {/* Title */}
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 text-center line-clamp-1 group-hover:text-emerald-700">
                  {ch.title}
                </span>

                {/* Subtitle */}
                <span className="text-[10px] sm:text-xs text-slate-500 text-center line-clamp-1 hidden sm:block mt-0.5 font-medium">
                  {ch.subtitle}
                </span>
              </div>
            );

            if (ch.link) {
              return (
                <Link key={ch.id} to={ch.link} className="block focus:outline-none">
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={ch.id}
                type="button"
                onClick={ch.action}
                className="block w-full text-left focus:outline-none"
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
