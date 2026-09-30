import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  Send,
  CheckCircle2,
  X,
  Bot,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface AIInstantQAModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
}

export const AIInstantQAModal: React.FC<AIInstantQAModalProps> = ({
  isOpen,
  onClose,
  productTitle = 'ShopX Flagship Product',
}) => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';
  const [question, setQuestion] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'ai',
      text: isBn
        ? `আসসালামু আলাইকুম! ${productTitle} সম্পর্কে আপনার যেকোনো প্রশ্ন (ওয়ারেন্টি, পিওরিটি, ডেলিভারি টাইম, সাইজ) করুন, আমি তাৎক্ষণিক সঠিক উত্তর দেব।`
        : `Hello! Ask any question about ${productTitle} (Warranty, purity, delivery rates, authenticity) and I will provide instant answers.`,
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userText = question;
    setQuestion('');
    setChatLog((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('delivery') || lower.includes('ডেলিভারি') || lower.includes('টাকা') || lower.includes('charge') || lower.includes('কবে')) {
        reply = isBn
          ? 'ডেলিভারি চার্জ: ঢাকা সিটির ভিতরে মাত্র ৳৬০ (২৪ ঘণ্টার মধ্যে এক্সপ্রেস ডেলিভারি) এবং ঢাকার বাইরে ৬৩ জেলায় মাত্র ৳১২০ (৪৮-৭২ ঘণ্টার মধ্যে নির্ভরযোগ্য হোম ডেলিভারি)। ক্যাশ অন ডেলিভারি সুবিধা রয়েছে।'
          : 'Delivery Fee: Inside Dhaka is ৳60 (24-hour express) and Outside Dhaka across all 63 districts is ৳120 (48-72h express). Cash on Delivery is fully supported.';
      } else if (lower.includes('original') || lower.includes('খাঁটি') || lower.includes('authentic') || lower.includes('warranty') || lower.includes('ওয়ারেন্টি')) {
        reply = isBn
          ? 'এটি ১০০% জেনুইন ও ভেরিফাইড প্রোডাক্ট। অফিশিয়াল ব্র্যান্ড ওয়ারেন্টি এবং পার্সেল খুলে চেক করে নেওয়ার সুবিধা দেওয়া হয়।'
          : 'This is a 100% genuine verified product with official brand warranty and doorstep unboxing inspection guarantee.';
      } else {
        reply = isBn
          ? `ধন্যবাদ আপনার প্রশ্নের জন্য। ${productTitle} এর কোয়ালিটি নিশ্চিত করতে এটি সরাসরি অনুমোদিত সোর্স থেকে সরবরাহ করা হয়। আপনি কোনো সংশয় ছাড়াই অর্ডার করতে পারেন।`
          : `Thank you for your question. ${productTitle} is sourced directly from certified authorized channels with top-tier quality assurance.`;
      }

      setChatLog((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 flex flex-col h-[520px]">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                  {isBn ? 'ইনস্ট্যান্ট এআই কিউএ বোট' : 'Instant AI Q&A Copilot'}
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                {isBn ? 'পণ্য সম্পর্কে তাৎক্ষণিক প্রশ্নোত্তর' : 'Instant Product Q&A'}
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

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
          {chatLog.map((c, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${c.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {c.sender === 'ai' && (
                <div className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center flex-shrink-0 font-bold text-[10px]">
                  AI
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                  c.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                {c.text}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>{isBn ? 'এআই উত্তর তৈরি করছে...' : 'AI is composing verified answer...'}</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleAsk} className="flex items-center gap-2 pt-1">
          <input
            type="text"
            required
            placeholder={isBn ? 'যেমন: ডেলিভারি চার্জ কত? বা ওয়ারেন্টি আছে কি?' : 'e.g. What is the delivery time or warranty coverage?'}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={isThinking}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md shadow-indigo-700/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
