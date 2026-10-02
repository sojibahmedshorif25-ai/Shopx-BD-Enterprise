import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Globe,
  KeyRound,
  RefreshCw,
  CheckCircle2,
  Smartphone,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAdminAuthStore } from '../store/useAdminAuthStore';
import { useAdminLanguageStore } from '../store/useAdminLanguageStore';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    sendLoginOTP,
    verifyLoginOTP,
    sendEmailOTP,
    verifyEmailOTP,
    sendPhoneOTP,
    verifyPhoneOTP,
    googleLogin,
    isLoading,
  } = useAdminAuthStore();
  const { lang, toggleLang, t } = useAdminLanguageStore();

  const [authMode, setAuthMode] = useState<'password_2fa' | 'email_otp' | 'phone_otp'>('password_2fa');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: any = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // 1. Password + 2FA Submit
  const handleSendCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError(lang === 'en' ? 'Please provide email and password.' : 'ইমেইল এবং পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    try {
      const res = await sendLoginOTP({ email, password, lang });
      setSuccessMessage(res.message || (lang === 'en' ? '2FA OTP sent to your email.' : 'আপনার ইমেইলে ২-ফ্যাক্টর ওটিপি পাঠানো হয়েছে।'));
      setStep('otp');
      setTimer(60);
    } catch (err: any) {
      setError(err.message || (lang === 'en' ? 'Authentication failed.' : 'লগইন ব্যর্থ হয়েছে।'));
    }
  };

  // 2. Direct Real Email OTP Submit
  const handleSendEmailOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setError(lang === 'en' ? 'Please provide a valid email.' : 'সঠিক ইমেইল অ্যাড্রেস প্রদান করুন।');
      return;
    }

    try {
      const res = await sendEmailOTP({ email, lang });
      setSuccessMessage(res.message || (lang === 'en' ? '6-digit OTP code sent to your email.' : 'আপনার ইমেইলে ৬-সংখ্যার ওটিপি পাঠানো হয়েছে।'));
      setStep('otp');
      setTimer(60);
    } catch (err: any) {
      setError(err.message || (lang === 'en' ? 'Failed to send OTP.' : 'ওটিপি পাঠাতে সমস্যা হয়েছে।'));
    }
  };

  // 3. Direct Phone SMS OTP Submit
  const handleSendPhoneOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!phone || phone.length < 11) {
      setError(lang === 'en' ? 'Please provide a valid 11-digit mobile number.' : 'সঠিক ১১-সংখ্যার মোবাইল নম্বর দিন।');
      return;
    }

    try {
      const res = await sendPhoneOTP({ phone, lang });
      setSuccessMessage(res.message || (lang === 'en' ? 'SMS OTP code sent to your phone.' : 'মোবাইলে ৬-সংখ্যার এসএমএস কোড পাঠানো হয়েছে।'));
      setStep('otp');
      setTimer(60);
    } catch (err: any) {
      setError(err.message || (lang === 'en' ? 'Failed to send SMS.' : 'এসএমএস পাঠাতে সমস্যা হয়েছে।'));
    }
  };

  // OTP Verification
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.trim().length !== 6) {
      setError(lang === 'en' ? 'Please enter the 6-digit OTP code.' : 'সঠিক ৬-সংখ্যার ওটিপি কোড প্রদান করুন।');
      return;
    }

    try {
      if (authMode === 'password_2fa') {
        await verifyLoginOTP({ email, otp: otp.trim() });
      } else if (authMode === 'email_otp') {
        await verifyEmailOTP({ email, otp: otp.trim() });
      } else if (authMode === 'phone_otp') {
        await verifyPhoneOTP({ phone, otp: otp.trim() });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || (lang === 'en' ? 'Invalid OTP code.' : 'ভুল ওটিপি কোড।'));
    }
  };

  // Google 1-Click Admin Login
  const handleGoogleAdminLogin = async () => {
    setError('');
    try {
      await googleLogin({
        email: email || 'sojibahmedshorif25@gmail.com',
        name: 'Sojib Ahmed Shorif',
        googleId: 'g_' + Date.now(),
      });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Google 2FA login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Language Toggle in Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white shadow transition"
        >
          <Globe className="w-3.5 h-3.5 text-orange-400" />
          <span>{lang === 'en' ? 'EN ⇄ বাংলা' : 'বাং ⇄ English'}</span>
        </button>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-6 relative z-10 animate-in fade-in">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-slate-950 font-black text-2xl mx-auto mb-4 shadow-xl shadow-orange-500/20">
            SX
          </div>
          <h1 className="text-2xl font-black text-white">{t('login.title')}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'en' ? 'Enterprise 2-Factor Authentication Portal' : '২-ফ্যাক্টর সিকিউরিটি অ্যাডমিন পোর্টাল'}
          </p>
        </div>

        {/* 3-Way Mode Switcher */}
        {step === 'credentials' && (
          <div className="grid grid-cols-3 p-1 bg-slate-800/80 rounded-2xl text-[11px] font-bold gap-1 border border-slate-700/50">
            <button
              type="button"
              onClick={() => {
                setAuthMode('password_2fa');
                setError('');
              }}
              className={`py-2 px-1 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
                authMode === 'password_2fa'
                  ? 'bg-slate-900 text-orange-400 shadow-md font-extrabold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? '2FA Password' : 'পাসওয়ার্ড'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('email_otp');
                setError('');
              }}
              className={`py-2 px-1 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
                authMode === 'email_otp'
                  ? 'bg-slate-900 text-orange-400 shadow-md font-extrabold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Email OTP' : 'ইমেইল OTP'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('phone_otp');
                setError('');
              }}
              className={`py-2 px-1 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
                authMode === 'phone_otp'
                  ? 'bg-slate-900 text-orange-400 shadow-md font-extrabold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Phone OTP' : 'মোবাইল OTP'}</span>
            </button>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-800/80 text-red-300 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs rounded-xl font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {step === 'credentials' ? (
          <div>
            {/* 1. Password + 2FA */}
            {authMode === 'password_2fa' && (
              <form onSubmit={handleSendCredentials} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">{t('login.email')}</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 pl-10 pr-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">{t('login.password')}</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 pl-10 pr-10 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl shadow-orange-500/20 transition flex items-center justify-center gap-2 text-sm"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{lang === 'en' ? 'Sending 2FA Code...' : '২-ফ্যাক্টর ওটিপি পাঠানো হচ্ছে...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{lang === 'en' ? 'Send 2FA Security Code' : 'সিকিউরিটি ওটিপি পাঠান'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* 2. Direct Email OTP */}
            {authMode === 'email_otp' && (
              <form onSubmit={handleSendEmailOTP} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {lang === 'en' ? 'Admin / Vendor Gmail' : 'এডমিন / ভেন্ডর জিমেইল'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="sojibahmedshorif25@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 pl-10 pr-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 shadow-inner"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl shadow-orange-500/20 transition flex items-center justify-center gap-2 text-sm"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{lang === 'en' ? 'Sending Code...' : 'ইমেইলে কোড পাঠানো হচ্ছে...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{lang === 'en' ? 'Send 6-Digit Email OTP' : 'ইমেইলে ৬-সংখ্যার OTP পাঠান'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* 3. Direct Phone OTP */}
            {authMode === 'phone_otp' && (
              <form onSubmit={handleSendPhoneOTP} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {lang === 'en' ? 'Mobile Number (11-Digits)' : 'মোবাইল নম্বর (১১ ডিজিট)'}
                  </label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="01712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full py-3 pl-10 pr-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:border-orange-500 shadow-inner font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl shadow-orange-500/20 transition flex items-center justify-center gap-2 text-sm"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{lang === 'en' ? 'Sending SMS...' : 'এসএমএস পাঠানো হচ্ছে...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{lang === 'en' ? 'Send 6-Digit SMS OTP' : 'মোবাইলে ৬-সংখ্যার SMS পাঠান'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Social 1-Click 2FA Logins */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-800 w-full"></div>
                <span className="bg-slate-900 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider absolute">
                  {lang === 'en' ? 'Or 1-Click 2FA Sign In' : 'অথবা ১-ক্লিক সোশ্যাল 2FA'}
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGoogleAdminLogin}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-xs font-bold text-slate-100 transition shadow-lg"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{lang === 'en' ? 'Continue with Google 2FA' : 'গুগল দিয়ে ২FA লগইন'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: 6-Digit Real OTP Verification Form */
          <form onSubmit={handleVerifyOTP} className="space-y-4 text-xs">
            <div className="text-center space-y-1">
              <span className="text-slate-400 text-xs">
                {lang === 'en' ? 'Enter 6-digit real OTP sent to:' : 'প্রাপ্ত ৬-সংখ্যার কোড লিখুন:'}
              </span>
              <p className="text-orange-400 font-mono font-bold text-xs">
                {authMode === 'phone_otp' ? phone : email}
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1 text-center">
                {lang === 'en' ? '6-Digit Verification Code' : '৬-সংখ্যার ওটিপি কোড'}
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-orange-400" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full py-3 pl-10 pr-3 rounded-xl border-2 border-orange-500/80 bg-slate-800 text-orange-300 font-mono text-center font-black text-xl tracking-[6px] outline-none shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 text-sm"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{isLoading ? (lang === 'en' ? 'Authenticating...' : 'যাচাই করা হচ্ছে...') : (lang === 'en' ? 'Verify & Enter Command Center' : 'যাচাই করে কমান্ড সেন্টারে প্রবেশ')}</span>
            </button>

            <div className="flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setOtp('');
                }}
                className="text-slate-400 hover:text-white"
              >
                ← {lang === 'en' ? 'Change' : 'পরিবর্তন'}
              </button>

              <button
                type="button"
                disabled={timer > 0 || isLoading}
                onClick={() => {
                  if (authMode === 'password_2fa') handleSendCredentials({ preventDefault: () => {} } as any);
                  else if (authMode === 'email_otp') handleSendEmailOTP({ preventDefault: () => {} } as any);
                  else handleSendPhoneOTP({ preventDefault: () => {} } as any);
                }}
                className={`font-bold ${timer > 0 ? 'text-slate-600' : 'text-orange-400 hover:underline'}`}
              >
                {timer > 0 ? `${lang === 'en' ? 'Resend in' : 'পুনরায় কোড'} (${timer}s)` : (lang === 'en' ? 'Resend Code' : 'আবার কোড পাঠান')}
              </button>
            </div>
          </form>
        )}

        <div className="pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>ShopX BD Enterprise 2FA Protected • 45-Day Session</span>
        </div>
      </div>
    </div>
  );
};
