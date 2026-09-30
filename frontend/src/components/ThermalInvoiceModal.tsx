import React, { useState, useRef } from 'react';
import {
  X,
  Printer,
  FileText,
  Receipt,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Truck,
  Phone,
  Building2,
  MapPin,
  Barcode,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';

interface ThermalInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    orderNumber?: string;
    orderId?: string;
    createdAt?: string;
    customerInfo?: {
      name: string;
      phone: string;
      address: string;
      district?: string;
      thana?: string;
    };
    items?: Array<{
      product?: {
        title: string;
        banglaTitle?: string;
        price: number;
        sku?: string;
      };
      title?: string;
      quantity: number;
      price: number;
      variant?: string;
    }>;
    subTotal?: number;
    deliveryFee?: number;
    discount?: number;
    totalAmount?: number;
    paymentMethod?: string;
    paymentStatus?: string;
    consignmentId?: string;
    courier?: string;
  };
}

export const ThermalInvoiceModal: React.FC<ThermalInvoiceModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();
  const [invoiceFormat, setInvoiceFormat] = useState<'thermal' | 'a4'>('thermal');
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const orderNum = order.orderNumber || order.orderId || 'SX-889894';
  const rawItems = order.items || [];
  const items = rawItems.map((it: any) => ({
    title: it.product?.title || it.title || 'Official Product',
    quantity: it.quantity || 1,
    price: it.product?.price || it.price || 1250,
    sku: it.product?.sku || 'SX-SKU-01',
  }));

  const subTotal = order.subTotal || items.reduce((acc: number, it: any) => acc + it.price * it.quantity, 0);
  const deliveryFee = order.deliveryFee ?? 60;
  const discount = order.discount || 0;
  const total = order.totalAmount || subTotal + deliveryFee - discount;
  const courierName = order.courier || 'Steadfast Express Logistics';
  const consignmentId = order.consignmentId || `CN-${orderNum.replace(/\D/g, '') || '948271'}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto custom-scrollbar flex flex-col print:border-none print:shadow-none print:max-w-none print:w-full print:p-0 print:m-0 print:bg-white print:text-black">
        
        {/* Top Format Selector & Action Controls (Hidden on Print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 print:hidden">
          {/* Toggle between POS Thermal & Official A4 Tax Invoice */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setInvoiceFormat('thermal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                invoiceFormat === 'thermal'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'POS থার্মাল স্লিপ (80mm)' : '80mm POS Thermal'}</span>
            </button>
            <button
              type="button"
              onClick={() => setInvoiceFormat('a4')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                invoiceFormat === 'a4'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'অফিশিয়াল A4 ট্যাক্স ইনভয়েস' : 'Official A4 Tax Invoice'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl flex items-center space-x-1.5 shadow-md transition active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'bn' ? 'প্রিন্ট / সেভ PDF' : 'Print / Export PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: 80mm POS THERMAL RECEIPT SLIP */}
        {/* ========================================================================= */}
        {invoiceFormat === 'thermal' ? (
          <div
            ref={printRef}
            className="my-4 mx-auto w-full max-w-sm bg-white text-slate-950 p-6 rounded-2xl font-mono text-xs shadow-inner space-y-4 border border-slate-300 print:border-none print:shadow-none print:max-w-none print:w-full print:m-0 print:p-4"
          >
            {/* Store Header */}
            <div className="text-center space-y-1 pb-3 border-b-2 border-dashed border-slate-400">
              <h2 className="text-lg font-black tracking-tight uppercase">SHOPX BANGLADESH</h2>
              <p className="text-[10px] text-slate-600">Enterprise Multi-Vendor Supermall</p>
              <p className="text-[10px] text-slate-600">{lang === 'bn' ? 'হেড অফিস: রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ' : 'Head Office: Rowmari, Kurigram, Rangpur, Bangladesh'}</p>
              <p className="text-[10px] text-slate-600">Hotline: 01942-791004 | support@shopxbd.com</p>
              <p className="text-[9px] text-slate-500">BIN/VAT: 004918294-0101 | BSTI Reg: 9284-SX</p>
            </div>

            {/* Courier Dispatch Barcode / Sticker */}
            <div className="bg-slate-50 border border-dashed border-slate-300 p-2.5 rounded-xl text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-700 uppercase">
                COURIER DISPATCH STICKER ({order.customerInfo?.district || 'Dhaka'})
              </span>
              <div className="font-mono text-base font-black tracking-widest text-slate-900">
                *{consignmentId}*
              </div>
              <p className="text-[9px] text-slate-500">
                Partner: {courierName} | Fast 24-48h Delivery
              </p>
            </div>

            {/* Meta Details */}
            <div className="text-[11px] space-y-1 border-b border-dashed border-slate-300 pb-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-bold">{orderNum}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span>{new Date(order.createdAt || Date.now()).toLocaleDateString('en-GB')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-bold uppercase text-emerald-800">
                  {order.paymentMethod || 'Cash on Delivery (COD)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-slate-800">{order.paymentStatus || 'Pending on Delivery'}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="text-[11px] space-y-1 border-b border-dashed border-slate-300 pb-2.5">
              <p className="font-bold text-slate-900">{order.customerInfo?.name || 'Customer'}</p>
              <p className="text-slate-700">Phone: {order.customerInfo?.phone || '017XXXXXXXX'}</p>
              <p className="text-slate-700">
                Address: {order.customerInfo?.address || 'Delivery Address'}, {order.customerInfo?.thana ? `${order.customerInfo.thana}, ` : ''}{order.customerInfo?.district || 'Dhaka'}
              </p>
            </div>

            {/* Itemized Table */}
            <div className="space-y-1.5 border-b border-dashed border-slate-300 pb-2.5">
              <div className="flex justify-between font-bold text-[10px] text-slate-500 border-b pb-1">
                <span>ITEM & QTY</span>
                <span>AMOUNT</span>
              </div>
              {items.map((it: any, i: number) => (
                <div key={i} className="flex justify-between items-start text-[11px] gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{it.title}</p>
                    <p className="text-[10px] text-slate-500">
                      {it.quantity} × {formatPrice(it.price)}
                    </p>
                  </div>
                  <span className="font-bold">{formatPrice(it.price * it.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="text-[11px] space-y-1 border-b-2 border-dashed border-slate-400 pb-2.5">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>{formatPrice(subTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee:</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-rose-700 font-bold">
                  <span>Voucher Discount:</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black pt-1 border-t border-slate-200">
                <span>TOTAL PAYABLE:</span>
                <span className="font-mono text-emerald-800">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Footer QR Code & Verification Note */}
            <div className="text-center space-y-1 pt-1">
              <p className="text-[10px] font-bold text-slate-800">
                THANK YOU FOR SHOPPING WITH SHOPX BD!
              </p>
              <p className="text-[9px] text-slate-500">
                14-Day Doorstep Return & Official Warranty Guaranteed
              </p>
              <div className="pt-2 flex justify-center">
                <div className="p-1.5 bg-slate-100 rounded-lg border border-slate-300 inline-block">
                  <QrCode className="w-12 h-12 text-slate-800" />
                </div>
              </div>
              <p className="text-[8px] text-slate-400 font-mono">Scan to Track Live Delivery</p>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: OFFICIAL A4 TAX INVOICE & COURIER MANIFEST */
          /* ========================================================================= */
          <div
            ref={printRef}
            className="my-4 mx-auto w-full bg-white text-slate-900 p-8 rounded-2xl text-xs shadow-inner space-y-6 border border-slate-300 print:border-none print:shadow-none print:p-4 print:m-0"
          >
            {/* Official Tax Invoice Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-900 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-black text-base flex items-center justify-center">
                    SX
                  </div>
                  <h2 className="text-xl font-black tracking-tight text-slate-950">
                    SHOPX BANGLADESH LIMITED
                  </h2>
                </div>
                <p className="text-[11px] text-slate-600">
                  Head Office: Rowmari, Kurigram, Rangpur, Bangladesh
                </p>
                <p className="text-[11px] text-slate-600">
                  Hotline: +880 1942-791004 | Support: sojibahmedshorif25@gmail.com
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  Govt BIN/TIN: 004918294-0101 | Trade License: TRAD/RK/049182/2026
                </p>
              </div>

              <div className="text-right space-y-1 sm:self-center">
                <span className="inline-block bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  OFFICIAL TAX INVOICE
                </span>
                <p className="font-mono font-black text-sm text-slate-900">#{orderNum}</p>
                <p className="text-[11px] text-slate-500">
                  Invoice Date: {new Date(order.createdAt || Date.now()).toLocaleDateString('en-GB')}
                </p>
              </div>
            </div>

            {/* Bill To & Dispatch Route Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                  CUSTOMER BILL TO:
                </h4>
                <p className="font-bold text-slate-900 text-sm">{order.customerInfo?.name || 'Customer'}</p>
                <p className="text-slate-600">Phone: {order.customerInfo?.phone || '017XXXXXXXX'}</p>
                <p className="text-slate-600">
                  Address: {order.customerInfo?.address || 'N/A'}, {order.customerInfo?.thana ? `${order.customerInfo.thana}, ` : ''}{order.customerInfo?.district || 'Dhaka'}
                </p>
              </div>

              <div className="space-y-1 sm:border-l sm:pl-4 border-slate-200">
                <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                  SHIPPING & LOGISTICS:
                </h4>
                <p className="text-slate-700">
                  Courier: <strong>{courierName}</strong>
                </p>
                <p className="text-slate-700">
                  Consignment ID: <strong className="font-mono text-emerald-700">{consignmentId}</strong>
                </p>
                <p className="text-slate-700">
                  Payment Method: <strong>{order.paymentMethod || 'Cash on Delivery (COD)'}</strong>
                </p>
                <p className="text-slate-700">
                  District Zone: <strong>{order.customerInfo?.district || 'Dhaka Hub (24 Hours)'}</strong>
                </p>
              </div>
            </div>

            {/* Product Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Item Description & SKU</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {items.map((it: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-3">
                        <p className="font-bold text-slate-900">{it.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono">SKU: {it.sku}</p>
                      </td>
                      <td className="p-3 text-center font-bold">{it.quantity}</td>
                      <td className="p-3 text-right font-mono">{formatPrice(it.price)}</td>
                      <td className="p-3 text-right font-bold font-mono">{formatPrice(it.price * it.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations & Signature Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end pt-2">
              <div className="space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Genuine Certified Goods Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  This document serves as an official tax and delivery confirmation receipt under the National Digital Commerce Policy of Bangladesh.
                </p>
                <div className="pt-6 border-t border-slate-300 max-w-[180px] text-center">
                  <p className="text-[10px] font-bold text-slate-700">Authorized Officer Signature</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Amount:</span>
                  <span className="font-mono">{formatPrice(subTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>64-District Courier Shipping:</span>
                  <span className="font-mono">{formatPrice(deliveryFee)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-rose-700 font-bold">
                    <span>Promotional Voucher Discount:</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total Amount Due:</span>
                  <span className="font-mono text-emerald-800">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
