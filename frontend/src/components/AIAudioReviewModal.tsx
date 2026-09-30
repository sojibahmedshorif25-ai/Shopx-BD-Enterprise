import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  Headphones,
  X,
  CheckCircle,
  Radio,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface AIAudioReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
  category?: string;
}

export const AIAudioReviewModal: React.FC<AIAudioReviewModalProps> = ({
  isOpen,
  onClose,
  productTitle = 'iPhone 16 Pro Max 256GB Desert Titanium',
  category = 'Tech Flagship',
}) => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState(1);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert('Audio speech synthesis is not supported on this device.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const textToSpeak = isBn
        ? `শপএক্স বিডি এআই প্রোডাক্ট সামারি। পণ্য: ${productTitle}। এটি একটি ১০০% অফিসিয়াল ও অরিজিনাল ভেরিফাইড প্রোডাক্ট। এর সাথে পাচ্ছেন অফিশিয়াল ব্র্যান্ড ওয়ারেন্টি এবং ক্যাশ অন ডেলিভারি সুবিধা। ঢাকা সিটিতে ২৪ ঘণ্টায় এবং সারা বাংলাদেশে ৪৮ ঘণ্টার মধ্যে দ্রুত হোম ডেলিভারি নিশ্চিত।`
        : `ShopX BD AI Voice Summary for ${productTitle}. This is a 100% genuine verified authentic product with official brand warranty, 24-hour fast delivery in Dhaka and 48-hour express shipping nationwide across 63 districts. Cash on delivery available.`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = voiceSpeed;
      utterance.lang = isBn ? 'bn-BD' : 'en-US';

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center shadow-md">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
                  {isBn ? 'এআই ভয়েস রিভিউ পডকাস্ট' : 'AI Audio Podcast Review'}
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                {isBn ? '৩০ সেকেন্ডে অডিও রিভিউ শুনুন' : 'Instant 30s Audio Review'}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              setIsPlaying(false);
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Visualizer & Player Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 text-center">
          <p className="text-xs font-bold text-white truncate">{productTitle}</p>
          <span className="text-[10px] text-purple-400 font-mono uppercase">{category} Summary</span>

          {/* Animated Waveform Bars */}
          <div className="flex items-center justify-center gap-1 h-12">
            {[12, 24, 38, 48, 20, 44, 30, 48, 16, 32, 40, 22].map((height, i) => (
              <span
                key={i}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-gradient-to-t from-purple-500 to-indigo-400 animate-pulse' : 'bg-slate-800'
                }`}
                style={{
                  height: isPlaying ? `${Math.min(48, Math.max(10, (height * (i % 3 + 1)) % 48))}px` : '8px',
                }}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleTogglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 transition transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400">
            <span>Speed:</span>
            {[1, 1.25, 1.5].map((s) => (
              <button
                key={s}
                onClick={() => setVoiceSpeed(s)}
                className={`px-2 py-0.5 rounded-lg font-mono text-[10px] font-bold ${
                  voiceSpeed === s ? 'bg-purple-900 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
