import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Truck, Package, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    const fetchOrder = async () => {
      if (orderId) {
        try {
          const res = await api.get(`/orders/track?orderId=${orderId}`);
          if (res.data.success) {
            setOrder(res.data.data);
          }
        } catch {}
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
        ধন্যবাদ! আপনার অর্ডারটি নিশ্চিত হয়েছে।
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        আমাদের ডেলিভারি টিম দ্রুততম সময়ে আপনার ঠিকানায় পণ্য পৌঁছে দেবে।
      </p>

      {orderId && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm text-left mb-8">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-slate-800">
            <div>
              <p className="text-xs text-gray-400">অর্ডার নম্বর (Tracking ID)</p>
              <p className="text-lg font-black text-orange-600">#{orderId}</p>
            </div>
            <Link
              to={`/track-order?orderId=${orderId}`}
              className="px-4 py-2 bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-xl text-xs font-bold hover:bg-orange-100 transition flex items-center gap-1"
            >
              <Truck className="w-3.5 h-3.5" /> ট্র্যাক করুন
            </Link>
          </div>

          {order && (
            <div className="pt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>গ্রাহক:</strong> {order.customerInfo.name}</p>
              <p><strong>মোবাইল:</strong> {order.customerInfo.phone}</p>
              <p><strong>ঠিকানা:</strong> {order.customerInfo.address}</p>
              <p><strong>পেমেন্ট মেথড:</strong> {order.paymentMethod.toUpperCase()} ({order.paymentStatus})</p>
              <p className="text-base font-extrabold text-slate-900 dark:text-white pt-2">
                মোট পরিশোধযোগ্য বিল: <span className="text-emerald-600">৳{order.totalAmount}</span>
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm rounded-2xl shadow-lg hover:scale-105 transition"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    </div>
  );
};
