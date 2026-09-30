import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, Search } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

const faqData = [
  {
    qBn: 'ShopX BD তে অর্গানিক পণ্যগুলোর বিশুদ্ধতার প্রমাণ কী?',
    qEn: 'How do you guarantee the purity of organic products?',
    aBn: 'আমাদের সুন্দরবনের মধু, কাঠের ঘানির সরিষার তেল ও গাওয়া ঘি সরাসরি BSTI ও BCSIR সরকারি ল্যাবরেটরি থেকে টেস্ট করা। প্রতিটি প্রোডাক্টের সাথে সরকারি ল্যাব টেস্ট সার্টিফিকেট অনলাইনে দেখার ব্যবস্থা রয়েছে।',
    aEn: 'All our organic honey, cow ghee, and cold-pressed mustard oils are directly tested and certified by government BSTI and BCSIR laboratories with 100% money-back guarantee.',
  },
  {
    qBn: 'ক্যাশ অন ডেলিভারি (COD) ও ঢাকার ভেতরে ডেলিভারি চার্জ কত?',
    qEn: 'What is the delivery fee and is Cash on Delivery available?',
    aBn: 'আমরা সমগ্র বাংলাদেশে ১০০% ক্যাশ অন ডেলিভারি সুবিধা প্রদান করি। ঢাকা সিটির ভেতরে ডেলিভারি চার্জ মাত্র ৳৬০ (২৪ ঘণ্টার মধ্যে ডেলিভারি) এবং ঢাকার বাইরে ৳১২০ (২-৩ দিনের মধ্যে ডেলিভারি)।',
    aEn: 'We provide 100% Cash on Delivery across all 64 districts. Delivery within Dhaka is ৳60 (within 24 hours) and outside Dhaka is ৳120 (within 2-3 days).',
  },
  {
    qBn: 'পণ্য পছন্দ না হলে বা ক্ষতিগ্রস্ত হলে রিটার্ন ও রিফান্ড পলিসি কী?',
    qEn: 'What is your return and refund policy if the product is damaged?',
    aBn: 'আমরা ৭ দিনের সহজ ফ্রি রিটার্ন ও ইনস্ট্যান্ট রিফান্ড গ্যারান্টি প্রদান করি। ডেলিভারির সময় রাইডারের সামনে পণ্য চেক করে পছন্দ না হলে সাথে সাথেই রিটার্ন করতে পারেন।',
    aEn: 'We offer a 7-day hassle-free return and instant refund policy. You can check the item in front of the delivery rider upon arrival.',
  },
  {
    qBn: 'বিকাশ, নগদ বা রকেটে পেমেন্ট করার নিয়ম কী?',
    qEn: 'How to pay via bKash, Nagad or Rocket?',
    aBn: 'চেকআউটে আমাদের অফিসিয়াল মার্চেন্ট/পার্সোনাল নম্বর 01942791004 এ সেন্ড মানি করে TrxID ও আপনার মোবাইল নম্বর ইনপুট করলেই অ্যাডমিন থেকে তাৎক্ষণিক অনুমোদন হয়ে যাবে।',
    aEn: 'Send Money to our official number 01942791004 during checkout, enter your TrxID and phone number, and your payment will be approved instantly.',
  },
  {
    qBn: '০% ইন্টারেস্ট EMI কিস্তির সুবিধা কীভাবে পাবো?',
    qEn: 'How to avail 0% Interest EMI Installments?',
    aBn: '৳৫,০০০ বা তার বেশি মূল্যের যেকোনো গ্যাজেট ও ইলেকট্রনিক্স পণ্যে দেশের শীর্ষ ২০+ ব্যাংকের ক্রেডিট কার্ডের মাধ্যমে ৩ থেকে ৩৬ মাসের ০% কিস্তির সুবিধা পাবেন।',
    aEn: 'Any tech gadget or appliance above ৳5,000 is eligible for 3 to 36 months 0% EMI with credit cards from 20+ leading Bangladeshi banks.',
  },
];

export const FAQSection: React.FC = () => {
  const { lang } = useLanguageStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqData.filter((item) =>
    (lang === 'bn' ? item.qBn + item.aBn : item.qEn + item.aEn)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/20 border border-orange-500/30 rounded-2xl text-orange-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions (FAQ)'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn'
                  ? 'ডেলিভারি, ল্যাব টেস্টের বিশুদ্ধতা ও পেমেন্ট সংক্রান্ত যাবতীয় প্রশ্নের উত্তর'
                  : 'Everything you need to know about delivery, authentic lab tests & payments'}
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'প্রশ্ন সার্চ করুন...' : 'Search questions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs py-2.5 pl-9 pr-3 rounded-xl border border-slate-800 bg-slate-950 text-white outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:text-orange-400 transition"
                >
                  <span className="flex-1">{lang === 'bn' ? faq.qBn : faq.qEn}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-orange-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 animate-in fade-in">
                    {lang === 'bn' ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
