import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Truck,
  Users,
  Layers,
  Ticket,
  Settings,
  LogOut,
  ExternalLink,
  X,
  Crown,
  Globe,
  Building2,
  TrendingUp,
  Star,
  ShieldAlert,
  LifeBuoy,
  Boxes,
  Terminal,
  Radio,
  Activity,
} from 'lucide-react';
import { useAdminAuthStore } from '../store/useAdminAuthStore';
import { useSidebarStore } from '../store/useSidebarStore';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAdminAuthStore();
  const { isOpen, closeSidebar } = useSidebarStore();
  const { lang, toggleLang, t } = useAdminLanguageStore();
  const isAdmin = user?.role === 'admin';
  const isBn = lang === 'bn';

  const sections = [
    {
      title: isBn ? 'মূল ড্যাশবোর্ড' : 'CORE OPERATIONS',
      items: [
        { to: '/', label: isBn ? 'ড্যাশবোর্ড ওভারভিউ' : 'Dashboard Overview', icon: LayoutDashboard },
        ...(isAdmin ? [{ to: '/analytics', label: isBn ? 'সেলস ও ফাইন্যান্সিয়াল অ্যানালিটিক্স' : 'Sales & Revenue Analytics', icon: TrendingUp }] : []),
      ],
    },
    {
      title: isBn ? 'পণ্য ও ইনভেন্টরি' : 'CATALOG & INVENTORY',
      items: [
        { to: '/products', label: isBn ? 'পণ্য ক্যাটালগ' : 'Products Catalog', icon: Package },
        ...(isAdmin ? [{ to: '/inventory', label: isBn ? 'স্টক ও ইনভেন্টরি হাব' : 'Inventory & Stock Hub', icon: Boxes }] : []),
        { to: '/orders', label: isBn ? 'লাইভ অর্ডার ফ্লিট' : 'Live Orders Fleet', icon: ShoppingCart },
        ...(isAdmin ? [{ to: '/reviews', label: isBn ? 'কাস্টমার রিভিউ ও রেটিংস' : 'Customer Reviews & Ratings', icon: Star }] : []),
        ...(isAdmin ? [{ to: '/categories', label: isBn ? 'ক্যাটাগরি হাব' : 'Categories Hub', icon: Layers }] : []),
      ],
    },
    {
      title: isBn ? 'মার্কেটপ্লেস ও গ্রোথ' : 'SELLERS & MARKETING',
      items: [
        ...(isAdmin ? [{ to: '/coupons', label: isBn ? 'প্রমো ভাউচার ও ডিসকাউন্ট' : 'Promo Vouchers & Deals', icon: Ticket }] : []),
        ...(isAdmin ? [{ to: '/broadcast', label: isBn ? 'ক্যাম্পেইন ব্রডকাস্টার' : 'Campaign Broadcast Center', icon: Radio }] : []),
        ...(isAdmin ? [{ to: '/vendors', label: isBn ? 'সেলার ও ভেন্ডর হাব' : 'Vendors & Multi-Seller Hub', icon: Store }] : []),
        ...(isAdmin ? [{ to: '/subscriptions', label: isBn ? 'SaaS মেম্বারশিপ প্ল্যানস' : 'SaaS Subscription Plans', icon: Crown }] : []),
        ...(isAdmin ? [{ to: '/riders', label: isBn ? 'DEX ডেলিভারি রাইডার্স' : 'DEX Riders & Logistics', icon: Truck }] : []),
      ],
    },
    {
      title: isBn ? 'সিকিউরিটি ও গভর্ন্যান্স' : 'SECURITY & GOVERNANCE',
      items: [
        ...(isAdmin ? [{ to: '/fraud-shield', label: isBn ? 'এআই ফ্রড শিল্ড' : 'AI Fraud & Risk Shield', icon: ShieldAlert }] : []),
        ...(isAdmin ? [{ to: '/audit-logs', label: isBn ? 'অডিট লগ ও সিকিউরিটি ট্রেইল' : 'Audit Logs & Security Trail', icon: Terminal }] : []),
        ...(isAdmin ? [{ to: '/gateways', label: isBn ? 'গেটওয়ে ও এপিআই হেলথ' : 'Gateways & Courier Health', icon: Activity }] : []),
        ...(isAdmin ? [{ to: '/users', label: isBn ? 'ইউজার ও রোলস (RBAC)' : 'Users & Access Control', icon: Users }] : []),
        ...(isAdmin ? [{ to: '/support', label: isBn ? '২৪/৭ কাস্টমার সাপোর্ট' : '24/7 Support Inquiries', icon: LifeBuoy }] : []),
        ...(isAdmin ? [{ to: '/settings', label: isBn ? 'সিস্টেম ও স্টোর কনফিগ' : 'System Settings & Config', icon: Settings }] : []),
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden animate-in fade-in"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800/90 flex flex-col justify-between p-3.5 flex-shrink-0 transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="overflow-y-auto pr-1">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 py-3 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-700/20">
                SX
              </div>
              <div>
                <h1 className="font-black text-sm text-white leading-tight flex items-center gap-1.5">
                  Shop<span className="text-emerald-400">X</span> BD
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-mono font-bold">ENTERPRISE</span>
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  {isAdmin ? (isBn ? 'সুপার এডমিন কনসোল' : 'Super Admin Console') : (isBn ? 'সেলার পোর্টাল' : 'Vendor Portal')}
                </span>
              </div>
            </div>

            <button
              onClick={closeSidebar}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Categorized Navigation Sections */}
          <div className="space-y-4">
            {sections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-1">
                <p className="px-3 text-[10px] font-mono uppercase tracking-widest font-black text-slate-500">
                  {sec.title}
                </p>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white font-black shadow-md shadow-emerald-700/20'
                            : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Profile & Links */}
        <div className="pt-3 border-t border-slate-800 space-y-2.5">
          {/* Quick Language Toggle in Sidebar */}
          <button
            onClick={toggleLang}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition border border-slate-700/60"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Language / ভাষা</span>
            </div>
            <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {lang === 'en' ? 'English' : 'বাংলা'}
            </span>
          </button>

          {/* Customer Storefront Link */}
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-[11px] font-bold text-slate-300 transition"
          >
            <span>🛍️ {isBn ? 'লাইভ কাস্টমার স্টোর' : 'Live Storefront ↗'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>

          {/* Head Office Tiny Badge */}
          <div className="px-2 py-1 text-[10px] text-slate-500 flex items-center gap-1.5 truncate">
            <Building2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            <span className="truncate">Rowmari, Kurigram, Rangpur</span>
          </div>

          <div className="flex items-center justify-between px-1 pt-1">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Admin'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@shopxbd.com'}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-xl hover:bg-red-950/40 text-slate-400 hover:text-rose-400 transition flex-shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
