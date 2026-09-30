import React, { useState } from 'react';
import { X, Building2, Download, FileText, CheckCircle2, Calculator, ArrowRight, ShieldCheck, Mail, Phone, Briefcase } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

interface B2BWholesaleQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  unitPrice?: number;
}

export const B2BWholesaleQuoteModal: React.FC<B2BWholesaleQuoteModalProps> = ({
  isOpen,
  onClose,
  productName = 'Apple iPhone 16 Pro Max 256GB',
  unitPrice = 175000
}) => {
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('01942791004');
  const [quantity, setQuantity] = useState(25);
  const [taxId, setTaxId] = useState('');
  const [notes, setNotes] = useState('');
  const [quoteGenerated, setQuoteGenerated] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState('');

  if (!isOpen) return null;

  // Wholesale tier calculation
  let discountPercent = 0;
  if (quantity >= 10 && quantity < 25) discountPercent = 12;
  else if (quantity >= 25 && quantity < 50) discountPercent = 18;
  else if (quantity >= 50 && quantity < 100) discountPercent = 25;
  else if (quantity >= 100) discountPercent = 32;

  const discountedUnitPrice = Math.round(unitPrice * (1 - discountPercent / 100));
  const subtotal = discountedUnitPrice * quantity;
  const vatAmount = Math.round(subtotal * 0.05); // 5% VAT
  const grandTotal = subtotal + vatAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteNumber('Q-SHOPX-' + Math.floor(100000 + Math.random() * 900000));
    setQuoteGenerated(true);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
            <Building2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>{lang === 'bn' ? 'B2B ও কর্পোরেট পাইকারি কোটেশন' : 'B2B Corporate Wholesale Quotation'}</span>
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'bn' ? 'অফিস, প্রতিষ্ঠান ও পাইকারি ক্রয়ের জন্য বিশেষ ডিসকাউন্ট এবং অফিসিয়াল ইনভয়েস' : 'Tier-discount pricing & official quotation for corporate procurement.'}
            </p>
          </div>
        </div>

        {quoteGenerated ? (
          <div className="space-y-6 animate-scaleUp">
            <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    SHOPX BD B2B ENTERPRISE
                  </h3>
                  <p className="text-xs text-slate-400">Quote ID: <span className="font-mono text-cyan-400 font-bold">{quoteNumber}</span></p>
                  <p className="text-xs text-slate-400">Date: {new Date().toLocaleDateString('en-GB')}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                    {discountPercent}% Corporate Saved
                  </span>
                </div>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500 block">Company / Organization:</span>
                  <span className="font-bold text-white">{companyName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Contact Person:</span>
                  <span className="font-bold text-white">{contactName} ({phone})</span>
                </div>
              </div>

              {/* Pricing breakdown table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                <div className="grid grid-cols-4 p-2.5 bg-slate-900 font-bold text-slate-300">
                  <div className="col-span-2">Item Description</div>
                  <div className="text-center">Qty</div>
                  <div className="text-right">Total</div>
                </div>
                <div className="grid grid-cols-4 p-2.5 border-t border-slate-800/80 text-slate-200">
                  <div className="col-span-2 truncate">{productName}</div>
                  <div className="text-center font-mono">{quantity} Units</div>
                  <div className="text-right font-mono font-bold">{formatPrice(subtotal)}</div>
                </div>
                <div className="p-2.5 bg-slate-900/60 border-t border-slate-800 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span className="font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Govt VAT (5%):</span>
                    <span className="font-mono">{formatPrice(vatAmount)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-slate-800">
                    <span className="text-cyan-400">Grand Total:</span>
                    <span className="font-mono text-cyan-400">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleDownloadPDF}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2 transition"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'bn' ? 'প্রিন্ট / PDF ডাউনলোড করুন' : 'Print / Download Official PDF'}</span>
              </button>
              <button
                onClick={() => {
                  setQuoteGenerated(false);
                  onClose();
                }}
                className="py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Wholesale discount tiers badge bar */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className={`p-2 rounded-xl border ${quantity >= 10 && quantity < 25 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="font-mono">10-24 Qty</div>
                <div className="text-[10px] text-emerald-400">12% OFF</div>
              </div>
              <div className={`p-2 rounded-xl border ${quantity >= 25 && quantity < 50 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="font-mono">25-49 Qty</div>
                <div className="text-[10px] text-emerald-400">18% OFF</div>
              </div>
              <div className={`p-2 rounded-xl border ${quantity >= 50 && quantity < 100 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="font-mono">50-99 Qty</div>
                <div className="text-[10px] text-emerald-400">25% OFF</div>
              </div>
              <div className={`p-2 rounded-xl border ${quantity >= 100 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="font-mono">100+ Qty</div>
                <div className="text-[10px] text-emerald-400">32% OFF</div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {lang === 'bn' ? 'অর্ডারের পরিমাণ (Units)' : 'Procurement Quantity (Units)'}
                </label>
                <span className="text-xs font-bold text-cyan-400 font-mono">
                  {discountPercent}% Discount Applied
                </span>
              </div>
              <input
                type="number"
                min={10}
                max={5000}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono font-bold text-sm focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>

            {/* Live calculation banner */}
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">{lang === 'bn' ? 'প্রতি ইউনিটের ছাড়যুক্ত মূল্য:' : 'Wholesale Unit Price:'}</span>
                <span className="font-mono font-bold text-cyan-300 text-sm">{formatPrice(discountedUnitPrice)}</span>
                <span className="text-[10px] text-slate-500 line-through ml-2">{formatPrice(unitPrice)}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block">{lang === 'bn' ? 'সর্বমোট প্রাক্কলন:' : 'Estimated Total:'}</span>
                <span className="font-mono font-black text-cyan-400 text-base">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Organization & Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {lang === 'bn' ? 'কোম্পানি / প্রতিষ্ঠানের নাম' : 'Company / Organization Name'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grameenphone / BRAC / ABC Corp"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-2xl text-white text-xs focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {lang === 'bn' ? 'দায়িত্বপ্রাপ্ত ব্যক্তির নাম' : 'Contact Person'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sharif Ahmed"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-2xl text-white text-xs focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {lang === 'bn' ? 'কর্পোরেট ইমেইল' : 'Corporate Email'}
                </label>
                <input
                  type="email"
                  placeholder="procurement@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-2xl text-white text-xs focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {lang === 'bn' ? 'মোবাইল / WhatsApp' : 'Direct Phone / WhatsApp'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-2xl text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {lang === 'bn' ? 'টিন / বিন নম্বর (ঐচ্ছিক)' : 'BIN / TIN Number (Optional)'}
              </label>
              <input
                type="text"
                placeholder="1234567890-BIN"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-2xl text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2 transition transform active:scale-95 mt-2"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'bn' ? 'তাত্ক্ষণিক অফিসিয়াল কোটেশন জেনারেট করুন' : 'Generate Instant Official Quotation'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
