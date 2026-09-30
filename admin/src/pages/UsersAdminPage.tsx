import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  Search,
  RefreshCw,
  Coins,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Crown,
  Store,
  Truck,
  UserCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const UsersAdminPage: React.FC = () => {
  const { lang, t } = useAdminLanguageStore();
  const isBn = lang === 'bn';

  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Edit User State
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [newRole, setNewRole] = useState('');
  const [newIsActive, setNewIsActive] = useState(true);
  const [addCoins, setAddCoins] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/admin/users', {
        params: {
          role: selectedRole !== 'all' ? selectedRole : undefined,
          search: searchQuery.trim() || undefined,
        },
      });
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedRole]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleOpenEditModal = (user: any) => {
    setEditingUser(user);
    setNewRole(user.role);
    setNewIsActive(user.isActive ?? true);
    setAddCoins(0);
  };

  const handleSaveUserUpdates = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsUpdating(true);

    try {
      const updatedCoins = (editingUser.loyaltyCoins || 0) + Number(addCoins);
      const res = await api.put(`/admin/users/${editingUser._id || editingUser.id}`, {
        role: newRole,
        isActive: newIsActive,
        loyaltyCoins: updatedCoins,
      });

      if (res.data.success) {
        setEditingUser(null);
        fetchUsers();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update user.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteUser = async (id: string, email: string) => {
    if (email === 'sojibahmedshorif25@gmail.com') {
      alert(isBn ? 'সুপার এডমিন অ্যাকাউন্ট মুছে ফেলা সম্ভব নয়!' : 'Cannot delete Super Admin account!');
      return;
    }

    if (!window.confirm(isBn ? 'আপনি কি নিশ্চিত এই অ্যাকাউন্টটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Delete failed.');
    }
  };

  const customerCount = users.filter((u) => u.role === 'customer').length;
  const vendorCount = users.filter((u) => u.role === 'vendor').length;
  const riderCount = users.filter((u) => u.role === 'rider').length;
  const adminCount = users.filter((u) => u.role === 'admin').length;

  return (
    <div className="p-3.5 sm:p-6 space-y-5 max-w-full overflow-hidden">
      {/* 1. Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
            <span>{isBn ? 'ইউজার ও রোলস ম্যানেজমেন্ট' : 'User Roles & Accounts Control'}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {isBn
              ? 'কাস্টমার, সেলার, ডেলিভারি রাইডার ও প্ল্যাটফর্ম এডমিনদের সম্পূর্ণ অ্যাক্টিভিটি ও রোল নিয়ন্ত্রণ।'
              : 'Enterprise RBAC control: manage Customers, Vendors, DEX Riders & Super Admins.'}
          </p>
        </div>

        <button
          onClick={fetchUsers}
          disabled={isLoading}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition border border-slate-700/80 shadow"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-orange-400 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isBn ? 'রিফ্রেশ' : 'Refresh'}</span>
        </button>
      </div>

      {/* 2. Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-3xl shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">{isBn ? 'কাস্টমার' : 'Customers'}</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 flex items-center justify-center font-black text-xs">
              🛒
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-400 mt-2">{customerCount}</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-3xl shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">{isBn ? 'সেলার / ভেন্ডর' : 'Sellers'}</span>
            <span className="w-8 h-8 rounded-xl bg-orange-950/60 border border-orange-800/50 text-orange-400 flex items-center justify-center font-black text-xs">
              <Store className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-black text-orange-400 mt-2">{vendorCount}</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-3xl shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">{isBn ? 'ডেলিভারি রাইডার' : 'DEX Riders'}</span>
            <span className="w-8 h-8 rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-400 flex items-center justify-center font-black text-xs">
              <Truck className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-black text-blue-400 mt-2">{riderCount}</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-3xl shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">{isBn ? 'সুপার এডমিন' : 'Admins'}</span>
            <span className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-400 flex items-center justify-center font-black text-xs">
              <Crown className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-black text-purple-400 mt-2">{adminCount}</p>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-3 shadow">
        {/* Role Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: isBn ? 'সব ইউজার' : 'All Users' },
            { id: 'customer', label: isBn ? 'কাস্টমার' : 'Customers' },
            { id: 'vendor', label: isBn ? 'সেলার' : 'Sellers' },
            { id: 'rider', label: isBn ? 'রাইডার' : 'Riders' },
            { id: 'admin', label: isBn ? 'এডমিন' : 'Admins' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRole(tab.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-black transition ${
                selectedRole === tab.id
                  ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={isBn ? 'নাম, ইমেইল বা ফোন দিয়ে খুঁজুন...' : 'Search by name, email, phone...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-3 rounded-2xl border border-slate-700 bg-slate-800 text-xs text-white outline-none focus:border-orange-500"
          />
        </form>
      </div>

      {/* 4. Desktop Table View */}
      <div className="hidden lg:block bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              <tr>
                <th className="py-3.5 px-4">{isBn ? 'ইউজার প্রোফাইল' : 'User Identity'}</th>
                <th className="py-3.5 px-4">{isBn ? 'রোল / ভূমিকা' : 'Platform Role'}</th>
                <th className="py-3.5 px-4">{isBn ? 'যোগাযোগ' : 'Contact'}</th>
                <th className="py-3.5 px-4">{isBn ? 'লয়্যালটি কয়েন' : 'Coins'}</th>
                <th className="py-3.5 px-4">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3.5 px-4 text-right">{isBn ? 'অ্যাকশন' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((u) => {
                const isSuperAdmin = u.email === 'sojibahmedshorif25@gmail.com';
                return (
                  <tr key={u._id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                          alt={u.name}
                          className="w-10 h-10 rounded-2xl object-cover border border-slate-700 bg-slate-800"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-sm">{u.name}</span>
                            {isSuperAdmin && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-purple-950/80 text-purple-300 border border-purple-800/50'
                            : u.role === 'vendor'
                            ? 'bg-orange-950/80 text-orange-300 border border-orange-800/50'
                            : u.role === 'rider'
                            ? 'bg-blue-950/80 text-blue-300 border border-blue-800/50'
                            : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[11px] text-slate-400 font-mono">
                      {u.phone || '—'}
                    </td>

                    <td className="py-3.5 px-4 font-black text-amber-400 font-mono">
                      🪙 {u.loyaltyCoins || 0}
                    </td>

                    <td className="py-3.5 px-4">
                      {u.isActive !== false ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isBn ? 'সক্রিয়' : 'Active'}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-400">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{isBn ? 'ব্লকড / নিষ্ক্রিয়' : 'Suspended'}</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(u)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-orange-400 border border-slate-700 transition"
                          title="Edit Role & Permissions"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {!isSuperAdmin && (
                          <button
                            onClick={() => handleDeleteUser(u._id, u.email)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-red-950 text-red-400 border border-slate-700 transition"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Mobile Cards View */}
      <div className="lg:hidden space-y-3">
        {users.map((u) => (
          <div key={u._id} className="bg-slate-900 border border-slate-800 p-4 rounded-3xl shadow space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={u.name}
                  className="w-10 h-10 rounded-2xl object-cover border border-slate-700"
                />
                <div>
                  <h3 className="font-bold text-white text-sm">{u.name}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                  u.role === 'admin'
                    ? 'bg-purple-950 text-purple-300'
                    : u.role === 'vendor'
                    ? 'bg-orange-950 text-orange-300'
                    : 'bg-emerald-950 text-emerald-300'
                }`}
              >
                {u.role}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800 text-slate-400">
              <span>📞 {u.phone || 'No phone'}</span>
              <span className="font-mono font-bold text-amber-400">🪙 {u.loyaltyCoins || 0} Coins</span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => handleOpenEditModal(u)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-orange-400 font-bold text-xs flex items-center justify-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isBn ? 'রোল ও কয়েন এডিট' : 'Edit Role'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <span>{isBn ? 'ইউজার পারমিশন ও রোল ম্যানেজমেন্ট' : 'Edit User RBAC & Coins'}</span>
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUserUpdates} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-400 mb-1">{isBn ? 'ইউজার নাম' : 'User'}</label>
                <p className="font-bold text-white text-sm">{editingUser.name} ({editingUser.email})</p>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">{isBn ? 'প্ল্যাটফর্ম ভূমিকা (Role)' : 'Assigned Role'}</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 font-bold"
                >
                  <option value="customer">Customer (কাস্টমার)</option>
                  <option value="vendor">Vendor / Seller (সেলার)</option>
                  <option value="rider">DEX Delivery Rider (ডেলিভারি রাইডার)</option>
                  <option value="admin">Super Admin (সুপার এডমিন)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">{isBn ? 'অ্যাকাউন্ট স্ট্যাটাস' : 'Account Status'}</label>
                <select
                  value={newIsActive ? 'active' : 'suspended'}
                  onChange={(e) => setNewIsActive(e.target.value === 'active')}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 font-bold"
                >
                  <option value="active">{isBn ? 'সক্রিয় (Active)' : 'Active'}</option>
                  <option value="suspended">{isBn ? 'ব্লক / স্থগিত (Suspended)' : 'Suspended'}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {isBn ? 'বোনাস লয়্যালটি কয়েন প্রদান' : 'Grant Bonus Loyalty Coins'}
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={addCoins}
                  onChange={(e) => setAddCoins(Number(e.target.value))}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 font-mono font-bold"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-1/2 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-black shadow transition"
                >
                  {isUpdating ? (isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBn ? 'আপডেট করুন' : 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
