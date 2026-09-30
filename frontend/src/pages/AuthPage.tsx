import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Store,
  Crown,
  Truck,
  ExternalLink,
  KeyRound,
  Building2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/useAuthStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { api } from '../services/api';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';
  const { login, register, googleLogin, isLoading } = useAuthStore();

  // Active Role Portal Tab (Customer, Seller, Super Admin, Rider)
  const [selectedRole, setSelectedRole] = useState<'customer' | 'seller' | 'admin' | 'rider'>('customer');

  // Customer State
  // Customer State
  const [authMode, setAuthMode] = useState<'gmail_otp' | 'phone_otp' | 'email_pass'>('gmail_otp');
  const [isRegister, setIsRegister] = useState(false);
  
  // Gmail OTP State
  const [gmail, setGmail] = useState('');
  const [gmailName, setGmailName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [demoOtpHint, setDemoOtpHint] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Phone SMS OTP State
  const [mobilePhone, setMobilePhone] = useState('');
  const [phoneName, setPhoneName] = useState('');
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneDemoHint, setPhoneDemoHint] = useState('');
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);

  // Email / Password State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Seller Portal Login State
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPassword, setSellerPassword] = useState('');
  const [isSellerLoggingIn, setIsSellerLoggingIn] = useState(false);

  // Super Admin 2FA State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminOtpSent, setAdminOtpSent] = useState(false);
  const [adminOtp, setAdminOtp] = useState('');
  const [adminMaskedEmail, setAdminMaskedEmail] = useState('');
  const [adminCountdown, setAdminCountdown] = useState(0);
  const [isAdminStep1Loading, setIsAdminStep1Loading] = useState(false);
  const [isAdminStep2Loading, setIsAdminStep2Loading] = useState(false);

  // Rider Portal State
  const [riderPhone, setRiderPhone] = useState('');
  const [riderPin, setRiderPin] = useState('');

  // Forgot Password Modal State (Real 6-Digit Email OTP)
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotStep, setForgotStep] = useState<'email' | 'otp_pass'>('email');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');
  const [forgotErr, setForgotErr] = useState('');
  const [forgotCountdown, setForgotCountdown] = useState(0);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  React.useEffect(() => {
    let timer: any = null;
    if (forgotCountdown > 0) {
      timer = setInterval(() => setForgotCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [forgotCountdown]);

  const handleSendForgotOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotErr('');
    setForgotMsg('');
    if (!forgotEmail.trim() || !forgotEmail.includes('@')) {
      setForgotErr(isBn ? 'সঠিক ইমেইল ঠিকানা প্রদান করুন।' : 'Please enter a valid email address.');
      return;
    }

    try {
      setForgotLoading(true);
      const res = await api.post('/auth/forgot-password', {
        email: forgotEmail.trim(),
        lang,
      });
      if (res.data.success) {
        setForgotMsg(res.data.message);
        setForgotStep('otp_pass');
        setForgotCountdown(60);
      }
    } catch (err: any) {
      setForgotErr(err.response?.data?.message || (isBn ? 'ওটিপি পাঠাতে সমস্যা হয়েছে।' : 'Failed to send OTP code.'));
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetForgotPass = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotErr('');
    setForgotMsg('');

    if (forgotOtp.trim().length < 6) {
      setForgotErr(isBn ? '৬-সংখ্যার ওটিপি কোড লিখুন।' : 'Enter 6-digit OTP code.');
      return;
    }

    if (forgotNewPass.length < 6) {
      setForgotErr(isBn ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters.');
      return;
    }

    try {
      setForgotLoading(true);
      const res = await api.post('/auth/reset-password', {
        email: forgotEmail.trim(),
        otp: forgotOtp.trim(),
        newPassword: forgotNewPass,
        lang,
      });

      if (res.data.success) {
        setForgotMsg(res.data.message);
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        setTimeout(() => {
          setShowForgotModal(false);
          setForgotStep('email');
          setForgotOtp('');
          setForgotNewPass('');
          setForgotMsg('');
          setSuccessMsg(res.data.message);
        }, 2000);
      }
    } catch (err: any) {
      setForgotErr(err.response?.data?.message || (isBn ? 'পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে।' : 'Password reset failed.'));
    } finally {
      setForgotLoading(false);
    }
  };

  // 1. Customer: Send Real 6-Digit OTP to Gmail
  const handleSendGmailOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!gmail.trim() || !gmail.includes('@')) {
      setError(isBn ? 'অনুগ্রহ করে সঠিক জিমেইল আইডি দিন (যেমন: yourname@gmail.com)' : 'Please enter a valid Gmail address (e.g. yourname@gmail.com)');
      return;
    }

    try {
      setIsSendingOtp(true);
      const res = await api.post('/auth/send-email-otp', {
        email: gmail.trim(),
        name: gmailName.trim() || undefined,
        lang,
      });

      if (res.data.success) {
        setOtpSent(true);
        setDemoOtpHint(res.data.otp);
        setSuccessMsg(res.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (isBn ? 'ইমেইলে ওটিপি কোড পাঠাতে সমস্যা হয়েছে।' : 'Failed to send OTP code to email.'));
    } finally {
      setIsSendingOtp(false);
    }
  };

  // 2. Customer: Verify Gmail 6-Digit OTP
  const handleVerifyGmailOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.trim().length < 6) {
      setError(isBn ? 'অনুগ্রহ করে ইমেইলে প্রাপ্ত ৬-সংখ্যার ওটিপি কোডটি লিখুন।' : 'Please enter the 6-digit OTP code received in your email.');
      return;
    }

    try {
      setIsVerifyingOtp(true);
      const res = await api.post('/auth/verify-email-otp', {
        email: gmail.trim(),
        otp: otp.trim(),
        name: gmailName.trim() || undefined,
      });

      if (res.data.success) {
        localStorage.setItem('shopx_token', res.data.token);
        useAuthStore.setState({ user: res.data.user, token: res.data.token });
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (isBn ? 'ভুল বা মেয়াদোত্তীর্ণ ওটিপি কোড।' : 'Invalid or expired OTP code.'));
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // 3. Customer: Send Real 6-Digit SMS OTP to Mobile Number
  const handleSendPhoneOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!mobilePhone.trim() || mobilePhone.trim().length < 11) {
      setError(isBn ? 'সঠিক ১১-সংখ্যার বাংলাদেশী মোবাইল নম্বর লিখুন (যেমন: 01712345678)' : 'Please enter a valid 11-digit mobile number (e.g. 01712345678)');
      return;
    }

    try {
      setIsSendingPhoneOtp(true);
      const res = await api.post('/auth/send-otp', {
        phone: mobilePhone.trim(),
        lang,
      });

      if (res.data.success) {
        setPhoneOtpSent(true);
        setPhoneDemoHint(res.data.otp);
        setSuccessMsg(res.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (isBn ? 'মোবাইলে OTP পাঠাতে সমস্যা হয়েছে।' : 'Failed to send OTP code to mobile.'));
    } finally {
      setIsSendingPhoneOtp(false);
    }
  };

  // 4. Customer: Verify Mobile 6-Digit OTP
  const handleVerifyPhoneOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (phoneOtp.trim().length < 6) {
      setError(isBn ? 'অনুগ্রহ করে মোবাইলে প্রাপ্ত ৬-সংখ্যার OTP কোডটি লিখুন।' : 'Please enter the 6-digit OTP code received on your phone.');
      return;
    }

    try {
      setIsVerifyingPhoneOtp(true);
      const res = await api.post('/auth/verify-otp', {
        phone: mobilePhone.trim(),
        otp: phoneOtp.trim(),
        name: phoneName.trim() || undefined,
        lang,
      });

      if (res.data.success) {
        localStorage.setItem('shopx_token', res.data.token);
        useAuthStore.setState({ user: res.data.user, token: res.data.token });
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (isBn ? 'ভুল বা মেয়াদোত্তীর্ণ ওটিপি কোড।' : 'Invalid or expired OTP code.'));
    } finally {
      setIsVerifyingPhoneOtp(false);
    }
  };

  // 5. Customer: Google Login (Enforces Real Gmail 6-Digit OTP Verification)
  const handleGoogleOneClick = async () => {
    setError('');
    setSuccessMsg('');
    setAuthMode('gmail_otp');

    if (!gmail.trim() || !gmail.includes('@')) {
      setError(
        isBn
          ? '🔑 গুগল লগইনের জন্য অনুগ্রহ করে উপরে আপনার আসল জিমেইল অ্যাড্রেস লিখুন। আপনার ইনবক্সে ৬-সংখ্যার রিয়েল ওটিপি (OTP) কোড যাবে।'
          : '🔑 For Google Sign In, please enter your real Gmail address above. A 6-digit verification OTP code will be sent to your inbox.'
      );
      return;
    }

    // Trigger real 6-digit Gmail OTP dispatch
    try {
      setIsSendingOtp(true);
      const res = await api.post('/auth/send-email-otp', {
        email: gmail.trim(),
        name: gmailName.trim() || undefined,
        lang,
      });

      if (res.data.success) {
        setOtpSent(true);
        setDemoOtpHint(res.data.otp);
        setSuccessMsg(
          isBn
            ? `গুগল একাউন্ট যাচাইয়ের জন্য ${gmail} ইনবক্সে ৬-সংখ্যার ওটিপি কোড পাঠানো হয়েছে!`
            : `A 6-digit verification code has been dispatched to ${gmail} for Google authentication!`
        );
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (isBn ? 'জিমেইলে ওটিপি কোড পাঠাতে সমস্যা হয়েছে।' : 'Failed to send OTP to Gmail.'));
    } finally {
      setIsSendingOtp(false);
    }
  };

  // 6. Customer: Facebook Login (Enforces Real Email/Phone OTP Verification)
  const handleFacebookOneClick = async () => {
    setError('');
    setSuccessMsg('');
    setAuthMode('gmail_otp');

    if (!gmail.trim() || !gmail.includes('@')) {
      setError(
        isBn
          ? '🔑 ফেসবুক লগইনের জন্য অনুগ্রহ করে আপনার আসল ফেসবুক রেজিস্টার্ড ইমেইল/জিমেইল অ্যাড্রেস লিখুন। আপনার ইনবক্সে ৬-সংখ্যার রিয়েল ভেরিফিকেশন কোড পাঠানো হবে।'
          : '🔑 For Facebook Sign In, please enter your registered Facebook Email/Gmail above. A 6-digit verification code will be sent to verify your identity.'
      );
      return;
    }

    try {
      setIsSendingOtp(true);
      const res = await api.post('/auth/send-email-otp', {
        email: gmail.trim(),
        name: gmailName.trim() || undefined,
        lang,
      });

      if (res.data.success) {
        setOtpSent(true);
        setDemoOtpHint(res.data.otp);
        setSuccessMsg(
          isBn
            ? `ফেসবুক ভেরিফিকেশনের জন্য ${gmail} ইনবক্সে ৬-সংখ্যার কোড পাঠানো হয়েছে!`
            : `A 6-digit verification code has been dispatched to ${gmail} for Facebook authentication!`
        );
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (isBn ? 'ইমেইলে ওটিপি কোড পাঠাতে সমস্যা হয়েছে।' : 'Failed to send OTP to email.'));
    } finally {
      setIsSendingOtp(false);
    }
  };

  // 7. Customer: Email & Password Submit
  const handleCustomerEmailPassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        await register({ name, email, phone, password });
      } else {
        await login({ email, password });
      }
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      navigate('/');
    } catch (err: any) {
      setError(err.message || (isBn ? 'অথেনটিকেশন ব্যর্থ হয়েছে।' : 'Authentication failed. Please check credentials.'));
    }
  };

  // 8. Seller Login Submit
  const handleSellerLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSellerLoggingIn(true);

    try {
      const res = await api.post('/auth/seller/login', {
        email: sellerEmail.trim(),
        password: sellerPassword,
      });

      if (res.data.success) {
        localStorage.setItem('shopx_token', res.data.token);
        useAuthStore.setState({ user: res.data.user, token: res.data.token });
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        window.location.href = 'http://localhost:5174';
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (isBn ? 'সেলার লগইন ব্যর্থ হয়েছে।' : 'Seller login failed. Invalid credentials.'));
    } finally {
      setIsSellerLoggingIn(false);
    }
  };


  // 5. Super Admin Step 1 (Send 2FA Email OTP)
  const handleAdminStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      setIsAdminStep1Loading(true);
      const res = await api.post('/auth/admin/login-step1', {
        email: adminEmail.trim(),
        password: adminPassword,
        lang,
      });

      if (res.data.success) {
        setAdminOtpSent(true);
        setAdminMaskedEmail(res.data.maskedEmail);
        setAdminCountdown(60);
        setSuccessMsg(res.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (isBn ? 'এডমিন ভেরিফিকেশন ব্যর্থ হয়েছে।' : 'Admin credentials verification failed.'));
    } finally {
      setIsAdminStep1Loading(false);
    }
  };

  // 6. Super Admin Step 2 (Verify 2FA OTP)
  const handleAdminStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsAdminStep2Loading(true);
      const res = await api.post('/auth/admin/login-step2', {
        email: adminEmail.trim(),
        otp: adminOtp.trim(),
      });

      if (res.data.success) {
        localStorage.setItem('shopx_admin_token', res.data.token);
        localStorage.setItem('shopx_admin_user', JSON.stringify(res.data.user));
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        window.location.href = 'http://localhost:5174';
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (isBn ? 'ভুল বা মেয়াদোত্তীর্ণ ওটিপি কোড।' : 'Invalid or expired 2FA OTP code.'));
    } finally {
      setIsAdminStep2Loading(false);
    }
  };

  // 7. Delivery Rider Login
  const handleRiderLogin = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    navigate('/rider-portal');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* 4 Daraz-Style Portal Gateways Card Header */}
      <div className="text-center space-y-2">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
          {isBn ? 'দারাজ আর্কিটেকচার — ৪টি ডেডিকেটেড রোল পোর্টাল' : 'Daraz Multi-Role Architecture — 4 Dedicated Portals'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {isBn ? 'আপনার ভূমিকা (Role) অনুযায়ী প্রবেশ করুন' : 'Select Your Role Portal to Sign In'}
        </h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto">
          {isBn
            ? 'কাস্টমার, সেলার, প্ল্যাটফর্ম এডমিন এবং ডেলিভারি রাইডারদের জন্য সম্পূর্ণ আলাদা ও নিরাপদ লগইন সিস্টেম।'
            : 'Enterprise multi-vendor platform with isolated authentication for Customers, Sellers, Admins & Riders.'}
        </p>
      </div>

      {/* 4 Portals Interactive Switcher Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Customer Portal */}
        <button
          type="button"
          onClick={() => {
            setSelectedRole('customer');
            setError('');
            setSuccessMsg('');
          }}
          className={`p-4 rounded-3xl border-2 text-left transition-all ${
            selectedRole === 'customer'
              ? 'border-emerald-600 bg-emerald-50/50 shadow-lg scale-[1.02]'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              🛒
            </span>
            {selectedRole === 'customer' && (
              <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">
                {isBn ? 'সক্রিয়' : 'Active'}
              </span>
            )}
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">
            {isBn ? '১. কাস্টমার লগইন' : '1. Customer Portal'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            {isBn ? 'জিমেইল রিয়েল ওটিপি ও শপিং অ্যাকাউন্ট।' : 'Gmail Real OTP & Shopping Account.'}
          </p>
        </button>

        {/* 2. Seller Center Portal */}
        <button
          type="button"
          onClick={() => {
            setSelectedRole('seller');
            setError('');
            setSuccessMsg('');
          }}
          className={`p-4 rounded-3xl border-2 text-left transition-all ${
            selectedRole === 'seller'
              ? 'border-orange-500 bg-orange-50/50 shadow-lg scale-[1.02]'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
              <Store className="w-5 h-5" />
            </span>
            {selectedRole === 'seller' && (
              <span className="text-[10px] bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">
                {isBn ? 'সক্রিয়' : 'Active'}
              </span>
            )}
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">
            {isBn ? '২. সেলার সেন্টার' : '2. Seller Center'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            {isBn ? 'দোকানদার ড্যাশবোর্ড, পণ্য ও আয়।' : 'Merchant Dashboard & Store Catalog.'}
          </p>
        </button>

        {/* 3. Super Admin Portal */}
        <button
          type="button"
          onClick={() => {
            setSelectedRole('admin');
            setError('');
            setSuccessMsg('');
          }}
          className={`p-4 rounded-3xl border-2 text-left transition-all ${
            selectedRole === 'admin'
              ? 'border-purple-600 bg-purple-50/50 shadow-lg scale-[1.02]'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
              <Crown className="w-5 h-5" />
            </span>
            {selectedRole === 'admin' && (
              <span className="text-[10px] bg-purple-700 text-white font-bold px-2 py-0.5 rounded-full">
                {isBn ? 'সক্রিয়' : 'Active'}
              </span>
            )}
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">
            {isBn ? '৩. সুপার এডমিন' : '3. Super Admin (2FA)'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            {isBn ? 'প্ল্যাটফর্ম মালিক, ২-ফ্যাক্টর ওটিপি কোড।' : 'Platform Owner, 2FA Email OTP.'}
          </p>
        </button>

        {/* 4. DEX Delivery Rider Portal */}
        <button
          type="button"
          onClick={() => {
            setSelectedRole('rider');
            setError('');
            setSuccessMsg('');
          }}
          className={`p-4 rounded-3xl border-2 text-left transition-all ${
            selectedRole === 'rider'
              ? 'border-blue-600 bg-blue-50/50 shadow-lg scale-[1.02]'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
              <Truck className="w-5 h-5" />
            </span>
            {selectedRole === 'rider' && (
              <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                {isBn ? 'সক্রিয়' : 'Active'}
              </span>
            )}
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">
            {isBn ? '৪. ডেলিভারি রাইডার' : '4. Delivery Hero'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            {isBn ? 'লাইভ পার্সেল ডেলিভারি ও ক্যাশ ট্যালি।' : 'Live GPS Route, POD & COD Tally.'}
          </p>
        </button>
      </div>

      {/* Active Portal Form Container */}
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl space-y-6">
          {/* Alerts */}
          {error && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl text-xs text-red-600 dark:text-red-400 font-medium">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              {successMsg}
            </div>
          )}

          {/* ======================================================== */}
          {/* 1. CUSTOMER PORTAL TAB */}
          {/* ======================================================== */}
          {selectedRole === 'customer' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-xl mx-auto mb-2 shadow-lg shadow-emerald-700/20">
                  SX
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {isBn ? 'কাস্টমার লগইন / সাইন আপ' : 'Customer Sign In / Sign Up'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {isBn ? 'রিয়েল জিমেইল ওটিপি ও পাসওয়ার্ডের মাধ্যমে নিরাপদ একাউন্ট' : 'Instant access with real Gmail 6-digit OTP verification'}
                </p>
              </div>

              {/* 3-Way Mode Switcher (Gmail OTP | Mobile SMS OTP | Password) */}
              <div className="grid grid-cols-3 p-1 bg-gray-100 dark:bg-slate-800 rounded-2xl text-[11px] font-bold gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('gmail_otp');
                    setError('');
                  }}
                  className={`py-2 px-1 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    authMode === 'gmail_otp'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-extrabold'
                      : 'text-gray-500 hover:text-slate-800'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isBn ? 'জিমেইল ওটিপি' : 'Gmail OTP'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('phone_otp');
                    setError('');
                  }}
                  className={`py-2 px-1 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    authMode === 'phone_otp'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-extrabold'
                      : 'text-gray-500 hover:text-slate-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isBn ? 'মোবাইল ওটিপি' : 'Phone OTP'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('email_pass');
                    setError('');
                  }}
                  className={`py-2 px-1 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    authMode === 'email_pass'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-extrabold'
                      : 'text-gray-500 hover:text-slate-800'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isBn ? 'পাসওয়ার্ড' : 'Password'}</span>
                </button>
              </div>

              {/* 1. Gmail OTP Sub-Form */}
              {authMode === 'gmail_otp' && (
                <div>
                  {!otpSent ? (
                    <form onSubmit={handleSendGmailOTP} className="space-y-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                          {isBn ? 'আপনার জিমেইল আইডি (Gmail Address)' : 'Your Gmail Address'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                          <input
                            type="email"
                            required
                            placeholder="yourname@gmail.com"
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)}
                            className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-emerald-600 text-sm font-semibold dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                          {isBn ? 'আপনার নাম (ঐচ্ছিক)' : 'Full Name (Optional)'}
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            placeholder={isBn ? 'যেমন: মোঃ শরিফ' : 'e.g. Sharif Ahmed'}
                            value={gmailName}
                            onChange={(e) => setGmailName(e.target.value)}
                            className="w-full py-2.5 pl-9 pr-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none dark:text-white"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSendingOtp}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-2xl shadow-xl shadow-emerald-700/20 transition flex items-center justify-center gap-2 text-sm"
                      >
                        {isSendingOtp ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>{isBn ? 'জিমেইলে কোড পাঠানো হচ্ছে...' : 'Sending Code to Gmail...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{isBn ? 'জিমেইলে ৬-সংখ্যার OTP কোড পাঠান' : 'Send 6-Digit OTP to Gmail'}</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyGmailOTP} className="space-y-4 text-xs">
                      <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs space-y-1">
                        <p className="font-medium">
                          <strong>{gmail}</strong> {isBn ? 'ইনবক্সে ৬-সংখ্যার রিয়েল সিকিউরিটি ওটিপি (OTP) কোড পাঠানো হয়েছে। আপনার ইমেইলের ইনবক্স বা স্প্যাম ফোল্ডার চেক করে কোডটি লিখুন।' : 'has received a real 6-digit verification code. Please check your inbox or spam folder.'}
                        </p>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                          {isBn ? '৬-সংখ্যার OTP লিখুন' : 'Enter 6-Digit OTP'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="123456"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="w-full py-3 text-center text-2xl tracking-[0.5em] font-mono font-black rounded-xl border border-emerald-600 bg-emerald-50/50 dark:bg-slate-800 outline-none dark:text-white"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtp('');
                          }}
                          className="w-1/3 py-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                        >
                          {isBn ? 'ইমেইল বদল' : 'Change'}
                        </button>

                        <button
                          type="submit"
                          disabled={isVerifyingOtp}
                          className="w-2/3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3 rounded-2xl shadow-xl shadow-emerald-700/30 transition flex items-center justify-center gap-1.5"
                        >
                          {isVerifyingOtp ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                          <span>{isVerifyingOtp ? (isBn ? 'যাচাই হচ্ছে...' : 'Verifying...') : (isBn ? 'লগইন নিশ্চিত করুন' : 'Confirm Login')}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* 2. Phone SMS OTP Sub-Form */}
              {authMode === 'phone_otp' && (
                <div>
                  {!phoneOtpSent ? (
                    <form onSubmit={handleSendPhoneOTP} className="space-y-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                          {isBn ? 'মোবাইল নম্বর (১১ ডিজিট)' : 'Bangladeshi Mobile Number'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Smartphone className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                          <input
                            type="tel"
                            required
                            placeholder="01712345678"
                            value={mobilePhone}
                            onChange={(e) => setMobilePhone(e.target.value)}
                            className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-emerald-600 text-sm font-semibold dark:text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                          {isBn ? 'আপনার নাম (ঐচ্ছিক)' : 'Full Name (Optional)'}
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            placeholder={isBn ? 'যেমন: মোঃ শরিফ' : 'e.g. Sharif Ahmed'}
                            value={phoneName}
                            onChange={(e) => setPhoneName(e.target.value)}
                            className="w-full py-2.5 pl-9 pr-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none dark:text-white"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSendingPhoneOtp}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-2xl shadow-xl shadow-emerald-700/20 transition flex items-center justify-center gap-2 text-sm"
                      >
                        {isSendingPhoneOtp ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>{isBn ? 'মোবাইলে OTP পাঠানো হচ্ছে...' : 'Sending SMS OTP...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{isBn ? 'মোবাইলে ৬-সংখ্যার OTP পাঠান' : 'Send 6-Digit SMS OTP'}</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyPhoneOTP} className="space-y-4 text-xs">
                      <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs space-y-1">
                        <p className="font-medium">
                          <strong>{mobilePhone}</strong> {isBn ? 'নম্বরে ৬-সংখ্যার রিয়েল SMS ওটিপি কোড পাঠানো হয়েছে। আপনার ইনবক্স চেক করে কোডটি লিখুন।' : 'has received a 6-digit SMS verification code. Please check your messages.'}
                        </p>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                          {isBn ? '৬-সংখ্যার OTP কোড লিখুন' : 'Enter 6-Digit OTP'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="123456"
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                          className="w-full py-3 text-center text-2xl tracking-[0.5em] font-mono font-black rounded-xl border border-emerald-600 bg-emerald-50/50 dark:bg-slate-800 outline-none dark:text-white"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setPhoneOtpSent(false);
                            setPhoneOtp('');
                          }}
                          className="w-1/3 py-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                        >
                          {isBn ? 'নম্বর বদল' : 'Change'}
                        </button>

                        <button
                          type="submit"
                          disabled={isVerifyingPhoneOtp}
                          className="w-2/3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3 rounded-2xl shadow-xl shadow-emerald-700/30 transition flex items-center justify-center gap-1.5"
                        >
                          {isVerifyingPhoneOtp ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                          <span>{isVerifyingPhoneOtp ? (isBn ? 'যাচাই হচ্ছে...' : 'Verifying...') : (isBn ? 'লগইন নিশ্চিত করুন' : 'Confirm Login')}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* 3. Password Sub-Form */}
              {authMode === 'email_pass' && (
                <form onSubmit={handleCustomerEmailPassSubmit} className="space-y-3.5 text-xs">
                  {isRegister && (
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {isBn ? 'আপনার পূর্ণ নাম' : 'Full Name'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isBn ? 'যেমন: মোঃ শরিফ হোসেন' : 'e.g. Sharif Ahmed'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-emerald-600 dark:text-white"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? 'ইমেইল এড্রেস' : 'Email Address'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="user@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-emerald-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? 'পাসওয়ার্ড' : 'Password'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-emerald-600 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setForgotEmail(email);
                        setForgotStep('email');
                        setForgotErr('');
                        setForgotMsg('');
                        setShowForgotModal(true);
                      }}
                      className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      {isBn ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot Password?'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3 rounded-2xl shadow-xl shadow-emerald-700/20 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <span>{isRegister ? (isBn ? 'রেজিস্ট্রেশন সম্পন্ন করুন' : 'Complete Registration') : (isBn ? 'লগইন করুন' : 'Sign In')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2 text-xs text-gray-500">
                    {isRegister ? (isBn ? 'ইতোমধ্যে একাউন্ট আছে?' : 'Already have an account?') : (isBn ? 'নতুন কাস্টমার?' : 'New Customer?')}{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegister(!isRegister)}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      {isRegister ? (isBn ? 'লগইন করুন' : 'Sign In') : (isBn ? 'সাইন আপ করুন' : 'Create Account')}
                    </button>
                  </div>
                </form>
              )}

              {/* 4. Social 1-Click Logins (Google & Facebook) */}
              <div className="pt-3 border-t border-gray-100 dark:border-slate-800 space-y-2.5">
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-gray-200 dark:border-slate-700 w-full"></div>
                  <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
                    {isBn ? 'অথবা সোশ্যাল লগইন' : 'Or 1-Click Social Sign In'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {/* Google Login Button */}
                  <button
                    type="button"
                    onClick={handleGoogleOneClick}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition shadow-sm"
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
                    <span>Google</span>
                  </button>

                  {/* Facebook Login Button */}
                  <button
                    type="button"
                    onClick={handleFacebookOneClick}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-blue-600/30 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-100/50 text-xs font-bold text-blue-700 dark:text-blue-400 transition shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-blue-600 dark:fill-blue-400" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* ======================================================== */}
          {/* 2. SELLER CENTER TAB */}
          {/* ======================================================== */}
          {selectedRole === 'seller' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-xl mx-auto mb-2 shadow-lg shadow-orange-600/20">
                  <Store className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {isBn ? 'ShopX সেলার সেন্টার লগইন' : 'Seller Center Portal'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isBn ? 'আপনার দোকান পরিচালনা ও পণ্য বিক্রি করুন' : 'Log in to manage your inventory, orders & payouts'}
                </p>
              </div>

              <form onSubmit={handleSellerLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'সেলার ইমেইল এড্রেস' : 'Seller Registered Email'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="seller@gmail.com"
                      value={sellerEmail}
                      onChange={(e) => setSellerEmail(e.target.value)}
                      className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-orange-500 text-sm font-semibold dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'পাসওয়ার্ড' : 'Password'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={sellerPassword}
                      onChange={(e) => setSellerPassword(e.target.value)}
                      className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-orange-500 text-sm font-semibold dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(sellerEmail);
                      setForgotStep('email');
                      setForgotErr('');
                      setForgotMsg('');
                      setShowForgotModal(true);
                    }}
                    className="text-[11px] font-bold text-orange-600 hover:underline"
                  >
                    {isBn ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot Password?'}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSellerLoggingIn}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl shadow-orange-500/20 transition flex items-center justify-center gap-2 text-sm"
                >
                  {isSellerLoggingIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{isBn ? 'লগইন হচ্ছে...' : 'Signing in...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isBn ? 'সেলার সেন্টারে প্রবেশ করুন' : 'Access Seller Center'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
                  {isBn ? 'নতুন দোকান খুলতে চান?' : 'Want to open a new store?'}{' '}
                  <Link to="/vendor-register" className="text-orange-600 font-extrabold hover:underline">
                    {isBn ? 'সেলার হিসেবে রেজিস্ট্রেশন করুন ↗' : 'Register New Store ↗'}
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. SUPER ADMIN 2FA PORTAL TAB */}
          {/* ======================================================== */}
          {selectedRole === 'admin' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-purple-700 text-white flex items-center justify-center font-black text-xl mx-auto mb-2 shadow-lg shadow-purple-700/20">
                  <Crown className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {isBn ? 'সুপার এডমিন ২FA গেটওয়ে' : 'Super Admin 2FA Gateway'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isBn ? 'রিয়েল ৬-সংখ্যার ২-ফ্যাক্টর ইমেইল ওটিপি ভেরিফিকেশন' : 'Secured with 2-Factor Real 6-Digit Email OTP (Zero Auto-Fill)'}
                </p>
              </div>

              {!adminOtpSent ? (
                <form onSubmit={handleAdminStep1Submit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? 'এডমিন ইমেইল' : 'Master Admin Email'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sojibahmedshorif25@gmail.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full py-3 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-purple-600 text-sm font-semibold dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? 'এডমিন পাসওয়ার্ড' : 'Admin Master Password'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full py-3 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-purple-600 text-sm font-semibold dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAdminStep1Loading}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-3.5 rounded-2xl shadow-xl shadow-purple-700/20 transition flex items-center justify-center gap-2 text-sm"
                  >
                    {isAdminStep1Loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{isBn ? 'ইমেইলে 2FA কোড পাঠানো হচ্ছে...' : 'Sending 2FA OTP to Email...'}</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>{isBn ? '২FA কোড জেনারেট করুন' : 'Verify & Send 2FA OTP'}</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAdminStep2Submit} className="space-y-4 text-xs">
                  <div className="p-3.5 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 text-purple-900 dark:text-purple-300 text-xs">
                    <p>
                      <strong>{adminMaskedEmail}</strong> {isBn ? 'এ ৬-সংখ্যার লগইন ওটিপি পাঠানো হয়েছে।' : 'received the 6-digit 2FA login code.'}
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? '৬-সংখ্যার 2FA OTP কোড' : 'Enter 6-Digit 2FA OTP'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="123456"
                      value={adminOtp}
                      onChange={(e) => setAdminOtp(e.target.value)}
                      className="w-full py-3 text-center text-2xl tracking-[0.5em] font-mono font-black rounded-xl border border-purple-600 bg-purple-50/50 dark:bg-slate-800 outline-none dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAdminStep2Loading}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-3.5 rounded-2xl shadow-xl shadow-purple-700/30 transition flex items-center justify-center gap-2 text-sm"
                  >
                    {isAdminStep2Loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span>{isAdminStep2Loading ? (isBn ? 'যাচাই হচ্ছে...' : 'Verifying...') : (isBn ? 'এডমিন ড্যাশবোর্ডে প্রবেশ করুন' : 'Authorize & Enter Admin Dashboard')}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. DELIVERY RIDER TAB */}
          {/* ======================================================== */}
          {selectedRole === 'rider' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl mx-auto mb-2 shadow-lg shadow-blue-600/20">
                  <Truck className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {isBn ? 'DEX ডেলিভারি হিরো লগইন' : 'DEX Delivery Hero Portal'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isBn ? 'পার্সেল ডেলিভারি, ম্যাপ রুট ও ক্যাশ কালেকশন' : 'Real-time parcel delivery route, POD signature & cash tally'}
                </p>
              </div>

              <form onSubmit={handleRiderLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'রাইডার মোবাইল নম্বর / DEX আইডি' : 'Rider Mobile Number / DEX ID'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01712-345678"
                    value={riderPhone}
                    onChange={(e) => setRiderPhone(e.target.value)}
                    className="w-full py-3 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-blue-600 text-sm font-mono dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'সিকিউরিটি পিন (PIN)' : 'Security PIN'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••"
                    value={riderPin}
                    onChange={(e) => setRiderPin(e.target.value)}
                    className="w-full py-3 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-blue-600 text-sm font-mono dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl shadow-xl shadow-blue-600/20 transition flex items-center justify-center gap-2 text-sm"
                >
                  <span>{isBn ? 'রাইডার ড্যাশবোর্ডে প্রবেশ করুন' : 'Launch Rider Delivery App'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. UNIVERSAL FORGOT PASSWORD MODAL (REAL 6-DIGIT EMAIL OTP) */}
      {/* ======================================================== */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    {isBn ? 'পাসওয়ার্ড রিসেট (ইমেইল ওটিপি)' : 'Reset Password (Email OTP)'}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    {isBn ? 'রিয়েল ৬-সংখ্যার কোড দ্বারা নিরাপদ রিসেট' : 'Real 6-digit email OTP verification'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {forgotErr && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 dark:text-red-300 text-xs rounded-xl font-semibold">
                {forgotErr}
              </div>
            )}

            {forgotMsg && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs rounded-xl font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{forgotMsg}</span>
              </div>
            )}

            {forgotStep === 'email' ? (
              <form onSubmit={handleSendForgotOtp} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'আপনার নিবন্ধিত ইমেইল' : 'Your Registered Email'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="yourname@gmail.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full py-3 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-emerald-600 font-semibold"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="w-1/3 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                  >
                    {isBn ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-2/3 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black shadow transition flex items-center justify-center gap-2"
                  >
                    {forgotLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                    <span>{forgotLoading ? (isBn ? 'পাঠানো হচ্ছে...' : 'Sending...') : (isBn ? '৬-সংখ্যার কোড পাঠান' : 'Send 6-Digit OTP')}</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetForgotPass} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 text-center">
                    {isBn ? 'ইমেইলে প্রাপ্ত ৬-সংখ্যার OTP কোড' : '6-Digit OTP Code'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value)}
                    className="w-full py-3 text-center text-xl tracking-[0.4em] font-mono font-black rounded-xl border border-emerald-600 bg-emerald-50/50 dark:bg-slate-800 text-emerald-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'নতুন পাসওয়ার্ড' : 'New Password'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••••••"
                    value={forgotNewPass}
                    onChange={(e) => setForgotNewPass(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    disabled={forgotCountdown > 0 || forgotLoading}
                    onClick={handleSendForgotOtp}
                    className={`font-bold ${forgotCountdown > 0 ? 'text-slate-400' : 'text-emerald-700 hover:underline'}`}
                  >
                    {forgotCountdown > 0 ? `${isBn ? 'পুনরায় পাঠান' : 'Resend in'} (${forgotCountdown}s)` : (isBn ? 'আবার কোড পাঠান' : 'Resend Code')}
                  </button>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="py-2.5 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black shadow transition flex items-center gap-1.5"
                  >
                    {forgotLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                    <span>{isBn ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Reset Password'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
