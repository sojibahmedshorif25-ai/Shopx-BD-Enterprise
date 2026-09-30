import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, PhoneCall, Sparkles, CheckCheck } from 'lucide-react';
import { api } from '../services/api';
import { useLanguageStore } from '../store/useLanguageStore';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  time: string;
}

export const LiveSupportChat: React.FC = () => {
  const { lang } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text:
          lang === 'bn'
            ? 'আসসালামু আলাইকুম! ShopX BD লাইভ কাস্টমার কেয়ারে স্বাগতম। আপনার অর্ডার, পণ্য বা ডেলিভারি নিয়ে কীভাবে সাহায্য করতে পারি?'
            : 'Hello! Welcome to ShopX BD 24/7 Live Support. How may I assist you with your orders, products, or deliveries today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const prompt = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      const res = await api.post('/ai/chat', {
        prompt: `You are ShopX BD official customer support assistant. Respond in ${
          lang === 'bn' ? 'polite Bengali' : 'professional English'
        }. Customer query: "${prompt}". Hotline: 01942791004. Delivery: 24h Dhaka, 48h Nationwide. Payment: bKash/Nagad/COD/0% EMI. Keep answers concise, helpful, and courteous.`,
      });

      if (res.data?.success) {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text:
            res.data.data.reply ||
            (lang === 'bn'
              ? 'আমাদের প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন। হটলাইন: 01942791004'
              : 'Our representative will follow up shortly. Hotline: +880 1942-791004'),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text:
          lang === 'bn'
            ? 'ধন্যবাদ! আপনার বার্তাটি আমরা পেয়েছি। জরুরি প্রয়োজনে সরাসরি আমাদের হটলাইনে কল করতে পারেন: 01942791004 অথবা WhatsApp-এ মেসেজ দিন।'
            : 'Thank you! We received your message. For immediate assistance, please call our 24/7 Helpline: +880 1942-791004 or WhatsApp us.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions =
    lang === 'bn'
      ? [
          '📦 আমার অর্ডার কখন ডেলিভারি হবে?',
          '🍯 খাঁটি মধুর ল্যাব সার্টিফিকেট আছে?',
          '💳 বিকাশ বা নগদে কিভাবে পেমেন্ট করবো?',
          '🔄 ১৪ দিনের রিটার্ন পলিসি কি?',
        ]
      : [
          '📦 Where is my order right now?',
          '🍯 Are the organic items BSTI certified?',
          '💳 How do I pay via bKash or COD?',
          '🔄 What is the 14-day return policy?',
        ];

  return (
    <>
      {/* Floating Chat Trigger Bubble */}
      {!isOpen && (
        <div className="fixed bottom-20 right-20 sm:bottom-6 sm:right-24 z-40 animate-in zoom-in duration-300">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 fill-white text-emerald-700" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-300 rounded-full animate-ping" />
            </div>
            <span className="text-xs hidden sm:inline">
              {lang === 'bn' ? 'লাইভ সাপোর্ট' : 'Live Chat'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-300" />
          </button>
        </div>
      )}

      {/* Live Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-full max-w-[360px] sm:max-w-[400px] h-[520px] max-h-[85vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Chat Header */}
          <div className="bg-emerald-800 p-4 border-b border-emerald-900 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-emerald-800" />
              </div>
              <div>
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  {lang === 'bn' ? 'ShopX লাইভ সাপোর্ট' : 'ShopX Live Assistant'}
                  <span className="text-[10px] bg-emerald-700 text-emerald-100 font-bold px-2 py-0.5 rounded-full">
                    Online
                  </span>
                </h4>
                <p className="text-[11px] text-emerald-100">
                  {lang === 'bn' ? 'গড়ে ১ মিনিটের মধ্যে উত্তর দেওয়া হয়' : 'Replies in under 1 min'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-emerald-200 hover:text-white rounded-xl hover:bg-emerald-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Helpline Strip */}
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs">
            <a
              href="tel:01942791004"
              className="flex items-center gap-1.5 text-emerald-800 hover:underline font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>01942791004</span>
            </a>
            <a
              href="https://wa.me/8801942791004"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:underline font-bold text-[11px]"
            >
              WhatsApp {lang === 'bn' ? 'চ্যাট' : 'Chat'} ↗
            </a>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white font-medium rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-bl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Questions */}
          <div className="px-3 py-2 bg-white border-t border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(q);
                }}
                className="whitespace-nowrap px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium rounded-xl border border-slate-200 transition flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={lang === 'bn' ? 'আপনার প্রশ্ন লিখুন...' : 'Type your question here...'}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-2xl font-bold transition shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
