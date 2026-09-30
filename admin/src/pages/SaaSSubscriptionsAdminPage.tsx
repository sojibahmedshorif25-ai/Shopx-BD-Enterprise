import React, { useState } from 'react';
import {
  Crown,
  DollarSign,
  TrendingUp,
  Store,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Lock,
  ArrowUpRight,
  Server,
  Layers,
} from 'lucide-react';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

interface SaaSStore {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  subdomain: string;
  customDomain?: string;
  plan: 'Starter' | 'Pro Growth' | 'Enterprise Unicorn';
  mrr: number;
  commissionRate: number;
  status: 'ACTIVE' | 'PENDING_RENEWAL' | 'SUSPENDED';
  joinedDate: string;
  productsCount: number;
  totalGMV: number;
  sslActive: boolean;
}

const INITIAL_STORES: SaaSStore[] = [
  {
    id: 's1',
    storeName: 'Sundarban Natural Organic Honey',
    ownerName: 'Sharif Hasan',
    email: 'sharif@sundarbanpure.com',
    subdomain: 'sundarban-pure',
    customDomain: 'sundarbanorganic.com',
    plan: 'Enterprise Unicorn',
    mrr: 4999,
    commissionRate: 1.2,
    status: 'ACTIVE',
    joinedDate: '2026-01-15',
    productsCount: 42,
    totalGMV: 485000,
    sslActive: true,
  },
  {
    id: 's2',
    storeName: 'Pro Gadget & Audio Tech Lab',
    ownerName: 'Tanvir Ahmed',
    email: 'tanvir@proaudio.com',
    subdomain: 'pro-audio-tech',
    plan: 'Pro Growth',
    mrr: 1999,
    commissionRate: 3.5,
    status: 'ACTIVE',
    joinedDate: '2026-02-01',
    productsCount: 88,
    totalGMV: 312000,
    sslActive: true,
  },
  {
    id: 's3',
    storeName: 'Kashmiri Saffron & Spices Co.',
    ownerName: 'Mahmudur Rahman',
    email: 'mahmud@kashmirispices.bd',
    subdomain: 'kashmiri-spices',
    plan: 'Pro Growth',
    mrr: 1999,
    commissionRate: 3.5,
    status: 'ACTIVE',
    joinedDate: '2026-02-18',
    productsCount: 24,
    totalGMV: 195000,
    sslActive: true,
  },
  {
    id: 's4',
    storeName: 'Dhaka Luxury Perfume Lounge',
    ownerName: 'Nafis Chowdhury',
    email: 'nafis@luxuryscent.bd',
    subdomain: 'luxury-scents',
    customDomain: 'luxuryscentbd.com',
    plan: 'Enterprise Unicorn',
    mrr: 4999,
    commissionRate: 1.2,
    status: 'ACTIVE',
    joinedDate: '2026-01-20',
    productsCount: 35,
    totalGMV: 620000,
    sslActive: true,
  },
  {
    id: 's5',
    storeName: 'Pabna Pure Organic Dairy Farms',
    ownerName: 'Abdul Karim',
    email: 'karim@pabnadairy.com',
    subdomain: 'pabna-dairy',
    plan: 'Starter',
    mrr: 0,
    commissionRate: 8.0,
    status: 'ACTIVE',
    joinedDate: '2026-03-02',
    productsCount: 12,
    totalGMV: 84000,
    sslActive: true,
  },
];

export const SaaSSubscriptionsAdminPage: React.FC = () => {
  const { lang, t } = useAdminLanguageStore();
  const [stores, setStores] = useState<SaaSStore[]>(INITIAL_STORES);
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>('ALL');

  const filteredStores = stores.filter((s) => {
    if (selectedPlanFilter === 'ALL') return true;
    return s.plan.toLowerCase().includes(selectedPlanFilter.toLowerCase());
  });

  const totalMRR = stores.reduce((sum, s) => sum + s.mrr, 0);
  const totalARR = totalMRR * 12;
  const totalTenantGMV = stores.reduce((sum, s) => sum + s.totalGMV, 0);

  return (
    <div className="p-3.5 sm:p-6 space-y-5 max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0" />
              <span>{t('saas.title')}</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
              Cloud Multi-Tenant
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {t('saas.subtitle')}
          </p>
        </div>

        <button
          onClick={() => alert(lang === 'en' ? 'All SaaS Tenant SSL certificates and subdomains are synchronized!' : 'সকল টেন্যান্টের SSL সার্টিফিকেট ও সাবডোমেইন সিঙ্ক করা হয়েছে!')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition border border-slate-700 shadow flex-shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
          <span>{t('saas.sync_dns')}</span>
        </button>
      </div>

      {/* SaaS Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* MRR Card */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t('saas.mrr')}</span>
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            ৳{totalMRR.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-bold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+28.4% vs last month</span>
          </div>
        </div>

        {/* Projected ARR Card */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t('saas.arr')}</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Crown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
            ৳{totalARR.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-2">
            Active Multi-Tenant Cloud Run
          </div>
        </div>

        {/* Total Tenant GMV */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t('saas.gmv')}</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            ৳{totalTenantGMV.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-400 font-bold mt-2">
            Platform Escrow Volume
          </div>
        </div>

        {/* Active Cloud Tenants */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t('saas.active_tenants')}</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
            {stores.length} Live Tenants
          </div>
          <div className="text-[11px] text-emerald-400 font-bold mt-2">
            {t('saas.uptime')}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 custom-scrollbar">
        {[
          { id: 'ALL', labelEn: 'All Stores', labelBn: 'সকল টেন্যান্ট' },
          { id: 'Starter', labelEn: 'Starter', labelBn: 'Starter Plan' },
          { id: 'Pro', labelEn: 'Pro Growth', labelBn: 'Pro Plan' },
          { id: 'Enterprise', labelEn: 'Enterprise', labelBn: 'Enterprise Plan' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedPlanFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedPlanFilter === tab.id
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-lg shadow-orange-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {lang === 'en' ? tab.labelEn : tab.labelBn}
          </button>
        ))}
      </div>

      {/* Tenants Container */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Mobile Card View (< md) */}
        <div className="p-3 space-y-3 md:hidden">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md"
            >
              <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                <div>
                  <h4 className="font-bold text-white text-sm">{store.storeName}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{store.ownerName} • {store.email}</p>
                </div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase whitespace-nowrap ${
                    store.plan === 'Enterprise Unicorn'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : store.plan === 'Pro Growth'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {store.plan.split(' ')[0]}
                </span>
              </div>

              <div className="space-y-1 text-xs font-mono">
                <div className="text-orange-400 truncate">https://{store.subdomain}.shopx.store</div>
                {store.customDomain && (
                  <div className="text-emerald-400 text-[11px]">Domain: {store.customDomain}</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">{lang === 'en' ? 'Monthly MRR' : 'মাসিক ফি'}</span>
                  <span className="font-mono font-bold text-white">
                    {store.mrr === 0 ? 'Free' : `৳${store.mrr.toLocaleString()}/mo`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">{lang === 'en' ? 'Store GMV' : 'মোট বিক্রয়'}</span>
                  <span className="font-mono font-black text-emerald-400">৳{store.totalGMV.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40">
                  <ShieldCheck className="w-3 h-3" />
                  <span>SSL Active</span>
                </div>

                <a
                  href={`https://${store.subdomain}.shopx.store`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs inline-flex items-center gap-1 border border-slate-700"
                >
                  <span>{t('saas.visit')}</span>
                  <ExternalLink className="w-3 h-3 text-orange-400" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full text-left text-xs min-w-[840px]">
            <thead className="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 min-w-[220px]">{t('saas.th_store')}</th>
                <th className="py-3.5 px-4 min-w-[160px]">{t('saas.th_owner')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('saas.th_plan')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('saas.th_fee')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('saas.th_commission')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('saas.th_sales')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('saas.th_ssl')}</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStores.map((store) => (
                <tr key={store.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{store.storeName}</div>
                    <div className="flex flex-wrap items-center gap-1.5 text-orange-400 font-mono text-[11px] mt-0.5">
                      <span>https://{store.subdomain}.shopx.store</span>
                      {store.customDomain && (
                        <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded text-[10px] border border-emerald-800/40">
                          {store.customDomain}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-200">{store.ownerName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{store.email}</div>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        store.plan === 'Enterprise Unicorn'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : store.plan === 'Pro Growth'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {store.plan}
                    </span>
                  </td>

                  <td className="p-4 font-mono font-bold text-white whitespace-nowrap">
                    {store.mrr === 0 ? 'Free' : `৳${store.mrr.toLocaleString()}/mo`}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className="bg-slate-800 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-lg text-[11px] border border-slate-700">
                      {store.commissionRate}% Fee
                    </span>
                  </td>

                  <td className="p-4 font-mono font-black text-emerald-400 whitespace-nowrap">
                    ৳{store.totalGMV.toLocaleString()}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>SSL Active (Edge)</span>
                    </div>
                  </td>

                  <td className="p-4 text-right whitespace-nowrap">
                    <a
                      href={`https://${store.subdomain}.shopx.store`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-[11px] transition inline-flex items-center gap-1 border border-slate-700 shadow-sm"
                    >
                      <span>{t('saas.visit')}</span>
                      <ExternalLink className="w-3 h-3 text-orange-400" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
