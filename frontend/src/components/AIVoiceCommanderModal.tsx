import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, Sparkles, ShoppingBag, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';

interface AIVoiceCommanderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIVoiceCommanderModal: React.FC<AIVoiceCommanderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      startVoiceListening();
    } else {
      stopVoiceListening();
    }
  }, [isOpen]);

  const startVoiceListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setActionStatus(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      processVoiceCommand(text);
    };

    recognition.start();
  };

  const stopVoiceListening = () => {
    setIsListening(false);
  };

  const processVoiceCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();

    if (lower.includes('মধু') || lower.includes('honey')) {
      setActionStatus('সুন্দরবনের খাঁটি মধু খুঁজে পাওয়া গেছে!');
      setTimeout(() => {
        navigate('/product/sundarbans-natural-raw-honey-500g');
        onClose();
      }, 1000);
    } else if (lower.includes('আইফোন') || lower.includes('iphone') || lower.includes('phone')) {
      setActionStatus('অ্যাপল আইফোন ১৬ প্রো ম্যাক্স পেজে নিয়ে যাওয়া হচ্ছে...');
      setTimeout(() => {
        navigate('/product/apple-iphone-16-pro-max-256gb');
        onClose();
      }, 1000);
    } else if (lower.includes('ঘি') || lower.includes('ghee')) {
      setActionStatus('পাবনার খাঁটি গাওয়া ঘি খুঁজে পাওয়া গেছে!');
      setTimeout(() => {
        navigate('/product/traditional-pure-cow-ghee-500g');
        onClose();
      }, 1000);
    } else if (lower.includes('ট্র্যাক') || lower.includes('track') || lower.includes('order')) {
      setActionStatus('অর্ডার ট্র্যাকিং পেজে নিয়ে যাওয়া হচ্ছে...');
      setTimeout(() => {
        navigate('/track-order');
        onClose();
      }, 1000);
    } else {
      setActionStatus(`"${cmd}" এর জন্য পণ্য সার্চ করা হচ্ছে...`);
      setTimeout(() => {
        navigate(`/products?search=${encodeURIComponent(cmd)}`);
        onClose();
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-center">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            ShopX AI Voice Commander
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 mt-2">
            {lang === 'bn' ? 'মুখে বলুন, এআই অর্ডার খুঁজে দেবে' : 'Speak Naturally, AI Executes'}
          </h2>
        </div>

        {/* Animated Microphone Orb */}
        <div className="my-6">
          <button
            onClick={isListening ? stopVoiceListening : startVoiceListening}
            className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto transition-all duration-300 shadow-2xl relative select-none ${
              isListening
                ? 'bg-gradient-to-tr from-red-600 to-rose-500 text-white animate-pulse shadow-rose-500/40 ring-8 ring-rose-500/20 scale-110'
                : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white hover:scale-105 shadow-indigo-500/30'
            }`}
          >
            {isListening ? <Mic className="w-12 h-12 animate-bounce" /> : <Mic className="w-12 h-12" />}
          </button>
          <p className="text-xs font-bold text-slate-400 mt-3">
            {isListening
              ? lang === 'bn'
                ? '🎙️ শুনছি... মুখে বলুন (যেমন: "মধু দেখাও" বা "আইফোন ১৬")'
                : '🎙️ Listening... Speak now (e.g. "Show Honey" or "iPhone 16")'
              : lang === 'bn'
              ? 'কথা বলতে মাইকে ক্লিক করুন'
              : 'Tap microphone to speak'}
          </p>
        </div>

        {/* Live Transcript Box */}
        {transcript && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left my-4">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">আপনি বলেছেন:</p>
            <p className="text-sm font-bold text-slate-100 mt-0.5 font-mono">"{transcript}"</p>
          </div>
        )}

        {/* Action status message */}
        {actionStatus && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center justify-center space-x-2 animate-scaleUp">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionStatus}</span>
          </div>
        )}

        {/* Example prompts */}
        <div className="pt-4 border-t border-slate-800/80 text-left">
          <p className="text-[11px] text-slate-400 font-semibold mb-2">💡 যা যা বলতে পারেন:</p>
          <div className="flex flex-wrap gap-1.5 text-[10px]">
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg text-slate-300">"১ কেজি সুন্দরবনের মধু"</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg text-slate-300">"আইফোন ১৬ প্রো ম্যাক্স"</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg text-slate-300">"খাঁটি গাওয়া ঘি"</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg text-slate-300">"আমার অর্ডার ট্র্যাক করো"</span>
          </div>
        </div>
      </div>
    </div>
  );
};
