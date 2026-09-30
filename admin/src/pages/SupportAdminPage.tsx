import React, { useState, useEffect } from 'react';
import {
  LifeBuoy,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { api } from '../services/api';

export const SupportAdminPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/support-inquiries');
      if (res.data.success) {
        setInquiries(res.data.inquiries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Customer Helpdesk & 24/7 Support Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Customer Support & Ticket Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live tickets, customer inquiry resolution, WhatsApp dispatch, and 24/7 hotline helpline logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+8801942791004"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition"
          >
            <Phone className="w-4 h-4" />
            <span>Direct 01942791004</span>
          </a>
        </div>
      </div>

      {/* Head Office & Hotline Card */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 rounded-3xl p-6 border border-emerald-800/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-emerald-400" />
            <span>ShopX BD Central Customer Care Operations</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            🏢 Central Head Office: <strong>Rowmari, Kurigram, Rangpur, Bangladesh</strong>
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800">
            Email: sojibahmedshorif25@gmail.com
          </span>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 hover:border-slate-700 transition"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800 text-blue-400 flex items-center justify-center font-black text-xs font-mono">
                  {inq.id}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{inq.name}</span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        inq.status === 'Resolved'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : inq.status === 'In Progress'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Phone: {inq.phone} • Email: {inq.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={inq.status}
                  onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-blue-500"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <a
                  href={`https://wa.me/88${inq.phone.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                Topic: {inq.topic}
              </span>
              <p className="text-sm text-slate-200">{inq.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
