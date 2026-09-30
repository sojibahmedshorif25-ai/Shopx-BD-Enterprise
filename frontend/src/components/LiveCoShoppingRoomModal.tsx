import React, { useState } from 'react';
import {
  Users,
  Share2,
  Copy,
  CheckCircle2,
  X,
  Sparkles,
  MessageSquare,
  ShoppingCart,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface LiveCoShoppingRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveCoShoppingRoomModal: React.FC<LiveCoShoppingRoomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';
  const [roomCode, setRoomCode] = useState('SX-ROOM-8492');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://shopxbd.com/co-shop/${roomCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const members = [
    { name: 'Sojib Ahmed (Host)', avatar: '👑', status: 'Active (Cart: 2 items)', isHost: true },
    { name: 'Tanvir Hasan', avatar: '😎', status: 'Browsing Gadgets', isHost: false },
    { name: 'Fatema Begum', avatar: '🌸', status: 'Added Honey to Shared Bag', isHost: false },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {isBn ? 'রিয়েলটাইম লাইভ কো-শপিং' : 'Live Social Co-Shopping Room'}
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                {isBn ? 'বন্ধুদের সাথে একসাথে শপিং করুন' : 'Shop Together in Real-Time'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Room Share Card */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Secret Room Code</span>
              <span className="text-lg font-black font-mono text-cyan-400">{roomCode}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold hover:bg-cyan-900 transition"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Copy Invite Link'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            {isBn
              ? 'এই লিংকটি বন্ধুদের পাঠান। তারা জয়েন করলে কার্ট ও স্পেশাল ডিসকাউন্ট একসাথে শেয়ার করতে পারবেন।'
              : 'Share this room invite link with your family & friends to collaborate on a shared cart and unlock team discounts.'}
          </p>
        </div>

        {/* Live Active Members */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">
            Connected Friends (3 Active)
          </span>
          <div className="space-y-1.5">
            {members.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{m.avatar}</span>
                  <div>
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <span>{m.name}</span>
                      {m.isHost && (
                        <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[9px]">
                          Host
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-slate-400">{m.status}</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-black text-xs transition shadow-lg shadow-cyan-700/20"
        >
          {isBn ? 'শেয়ার্ড কার্ট দেখুন' : 'Open Shared Bag & Split Bill'}
        </button>
      </div>
    </div>
  );
};
