import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, MessageSquareText, Mic } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface FloatingAITriggerProps {
  onOpenAI: () => void;
}

export const FloatingAITrigger: React.FC<FloatingAITriggerProps> = ({ onOpenAI }) => {
  const { lang } = useLanguageStore();
  const [showBubble, setShowBubble] = useState(true);

  // Auto-cycle tooltip hints
  const hints = lang === 'bn' ? [
    '✨ ShopX AI: কী খুঁজতে সাহায্য লাগবে?',
    '🎁 আজকের মেগা ভাউচার ও ডিলস জানুন',
    '🌿 ১০০% খাঁটি সুন্দরবনের মধু ও ঘি',
    '📱 ফ্ল্যাগশিপ ফোন ও গ্যাজেট পরামর্শ',
  ] : [
    '✨ ShopX AI: Need shopping advice?',
    '🎁 Ask about today\'s flash vouchers',
    '🌿 100% Pure Organic Foods & Honey',
    '📱 Best tech gadgets under budget',
  ];

  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % hints.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [hints.length]);

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-40 flex items-center gap-2 group">
      {/* Speech Bubble Tooltip */}
      {showBubble && (
        <div
          onClick={onOpenAI}
          className="cursor-pointer bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 px-3.5 py-2 rounded-2xl shadow-xl border border-emerald-200 dark:border-slate-700 text-xs font-bold hidden md:flex items-center gap-2 animate-bounce transition-all hover:border-emerald-500"
          style={{ animationDuration: '3s' }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span className="whitespace-nowrap">{hints[hintIndex]}</span>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={onOpenAI}
        className="relative p-3.5 sm:p-4 rounded-3xl bg-gradient-to-tr from-emerald-800 via-teal-700 to-emerald-600 text-white shadow-2xl hover:shadow-emerald-600/40 hover:scale-108 transition-all duration-300 flex items-center justify-center border-2 border-white/40 ring-4 ring-emerald-500/20 active:scale-95"
        title={lang === 'bn' ? 'ShopX AI সহকারী' : 'ShopX AI Copilot'}
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
        </span>

        <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </button>
    </div>
  );
};
