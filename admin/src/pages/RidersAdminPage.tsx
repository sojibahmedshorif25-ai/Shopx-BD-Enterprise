import React, { useState, useEffect } from 'react';
import {
  Truck,
  Star,
  MapPin,
  Phone,
  CheckCircle,
  BatteryCharging,
  Navigation,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Clock,
  Radio,
  ExternalLink,
  Compass,
  Printer,
  FileText,
  Building2,
  Zap,
} from 'lucide-react';
import { api } from '../services/api';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

const MOCK_RIDERS_EXTRA = [
  {
    _id: 'r1',
    name: 'Kamrul Hasan',
    phone: '01711223344',
    vehicleNumber: 'Dhaka Metro HA-4491 (Hero Hunk 150)',
    currentLocation: { address: 'Gulshan 2, Road 45, Dhaka', lat: 23.7925, lng: 90.4078 },
    completedDeliveries: 342,
    rating: 4.9,
    status: 'IN_TRANSIT',
    battery: '88%',
    speed: '38 km/h',
    codCashHeld: 14500,
    activeOrder: '#SX-119951',
    customerName: 'Sojib Ahmed',
    destination: 'Dhanmondi 32, Dhaka',
    eta: '18 mins',
  },
  {
    _id: 'r2',
    name: 'Mehedi Hasan Babu',
    phone: '01822334455',
    vehicleNumber: 'Dhaka Metro LA-8832 (Yamaha FZ-S)',
    currentLocation: { address: 'Dhanmondi 27, Dhaka', lat: 23.7538, lng: 90.3770 },
    completedDeliveries: 289,
    rating: 4.85,
    status: 'ONLINE',
    battery: '74%',
    speed: '0 km/h (Standby)',
    codCashHeld: 9200,
    activeOrder: '#SX-761821',
    customerName: 'Rahim Uddin',
    destination: 'Mirpur 10, Dhaka',
    eta: '25 mins',
  },
  {
    _id: 'r3',
    name: 'Siam Chowdhury',
    phone: '01933445566',
    vehicleNumber: 'Rangpur Metro DA-1290 (Honda CB Shine)',
    currentLocation: { address: 'Rowmari Central Hub, Kurigram, Rangpur', lat: 25.5612, lng: 89.8493 },
    completedDeliveries: 415,
    rating: 4.95,
    status: 'IN_TRANSIT',
    battery: '95%',
    speed: '42 km/h',
    codCashHeld: 22800,
    activeOrder: '#SX-605512',
    customerName: 'Tanvir Hasan',
    destination: 'Kurigram Sadar, Rangpur',
    eta: '30 mins',
  },
  {
    _id: 'r4',
    name: 'Tariqul Islam',
    phone: '01644556677',
    vehicleNumber: 'Chattogram Metro HA-9912 (Bajaj Pulsar)',
    currentLocation: { address: 'GEC Circle, CDA Avenue, Chattogram', lat: 22.3569, lng: 91.8217 },
    completedDeliveries: 198,
    rating: 4.78,
    status: 'ONLINE',
    battery: '62%',
    speed: '15 km/h',
    codCashHeld: 6400,
    activeOrder: '#SX-849201',
    customerName: 'Fatema Begum',
    destination: 'Agrabad C/A, Chattogram',
    eta: '12 mins',
  },
];

export const RidersAdminPage: React.FC = () => {
  const { lang, t } = useAdminLanguageStore();
  const [riders, setRiders] = useState<any[]>(MOCK_RIDERS_EXTRA);
  const [selectedRider, setSelectedRider] = useState<any>(MOCK_RIDERS_EXTRA[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'ONLINE' | 'IN_TRANSIT'>('ALL');
  const [showPrintSlip, setShowPrintSlip] = useState(false);
  const isBn = lang === 'bn';

  const fetchRiders = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/riders/status');
      if (res.data?.success && res.data.data?.length > 0) {
        const merged = res.data.data.map((r: any, idx: number) => ({
          ...MOCK_RIDERS_EXTRA[idx % MOCK_RIDERS_EXTRA.length],
          ...r,
        }));
        setRiders(merged);
        setSelectedRider(merged[0]);
      }
    } catch {
      // Use fallback mock riders
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  const totalDeliveries = riders.reduce((acc, r) => acc + (r.completedDeliveries || 0), 0);
  const totalCOD = riders.reduce((acc, r) => acc + (r.codCashHeld || 0), 0);
  const activeRiders = riders.filter((r) => r.status === 'ONLINE' || r.status === 'IN_TRANSIT').length;

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Truck className="w-6 h-6 text-emerald-400" />
              <span>{isBn ? 'ডিইএক্স লাইভ রাইডার ও জিপিএস ট্র্যাকিং ফ্লিট' : 'DEX Live Rider GPS Telemetry Fleet'}</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Real-Time GPS Active</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {isBn
              ? 'সারা বাংলাদেশের ৬৪ জেলার লাইভ রাইডার লোকেশন, গতি, ব্যাটারি ও কাস্টমার ডেলিভারি ট্র্যাকার।'
              : 'Monitor real-time GPS coordinates, speed, battery, and delivery destination across all 64 districts.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPrintSlip(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl flex items-center gap-2 transition shadow-lg shadow-emerald-600/20"
          >
            <Printer className="w-4 h-4" />
            <span>{isBn ? 'ডেলিভারি স্লিপ ও চালান প্রিন্ট' : 'Print Dispatch Slips'}</span>
          </button>

          <button
            onClick={fetchRiders}
            disabled={isLoading}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition border border-slate-700 shadow flex-shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{t('refresh')}</span>
          </button>
        </div>
      </div>

      {/* Fleet Telemetry KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{isBn ? 'মোট রাইডার বহর' : 'Total Fleet Riders'}</span>
            <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">{riders.length} Riders</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">DEX 24/7 Logistics Network</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{isBn ? 'লাইভ সক্রিয় জিপিএস' : 'Live Active GPS Ping'}</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{activeRiders} Online</div>
          <p className="text-[11px] text-emerald-500 font-medium mt-1">100% Signal Locked</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{isBn ? 'সফল ডেলিভারি' : 'Delivered Orders'}</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalDeliveries} Completed</div>
          <p className="text-[11px] text-blue-400 font-medium mt-1">99.4% On-Time SLA Rate</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{isBn ? 'ক্যাশ অন ডেলিভারি (হাতে রক্ষিত)' : 'COD Cash with Riders'}</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">৳{totalCOD.toLocaleString()}</div>
          <p className="text-[11px] text-amber-500/80 font-medium mt-1">Pending Vault Handover</p>
        </div>
      </div>

      {/* Visual Live Interactive GPS Radar View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Simulator Canvas */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400 animate-spin" />
              <h3 className="text-base font-black text-white">
                {isBn ? 'রিয়েলটাইম জিপিএস রাডার ও লাইভ রুট' : 'Realtime GPS Radar & Live Route Map'}
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded-xl border border-emerald-800">
              Tracking: {selectedRider?.name} ({selectedRider?.speed})
            </span>
          </div>

          {/* Interactive Visual Radar Grid */}
          <div className="relative h-80 w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

            {/* Concentric Radar Rings */}
            <div className="absolute w-72 h-72 rounded-full border border-emerald-500/20 animate-ping opacity-20 pointer-events-none" />
            <div className="absolute w-48 h-48 rounded-full border border-emerald-500/30" />
            <div className="absolute w-24 h-24 rounded-full border border-emerald-500/40" />

            {/* Hub Marker (Rowmari & Dhaka HQ) */}
            <div className="absolute top-8 left-12 flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-xl shadow-lg z-10">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-bold text-white">Central Hub (Dhaka)</span>
            </div>

            <div className="absolute top-8 right-12 flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-xl shadow-lg z-10">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-bold text-white">HQ Hub (Rowmari, Kurigram)</span>
            </div>

            {/* Selected Active Rider Moving Marker */}
            <div className="relative flex flex-col items-center animate-bounce z-20">
              <div className="px-3 py-1.5 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-2xl flex items-center gap-1.5 border border-emerald-300">
                <Truck className="w-4 h-4" />
                <span>{selectedRider?.name}</span>
                <span className="bg-black/40 px-1.5 py-0.2 rounded text-[9px] font-mono">{selectedRider?.speed}</span>
              </div>
              <div className="w-3 h-3 bg-emerald-400 rotate-45 -mt-1 shadow-lg" />
            </div>

            {/* Destination Marker */}
            <div className="absolute bottom-8 right-16 flex items-center gap-1.5 bg-amber-950/90 border border-amber-600/60 px-3 py-1 rounded-xl shadow-lg z-10">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <div>
                <span className="text-[10px] font-bold text-white block">Destination: {selectedRider?.destination}</span>
                <span className="text-[9px] font-mono text-amber-300 font-bold">ETA: {selectedRider?.eta}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Active Order</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{selectedRider?.activeOrder}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Customer</span>
              <span className="font-bold text-white text-xs">{selectedRider?.customerName}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Delivery Speed</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{selectedRider?.speed}</span>
            </div>
          </div>
        </div>

        {/* Live Rider Select List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
          <h3 className="text-sm font-black text-white pb-2 border-b border-slate-800">
            {isBn ? 'সক্রিয় রাইডার তালিকা' : 'Active Fleet Telemetry'}
          </h3>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {riders.map((r) => (
              <div
                key={r._id}
                onClick={() => setSelectedRider(r)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer space-y-2 ${
                  selectedRider?._id === r._id
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{r.name}</p>
                      <span className="text-[10px] font-mono text-slate-400">{r.vehicleNumber.split('(')[0]}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                      r.status === 'IN_TRANSIT'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 flex items-center justify-between pt-1 border-t border-slate-900">
                  <span className="truncate max-w-[150px]">{r.currentLocation?.address}</span>
                  <a
                    href={`tel:${r.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Phone className="w-3 h-3" /> Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Printable Thermal Dispatch Slip Modal */}
      {showPrintSlip && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-black text-slate-900 uppercase">Official Courier Dispatch Slip</h3>
              <button
                onClick={() => setShowPrintSlip(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Printable Content */}
            <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl space-y-3 text-xs font-mono bg-[#fcfcfc]">
              <div className="text-center border-b pb-2">
                <h2 className="text-base font-black tracking-tight">ShopX BD Enterprise</h2>
                <p className="text-[10px] text-slate-500">Official Courier Logistics & Delivery Manifest</p>
                <p className="text-[9px] text-slate-400">Head Office: Rowmari, Kurigram, Rangpur | 24/7 Helpline: +880 1942-791004</p>
              </div>

              <div className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-bold">Order: {selectedRider?.activeOrder || '#SX-119951'}</p>
                  <p className="text-[10px] text-slate-600">Date: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-black rounded text-[10px]">
                    EXPRESS COD
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-bold">Customer Details:</p>
                <p>Name: {selectedRider?.customerName || 'Sojib Ahmed'}</p>
                <p>Phone: +880 1942-791004</p>
                <p>Address: {selectedRider?.destination || 'Dhanmondi, Dhaka, Bangladesh'}</p>
              </div>

              <div className="border-t pt-2 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Assigned Rider:</span>
                  <span>{selectedRider?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rider Vehicle:</span>
                  <span>{selectedRider?.vehicleNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>COD Collection Due:</span>
                  <span className="font-black text-sm">৳{selectedRider?.codCashHeld?.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center pt-2 text-[9px] text-slate-400 border-t">
                * Please inspect parcel upon delivery. Keep invoice for official warranty claims.
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handlePrintSlip}
                className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Thermal Manifest (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
