import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Truck,
  Users,
  LogOut,
  ExternalLink,
  X,
  Crown,
  Globe,
} from 'lucide-react';
import { useAdminAuthStore } from '../store/useAdminAuthStore';
import { useSidebarStore } from '../store/useSidebarStore';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAdminAuthStore();
  const { isOpen, closeSidebar } = useSidebarStore();
  const { lang, toggleLang, t } = useAdminLanguageStore();
  const isAdmin = user?.role === 'admin';

  const navItems = [
    { to: '/', label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: '/products', label: t('nav.products'), icon: Package },
    { to: '/orders', label: t('nav.orders'), icon: ShoppingCart },
    ...(isAdmin ? [{ to: '/users', label: lang === 'en' ? 'Users & Roles' : 'ইউজার ও রোলস', icon: Users }] : []),
    ...(isAdmin ? [{ to: '/vendors', label: t('nav.vendors'), icon: Store }] : []),
    ...(isAdmin ? [{ to: '/subscriptions', label: t('nav.subscriptions'), icon: Crown }] : []),
    ...(isAdmin ? [{ to: '/riders', label: t('nav.riders'), icon: Truck }] : []),
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0 transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header & Mobile Close */}
          <div className="flex items-center justify-between px-2 py-3 mb-5 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-orange-500/20">
                SX
              </div>
              <div>
                <h1 className="font-black text-lg text-white leading-tight">
                  Shop<span className="text-orange-500">X</span> BD
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-400 border border-indigo-800/40">
                  {isAdmin ? t('super_admin') : t('vendor_portal')}
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

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-lg shadow-orange-500/20'
                        : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Profile & Links */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          {/* Quick Language Toggle in Sidebar */}
          <button
            onClick={toggleLang}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition border border-slate-800"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span>Language / ভাষা</span>
            </div>
            <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">
              {lang === 'en' ? 'English' : 'বাংলা'}
            </span>
          </button>

          {/* Customer Storefront Link */}
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-[11px] font-bold text-slate-300 transition"
          >
            <span>{t('customer_store')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
          </a>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs border border-orange-500/30 flex-shrink-0">
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
              title={t('logout')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
