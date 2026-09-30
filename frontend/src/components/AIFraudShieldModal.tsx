import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Search,
  Sparkles,
  Zap,
  Lock,
  Truck,
  Activity,
  UserCheck,
  Ban,
  TrendingDown,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface AIFraudShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIFraudShieldModal: React.FC<AIFraudShieldModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const [phoneNumber, setPhoneNumber] = useState('01712345678');
  const [district, setDistrict] = useState('Dhaka - Dhanmondi');
  const [orderValue, setOrderValue] = useState(3500);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>({
    score: 96,
    riskLevel: 'LOW_RISK',
    deliverySuccessRate: '98.2%',
    carrier: 'Grameenphone (GP 4G Verified)',
    totalOrdersInNetwork: 14,
    successfulDeliveries: 14,
    rtoCancelled: 0,
    recommendation: 'INSTANT_COD_APPROVE',
  });

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Generate intelligent dynamic score based on phone input
      const lastDigit = parseInt(phoneNumber.slice(-1) || '5', 10);
      if (lastDigit > 7) {
        setScanResult({
          score: 34,
          riskLevel: 'HIGH_RISK_RTO',
          deliverySuccessRate: '41.5%',
          carrier: 'Banglalink (Prepaid / New SIM)',
          totalOrdersInNetwork: 6,
          successfulDeliveries: 2,
          rtoCancelled: 4,
          recommendation: 'REQUIRE_ADVANCE_COURIER_CHARGE',
        });
      } else if (lastDigit > 4) {
        setScanResult({
          score: 78,
          riskLevel: 'MODERATE_RISK',
          deliverySuccessRate: '82.0%',
          carrier: 'Robi / Airtel (Verified)',
          totalOrdersInNetwork: 8,
          successfulDeliveries: 7,
          rtoCancelled: 1,
          recommendation: 'OTP_SMS_CONFIRM_BEFORE_DISPATCH',
        });
      } else {
        setScanResult({
          score: 98,
          riskLevel: 'LOW_RISK',
          deliverySuccessRate: '99.1%',
          carrier: 'Grameenphone (Prime Verified)',
          totalOrdersInNetwork: 22,
          successfulDeliveries: 22,
          rtoCancelled: 0,
          recommendation: 'INSTANT_COD_APPROVE',
        });
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-white">
                {lang === 'bn'
                  ? 'ShopX এআই সিওডি ফ্রড শিল্ড ও আরটিও প্রিভেনশন'
                  : 'AI COD Fraud Shield & RTO Risk Engine'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/40">
                SaaS Security
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {lang === 'bn'
                ? 'ভুয়া অর্ডার ও কুরিয়ার রিটার্ন খরচ (RTO) ৯৯.৪% কমাতে এআই রিয়েল-টাইম কাস্টমার ট্রাস্ট স্কোরিং।'
                : 'Zero-Fraud COD verification: Pre-screen phone, address & network delivery history before dispatch.'}
            </p>
          </div>
        </div>

        {/* Simulation Controls */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">
                {lang === 'bn' ? 'গ্রাহকের ফোন নম্বর:' : 'Customer Phone:'}
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">
                {lang === 'bn' ? 'ডেলিভারি এলাকা / জেলা:' : 'Delivery Location:'}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-emerald-500"
              >
                <option value="Dhaka - Dhanmondi">Dhaka (Dhanmondi / Gulshan)</option>
                <option value="Chittagong - Agrabad">Chittagong (Agrabad)</option>
                <option value="Sylhet - Zindabazar">Sylhet (Zindabazar)</option>
                <option value="Remote Upazila - High RTO Zone">Remote Upazila (High RTO Zone)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">
                {lang === 'bn' ? 'অর্ডার মূল্য (৳):' : 'Order Value (৳):'}
              </label>
              <input
                type="number"
                value={orderValue}
                onChange={(e) => setOrderValue(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2 transition"
          >
            <Activity className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>
              {isScanning
                ? (lang === 'bn' ? 'এআই স্ক্যানিং চলছে...' : 'Scanning 64-District Courier Network...')
                : (lang === 'bn' ? 'এআই ট্রাস্ট স্কোর ভেরিফাই করুন' : 'Run AI Trust & Risk Analysis')}
            </span>
          </button>
        </div>

        {/* Live Analysis Output */}
        {scanResult && (
          <div className="mt-5 space-y-4">
            {/* Score & Risk Badge */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4 text-center sm:text-left">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl font-mono ${
                    scanResult.score > 85
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                      : scanResult.score > 60
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/50'
                  }`}
                >
                  {scanResult.score}%
                </div>
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase mb-1 ${
                      scanResult.score > 85
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : scanResult.score > 60
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {scanResult.riskLevel.replace(/_/g, ' ')}
                  </span>
                  <h4 className="text-base font-black text-white">
                    {scanResult.score > 85
                      ? (lang === 'bn' ? '১০০% বিশ্বস্ত গ্রাহক (Safe COD)' : 'Verified Safe Buyer (Zero RTO Risk)')
                      : scanResult.score > 60
                      ? (lang === 'bn' ? 'মাঝারি ঝুঁকি (OTP ভেরিফিকেশন রিকমেন্ডেড)' : 'Moderate Risk: Automated OTP Call Recommended')
                      : (lang === 'bn' ? 'উচ্চ ঝুঁকি (ডেলিভারি চার্জ অগ্রিম নিন)' : 'High Risk: Fake Order / Return Prone Profile')}
                  </h4>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="text-slate-400 block">Courier Delivery Rate:</span>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  {scanResult.deliverySuccessRate}
                </span>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Network Orders:</span>
                <span className="text-sm font-black text-white font-mono">
                  {scanResult.totalOrdersInNetwork} Orders
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Delivered Success:</span>
                <span className="text-sm font-black text-emerald-400 font-mono">
                  {scanResult.successfulDeliveries}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Returned / RTO:</span>
                <span className="text-sm font-black text-rose-400 font-mono">
                  {scanResult.rtoCancelled} Failed
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Telecom Carrier:</span>
                <span className="text-xs font-bold text-cyan-400 truncate block">
                  {scanResult.carrier.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Automated Recommendation Action Banner */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-slate-200">
                  {lang === 'bn' ? 'স্বয়ংক্রিয় এআই সিদ্ধান্ত:' : 'Automated SaaS Dispatch Action:'}
                </span>
              </div>
              <span className="font-bold text-orange-400 font-mono bg-orange-500/10 px-3 py-1 rounded-xl border border-orange-500/20">
                {scanResult.recommendation.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
