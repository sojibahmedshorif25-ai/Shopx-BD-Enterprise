import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, MessageCircle } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface ShareProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const ShareProductModal: React.FC<ShareProductModalProps> = ({ isOpen, onClose, title, url }) => {
  const { lang } = useLanguageStore();
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} - ShopX BD:\n${url}`)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-6 shadow-2xl relative text-center space-y-5 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center border border-orange-500/30">
          <Share2 className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-base font-black text-white">
            {lang === 'bn' ? 'বন্ধুদের সাথে শেয়ার করুন' : 'Share with Friends'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">{title}</p>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={shareWhatsApp}
            className="p-3 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-400 rounded-2xl flex flex-col items-center gap-1.5 transition text-xs font-bold"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={shareFacebook}
            className="p-3 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 text-blue-400 rounded-2xl flex flex-col items-center gap-1.5 transition text-xs font-bold"
          >
            <Share2 className="w-5 h-5" />
            <span>Facebook</span>
          </button>

          <button
            onClick={shareTelegram}
            className="p-3 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-800/60 text-sky-400 rounded-2xl flex flex-col items-center gap-1.5 transition text-xs font-bold"
          >
            <Send className="w-5 h-5" />
            <span>Telegram</span>
          </button>
        </div>

        {/* Copy Link input */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-2 flex items-center justify-between gap-2">
          <input
            type="text"
            readOnly
            value={url}
            className="bg-transparent text-xs text-slate-400 truncate outline-none px-2 flex-1"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1 transition"
          >
            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'কপি' : 'Copy')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
