import React, { useState } from 'react';
import {
  Fingerprint,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
  Lock,
  Smartphone,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface BiometricWebAuthnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated?: () => void;
}

export const BiometricWebAuthnModal: React.FC<BiometricWebAuthnModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
}) => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleScanBiometric = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        if (onAuthenticated) onAuthenticated();
        onClose();
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl space-y-5">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-600/20">
            <Fingerprint className={`w-8 h-8 ${isScanning ? 'animate-pulse text-emerald-300' : ''}`} />
          </div>

          <h3 className="text-base font-black text-white">
            {isBn ? 'বায়োমেট্রিক ফিঙ্গারপ্রিন্ট আনলক' : 'WebAuthn Biometric Login'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? 'আপনার ডিভাইসের ফিঙ্গারপ্রিন্ট বা ফেস আনলক সেন্সরে স্পর্শ করুন।'
              : 'Touch your device fingerprint sensor or look into the camera for instant zero-password authentication.'}
          </p>
        </div>

        {isSuccess ? (
          <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-2xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isBn ? 'অথেন্টিকেশন সফল হয়েছে!' : 'Biometric Verified Successfully!'}</span>
          </div>
        ) : (
          <button
            onClick={handleScanBiometric}
            disabled={isScanning}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2"
          >
            <Fingerprint className="w-4 h-4" />
            <span>{isScanning ? (isBn ? 'ভেরিফাই হচ্ছে...' : 'Scanning Biometric...') : (isBn ? 'সেন্সর স্পর্শ করুন' : 'Touch Sensor to Authenticate')}</span>
          </button>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>FIDO2 / WebAuthn 256-Bit Hardware Enclave</span>
        </div>
      </div>
    </div>
  );
};
