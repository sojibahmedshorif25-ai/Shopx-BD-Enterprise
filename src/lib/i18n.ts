import { Language } from "@/types";

export const bnNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnNumber(val: number | string): string {
  const str = val.toString();
  return str.replace(/[0-9]/g, (digit) => bnNumbers[parseInt(digit, 10)] || digit);
}

export function formatBDT(amount: number, lang: Language = "bn"): string {
  const formattedEn = new Intl.NumberFormat("en-US").format(amount);
  if (lang === "bn") {
    return `৳ ${toBnNumber(formattedEn)}`;
  }
  return `৳ ${formattedEn}`;
}

export const translations = {
  bn: {
    // Header & Brand
    tagline: "বাংলাদেশের ১ নম্বর স্বচ্ছ ও দ্রুত ই-কমার্স",
    searchPlaceholder: "পণ্য, ব্র্যান্ড বা বিভাগ খুঁজুন (যেমন: স্যামসাং, টি-শার্ট, এসি)...",
    searchBtn: "অনুসন্ধান",
    deliverTo: "ডেলিভারি লোকেশন:",
    selectDistrict: "জেলা নির্বাচন করুন",
    trackOrder: "অর্ডার ট্র্যাক",
    sellerCenter: "সেলার সেন্টার",
    helpCenter: "সহায়তা কেন্দ্র",
    bazaarMall: "বাজার মল (১০০% আসল)",
    signIn: "লগইন / সাইন আপ",
    myAccount: "আমার একাউন্ট",
    cart: "কার্ট",
    items: "আইটেম",
    
    // Top Banners & Alerts
    lowDataMode: "লো-ডাটা মোড সক্রিয় (সুপার ফাস্ট ৩জি স্পিড)",
    priceTransparencyAlert: "বাজারএক্স গ্যারান্টি: কোনো ভুয়া ডিসকাউন্ট নেই। সরাসরি ৯০ দিনের মূল্য তালিকা দেখুন।",
    freeDeliveryBanner: "৳৯৯৯+ অর্ডারে সারা বাংলাদেশে ফ্রি ডেলিভারি!",

    // Categories
    allCategories: "সকল ক্যাটাগরি",
    electronics: "ইলেকট্রনিক্স ও গ্যাজেট",
    fashion: "ফ্যাশন ও লাইফস্টাইল",
    homeAppliances: "হোম অ্যাপ্লায়েন্স",
    groceries: "গ্রোসারি ও নিত্যপণ্য",
    healthBeauty: "হেলথ ও বিউটি",
    sportsOutdoor: "স্পোর্টস ও ফিটনেস",
    automotive: "অটোমোবাইল",
    booksStationery: "বই ও স্টেশনারি",

    // Flash Sale Section
    flashDeals: "ফ্ল্যাশ ডিলস",
    endingIn: "সময় বাকি:",
    viewAllDeals: "সবগুলো দেখুন",
    sold: "বিক্রি হয়েছে",
    availableStock: "স্টকে বাকি",
    claimDeal: "ডিল লুফে নিন",
    lowestIn90Days: "৯০ দিনের সর্বনিম্ন মূল্য",

    // Daraz Comparison Banner
    whyBazaarX: "দারাজ থেকে বাজারএক্স কেন আলাদা ও সেরা?",
    whyBazaarXSub: "আমরা সমাধান করেছি দারাজের সবচেয়ে বড় সমস্যাগুলো",
    darazVsBazaarX: {
      fakeDiscountTitle: "ভুয়া মূল্য বনাম ৯০ দিনের রিয়েল গ্রাফ",
      fakeDiscountDesc: "দারাজের মতো কৃত্রিমভাবে দাম বাড়িয়ে ডিসকাউন্ট দেখাই না। পণ্যের ৯০ দিনের আসল দাম দেখে কিনুন।",
      shippingTitle: "স্বচ্ছ ডেলিভারি চার্জ",
      shippingDesc: "চেকআউটে কোনো গোপন চার্জ নেই। প্রোডাক্ট পেজেই ঢাকা ও ঢাকার বাইরের নিখুঁত চার্জ দেখুন।",
      languageTitle: "১০০% নির্ভুল বাংলা সাপোর্ট",
      languageDesc: "স্বচ্ছ বাংলা ইন্টারফেস ও স্থানীয় পণ্য বিবরণী।",
      refundTitle: "১-ক্লিক রিটার্ন ও ইনস্ট্যান্ট রিফান্ড",
      refundDesc: "কোনো জটিল ফরম ছাড়া সরাসরি ওয়ালেটে ১ ঘণ্টার মধ্যে রিফান্ড।",
      paymentTitle: "নিরবচ্ছিন্ন দেশি পেমেন্ট",
      paymentDesc: "বিকাশ, নগদ, রকেট, শুরজোপে ও নিরাপদ ক্যাশ অন ডেলিভারি।",
    },

    // PDP Details
    verifiedSeller: "ভেরিফাইড সেলার",
    tradeLicenseVerified: "ট্রেড লাইসেন্স সত্যায়িত",
    responseRate: "চ্যাট রেসপন্স",
    shipOnTime: "সময়মতো শিপিং",
    addToCart: "কার্টে যোগ করুন",
    buyNow: "সরাসরি কিনুন",
    priceHistoryHeading: "স্বচ্ছ ৯০ দিনের মূল্য ইতিহাস",
    priceHistoryDesc: "এই গ্রাফটি প্রমাণ করে পণ্যের পূর্ববর্তী বাস্তব দাম। কোনো ফেক সেল নেই।",
    currentPrice: "বর্তমান মূল্য",
    highestPrice: "সর্বোচ্চ দাম",
    lowestPrice: "সর্বনিম্ন দাম",
    deliveryEstimator: "ডেলিভারি ক্যালকুলেটর",
    deliveryToDhaka: "ঢাকা সিটিতে ডেলিভারি",
    deliveryOutsideDhaka: "ঢাকার বাইরে ডেলিভারি",
    estimatedTime: "সম্ভাব্য সময়",
    freeDeliveryQualified: "এই পণ্যে আপনি ফ্রি ডেলিভারি পাচ্ছেন!",
    customerReviews: "ক্রেতাদের মতামত ও বাস্তব ছবি",
    verifiedBuyer: "যাচাইকৃত ক্রেতা",
    specifications: "টেকনিক্যাল স্পেসিফিকেশন",
    highlights: "মূল বৈশিষ্ট্য",
    returnPolicy: "৭ দিনের সহজ রিটার্ন নীতি",
    instantRefundAvailable: "ইনস্ট্যান্ট ওয়ালেট রিফান্ড প্রযোজ্য",
    warranty: "অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি",

    // Cart & Checkout
    cartSummary: "অর্ডার সারাংশ",
    subtotal: "মোট পণ্য মূল্য",
    deliveryFee: "ডেলিভারি ফি",
    discount: "ভাউচার ডিসকাউন্ট",
    grandTotal: "সর্বমোট প্রদেয়",
    proceedToCheckout: "চেকআউট করুন",
    applyCoupon: "কুপন কোড প্রয়োগ করুন",
    couponApplied: "কুপন সক্রিয় হয়েছে!",
    emptyCart: "আপনার কার্ট এখন খালি",
    startShopping: "কেনাকাটা শুরু করুন",
    selectPayment: "পেমেন্ট মাধ্যম বেছে নিন",
    bkashDeepLink: "বিকাশ ডিরেক্ট পেমেন্ট (১% ইনস্ট্যান্ট ক্যাশব্যাক)",
    nagadPay: "নগদ পেমেন্ট (সহজ ও নিরাপদ)",
    rocketPay: "রকেট একাউন্ট পেমেন্ট",
    cardPay: "ভিসা / মাস্টারকার্ড / অ্যামেক্স (শুরজোপে)",
    cashOnDelivery: "ক্যাশ অন ডেলিভারি (পণ্য দেখে মূল্য পরিশোধ)",
    placeOrder: "অর্ডার নিশ্চিত করুন",
    orderSuccess: "অভিনন্দন! আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে",
    trackingId: "ট্র্যাকিং আইডি:",
    trackNow: "লাইভ ট্র্যাক করুন",

    // Footer
    safeShopping: "নিরাপদ ও নির্ভরযোগ্য কেনাকাটা",
    govApproved: "বাণিজ্য মন্ত্রণালয় নিবন্ধিত (DBID অনুমোদিত)",
    support247: "২৪/৭ সার্বক্ষণিক কাস্টমার সাপোর্ট: ১৬৭৮৯",
    copyright: "© ২০২৬ বাজারএক্স লিমিটেড। সর্বস্বত্ব সংরক্ষিত।",
  },
  en: {
    // Header & Brand
    tagline: "Bangladesh's #1 Transparent & Fast E-Commerce",
    searchPlaceholder: "Search products, brands or categories (e.g., Samsung, T-shirt, AC)...",
    searchBtn: "Search",
    deliverTo: "Deliver to:",
    selectDistrict: "Select District",
    trackOrder: "Track Order",
    sellerCenter: "Seller Center",
    helpCenter: "Help Center",
    bazaarMall: "BazaarMall (100% Authentic)",
    signIn: "Sign In / Register",
    myAccount: "My Account",
    cart: "Cart",
    items: "items",

    // Top Banners & Alerts
    lowDataMode: "Low Data Mode Active (Optimized for 3G/Rural BD)",
    priceTransparencyAlert: "BazaarX Guarantee: Zero fake discounts. Check verified 90-day price history.",
    freeDeliveryBanner: "Free Shipping nationwide on orders over ৳999!",

    // Categories
    allCategories: "All Categories",
    electronics: "Electronics & Gadgets",
    fashion: "Fashion & Lifestyle",
    homeAppliances: "Home Appliances",
    groceries: "Grocery & Daily Needs",
    healthBeauty: "Health & Beauty",
    sportsOutdoor: "Sports & Fitness",
    automotive: "Automotive",
    booksStationery: "Books & Stationery",

    // Flash Sale Section
    flashDeals: "Flash Deals",
    endingIn: "Ending In:",
    viewAllDeals: "View All",
    sold: "Sold",
    availableStock: "Left in Stock",
    claimDeal: "Grab Deal",
    lowestIn90Days: "Lowest in 90 Days",

    // Daraz Comparison Banner
    whyBazaarX: "Why is BazaarX Better Than Daraz?",
    whyBazaarXSub: "Built specifically to eliminate the biggest pain points of online shopping in BD",
    darazVsBazaarX: {
      fakeDiscountTitle: "Real 90-Day Graph vs Fake Strikes",
      fakeDiscountDesc: "No artificially inflated pre-sale prices. See complete transparent price trends.",
      shippingTitle: "Transparent Upfront Shipping",
      shippingDesc: "No surprise fees at checkout. Exact Dhaka (৳60) and outside (৳120) rates shown on product page.",
      languageTitle: "Flawless Dual-Language (বাংলা + EN)",
      languageDesc: "Natural Bengali interface and accurate localized descriptions.",
      refundTitle: "1-Click Return & Instant Wallet Refund",
      refundDesc: "Zero complicated forms. Instant wallet refund within 1 hour of pickup.",
      paymentTitle: "Seamless Local Payment Gateways",
      paymentDesc: "Native bKash Deeplink, Nagad, Rocket, ShurjoPay & verified COD.",
    },

    // PDP Details
    verifiedSeller: "Verified Seller",
    tradeLicenseVerified: "Trade License Verified",
    responseRate: "Chat Response",
    shipOnTime: "On-Time Shipping",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    priceHistoryHeading: "Transparent 90-Day Price History",
    priceHistoryDesc: "Verified price tracker to ensure you are getting genuine discount rates.",
    currentPrice: "Current Price",
    highestPrice: "Peak Price",
    lowestPrice: "All-Time Low",
    deliveryEstimator: "Upfront Delivery Calculator",
    deliveryToDhaka: "Delivery in Dhaka City",
    deliveryOutsideDhaka: "Delivery Outside Dhaka",
    estimatedTime: "Estimated Delivery",
    freeDeliveryQualified: "You qualify for FREE Delivery on this item!",
    customerReviews: "Real Customer Reviews & Photos",
    verifiedBuyer: "Verified Buyer",
    specifications: "Specifications",
    highlights: "Key Features",
    returnPolicy: "7 Days Hassle-Free Returns",
    instantRefundAvailable: "Instant Wallet Refund Eligible",
    warranty: "Official Brand Warranty",

    // Cart & Checkout
    cartSummary: "Order Summary",
    subtotal: "Subtotal",
    deliveryFee: "Delivery Fee",
    discount: "Voucher Discount",
    grandTotal: "Grand Total",
    proceedToCheckout: "Proceed to Checkout",
    applyCoupon: "Apply Coupon",
    couponApplied: "Coupon Applied!",
    emptyCart: "Your Cart is Empty",
    startShopping: "Start Shopping",
    selectPayment: "Select Payment Method",
    bkashDeepLink: "bKash Direct (1% Instant Cashback)",
    nagadPay: "Nagad Gateway (Fast & Secure)",
    rocketPay: "Rocket Account Pay",
    cardPay: "Visa / MasterCard / Amex (ShurjoPay)",
    cashOnDelivery: "Cash on Delivery (Pay after inspection)",
    placeOrder: "Confirm Order",
    orderSuccess: "Congratulations! Your order has been placed successfully",
    trackingId: "Tracking ID:",
    trackNow: "Live Courier Track",

    // Footer
    safeShopping: "100% Safe & Secure Shopping",
    govApproved: "Registered with Ministry of Commerce (DBID Certified)",
    support247: "24/7 Customer Hotline: 16789",
    copyright: "© 2026 BazaarX Limited. All Rights Reserved.",
  },
};
