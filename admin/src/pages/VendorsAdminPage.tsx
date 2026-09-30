import React, { useState, useEffect } from 'react';
import { Store, Star, CheckCircle, XCircle, ShieldCheck, RefreshCw, DollarSign, Percent, MapPin, Phone, UserCheck } from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const VendorsAdminPage: React.FC = () => {
  const { lang, t } = useAdminLanguageStore();
  const [vendors, setVendors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/admin/vendors');
      if (res.data.success) {
        setVendors(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleUpdateStatus = async (vendorId: string, status: string, commissionRate?: number) => {
    try {
      await api.put(`/admin/vendors/${vendorId}`, { status, commissionRate });
      fetchVendors();
    } catch {
      alert(lang === 'en' ? 'Vendor status update failed.' : 'সেলার স্ট্যাটাস আপডেট ব্যর্থ হয়েছে।');
    }
  };

  const totalGMV = vendors.reduce((acc, v) => acc + (v.totalSales || 0), 0);
  const approvedCount = vendors.filter((v) => v.status === 'approved').length;

  return (
    <div className="p-3.5 sm:p-6 space-y-5 max-w-full overflow-hidden">
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
            <Store className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
            <span>{t('vendors.title')}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {t('vendors.subtitle')}
          </p>
        </div>

        <button
          onClick={fetchVendors}
          disabled={isLoading}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition border border-slate-700/80 shadow"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-orange-400 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{t('refresh')}</span>
        </button>
      </div>

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">{lang === 'en' ? 'Total Vendor Stores' : 'সর্বমোট ভেন্ডর'}</p>
            <p className="text-lg sm:text-xl font-black text-white mt-0.5">{vendors.length} {lang === 'en' ? 'Stores' : 'দোকান'}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
            <Store className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">{lang === 'en' ? 'Approved & Active' : 'অনুমোদিত ও সক্রিয়'}</p>
            <p className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">{approvedCount} {lang === 'en' ? 'Active' : 'সক্রিয়'}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">{lang === 'en' ? 'Cumulative Vendor Sales' : 'সর্বমোট ভেন্ডর বিক্রয়'}</p>
            <p className="text-lg sm:text-xl font-black text-white mt-0.5">৳{totalGMV.toLocaleString()}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Vendors Container */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Mobile Card View (< md) */}
        <div className="p-3 space-y-3 md:hidden">
          {vendors.map((vendor) => (
            <div
              key={vendor._id}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={vendor.logo || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop'}
                    alt={vendor.storeName}
                    className="w-12 h-12 rounded-2xl object-cover bg-slate-800 border border-slate-700/80 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{vendor.storeName}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{vendor.rating || 5.0}</span>
                      <span className="text-[10px] text-slate-500">({vendor.productsCount || 12} items)</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold uppercase text-[9px] border ${
                    vendor.status === 'approved'
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50'
                      : 'bg-amber-950/80 text-amber-400 border-amber-700/50'
                  }`}
                >
                  {vendor.status === 'approved' ? 'Active' : 'Pending'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block">{lang === 'en' ? 'Sales GMV' : 'মোট বিক্রয়'}</span>
                  <span className="font-mono font-black text-emerald-400">৳{vendor.totalSales?.toLocaleString() || '0'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">{lang === 'en' ? 'Commission Fee' : 'কমিশন রেট'}</span>
                  <span className="font-mono font-bold text-orange-400">{vendor.commissionRate || 5}%</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <p className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-3 h-3 text-orange-400 flex-shrink-0" />
                  <span>{vendor.phone || '01933333333'} ({vendor.user?.name || 'Owner'})</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{vendor.address || 'Dhaka, Bangladesh'}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-right">
                {vendor.status !== 'approved' ? (
                  <button
                    onClick={() => handleUpdateStatus(vendor._id, 'approved')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md transition"
                  >
                    {t('vendors.btn_approve')}
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(vendor._id, 'suspended')}
                    className="w-full py-2 bg-rose-950/80 hover:bg-rose-900 text-rose-400 hover:text-white rounded-xl font-bold text-xs border border-rose-800/60 transition"
                  >
                    {t('vendors.btn_suspend')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 min-w-[200px]">{t('vendors.th_store')}</th>
                <th className="py-3.5 px-4 min-w-[160px]">{t('vendors.th_owner')}</th>
                <th className="py-3.5 px-4 min-w-[200px]">{t('vendors.th_address')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('vendors.th_sales')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('vendors.th_commission')}</th>
                <th className="py-3.5 px-4 whitespace-nowrap">{t('vendors.th_status')}</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {vendors.map((vendor) => (
                <tr key={vendor._id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={vendor.logo || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop'}
                        alt={vendor.storeName}
                        className="w-11 h-11 rounded-2xl object-cover bg-slate-800 border border-slate-700/80 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate max-w-[180px]">{vendor.storeName}</p>
                        <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold mt-0.5">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{vendor.rating || 5.0}</span>
                          <span className="text-[10px] text-slate-500 font-normal">({vendor.productsCount || 12} items)</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-200">{vendor.user?.name || 'Store Owner'}</p>
                      <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                        <Phone className="w-3 h-3 text-orange-400 flex-shrink-0" />
                        <span>{vendor.phone || '01933333333'}</span>
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <p className="text-slate-300 text-xs line-clamp-2 max-w-xs flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{vendor.address || 'Dhaka, Bangladesh'}</span>
                    </p>
                  </td>

                  <td className="p-4 font-mono font-black text-emerald-400 whitespace-nowrap text-sm">
                    ৳{vendor.totalSales?.toLocaleString() || '0'}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-xl bg-slate-800 text-orange-400 font-mono font-bold text-xs border border-slate-700">
                      {vendor.commissionRate || 5}%
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold uppercase text-[10px] border ${
                        vendor.status === 'approved'
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50'
                          : 'bg-amber-950/80 text-amber-400 border-amber-700/50'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${vendor.status === 'approved' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      {vendor.status === 'approved' ? (lang === 'en' ? 'Approved' : 'অনুমোদিত') : (lang === 'en' ? 'Pending' : 'অপেক্ষমাণ')}
                    </span>
                  </td>

                  <td className="p-4 text-right whitespace-nowrap">
                    {vendor.status !== 'approved' ? (
                      <button
                        onClick={() => handleUpdateStatus(vendor._id, 'approved')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md transition"
                      >
                        {t('vendors.btn_approve')}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(vendor._id, 'suspended')}
                        className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-400 hover:text-white rounded-xl font-bold text-xs border border-rose-800/60 transition"
                      >
                        {t('vendors.btn_suspend')}
                      </button>
                    )}
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
