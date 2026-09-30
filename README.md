# 🛍️ ShopX BD Enterprise — Next-Gen Multi-Vendor E-Commerce Platform

[![Platform](https://img.shields.io/badge/Platform-ShopX%20BD%20Enterprise-emerald.svg)](https://github.com/sojibahmedshorif25-ai/Shopx-BD-Enterprise)
[![Architecture](https://img.shields.io/badge/Architecture-Daraz%20Multi--Role%20Hub-orange.svg)](https://github.com/sojibahmedshorif25-ai/Shopx-BD-Enterprise)
[![Security](https://img.shields.io/badge/Security-2FA%20Gmail%20OTP%20Verified-blue.svg)](https://github.com/sojibahmedshorif25-ai/Shopx-BD-Enterprise)
[![Logistics](https://img.shields.io/badge/Logistics-DEX%20Live%20GPS%20Tracking-teal.svg)](https://github.com/sojibahmedshorif25-ai/Shopx-BD-Enterprise)

> **ShopX BD** is a world-class enterprise multi-vendor e-commerce platform built to surpass industry leaders like Daraz in speed, luxury aesthetics, live logistics tracking, bilingual English/Bangla localization, and bank-grade authentication security.

---

## 🏢 Official Head Office & Support Details
- **🏢 Head Office:** Rowmari, Kurigram, Rangpur, Bangladesh (রৌমারী, কুড়িগ্রাম, রংপুর বিভাগ, বাংলাদেশ)
- **📧 Official Support:** `sojibahmedshorif25@gmail.com`
- **📞 24/7 Helpline:** `+880 1942-791004`
- **👑 Super Admin:** `sojibahmedshorif25@gmail.com`

---

## 🏛️ Daraz-Architecture 4 Dedicated Role Portals

| Portal / Role | URL / Gateway | Key Capabilities |
| :--- | :--- | :--- |
| 🛒 **1. Customer Storefront** | `http://localhost:5173` | Real 6-digit Gmail OTP Login, Google OAuth, 64-District Address Book, Live Milestone Tracker, Daily Coins Check-In, Instant Checkout. |
| 🏬 **2. Seller Center** | `http://localhost:5173/vendor-register` & `http://localhost:5174/login` | Store Onboarding, Multi-tenant Catalog, Automated 5% Commission, Payout Reports, Product Variant Management. |
| 🛡️ **3. Super Admin Command Center** | `http://localhost:5174/login` | Master 2FA Email OTP Verification, RBAC User & Role Control, SaaS Vendor Subscriptions, Financial GMV Ledger. |
| 🚴 **4. DEX Delivery Rider** | `http://localhost:5173/rider-portal` | Phone + PIN Auth, Real-Time GPS Broadcast, Digital POD Signature, Customer OTP Verification, COD Cash Reconciliation. |

---

## ⚡ Key Highlights & Innovations

### 1. 🪙 Daily Coins & VIP Club (Strict 1 Claim Per Day)
- **7-Day Streak Rewards:** Day 1: +10, Day 2: +20, Day 3: +30, Day 4: +40, Day 5: +50, Day 6: +60, Day 7: +100 Coins.
- **Calendar-Day Enforcement:** Strict once-per-day claim logic synchronized between MongoDB and client storage.
- **Instant Checkout Discount:** Redeem coins for up to **৳25 maximum instant discount** (100 coins = ৳10 off).

### 2. 🔐 Bank-Grade 45-Day Sessions & Real 6-Digit Email OTP
- **45-Day Session Persistence:** Logged-in sessions remain active securely for **45 days** without needing repeated logins.
- **Real 6-Digit Gmail OTP:** Dispatches actual verification emails via Gmail SMTP for login, 2FA admin gateway, and instant **Forgot Password** password reset.
- **Brute-Force Lockout Guard:** Automatically locks accounts for 10 minutes upon 5 consecutive failed authentication attempts.

### 3. 🌐 Dynamic Real-Time Countdown Timers
- Flash sales and mega rush offers compute live countdowns dynamically towards midnight (`23:59:59`) rather than using static hardcoded clocks.

### 4. 🗺️ Complete 64-District Bangladesh Logistics & Geolocation
- Intelligent delivery calculation (Inside Dhaka: ৳60 / Outside Dhaka: ৳120).
- Automatic GPS geolocation detection and nearest delivery hub routing.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
# Backend dependencies
cd backend && npm install

# Frontend Storefront dependencies
cd ../frontend && npm install

# Admin Command Center dependencies
cd ../admin && npm install
```

### 2. Start Development Servers
```bash
# Run Backend API (Port 5000)
cd backend && npm run dev

# Run Frontend Storefront (Port 5173)
cd frontend && npm run dev

# Run Admin Dashboard (Port 5174)
cd admin && npm run dev
```

---

## 🛠️ Technology Stack
- **Frontend & Admin:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti, Zustand.
- **Backend API:** Node.js, Express, TypeScript, MongoDB / Mongoose, JSON Web Tokens (JWT), Nodemailer (Gmail SMTP).
- **Logistics & Real-Time:** Socket.IO, Geolocation API, HTML5 Canvas Signature Pad.

---

## 📄 License
MIT © 2026 ShopX BD Enterprise. Developed with ❤️ for Bangladesh & Global Scale.
