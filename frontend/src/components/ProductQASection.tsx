import React, { useState, useEffect } from 'react';
import { HelpCircle, MessageSquare, Send, CheckCircle2, User, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { useLanguageStore } from '../store/useLanguageStore';

interface QAItem {
  _id: string;
  userName: string;
  question: string;
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
  isAnswered: boolean;
  createdAt: string;
}

export const ProductQASection: React.FC<{ productId: string }> = ({ productId }) => {
  const { lang } = useLanguageStore();
  const [qas, setQas] = useState<QAItem[]>([]);
  const [question, setQuestion] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAskModal, setShowAskModal] = useState(false);

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const res = await api.get(`/qa/${productId}`);
        if (res.data.success) {
          setQas(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (productId) fetchQA();
  }, [productId]);

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await api.post('/qa', {
        productId,
        question: question.trim(),
        userName: userName.trim() || (lang === 'bn' ? 'ক্রেতা' : 'Customer'),
      });

      if (res.data.success) {
        setQas([res.data.data, ...qas]);
        setQuestion('');
        setShowAskModal(false);
      }
    } catch {
      alert(lang === 'bn' ? 'প্রশ্ন জমা দিতে সমস্যা হয়েছে।' : 'Failed to submit question.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {lang === 'bn' ? 'পণ্য সম্পর্কিত প্রশ্ন ও উত্তর (Q&A Community)' : 'Questions & Answers (Q&A)'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'bn'
                ? 'সেলার ও অফিসিয়াল টিমের কাছ থেকে সরাসরি সঠিক তথ্য জানুন'
                : 'Get instant answers from verified sellers and the official brand team'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAskModal(!showAskModal)}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{lang === 'bn' ? 'প্রশ্ন করুন' : 'Ask Question'}</span>
        </button>
      </div>

      {/* Ask Question Form */}
      {showAskModal && (
        <form
          onSubmit={handleSubmitQuestion}
          className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in text-xs"
        >
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {lang === 'bn' ? 'আপনার নাম' : 'Your Name'}
            </label>
            <input
              type="text"
              placeholder={lang === 'bn' ? 'মোঃ আরিফ' : 'e.g. John Doe'}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {lang === 'bn' ? 'আপনার প্রশ্ন' : 'Your Question'} <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder={
                lang === 'bn'
                  ? 'পণ্যটির ওয়ারেন্টি বা ডেলিভারি নিয়ে আপনার কোনো জিজ্ঞাসা থাকলে লিখুন...'
                  : 'Ask a question regarding warranty, specs, compatibility, or delivery...'
              }
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-emerald-600 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition disabled:opacity-50"
          >
            {isSubmitting
              ? (lang === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...')
              : (lang === 'bn' ? 'প্রশ্ন পোস্ট করুন' : 'Post Question')}
          </button>
        </form>
      )}

      {/* Q&A Stream */}
      <div className="space-y-4 text-xs">
        {qas.length === 0 ? (
          <div className="text-center py-6 text-slate-400 font-medium">
            {lang === 'bn'
              ? 'এই পণ্য সম্পর্কে এখনও কোনো প্রশ্ন করা হয়নি। আপনার কোনো জিজ্ঞাসা থাকলে প্রশ্ন করুন!'
              : 'No questions asked yet for this product. Be the first to ask!'}
          </div>
        ) : (
          qas.map((item) => (
            <div
              key={item._id}
              className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2"
            >
              {/* Question */}
              <div className="flex items-start gap-2">
                <span className="font-black text-emerald-700 text-sm">Q:</span>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">{item.question}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {lang === 'bn' ? `জিজ্ঞেস করেছেন ${item.userName}` : `Asked by ${item.userName}`}
                  </p>
                </div>
              </div>

              {/* Answer */}
              {item.answer ? (
                <div className="flex items-start gap-2 pl-4 pt-2 border-t border-slate-200">
                  <span className="font-black text-emerald-600 text-sm">A:</span>
                  <div className="flex-1">
                    <p className="text-slate-700 leading-relaxed">{item.answer}</p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                      ✓ {lang === 'bn' ? `উত্তর দিয়েছেন: ${item.answeredBy}` : `Answered by: ${item.answeredBy}`}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 italic pl-6">
                  {lang === 'bn'
                    ? 'সেলার টিম শীঘ্রই এই প্রশ্নের উত্তর প্রদান করবে।'
                    : 'The seller will answer this question shortly.'}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
