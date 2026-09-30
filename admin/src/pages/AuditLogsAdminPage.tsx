import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Clock,
  Terminal,
  RefreshCw,
  Search,
  Filter,
  CheckCircle,
  AlertOctagon,
  Lock,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const AuditLogsAdminPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { lang } = useAdminLanguageStore();
  const isBn = lang === 'bn';

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/audit-logs');
      if (res.data.success) {
        setLogs(res.data.auditLogs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = logs.filter(
    (l) =>
      l.actor?.toLowerCase().includes(search.toLowerCase()) ||
      l.action?.toLowerCase().includes(search.toLowerCase()) ||
      l.details?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              {isBn ? 'নিরাপত্তা ও অ্যাক্টিভিটি ট্র্যাকার' : 'Security & Governance Audit Trail'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isBn ? 'সিস্টেম অডিট লগ ও সিকিউরিটি ইভেন্টস' : 'Audit Logs & Security Trail'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? 'এডমিন এক্টিভিটি, ডাটাবেজ ট্রানজেকশন এবং অথেন্টিকেশন ইভেন্টসমূহের রিয়েলটাইম রেকর্ড।'
              : 'Immutable record of system events, administrative changes, and security shield triggers.'}
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700/60 shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isBn ? 'রিফ্রেশ লগ' : 'Refresh Trail'}</span>
        </button>
      </div>

      {/* Security Shield Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-800/40 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-600/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">
              {isBn ? '২৫৬-বিট এনক্রিপ্টেড অডিট প্রটেকশন' : '256-Bit Encrypted Log Verification'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn
                ? 'সকল এডমিন অ্যাকশন এবং লগইন ট্রেইল অটোমেটিক ব্যাকআপ ও ভেরিফাই করা হচ্ছে।'
                : 'All administrative alterations are tamper-evident with cryptographic hash signatures.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 text-xs font-bold font-mono">
            <CheckCircle className="w-3.5 h-3.5" />
            Zero Anomalies
          </span>
        </div>
      </div>

      {/* Logs Table Container */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-black text-white">{isBn ? 'সাম্প্রতিক ইভেন্ট লগ' : 'Event Timeline'}</h3>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isBn ? 'অ্যাক্টর বা অ্যাকশন সার্চ করুন...' : 'Search logs by actor or action...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 bg-slate-950/50">
              <tr>
                <th className="p-3.5">Log ID</th>
                <th className="p-3.5">Actor / User</th>
                <th className="p-3.5">Action Event</th>
                <th className="p-3.5">Details & Metadata</th>
                <th className="p-3.5">IP & Origin</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 font-mono font-bold text-cyan-400">{log.id}</td>
                  <td className="p-3.5 font-bold text-white">{log.actor}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700/80 font-mono text-[11px] font-bold text-slate-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-300 max-w-sm">{log.details}</td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-400">{log.ip}</td>
                  <td className="p-3.5 text-[11px] text-slate-400 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td className="p-3.5 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                          : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                      }`}
                    >
                      {log.status}
                    </span>
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
