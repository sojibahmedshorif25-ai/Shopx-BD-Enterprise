import React, { useState } from 'react';
import {
  Send,
  Radio,
  Users,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Bell,
  Mail,
  Smartphone,
  Flame,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const BroadcastAdminPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('all_users');
  const [channel, setChannel] = useState<'push' | 'email' | 'sms'>('push');
  const [isSending, setIsSending] = useState(false);
  const [successResult, setSuccessResult] = useState<string | null>(null);
  const { lang } = useAdminLanguageStore();
  const isBn = lang === 'bn';

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    try {
      setIsSending(true);
      const res = await api.post('/admin/broadcast', {
        title,
        message,
        audience,
        channel,
      });

      if (res.data.success) {
        setSuccessResult(res.data.message);
        setTitle('');
        setMessage('');
        setTimeout(() => setSuccessResult(null), 5000);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            {isBn ? 'মার্কেটিং ও পুশ নোটিফিকেশন ব্রডকাস্টার' : 'Marketing & Notification Broadcast Console'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {isBn ? 'ক্যাম্পেইন ব্রডকাস্ট সেন্টার' : 'Broadcast & Announcement Engine'}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {isBn
            ? 'সকল রেজিস্টার্ড কাস্টমার, ভেন্ডর ও রাইডারদের কাছে তাৎক্ষণিক পুশ নোটিফিকেশন বা ক্যাম্পেইন অ্যালার্ট পাঠান।'
            : 'Send instant targeted announcements, flash sale alerts, and system broadcast notifications.'}
        </p>
      </div>

      {successResult && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-bold">{successResult}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 shadow-sm">
          <form onSubmit={handleSendBroadcast} className="space-y-5">
            {/* Target Audience */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {isBn ? 'টার্গেট অডিয়েন্স (Target Audience)' : 'Select Target Audience'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAudience('all_users')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition flex flex-col items-center gap-1 ${
                    audience === 'all_users'
                      ? 'bg-amber-600/20 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{isBn ? 'সকল কাস্টমার' : 'All Customers'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudience('vendors')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition flex flex-col items-center gap-1 ${
                    audience === 'vendors'
                      ? 'bg-amber-600/20 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isBn ? 'সকল মার্চেন্ট/ভেন্ডর' : 'All Merchants'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudience('riders')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition flex flex-col items-center gap-1 ${
                    audience === 'riders'
                      ? 'bg-amber-600/20 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Radio className="w-4 h-4" />
                  <span>{isBn ? 'ডেলিভারি রাইডার' : 'Delivery Fleet'}</span>
                </button>
              </div>
            </div>

            {/* Delivery Channel */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {isBn ? 'ডেলিভারি চ্যানেল (Channel)' : 'Broadcast Channel'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setChannel('push')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    channel === 'push'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span>In-App Push</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel('email')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    channel === 'email'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Blast</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel('sms')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    channel === 'sms'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>SMS Gateway</span>
                </button>
              </div>
            </div>

            {/* Campaign Title */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isBn ? 'ব্রডকাস্ট টাইটেল / হেডলাইন' : 'Campaign Headline'}
              </label>
              <input
                type="text"
                required
                placeholder={isBn ? 'উদা: 🔥 মেগা ফ্ল্যাশ সেল ২০% ছাড়!' : 'e.g. 🔥 Weekend Super Flash Sale Live!'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isBn ? 'মেসেজ বর্ণনা (Notification Body)' : 'Notification Body'}
              </label>
              <textarea
                required
                rows={4}
                placeholder={isBn ? 'আপনার কাস্টমারদের জন্য বিস্তারিত বার্তা লিখুন...' : 'Enter your broadcast announcement message...'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? (isBn ? 'সেন্ড হচ্ছে...' : 'Broadcasting...') : (isBn ? 'এখনই ব্রডকাস্ট পাঠান' : 'Dispatch Broadcast Now')}</span>
            </button>
          </form>
        </div>

        {/* Live Mock Phone Preview */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm">
          <span className="text-xs font-bold text-slate-400 mb-4">{isBn ? 'লাইভ প্রিভিউ (Customer Device)' : 'Live Mobile Push Preview'}</span>
          
          <div className="w-full max-w-[280px] bg-slate-950 border-2 border-slate-800 rounded-3xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 border-b border-slate-900">
              <span className="font-bold text-emerald-400">ShopX BD</span>
              <span>Just now</span>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black text-xs flex-shrink-0">
                SX
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-snug">
                  {title || (isBn ? '🔥 মেগা ফ্ল্যাশ সেল শুরু হয়েছে!' : '🔥 Mega Flash Sale Active!')}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-3">
                  {message || (isBn ? 'সকল ক্যাটাগরিতে স্পেশাল ডিসকাউন্ট পান সীমিত সময়ের জন্য।' : 'Enjoy instant discounts on all authentic groceries and electronics.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
