import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Loader2, Mic, MicOff, ShoppingBag, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCartStore } from '../store/useCartStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedProducts?: any[];
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguageStore();
  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  const initialGreeting = lang === 'bn'
    ? 'আসসালামু আলাইকুম! আমি ShopX AI শপিং অ্যাসিস্ট্যান্ট। কীভাবে আপনাকে সাহায্য করতে পারি? (যেমন: বাজেট গ্যাজেট, খাঁটি মধু, আজকের ডিল বা ডেলিভারি তথ্য)'
    : 'Hello! I am your ShopX AI Shopping Copilot. How can I assist you today? (e.g. Best smartphones under ৳30,000, 100% Pure Honey, Daily Vouchers, or Delivery time)';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update greeting when language switches if only initial message exists
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'msg-init') {
      setMessages([
        {
          id: 'msg-init',
          sender: 'bot',
          text: lang === 'bn'
            ? 'আসসালামু আলাইকুম! আমি ShopX AI শপিং অ্যাসিস্ট্যান্ট। কীভাবে আপনাকে সাহায্য করতে পারি?'
            : 'Hello! I am your ShopX AI Shopping Copilot. How can I assist you today? Ask about flagship phones, pure foods, flash deals, or vouchers!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = lang === 'bn' ? [
    '🔥 আজকের সেরা অফার ও ভাউচার',
    '📱 ৳২৫,০০০ এর মধ্যে সেরা ফোন',
    '🌿 সুন্দরবনের খাঁটি মধু ও ঘি',
    '🚚 ডেলিভারি চার্জ ও ঠিকানা',
  ] : [
    '🔥 Best Flash Deals & Vouchers',
    '📱 Best Flagship Phones 2026',
    '🌿 100% Pure Organic Foods',
    '🚚 Shipping Rates & Head Office',
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    setInputText('');
    const userMsgId = 'user-' + Date.now();
    const newMsg: Message = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsLoading(true);

    try {
      const res = await api.post('/ai/chat', { 
        message: textToSend,
        language: lang 
      });

      if (res.data?.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: 'bot-' + Date.now(),
            sender: 'bot',
            text: res.data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('No reply');
      }
    } catch {
      // Fallback local smart response in matching language
      let fallback = '';
      const lower = textToSend.toLowerCase();
      const isBangla =
        lang === 'bn' ||
        /[\u0980-\u09FF]/.test(textToSend) ||
        lower.includes('bangla') ||
        lower.includes('bolo') ||
        lower.includes('kemon') ||
        lower.includes('pabo') ||
        lower.includes('paoya') ||
        lower.includes('taka') ||
        lower.includes('dam') ||
        lower.includes('ache') ||
        lower.includes('ki ') ||
        lower.includes('modhu');

      if (lower === 'bangla bolo' || lower.includes('bangla bol') || lower === 'বাংলায় বলো' || lower === 'বাংলা') {
        fallback = 'অবশ্যই! আমি ShopX AI কো-পাইলট, আপনার সাথে সম্পূর্ণ বাংলায় কথা বলছি। আমাদের ১০০% জেনুইন গ্যাজেট, খাঁটি সুন্দরবনের মধু, গাওয়া ঘি, অফিশিয়াল ব্র্যান্ডের ফোন ও আজকের মেগা ডিল সম্পর্কে আপনার যেকোনো প্রশ্ন করতে পারেন।';
      } else if (
        lower === 'hi' ||
        lower === 'hello' ||
        lower === 'hey' ||
        lower === 'salam' ||
        lower === 'assalamu alaikum' ||
        lower === 'kemon acho' ||
        lower === 'হাই' ||
        lower === 'হ্যালো' ||
        lower === 'সালাম'
      ) {
        fallback = isBangla
          ? 'আসসালামু আলাইকুম! ShopX BD-তে আপনাকে স্বাগতম। আপনি কোন পণ্য খুঁজছেন? যেমন: বাজেট স্মার্টফোন, খাঁটি সুন্দরবনের মধু ও ঘি, ল্যাপটপ, ফ্যাশন বা আজকের স্পেশাল ডিল ও ভাউচার? যেকোনো প্রশ্ন আমাকে জানান।'
          : 'Hello & Welcome to ShopX BD! How can I assist your shopping today? Feel free to ask about flagship smartphones, pure honey & ghee, vouchers, or 24h express delivery!';
      } else if (lower.includes('200') || lower.includes('300') || lower.includes('500') || lower.includes('budget') || lower.includes('বাজেট') || lower.includes('paoya') || lower.includes('পাব')) {
        fallback = isBangla
          ? '৳২০০ - ৳৫০০ বাজেটের মধ্যে ShopX BD-তে আমাদের জনপ্রিয় বেস্টসেলার পণ্যসমূহ:\n• প্রিমিয়াম অর্গানিক চিয়া সিড (৫০০ গ্রাম) — ৳৩৪০ (ছাড় চলছে)\n• ১০০% খাঁটি ভার্জিন কালোজিরা তেল (২৫০ মিলি) — ৳৪৭০\n• ঘানি ভাঙা খাঁটি সরিষার তেল (১ লিটার) — ৳২৪০\n• 65W GaN ফাস্ট চার্জার ক্যাবল ও এক্সেসরিজ\n\n🎁 প্রথম অর্ডারে `SHOPX100` ভাউচার ব্যবহার করে অতিরিক্ত ৳১০০ ডিসকাউন্ট পেয়ে যাবেন!'
          : 'Here are popular items under ৳500 at ShopX BD:\n• Organic Black Chia Seeds (500g) — ৳340\n• Pure Virgin Kalijira Oil (250ml) — ৳470\n• Cold-Pressed Mustard Oil (1L) — ৳240\n• 65W GaN Fast Charging Accessories\n\n🎁 Use voucher code "SHOPX100" for Flat ৳100 Off on your first order!';
      } else if (lower.includes('voucher') || lower.includes('coupon') || lower.includes('ভাউচার') || lower.includes('অফার') || lower.includes('discount')) {
        fallback = isBangla
          ? '🎁 আজকের স্পেশাল ভাউচারসমূহ:\n• SHOPX100 — ৳১,০০০+ অর্ডারে ফ্ল্যাট ৳১০০ ডিসকাউন্ট\n• EID50 — ১০% ক্যাশব্যাক (সর্বোচ্চ ৳২০০)\n• FREE_DELIVERY — ফ্রি ডেলিভারি ভাউচার\nভাউচার কালেকশন সেন্টার থেকে ১-ক্লিকে সংগ্রহ করুন!'
          : '🎁 You can use voucher code SHOPX100 for Flat ৳100 Off on orders over ৳1,000, and EID50 for 10% Cashback! Head over to the Voucher Collection Center to claim!';
      } else if (lower.includes('honey') || lower.includes('মধু') || lower.includes('organic') || lower.includes('ঘি') || lower.includes('ghee')) {
        fallback = isBangla
          ? '🌿 আমাদের সুন্দরবনের প্রাকৃতিক চাকের মধু (৳৬৯০ / ৫০০ গ্রাম) এবং পাবনার খাঁটি গাওয়া ঘি (৳৭৯০ / ৫০০ গ্রাম) BSTI ও BCSIR ল্যাব টেস্টে ১০০% নির্ভেজাল প্রমাণিত। ২৪-৪৮ ঘণ্টায় সারাদেশে ডেলিভারি পাওয়া যায়।'
          : '🌿 Our Sundarbans Natural Raw Honey (৳690 / 500g) and Pabna Cow Ghee (৳790 / 500g) are 100% BSTI & BCSIR lab tested and certified pure!';
      } else if (lower.includes('phone') || lower.includes('smartphone') || lower.includes('মোবাইল') || lower.includes('ফোন') || lower.includes('iphone') || lower.includes('samsung')) {
        fallback = isBangla
          ? '📱 আমাদের কাছে রয়েছে অফিশিয়াল ১ বছরের ওয়্যারেন্টিসহ Apple iPhone 16 Pro Max (৳১৬৯,৯০০), Samsung Galaxy S25 Ultra (৳১৫৮,০০০) সহ সকল লেটেস্ট স্মার্টফোন। ক্যাশ অন ডেলিভারি ও ০% EMI সুবিধা রয়েছে।'
          : '📱 We offer official Apple iPhone 16 Pro Max (৳169,900) and Samsung Galaxy S25 Ultra (৳158,000) with 1-Year Brand Warranty & 0% EMI options!';
      } else if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('ডেলিভারি') || lower.includes('ঠিকানা') || lower.includes('office') || lower.includes('hotline')) {
        fallback = isBangla
          ? '🚚 ঢাকা সিটির মধ্যে ২৪ ঘণ্টায় ৳৬০ এবং সারাদেশে ৪৮-৭২ ঘণ্টায় ৳১২০ ডেলিভারি চার্জ। ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। আমাদের প্রধান কার্যালয়: রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ। ২৪/৭ হেল্পলাইন: 01942791004।'
          : '🚚 Express Delivery inside Dhaka in 24h (৳60) and Nationwide in 48-72h (৳120). Cash on Delivery available! Head Office: Rowmari, Kurigram, Rangpur, Bangladesh. Hotline: 01942791004.';
      } else {
        fallback = isBangla
          ? 'আসসালামু আলাইকুম! আপনার যেকোনো পণ্য, দাম বা তথ্যের জন্য আমাকে জিজ্ঞেস করতে পারেন। আমাদের সকল পণ্যে রয়েছে ১০০% জেনুইন অফিসিয়াল ওয়্যারেন্টি ও ক্যাশ অন ডেলিভারি সুবিধা। হেল্পলাইন: 01942791004।'
          : 'Thank you for asking! We offer 100% genuine brand products with official warranty, express shipping, and easy returns across all 64 districts of Bangladesh. Feel free to ask about any specific item or reach our hotline at 01942791004!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: fallback,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice Speech Recognition
  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(lang === 'bn' ? 'আপনার ব্রাউজারে ভয়েস রিকগনিশন সাপোর্ট নেই।' : 'Voice recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSend(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full sm:max-w-lg h-[620px] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base leading-none">
                  {lang === 'bn' ? 'ShopX এআই সহকারী' : 'ShopX AI Copilot'}
                </h3>
                <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                  GPT-4o & Gemini
                </span>
              </div>
              <p className="text-[11px] text-emerald-200 mt-1">
                {lang === 'bn' ? 'স্মার্ট শপিং ও পণ্য পরামর্শক • সার্বক্ষণিক সক্রিয়' : 'Intelligent Shopping & Product Consultant • 24/7 Active'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 transition text-white"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            {lang === 'bn' ? 'দ্রুত প্রশ্ন:' : 'Suggestions:'}
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-white dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 whitespace-nowrap transition shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/60 dark:bg-slate-950/80">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0 text-xs shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-gradient-to-tr from-emerald-800 to-teal-700 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-1 max-w-[82%]">
                <div
                  className={`p-3.5 sm:p-4 rounded-3xl text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className={`text-[10px] text-slate-400 font-mono block px-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2.5 bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700 w-fit shadow-xs">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {lang === 'bn' ? 'ShopX AI উত্তর তৈরি করছে...' : 'ShopX AI is thinking & finding best products...'}
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Voice Support */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-3 rounded-2xl transition border ${
              isListening
                ? 'bg-red-500 text-white border-red-600 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
            title={lang === 'bn' ? 'ভয়েসে কথা বলুন' : 'Voice Search'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            placeholder={
              lang === 'bn'
                ? 'আপনার প্রশ্ন লিখুন (যেমন: বাজেট ফোন, খাঁটি মধু, অফার)...'
                : 'Ask anything (e.g. Best laptops, pure ghee, discount vouchers)...'
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 text-xs sm:text-sm py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-emerald-600 dark:text-white transition"
          />

          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="p-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white transition disabled:opacity-50 shadow-sm"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

