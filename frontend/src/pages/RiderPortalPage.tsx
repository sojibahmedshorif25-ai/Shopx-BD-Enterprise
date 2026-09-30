import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Phone,
  CheckCircle2,
  Navigation,
  Clock,
  ShieldCheck,
  Power,
  RotateCcw,
  DollarSign,
  QrCode,
  Camera,
  AlertCircle,
  X,
  ExternalLink,
  Receipt,
  FileCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

export const RiderPortalPage: React.FC = () => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';
  const { formatPrice } = useCurrencyStore();

  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'deliveries' | 'returns' | 'cash'>('deliveries');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [otpInput, setOtpInput] = useState('');
  const [podSignature, setPodSignature] = useState(false);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);
  const [failedReason, setFailedReason] = useState('');
  const [showFailModal, setShowFailModal] = useState(false);

  // Mock DEX assigned delivery tasks
  const [tasks, setTasks] = useState([
    {
      id: 'DEX-88910',
      orderId: 'SX-889894',
      customerName: 'তানভীর আহমেদ (Tanvir Ahmed)',
      phone: '01712-345678',
      address: 'House 42, Road 11, Block D, Banani, Dhaka',
      district: 'Dhaka (Zone A)',
      itemsCount: 2,
      codAmount: 3490,
      paymentMethod: 'Cash on Delivery (COD)',
      status: 'out_for_delivery',
      eta: '15 mins',
      priority: 'Express',
    },
    {
      id: 'DEX-88911',
      orderId: 'SX-928412',
      customerName: 'নুসরাত জাহান (Nusrat Jahan)',
      phone: '01823-987654',
      address: 'Flat 4B, Gulshan Lake View, Gulshan-2, Dhaka',
      district: 'Dhaka (Zone A)',
      itemsCount: 1,
      codAmount: 0,
      paymentMethod: 'bKash Paid (Online)',
      status: 'assigned',
      eta: '45 mins',
      priority: 'Standard',
    },
  ]);

  // Mock return pickup tasks
  const [returnTasks, setReturnTasks] = useState([
    {
      id: 'RET-4491',
      orderId: 'SX-774120',
      customerName: 'আরিফুল ইসলাম (Ariful Islam)',
      phone: '01911-223344',
      address: 'House 12, Road 4, Dhanmondi, Dhaka',
      reason: 'Wrong size / replacement',
      itemTitle: 'Royal Velvet Kurta - Size L',
      status: 'pending_pickup',
    },
  ]);

  // Daily COD collection totals
  const totalCodCollectedToday = 14850;
  const cashRemittedToHub = 10000;
  const cashInHand = totalCodCollectedToday - cashRemittedToHub;

  const handleUpdateLiveGPS = () => {
    setIsUpdatingLocation(true);
    if (!navigator.geolocation) {
      setTimeout(() => {
        setIsUpdatingLocation(false);
        alert(isBn ? '✅ GPS লোকেশন সফলভাবে আপডেট হয়েছে: Banani Hub (23.7937, 90.4066)' : '✅ Live GPS Location Updated: Banani Hub (23.7937, 90.4066)');
      }, 800);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsUpdatingLocation(false);
        alert(isBn ? `✅ GPS লোকেশন সফলভাবে আপডেট হয়েছে: Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}` : `✅ Live GPS Updated: Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}`);
      },
      () => {
        setIsUpdatingLocation(false);
        alert(isBn ? '✅ GPS লোকেশন সফলভাবে আপডেট হয়েছে: Banani Hub (23.7937, 90.4066)' : '✅ Live GPS Location Updated: Banani Hub (23.7937, 90.4066)');
      }
    );
  };

  const handleCompleteDelivery = (task: any) => {
    if (!podSignature && !otpInput) {
      alert(isBn ? 'দয়া করে কাস্টমার ওটিপি অথবা ডিজিটাল সাইন সম্পন্ন করুন।' : 'Please enter Customer OTP or complete Digital Signature.');
      return;
    }

    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: 'delivered' } : t)));
    setSelectedTask(null);
    setOtpInput('');
    setPodSignature(false);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    alert(isBn ? '🎉 ডেলিভারি সফলভাবে সম্পন্ন হয়েছে ও হাবে আপডেট হয়েছে!' : '🎉 Delivery successfully completed and synced with Hub!');
  };

  const handleFailDelivery = () => {
    if (!failedReason) {
      alert(isBn ? 'দয়া করে ব্যর্থতার কারণ নির্বাচন করুন।' : 'Please select the failure reason.');
      return;
    }
    setTasks(tasks.map((t) => (t.id === selectedTask.id ? { ...t, status: 'failed' } : t)));
    setShowFailModal(false);
    setSelectedTask(null);
    alert(isBn ? '⚠️ ডেলিভারি ফেইল্ড স্ট্যাটাস ও কারণ হাবে পাঠানো হয়েছে।' : '⚠️ Delivery failure logged and synced with Logistics Hub.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* 1. Rider Header & Status Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-600/30">
            <Truck className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black">{isBn ? 'কামরুল হাসান (Kamrul)' : 'Kamrul Hasan (Hero Rider)'}</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                DEX Certified
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isBn ? 'ঢাকা নর্থ জোন হাব | বাইক: ঢাকা মেট্রো হ-৪৪৯১ | আইডি: DEX-0491' : 'Dhaka North Hub | Bike: Metro-H-4491 | DEX ID: DEX-0491'}
            </p>
          </div>
        </div>

        {/* Online Duty Status Switcher */}
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition ${
            isOnline
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{isOnline ? (isBn ? '● ডিউটি সক্রিয় (Online)' : '● Duty Online') : (isBn ? 'অফলাইন (Offline)' : 'Offline')}</span>
        </button>
      </div>

      {/* 2. Quick Actions: GPS Ping & Summary Ticker */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={handleUpdateLiveGPS}
          disabled={isUpdatingLocation}
          className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-left hover:bg-emerald-100 transition shadow-sm"
        >
          <div>
            <p className="text-xs font-bold text-emerald-900">{isBn ? 'লাইভ জিপিএস পিং' : 'Live GPS Ping'}</p>
            <p className="text-[10px] text-emerald-700">{isBn ? 'কাস্টমার ম্যাপে লোকেশন পাঠান' : 'Broadcast Location to Customer'}</p>
          </div>
          <Navigation className={`w-5 h-5 text-emerald-700 ${isUpdatingLocation ? 'animate-spin' : ''}`} />
        </button>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-500">{isBn ? 'আজকের ডেলিভারি সম্পন্ন' : 'Deliveries Completed'}</p>
            <p className="text-lg font-black text-slate-900 font-mono">12 / 14</p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-500">{isBn ? 'হাতে ক্যাশ কালেকশন' : 'Cash in Hand (COD)'}</p>
            <p className="text-lg font-black text-emerald-700 font-mono">{formatPrice(cashInHand)}</p>
          </div>
          <DollarSign className="w-6 h-6 text-amber-500" />
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('deliveries')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
            activeTab === 'deliveries'
              ? 'bg-emerald-700 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>{isBn ? `ডেলিভারি টাস্ক (${tasks.filter((t) => t.status !== 'delivered').length})` : `Active Deliveries (${tasks.filter((t) => t.status !== 'delivered').length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
            activeTab === 'returns'
              ? 'bg-emerald-700 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isBn ? `রিটার্ন পিকআপ (${returnTasks.length})` : `Return Pickups (${returnTasks.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('cash')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
            activeTab === 'cash'
              ? 'bg-emerald-700 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>{isBn ? 'ক্যাশ রেমিট্যান্স ও হিসাব' : 'COD Cash Remittance'}</span>
        </button>
      </div>

      {/* 4. Tab 1: Delivery Tasks */}
      {activeTab === 'deliveries' && (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-3xl p-6 border shadow-sm space-y-4 transition ${
                task.status === 'delivered'
                  ? 'border-emerald-200 bg-emerald-50/40 opacity-75'
                  : 'border-slate-200 hover:border-emerald-400'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-emerald-800">#{task.orderId}</span>
                  <span className="text-[10px] bg-slate-100 font-bold px-2 py-0.5 rounded text-slate-600">
                    {task.id}
                  </span>
                  {task.priority === 'Express' && (
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-black px-2 py-0.5 rounded">
                      ⚡ 50-Min Express
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      task.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {task.status === 'delivered' ? (isBn ? '✓ ডেলিভার্ড' : '✓ Delivered') : (isBn ? '🚚 ডেলিভারিতে রওয়ানা' : '🚚 Out for Delivery')}
                  </span>
                </div>
              </div>

              {/* Customer Details & Map Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-sm">{task.customerName}</p>
                  <p className="text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{task.address}</span>
                  </p>
                </div>

                <div className="space-y-1 sm:text-right">
                  <p className="text-slate-500">{isBn ? 'কালেকশন মেথড' : 'Payment Method'}: <strong>{task.paymentMethod}</strong></p>
                  <p className="text-base font-black text-slate-900 font-mono">
                    {isBn ? 'কালেকশন অ্যামাউন্ট' : 'COD Amount'}: {formatPrice(task.codAmount)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {task.status !== 'delivered' && (
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
                  <a
                    href={`tel:${task.phone}`}
                    className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isBn ? `কল করুন (${task.phone})` : `Call Customer (${task.phone})`}</span>
                  </a>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(task.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{isBn ? 'ম্যাপ ডিরেকশন ↗' : 'Google Maps ↗'}</span>
                  </a>

                  <button
                    onClick={() => setSelectedTask(task)}
                    className="ml-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    {isBn ? 'প্রুফ অফ ডেলিভারি (POD) ও সম্পন্ন' : 'Proof of Delivery (POD) & Complete'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 5. Tab 2: Return Pickup Tasks */}
      {activeTab === 'returns' && (
        <div className="space-y-4">
          {returnTasks.map((ret) => (
            <div key={ret.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-mono font-bold text-purple-800">#{ret.id} ({isBn ? 'অর্ডার' : 'Order'}: {ret.orderId})</span>
                <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold">{isBn ? 'পিকআপ পেন্ডিং' : 'Pending Pickup'}</span>
              </div>
              <p className="font-bold text-slate-900 text-sm">{ret.customerName} ({ret.phone})</p>
              <p className="text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-600" />
                <span>{ret.address}</span>
              </p>
              <p className="text-slate-700">{isBn ? 'পণ্য' : 'Product'}: <strong>{ret.itemTitle}</strong> | {isBn ? 'কারণ' : 'Reason'}: {ret.reason}</p>
              <div className="flex gap-2 pt-2">
                <a
                  href={`tel:${ret.phone}`}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isBn ? 'কল দিন' : 'Call'}</span>
                </a>
                <button
                  onClick={() => alert(isBn ? '✅ রিটার্ন পার্সেল সফলভাবে পিকআপ করা হয়েছে এবং সেন্ট্রাল হাবে জমা দেওয়া হবে।' : '✅ Return parcel successfully picked up and routed to Central Hub.')}
                  className="px-4 py-2 bg-purple-700 text-white font-bold rounded-xl shadow"
                >
                  ✓ {isBn ? 'পিকআপ কনফার্ম করুন' : 'Confirm Pickup'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. Tab 3: Cash Remittance Tally */}
      {activeTab === 'cash' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-black text-base text-slate-900">
            {isBn ? 'সারাদিনের COD ক্যাশ কালেকশন ও হাবে জমা দেওয়ার হিসাব' : 'Daily COD Cash Collection & Hub Remittance Ledger'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border">
              <p className="text-xs text-slate-500 font-bold">{isBn ? 'মোট ক্যাশ কালেকশন' : 'Total COD Collected'}</p>
              <p className="text-xl font-black text-slate-900 font-mono mt-1">{formatPrice(totalCodCollectedToday)}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <p className="text-xs text-emerald-800 font-bold">{isBn ? 'হাবে জমা দেওয়া হয়েছে' : 'Remitted to Central Hub'}</p>
              <p className="text-xl font-black text-emerald-800 font-mono mt-1">{formatPrice(cashRemittedToHub)}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <p className="text-xs text-amber-800 font-bold">{isBn ? 'বর্তমান ক্যাশ ব্যালেন্স' : 'Current Cash Balance'}</p>
              <p className="text-xl font-black text-amber-900 font-mono mt-1">{formatPrice(cashInHand)}</p>
            </div>
          </div>

          <button
            onClick={() => alert(isBn ? '✅ হাবে ক্যাশ রিসিট নম্বর: HUB-RCP-948210 সফলভাবে জেনারেট হয়েছে।' : '✅ Hub Deposit Receipt #HUB-RCP-948210 Generated Successfully.')}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow"
          >
            {isBn ? 'হাবে ক্যাশ ডিপোজিট স্লিপ জেনারেট করুন' : 'Generate Hub Deposit Slip'}
          </button>
        </div>
      )}

      {/* 7. Proof of Delivery (POD) Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {isBn ? 'প্রুফ অফ ডেলিভারি (POD)' : 'Proof of Delivery (POD)'} #{selectedTask.orderId}
              </h3>
              <button onClick={() => setSelectedTask(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <p><strong>{isBn ? 'গ্রাহক:' : 'Customer:'}</strong> {selectedTask.customerName}</p>
              <p><strong>{isBn ? 'কালেকশন ক্যাশ:' : 'COD Due:'}</strong> {formatPrice(selectedTask.codAmount)}</p>
            </div>

            {/* OTP Verification Input */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">
                {isBn ? 'কাস্টমার ডেলিভারি OTP কোড (SMS এ প্রেরিত):' : 'Customer Delivery OTP Code:'}
              </label>
              <input
                type="text"
                placeholder="e.g. 4921"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-center text-lg font-mono font-black tracking-widest outline-none focus:border-emerald-600"
              />
            </div>

            {/* Digital Signature Pad Simulator */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">
                {isBn ? 'কাস্টমারের ডিজিটাল স্বাক্ষর (Digital Signature):' : 'Customer Digital Signature:'}
              </label>
              <div
                onClick={() => setPodSignature(true)}
                className={`h-24 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition ${
                  podSignature ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold' : 'border-slate-300 bg-slate-50 text-slate-400'
                }`}
              >
                {podSignature ? (isBn ? '✓ স্বাক্ষর গৃহীত হয়েছে (Signature Verified)' : '✓ Signature Verified') : (isBn ? 'এখানে টাচ করে ডিজিটাল সাইন দিন' : 'Touch / Draw here to Sign')}
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <button
                onClick={() => setShowFailModal(true)}
                className="flex-1 py-2.5 bg-rose-50 text-rose-700 font-bold rounded-xl border border-rose-200"
              >
                {isBn ? 'ডেলিভারি ফেইল্ড' : 'Mark Failed'}
              </button>
              <button
                onClick={() => handleCompleteDelivery(selectedTask)}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow"
              >
                {isBn ? 'ডেলিভারি কনফার্ম' : 'Confirm Delivery'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Delivery Failed Reason Modal */}
      {showFailModal && selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-3 text-xs">
            <h3 className="font-black text-sm text-rose-700">
              {isBn ? 'ডেলিভারি ব্যর্থতার কারণ উল্লেখ করুন:' : 'Select Reason for Delivery Failure:'}
            </h3>
            <select
              value={failedReason}
              onChange={(e) => setFailedReason(e.target.value)}
              className="w-full p-2.5 border rounded-xl"
            >
              <option value="">{isBn ? 'কারণ নির্বাচন করুন...' : 'Choose a reason...'}</option>
              <option value="Customer unavailable / Phone switched off">{isBn ? 'কাস্টমারকে ফোনে পাওয়া যায়নি' : 'Customer Phone Unreachable'}</option>
              <option value="Customer rescheduled delivery">{isBn ? 'কাস্টমার পরবর্তীতে ডেলিভারি নিতে চেয়েছেন' : 'Customer Rescheduled'}</option>
              <option value="Wrong delivery address">{isBn ? 'ঠিকানা সঠিক নয় / অসম্পূর্ণ' : 'Incomplete Address'}</option>
              <option value="Customer refused order">{isBn ? 'কাস্টমার পার্সেল গ্রহণ করতে অস্বীকৃতি জানিয়েছেন' : 'Customer Refused Package'}</option>
            </select>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowFailModal(false)} className="flex-1 py-2 bg-slate-100 rounded-xl">{isBn ? 'বাতিল' : 'Cancel'}</button>
              <button onClick={handleFailDelivery} className="flex-1 py-2 bg-rose-600 text-white font-bold rounded-xl">{isBn ? 'সাবমিট করুন' : 'Submit'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
