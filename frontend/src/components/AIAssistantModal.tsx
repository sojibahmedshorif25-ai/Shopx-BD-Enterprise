import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'আসসালামু আলাইকুম! আমি ShopX AI শপিং সহকারী। আপনাকে কীভাবে সাহায্য করতে পারি? (যেমন: খাঁটি মধুর উপকারিতা, বাজেট ফ্রেন্ডলি গ্যাজেট বা ডেলিভারি তথ্য)',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg = inputText.trim();
    setInputText('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await api.post('/ai/chat', { message: userMsg });
      if (res.data.success) {
        setMessages((prev) => [...prev, { sender: 'bot', text: res.data.reply }]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'দুঃখিত, সংযোগে সাময়িক সমস্যা হয়েছে। আপনি আমাদের হটলাইনে কল করতে পারেন: 01700-000000',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full sm:max-w-md h-[550px] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm leading-none">ShopX AI Assistant</h3>
              <p className="text-[10px] text-purple-200 mt-0.5">Powered by Google Gemini</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-slate-950">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                  msg.sender === 'user'
                    ? 'bg-orange-500 text-white'
                    : 'bg-purple-600 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-orange-500 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-gray-100 dark:border-slate-700 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-purple-600 text-xs">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI উত্তর তৈরি করছে...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="আপনার প্রশ্ন লিখুন (বাংলা / English)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 text-xs py-2.5 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-purple-500 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
