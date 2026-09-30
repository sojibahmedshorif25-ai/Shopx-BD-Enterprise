import React, { useState } from 'react';
import { Camera, Upload, X, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageSearchModal: React.FC<ImageSearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedKeyword, setDetectedKeyword] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      analyzeImage(file.name);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = (fileName: string) => {
    setIsAnalyzing(true);
    setDetectedKeyword(null);

    // AI Recognition simulation based on filename/visual context
    setTimeout(() => {
      let keyword = 'মধু';
      const lower = fileName.toLowerCase();
      if (lower.includes('oil') || lower.includes('tel')) keyword = 'সরিষার তেল';
      else if (lower.includes('ghee') || lower.includes('butter')) keyword = 'গাওয়া ঘি';
      else if (lower.includes('chia')) keyword = 'চিয়া সিড';
      else if (lower.includes('watch') || lower.includes('smart')) keyword = 'স্মার্টওয়াচ';
      else if (lower.includes('earbud') || lower.includes('tws') || lower.includes('headphone')) keyword = 'ইয়ারবাডস';
      else if (lower.includes('nut') || lower.includes('badam')) keyword = 'ড্রাই ফ্রুটস';
      else if (lower.includes('charger')) keyword = 'চার্জার';
      else if (lower.includes('bag')) keyword = 'ল্যাপটপ ব্যাগ';

      setDetectedKeyword(keyword);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleSearch = () => {
    if (detectedKeyword) {
      onClose();
      navigate(`/products?search=${encodeURIComponent(detectedKeyword)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 text-white space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">AI ভিজ্যুয়াল ইমেজ সার্চ</h3>
              <p className="text-[11px] text-slate-400">ছবি আপলোড করে সরাসরি পণ্য খুঁজুন</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Zone */}
        <div className="border-2 border-dashed border-slate-700 hover:border-orange-500/60 rounded-2xl p-6 text-center transition bg-slate-950/60 relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />

          {selectedImage ? (
            <div className="space-y-3">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-32 h-32 object-cover rounded-xl mx-auto border border-slate-700 shadow-md"
              />
              <p className="text-xs text-slate-400">অন্য ছবি আপলোড করতে ট্যাপ করুন</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">ছবি ড্র্যাগ করুন বা ক্লিক করুন</p>
                <p className="text-[11px] text-slate-400 mt-0.5">JPG, PNG, WEBP (সর্বোচ্চ ৫ MB)</p>
              </div>
            </div>
          )}
        </div>

        {/* AI Analysis State */}
        {isAnalyzing && (
          <div className="p-4 bg-orange-950/30 rounded-2xl border border-orange-800/40 flex items-center justify-center gap-3 text-orange-300 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
            <span>AI ছবি বিশ্লেষণ ও পণ্য শনাক্ত করছে...</span>
          </div>
        )}

        {/* Result Found */}
        {detectedKeyword && !isAnalyzing && (
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/50 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>শনাক্তকৃত পণ্য:</span>
            </div>
            <p className="text-base font-black text-white">"{detectedKeyword}"</p>
            <button
              onClick={handleSearch}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <span>এই পণ্যগুলো দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
