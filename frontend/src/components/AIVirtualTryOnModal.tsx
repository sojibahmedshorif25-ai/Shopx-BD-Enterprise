import React, { useState, useRef } from 'react';
import { X, Camera, Glasses, Sparkles, Move, ZoomIn, ZoomOut, RotateCw, RefreshCw, ShoppingCart, Check, Upload } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCartStore } from '../store/useCartStore';

interface AIVirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productImage?: string;
  productPrice?: number;
}

const SAMPLE_ACCESSORIES = [
  {
    id: 'rayban-aviator',
    name: 'Ray-Ban Aviator Classic Gold',
    type: 'glasses',
    price: 18500,
    icon: '🕶️',
    previewUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&auto=format&fit=crop&q=80',
    svgType: 'sunglasses'
  },
  {
    id: 'bose-qc-ultra',
    name: 'Bose QuietComfort Ultra Headphones',
    type: 'headphone',
    price: 38500,
    icon: '🎧',
    previewUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
    svgType: 'headphones'
  },
  {
    id: 'rolex-submariner',
    name: 'Luxury Sapphire Chronograph Watch',
    type: 'watch',
    price: 24500,
    icon: '⌚',
    previewUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80',
    svgType: 'watch'
  },
  {
    id: 'urban-beanie',
    name: 'Urban Cyberpunk Snapback Cap',
    type: 'cap',
    price: 1450,
    icon: '🧢',
    previewUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&auto=format&fit=crop&q=80',
    svgType: 'cap'
  }
];

export const AIVirtualTryOnModal: React.FC<AIVirtualTryOnModalProps> = ({
  isOpen,
  onClose,
  productName,
  productPrice
}) => {
  const { lang } = useLanguageStore();
  const { addItem } = useCartStore();

  const [selectedItem, setSelectedItem] = useState(SAMPLE_ACCESSORIES[0]);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [userImage, setUserImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      alert(lang === 'bn' ? 'ক্যামেরা অনুমতি পাওয়া যায়নি। ছবি আপলোড করুন।' : 'Camera access denied or unavailable. Please upload a photo instead.');
    }
  };

  const handleStopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
        handleStopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAddToCart = () => {
    addItem({
      _id: selectedItem.id,
      title: selectedItem.name,
      slug: selectedItem.id,
      description: selectedItem.name,
      shortDescription: selectedItem.name,
      price: selectedItem.price,
      images: [selectedItem.previewUrl],
      thumbnail: selectedItem.previewUrl,
      category: 'accessories',
      categorySlug: 'fashion-lifestyle',
      stock: 15,
      sku: 'TRYON-' + selectedItem.id,
      rating: 5,
      numReviews: 12
    } as any, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleClose = () => {
    handleStopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Interactive AR Canvas */}
        <div 
          className="flex-1 bg-slate-950 relative min-h-[320px] md:min-h-[500px] flex items-center justify-center overflow-hidden select-none border-b md:border-b-0 md:border-r border-slate-800"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Video or Uploaded Image or Default Model */}
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover -scale-x-100"
            />
          ) : userImage ? (
            <img
              src={userImage}
              alt="User Try-on"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-6">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                alt="Demo Model Face"
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-slate-800 shadow-2xl opacity-80"
              />
              <div className="mt-3 text-center">
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'এআই ভার্চুয়াল ট্রাই-অন প্রজেকশন' : 'AI Virtual Try-On AR Studio'}</span>
                </span>
                <p className="text-slate-400 text-xs mt-1">
                  {lang === 'bn' ? 'আপনার সেলফি আপলোড করুন বা লাইভ ক্যামেরা অন করুন' : 'Upload your selfie or enable camera for instant AR preview'}
                </p>
              </div>
            </div>
          )}

          {/* Draggable AR Accessory Overlay */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            className="absolute z-10 transition-transform duration-75 select-none"
          >
            {selectedItem.svgType === 'sunglasses' && (
              <div className="relative group filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-10 bg-gradient-to-tr from-amber-600/80 via-slate-900/90 to-purple-600/80 border-2 border-amber-400 rounded-full shadow-inner" />
                  <div className="w-6 h-1 bg-amber-400 rounded-full" />
                  <div className="w-20 h-10 bg-gradient-to-tr from-purple-600/80 via-slate-900/90 to-amber-600/80 border-2 border-amber-400 rounded-full shadow-inner" />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] bg-black/80 px-1.5 py-0.5 rounded text-amber-400 border border-amber-400/40">
                  Ray-Ban 3D
                </div>
              </div>
            )}

            {selectedItem.svgType === 'headphones' && (
              <div className="relative group filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]">
                <div className="w-48 h-36 border-t-[8px] border-slate-700 rounded-t-full flex justify-between items-end p-1">
                  <div className="w-12 h-20 bg-gradient-to-b from-slate-700 to-slate-950 border-2 border-purple-400 rounded-2xl shadow-xl" />
                  <div className="w-12 h-20 bg-gradient-to-b from-slate-700 to-slate-950 border-2 border-purple-400 rounded-2xl shadow-xl" />
                </div>
              </div>
            )}

            {selectedItem.svgType === 'watch' && (
              <div className="relative group filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 border-4 border-amber-400 shadow-2xl flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-amber-400/50 flex items-center justify-center text-amber-300 font-bold text-xs">
                    ShopX
                  </div>
                </div>
              </div>
            )}

            {selectedItem.svgType === 'cap' && (
              <div className="relative group filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]">
                <div className="w-40 h-20 bg-gradient-to-t from-slate-800 to-purple-800 rounded-t-full border-t-2 border-purple-400 flex items-center justify-center text-xs font-bold text-purple-200">
                  SHOPX 2026
                </div>
                <div className="w-48 h-4 bg-slate-900 rounded-full -mt-1 border border-slate-700 shadow-lg" />
              </div>
            )}
          </div>

          {/* AR Controls Floating Bar */}
          <div className="absolute bottom-4 inset-x-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-300 shadow-xl">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Scale Down"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] w-10 text-center">{Math.round(scale * 100)}%</span>
              <button
                onClick={() => setScale(s => Math.min(2.5, s + 0.1))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Scale Up"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setRotation(r => (r - 10) % 360)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Rotate Left"
              >
                <RotateCw className="w-4 h-4 -scale-x-100" />
              </button>
              <button
                onClick={() => setRotation(r => (r + 10) % 360)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Rotate Right"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setScale(1);
                  setRotation(0);
                  setPosition({ x: 0, y: 0 });
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Reset Position"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="hidden sm:flex items-center space-x-1 text-slate-400 text-[11px]">
              <Move className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ড্র্যাগ করে সরান' : 'Drag to adjust'}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Options & Actions */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-slate-900 space-y-6">
          <div>
            {/* Header Title */}
            <div className="flex items-center space-x-2 text-purple-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">AI AR Fitting Studio</span>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">
              {lang === 'bn' ? 'ভার্চুয়াল এআই ট্রাই-অন' : 'Virtual AI AR Try-On'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'bn' ? 'ক্যামেরা বা ফটো দিয়ে নিজের উপর প্রিভিউ দেখুন' : 'Live augmented reality fitting room with smart head tracking.'}
            </p>

            {/* Photo / Camera Selectors */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={cameraActive ? handleStopCamera : handleStartCamera}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${
                  cameraActive 
                    ? 'bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30' 
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{cameraActive ? (lang === 'bn' ? 'ক্যামেরা বন্ধ' : 'Stop Cam') : (lang === 'bn' ? 'লাইভ ক্যামেরা' : 'Live Camera')}</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
              >
                <Upload className="w-4 h-4" />
                <span>{lang === 'bn' ? 'ছবি আপলোড' : 'Upload Photo'}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Accessory Selector List */}
            <div className="mt-5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                {lang === 'bn' ? 'আইটেম বেছে নিন' : 'Select Product to Try'}
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {SAMPLE_ACCESSORIES.map(acc => (
                  <button
                    key={acc.id}
                    onClick={() => {
                      setSelectedItem(acc);
                      setPosition({ x: 0, y: 0 });
                      setScale(1);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                      selectedItem.id === acc.id
                        ? 'bg-purple-500/20 border-purple-500 text-white shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xl">{acc.icon}</span>
                      <div className="truncate">
                        <p className="text-xs font-bold truncate max-w-[150px]">{acc.name}</p>
                        <p className="text-[11px] text-purple-400 font-mono">৳{acc.price.toLocaleString()}</p>
                      </div>
                    </div>
                    {selectedItem.id === acc.id && (
                      <Check className="w-4 h-4 text-purple-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Buy Button */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400">{lang === 'bn' ? 'মূল্য:' : 'Price:'}</span>
              <span className="text-lg font-black text-purple-400 font-mono">৳{selectedItem.price.toLocaleString()}</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center space-x-2 transition transform active:scale-95"
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5 text-emerald-300" />
                  <span>{lang === 'bn' ? 'ব্যাগে যোগ হয়েছে!' : 'Added to Bag!'}</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>{lang === 'bn' ? 'এখনই কার্ট-এ যোগ করুন' : 'Add Tried Item to Cart'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
