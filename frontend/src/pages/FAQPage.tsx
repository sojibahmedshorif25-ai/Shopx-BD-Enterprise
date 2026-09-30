import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, Sparkles, PhoneCall, Truck, ShieldCheck, CreditCard, RotateCcw } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const FAQPage: React.FC = () => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: isBn ? 'ShopX BD তে ডেলিভারি চার্জ এবং সময় কত লাগে?' : 'What are the delivery charges and delivery times across Bangladesh?',
      a: isBn
        ? 'ঢাকা সিটি এবং আমাদের সেন্ট্রাল রৌমারী হাব জোনে ডেলিভারি চার্জ মাত্র ৳৬০ এবং ২৪ ঘণ্টার মধ্যে এক্সপ্রেস হোম ডেলিভারি করা হয়। দেশের অন্যান্য সকল ৬৪ জেলায় ডেলিভারি চার্জ ৳১২০ এবং ৪৮ থেকে ৭২ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়।'
        : 'Express delivery within Dhaka City and Rowmari Central Hub is flat ৳60 (guaranteed within 24 hours). For all other 64 districts nationwide, delivery charge is ৳120 and dispatched within 48 to 72 hours.',
      tag: isBn ? 'ডেলিভারি' : 'Delivery',
    },
    {
      q: isBn ? 'আমি কি ক্যাশ অন ডেলিভারি (COD) তে অর্ডার করতে পারব?' : 'Can I order with Cash on Delivery (COD)?',
      a: isBn
        ? 'হ্যাঁ, ১০০% ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। ডেলিভারি রাইডারের কাছ থেকে পণ্য বুঝে পেয়ে এবং দেখে আপনি মূল্য পরিশোধ করতে পারবেন।'
        : 'Yes, 100% Cash on Delivery (COD) is available nationwide. You can inspect your package upon delivery before paying the courier.',
      tag: isBn ? 'পেমেন্ট' : 'Payment',
    },
    {
      q: isBn ? 'কোনো পণ্য অপছন্দ বা ত্রুটিপূর্ণ হলে কীভাবে রিটার্ন করব?' : 'How does the 7-day doorstep return and refund policy work?',
      a: isBn
        ? 'পণ্য পাওয়ার ৭ দিনের মধ্যে আপনি প্রোফাইল বা হেল্পলাইনের মাধ্যমে ফ্রি রিটার্ন রিকোয়েস্ট করতে পারবেন। আমাদের রাইডার আপনার বাসা থেকে পার্সেল সংগ্রহ করবে এবং ৩ দিনের মধ্যে বিকাশ বা ব্যাংকে সম্পূর্ণ রিফান্ড পৌঁছে যাবে।'
        : 'You have 7 days from delivery to request a return. Our DEX rider picks up the item from your doorstep at zero cost, and full refund is processed within 3 business days via bKash/Bank.',
      tag: isBn ? 'রিটার্ন' : 'Returns',
    },
    {
      q: isBn ? 'ShopX স্মার্ট হাব (Smart Hub) ও এআই অ্যাসিস্ট্যান্ট কী?' : 'What is the ShopX Smart Hub and AI Copilot?',
      a: isBn
        ? 'স্মার্ট হাব হলো আমাদের প্ল্যাটফর্মের সুপার-মেনু, যেখানে এআই শপিং অ্যাসিস্ট্যান্ট, ৭ দিনের ডেইলি কয়েন রিওয়ার্ড, মেগা ভাউচার, লাইভ স্ট্রিম শপিং এবং ভার্চুয়াল ট্রাই-অন টুলস একত্রিত রয়েছে।'
        : 'Smart Hub is our integrated commerce power-suite featuring AI Shopping Copilots, 7-Day Coins rewards, Instant Vouchers, Live Video Commerce, and Virtual Try-On AR.',
      tag: isBn ? 'স্মার্ট হাব' : 'Smart Hub',
    },
    {
      q: isBn ? 'ShopX এর হেড অফিস কোথায় এবং কীভাবে যোগাযোগ করব?' : 'Where is ShopX Head Office and how to contact support?',
      a: isBn
        ? 'আমাদের কেন্দ্রীয় কর্পোরেট হেড অফিস রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ। আমাদের সার্বক্ষণিক ২৪/৭ হেল্পলাইন নম্বর: 01942791004 এবং ইমেইল: support@shopxbd.com।'
        : 'Our Central Corporate Head Office is located at Rowmari, Kurigram, Rangpur, Bangladesh. 24/7 Helpline is +880 1942-791004 and email is support@shopxbd.com.',
      tag: isBn ? 'কর্পোরেট' : 'Corporate',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-slate-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-emerald-600 transition">
            {isBn ? 'হোম' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">
            {isBn ? 'সাধারণ প্রশ্নোত্তর (FAQ)' : 'Frequently Asked Questions'}
          </span>
        </nav>

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2.5 rounded-2xl bg-emerald-700/60 border border-emerald-500/40 text-emerald-300">
              <HelpCircle className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              24/7 Customer Help Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {isBn ? 'গ্রাহকদের সাধারণ জিজ্ঞাসা ও উত্তর' : 'Frequently Asked Questions (FAQ)'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {isBn
              ? 'ডেলিভারি, ক্যাশ অন ডেলিভারি, ৭ দিনের রিটার্ন এবং স্মার্ট হাব সম্পর্কিত যাবতীয় প্রশ্নের উত্তর এক নজরে জেনে নিন।'
              : 'Everything you need to know about express nationwide delivery, COD, easy returns, and Smart Hub AI tools.'}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-10">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
                      {faq.tag}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Card */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'আরও কিছু জানতে চান?' : 'Need More Direct Assistance?'}</span>
            </div>
            <h4 className="text-lg font-black">{isBn ? 'আমাদের ২৪/৭ সাপোর্ট টিম প্রস্তুত' : 'Our Support Team is Live 24/7'}</h4>
            <p className="text-xs text-slate-400 mt-1">
              {isBn ? 'হেড অফিস: রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ' : 'Head Office: Rowmari, Kurigram, Rangpur, Bangladesh'}
            </p>
          </div>
          <a
            href="tel:+8801942791004"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-black text-sm text-white shadow-lg shadow-emerald-700/30 transition hover:scale-105 flex-shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>01942791004</span>
          </a>
        </div>
      </div>
    </div>
  );
};
