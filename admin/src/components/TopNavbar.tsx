import React from 'react';
import { Sparkles, Menu, Languages, Globe } from 'lucide-react';
import { useAdminAuthStore } from '../store/useAdminAuthStore';
import { useSidebarStore } from '../store/useSidebarStore';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const TopNavbar: React.FC = () => {
  const { user } = useAdminAuthStore();
  const { toggleSidebar } = useSidebarStore();
  const { lang, toggleLang, t } = useAdminLanguageStore();

  return (
    <header className="h-16 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-30 shadow-md">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white md:hidden transition border border-slate-700/60"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span>{t('system.status')}</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t('system.online')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Language Switcher Button (EN / বাংলা) */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 hover:text-white transition shadow-sm"
          title={lang === 'en' ? 'Switch to বাংলা' : 'Switch to English'}
        >
          <Globe className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-mono text-[11px] font-black">{lang === 'en' ? 'EN' : 'বাং'}</span>
          <span className="text-slate-500 text-[10px]">⇄</span>
          <span className="text-orange-400 text-[11px]">{lang === 'en' ? 'বাংলা' : 'English'}</span>
        </button>

        {/* Gemini AI Status Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          <span className="hidden md:inline">{t('ai.active')}</span>
          <span className="md:hidden">AI Active</span>
        </div>

        {/* User Info Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white truncate max-w-[120px]">{user?.name || 'Admin'}</p>
            <p className="text-[10px] text-orange-400 uppercase font-black tracking-wider">
              {user?.role === 'admin' ? t('super_admin') : t('vendor_portal')}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
