import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguageStore } from '../store/useLanguageStore';

export const ContactPage: React.FC = () => {
  const { lang } = useLanguageStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: 'support',
    orderId: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `SX-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
      setIsSubmitting(false);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }, 1000);
  };

  const contactChannels = [
    {
      icon: PhoneCall,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: lang === 'bn' ? 'হটলাইন ও কাস্টমার সাপোর্ট' : 'Customer Care Hotline',
      value: '+880 1942-791004',
      subtitle: lang === 'bn' ? 'সকাল ৯:০০ - রাত ১১:০০ (প্রতিদিন)' : '9:00 AM - 11:00 PM (Daily)',
      action: 'tel:+8801942791004',
      btnText: lang === 'bn' ? 'কল করুন' : 'Call Now',
    },
    {
      icon: MessageSquare,
      color: 'bg-green-50 text-green-700 border-green-200',
      title: lang === 'bn' ? 'হোয়াটসঅ্যাপ ইনস্ট্যান্ট চ্যাট' : 'WhatsApp Instant Support',
      value: '+880 1942-791004',
      subtitle: lang === 'bn' ? 'তাৎক্ষণিক মেসেজ ও অর্ডার আপডেট' : 'Instant live chat response',
      action: 'https://wa.me/8801942791004?text=Hello%20ShopX%20Support',
      btnText: lang === 'bn' ? 'চ্যাট করুন' : 'Chat on WhatsApp',
    },
    {
      icon: Mail,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      title: lang === 'bn' ? 'ইমেইল সাপোর্ট ও কর্পোরেট' : 'Email Support & Inquiries',
      value: 'sojibahmedshorif25@gmail.com',
      subtitle: lang === 'bn' ? 'তাৎক্ষণিক ইমেইলে রিপ্লাই ও ২৪/৭ হেল্পডেস্ক' : 'Guaranteed reply in 2 hours',
      action: 'mailto:sojibahmedshorif25@gmail.com',
      btnText: lang === 'bn' ? 'ইমেইল পাঠান' : 'Send Email',
    },
    {
      icon: MapPin,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      title: lang === 'bn' ? 'হেড অফিস ও সেন্ট্রাল কমান্ড হাব' : 'Headquarters & Command Hub',
      value: lang === 'bn' ? 'রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ' : 'Rowmari, Kurigram, Rangpur, Bangladesh',
      subtitle: lang === 'bn' ? 'বাংলাদেশ' : 'Bangladesh',
      action: '#',
      btnText: lang === 'bn' ? 'ম্যাপে দেখুন' : 'View on Map',
    },
  ];

  const faqs = [
    {
      q: lang === 'bn' ? 'ডেলিভারি পেতে কত সময় লাগে?' : 'What is the estimated delivery time?',
      a:
        lang === 'bn'
          ? 'ঢাকা শহরের ভেতরে সাধারণত ২৪ ঘণ্টার মধ্যে (পরের দিন) এবং ঢাকার বাইরে ৬৪টি জেলায় ৪৮ থেকে ৭২ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়।'
          : 'Inside Dhaka orders are typically delivered within 24 hours (next day). Nationwide delivery across all 64 districts takes 48-72 hours.',
    },
    {
      q: lang === 'bn' ? 'পণ্য পছন্দ না হলে কি রিটার্ন বা রিফান্ড পাওয়া যাবে?' : 'Can I return or exchange a product if unsatisfied?',
      a:
        lang === 'bn'
          ? 'হ্যাঁ, ShopX BD-তে ১৪ দিনের সহজ রিটার্ন পলিসি রয়েছে। পণ্য প্রাপ্তির ১৪ দিনের মধ্যে ওয়েবসাইট থেকে বা কাস্টমার সাপোর্টে কল করে ফ্রিতে রিটার্ন রিকোয়েস্ট করতে পারবেন।'
          : 'Yes, we offer a 14-day hassle-free doorstep return policy. You can initiate a return or exchange request directly from the order tracking page or contact support.',
    },
    {
      q: lang === 'bn' ? 'পেমেন্ট মেথড কী কী রয়েছে?' : 'What payment options are supported?',
      a:
        lang === 'bn'
          ? 'আমরা ক্যাশ অন ডেলিভারি (COD), বিকাশ, নগদ, রকেট এবং সকল প্রধান ক্রেডিট/ডেবিট কার্ড সমর্থন করি। এছাড়াও নির্দিষ্ট পণ্যে ০% ইন্টারেস্টে ৩ থেকে ১২ মাসের EMI সুবিধা রয়েছে।'
          : 'We support Cash on Delivery (COD), bKash, Nagad, Rocket, Visa, Mastercard, and 0% EMI for 3-12 months on eligible flagship tech products.',
    },
    {
      q: lang === 'bn' ? 'কীভাবে একজন সেলার বা ভেন্ডর হিসেবে শপ খুলব?' : 'How can I register as a merchant/vendor on ShopX?',
      a:
        lang === 'bn'
          ? 'আমাদের ওয়েবসাইটের "সেলার রেজিস্ট্রেশন" পেজে গিয়ে আপনার ট্রেড লাইসেন্স বা আইডি দিয়ে ৫ মিনিটের মধ্যে বিনামূল্যে সেলার অ্যাকাউন্ট খুলে পণ্য লিস্টিং শুরু করতে পারবেন।'
          : 'Visit our "Vendor Registration" page, provide your store details and business verification to launch your cloud storefront within 5 minutes.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === 'bn' ? 'আমরা আপনাকে সাহায্য করতে প্রস্তুত' : '24/7 Customer Care & Support'}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {lang === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Get in Touch with ShopX'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
          {lang === 'bn'
            ? 'অর্ডার, পণ্য ডেলিভারি, সেলার অনবোর্ডিং বা যেকোনো প্রশ্নের জন্য আমাদের টিম সর্বদাই আপনার পাশে রয়েছে।'
            : 'Whether you have a question regarding an order, product authenticity, delivery schedule, or partnership — we are here to help.'}
        </p>
      </div>

      {/* 2. Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contactChannels.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition duration-200"
            >
              <div className="space-y-3">
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${c.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                <p className="text-sm font-black text-slate-800 font-mono break-all">{c.value}</p>
                <p className="text-[11px] text-slate-500">{c.subtitle}</p>
              </div>

              {c.action.startsWith('http') || c.action.startsWith('tel') || c.action.startsWith('mailto') ? (
                <a
                  href={c.action}
                  target={c.action.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="w-full text-center py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs transition"
                >
                  {c.btnText}
                </a>
              ) : (
                <button
                  type="button"
                  className="w-full text-center py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
                >
                  {c.btnText}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Interactive Contact Form & FAQ Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-slate-900">
              {lang === 'bn' ? 'সরাসরি মেসেজ পাঠান' : 'Send an Instant Inquiry'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'bn'
                ? 'ফরমটি পূরণ করুন, আমাদের সাপোর্ট টিম দ্রুত আপনার সাথে যোগাযোগ করবে।'
                : 'Fill out the form below and our dedicated support representative will contact you.'}
            </p>
          </div>

          {submittedTicket ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-3 animate-in zoom-in">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-emerald-950">
                {lang === 'bn' ? 'মেসেজ সফলভাবে গৃহীত হয়েছে!' : 'Inquiry Submitted Successfully!'}
              </h3>
              <p className="text-xs text-emerald-800">
                {lang === 'bn'
                  ? 'আপনার সাপোর্ট টিকিট নম্বর:'
                  : 'Your unique support ticket ID is:'}{' '}
                <strong className="font-mono text-sm bg-white px-2.5 py-1 rounded-lg border border-emerald-300">
                  {submittedTicket}
                </strong>
              </p>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                {lang === 'bn'
                  ? 'আমাদের কাস্টমার কেয়ার টিম পরবর্তী ১-২ ঘণ্টার মধ্যে আপনার নম্বরে যোগাযোগ করবে।'
                  : 'Our customer support officer will call/reply within the next 1-2 hours.'}
              </p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="mt-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-full shadow transition"
              >
                {lang === 'bn' ? 'আরেকটি মেসেজ পাঠান' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'আপনার নাম' : 'Full Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'bn' ? 'মোঃ আরিফুল ইসলাম' : 'e.g. John Doe'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর' : 'Phone / WhatsApp'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'বিষয়ের বিভাগ' : 'Department'}
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-emerald-600 focus:bg-white font-medium"
                  >
                    <option value="support">{lang === 'bn' ? 'কাস্টমার সাপোর্ট ও ডেলিভারি' : 'Customer Support & Delivery'}</option>
                    <option value="vendor">{lang === 'bn' ? 'সেলার ও ভেন্ডর পার্টনারশিপ' : 'Vendor Onboarding & Partnership'}</option>
                    <option value="b2b">{lang === 'bn' ? 'পাইকারি ও কর্পোরেট অর্ডার' : 'B2B Wholesale & Bulk Orders'}</option>
                    <option value="rider">{lang === 'bn' ? 'রাইডার ও কুরিয়ার হাব' : 'Rider & Logistics Hub'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'অর্ডার আইডি (প্রযোজ্য ক্ষেত্রে)' : 'Order ID (Optional)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. SX-889894"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-emerald-600 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'আপনার মেসেজ বা জিজ্ঞাসা' : 'Your Message / Inquiry'} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    lang === 'bn'
                      ? 'আপনার সমস্যা বা জিজ্ঞাসার বিস্তারিত বিবরণ এখানে লিখুন...'
                      : 'Please describe your query, delivery status, or requirement in detail...'
                  }
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-emerald-600 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3.5 rounded-xl shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {isSubmitting ? (
                  <span>{lang === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...'}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'মেসেজ জমা দিন' : 'Submit Support Ticket'}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right: FAQ Accordion (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <HelpCircle className="w-5 h-5 text-emerald-700" />
              <h2 className="text-lg font-extrabold text-slate-900">
                {lang === 'bn' ? 'সাধারণ প্রশ্নোত্তর (FAQ)' : 'Frequently Asked Questions'}
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between gap-3 text-xs font-bold text-slate-800"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180 text-emerald-700' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-3xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-yellow-300">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-extrabold text-xs">{lang === 'bn' ? '২৪/৭ নিরাপদ শপিং' : '100% Safe Shopping'}</span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              {lang === 'bn'
                ? 'পণ্য হাতে পেয়ে চেক করে পেমেন্ট করার সুবিধা এবং ১০০% মানিব্যাক গ্যারান্টি।'
                : 'Inspect your parcel before paying with nationwide Cash on Delivery and money-back assurance.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
