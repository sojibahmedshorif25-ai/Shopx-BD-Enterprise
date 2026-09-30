import React, { useState } from 'react';
import { X, FileText, Upload, CheckCircle2, ShieldCheck, PhoneCall, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const [customerPhone, setCustomerPhone] = useState('01942791004');
  const [patientName, setPatientName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsUploaded(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20">
            <FileText className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
              Verified Pharmacy Service
            </span>
            <h2 className="text-xl font-black text-slate-100">
              {lang === 'bn' ? 'প্রেসক্রিপশন আপলোড ও মেডিসিন অর্ডার' : 'Prescription Medicine Delivery'}
            </h2>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-teal-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-white">
              {lang === 'bn' ? 'প্রেসক্রিপশন সফলভাবে জমা হয়েছে!' : 'Prescription Uploaded Successfully!'}
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              আমাদের রেজিস্টার্ড গ্র্যাজুয়েট ফার্মাসিস্ট প্রেসক্রিপশন যাচাই করে ১০ মিনিটের মধ্যে আপনাকে কল করবেন।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Upload Box */}
            <div className="border-2 border-dashed border-slate-700 hover:border-teal-500/60 rounded-2xl p-5 text-center cursor-pointer transition bg-slate-950/60 relative group">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={() => setIsUploaded(true)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 group-hover:text-teal-400 flex items-center justify-center mx-auto mb-2 transition">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-200">
                {isUploaded
                  ? '✓ প্রেসক্রিপশন ইমেজ যুক্ত হয়েছে (Change)'
                  : lang === 'bn'
                  ? 'প্রেসক্রিপশনের ছবি বা PDF সিলেক্ট করুন'
                  : 'Upload Prescription Photo or PDF'}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">JPG, PNG, PDF (Max 10MB)</p>
            </div>

            {/* Patient Name & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">রোগীর নাম (Patient Name)</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Patient Name"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">মোবাইল নম্বর (Phone Number)</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl focus:border-teal-500 font-mono"
                  required
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">ডেলিভারি ঠিকানা (Delivery Address)</label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="House, Road, Area, Dhaka"
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl focus:border-teal-500"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-teal-500/20 transition flex items-center justify-center space-x-2"
            >
              <span>{lang === 'bn' ? 'অর্ডার সাবমিট করুন' : 'Submit Prescription Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
