import { create } from 'zustand';

export type AdminLanguage = 'en' | 'bn';

interface LanguageState {
  lang: AdminLanguage;
  setLang: (lang: AdminLanguage) => void;
  toggleLang: () => void;
  t: (key: string, defaultEn?: string) => string;
}

const translations: Record<string, { en: string; bn: string }> = {
  // Common / Global
  'system.status': { en: 'System Status:', bn: 'সিস্টেম স্ট্যাটাস:' },
  'system.online': { en: 'Live Online', bn: 'সক্রিয় (Online)' },
  'ai.active': { en: 'Gemini AI Active', bn: 'Gemini AI সংযুক্ত' },
  'super_admin': { en: 'Super Admin', bn: 'সুপার এডমিন' },
  'vendor_portal': { en: 'Vendor Portal', bn: 'ভেন্ডর পোর্টাল' },
  'customer_store': { en: 'Visit Storefront', bn: 'কাস্টমার স্টোর ভিজিট' },
  'logout': { en: 'Logout', bn: 'লগআউট' },
  'refresh': { en: 'Refresh Data', bn: 'রিফ্রেশ' },
  'search': { en: 'Search...', bn: 'অনুসন্ধান করুন...' },
  'actions': { en: 'Actions', bn: 'পদক্ষেপ' },
  'status': { en: 'Status', bn: 'স্ট্যাটাস' },
  'view': { en: 'View', bn: 'দেখুন' },
  'delete': { en: 'Delete', bn: 'মুছুন' },
  'edit': { en: 'Edit', bn: 'সম্পাদনা' },
  'cancel': { en: 'Cancel', bn: 'বাতিল' },
  'save': { en: 'Save', bn: 'সংরক্ষণ' },
  'close': { en: 'Close', bn: 'বন্ধ করুন' },
  'filter': { en: 'Filter', bn: 'ফিল্টার' },
  'all': { en: 'All', bn: 'সকল' },

  // Navigation
  'nav.dashboard': { en: 'Overview Dashboard', bn: 'ড্যাশবোর্ড (Overview)' },
  'nav.products': { en: 'Products & Inventory', bn: 'পণ্য ব্যবস্থাপনা' },
  'nav.orders': { en: 'Live Orders & Courier', bn: 'লাইভ অর্ডার ও কুরিয়ার' },
  'nav.vendors': { en: 'Vendors & Governance', bn: 'সেলার / ভেন্ডর তালিকা' },
  'nav.subscriptions': { en: 'SaaS Subscriptions & MRR', bn: 'SaaS সাবস্ক্রিপশন ও MRR' },
  'nav.riders': { en: 'Riders & GPS Fleet', bn: 'রাইডার ও ডিসপ্যাচ' },

  // Dashboard Page
  'dash.welcome': { en: 'Welcome back,', bn: 'স্বাগতম,' },
  'dash.subtitle': { en: 'ShopX BD Cloud Command Center — Realtime Sales, Escrow & Dispatch Hub', bn: 'ShopX BD SaaS ড্যাশবোর্ডে আজকের বিক্রয় ও লাইভ অর্ডার অগ্রগতি।' },
  'dash.ai_optimized': { en: 'AI Optimized Core', bn: 'AI অপ্টিমাইজড সিস্টেম' },
  'dash.kpi_gmv': { en: 'Total Gross Volume (GMV)', bn: 'মোট বিক্রয় (GMV)' },
  'dash.kpi_gmv_sub': { en: '+18.4% vs last week', bn: '+১৮.৪% গত সপ্তাহের চেয়ে বৃদ্ধি' },
  'dash.kpi_revenue': { en: 'Platform Commission (Net)', bn: 'প্ল্যাটফর্ম কমিশন আয়' },
  'dash.kpi_fee': { en: '5% Standard Escrow Fee', bn: '৫% স্ট্যান্ডার্ড ফি' },
  'dash.kpi_orders': { en: 'Total Orders Completed', bn: 'মোট অর্ডার সম্পন্ন' },
  'dash.kpi_tracking': { en: 'Live GPS Tracking Active', bn: 'সরাসরি ট্র্যাকিং সক্রিয়' },
  'dash.kpi_products': { en: 'Active Catalog SKUs', bn: 'লাইভ প্রোডাক্ট তালিকা' },
  'dash.kpi_organic': { en: 'Organic & Smart Tech', bn: 'খাঁটি অর্গানিক ও গ্যাজেট' },
  'dash.sales_trend': { en: 'Weekly Sales Analytics', bn: 'সাপ্তাহিক বিক্রয় ট্রেন্ড' },
  'dash.sales_trend_sub': { en: 'Daily gross merchandise volume and commission earnings', bn: 'প্রতিদিনের সর্বমোট অর্ডার ভলিউম ও কমিশন রাজস্ব' },

  // Orders Page
  'orders.title': { en: 'Orders & 64-District Courier Logistics Hub', bn: 'অর্ডার ও ৬৪-জেলা কুরিয়ার ম্যানেজমেন্ট' },
  'orders.subtitle': { en: 'Real-time GPS Dispatch, 1-Click Steadfast/Pathao API Courier Booking & Dual Invoicing', bn: 'লাইভ জিপিএস রাইডার ডিসপ্যাচ, কুরিয়ার এপিআই বুকিং (Steadfast/Pathao) ও ইনভয়েস প্রিন্টার।' },
  'orders.search_placeholder': { en: 'Search Order #, Phone, Name, District...', bn: 'অর্ডার নং / ফোন / নাম / জেলা...' },
  'orders.total_count': { en: 'Total Orders:', bn: 'মোট অর্ডার:' },
  'orders.live_sync': { en: 'Live Realtime Sync Active ●', bn: 'লাইভ সিঙ্ক চালু রয়েছে ●' },
  'orders.th_order_no': { en: 'Order ID', bn: 'অর্ডার নং' },
  'orders.th_customer': { en: 'Customer & District', bn: 'গ্রাহক ও জেলা' },
  'orders.th_amount': { en: 'Total Amount', bn: 'মোট টাকা' },
  'orders.th_payment': { en: 'Payment Method', bn: 'পেমেন্ট' },
  'orders.th_status': { en: 'Order Status', bn: 'স্ট্যাটাস' },
  'orders.th_courier': { en: 'Courier API Booking', bn: 'কুরিয়ার বুকিং' },
  'orders.th_action': { en: 'Actions', bn: 'অ্যাকশন' },
  'orders.paid': { en: 'Paid', bn: 'পরিশোধিত' },
  'orders.cod_due': { en: 'Due (COD)', bn: 'বকেয়া (COD)' },
  'orders.status_placed': { en: 'Placed', bn: 'গৃহীত (Placed)' },
  'orders.status_confirmed': { en: 'Confirmed', bn: 'প্যাকড (Confirmed)' },
  'orders.status_shipped': { en: 'Dispatched', bn: 'কুরিয়ারে (Dispatched)' },
  'orders.status_out': { en: 'Out for Delivery', bn: 'রাইডারে (Out)' },
  'orders.status_delivered': { en: 'Delivered', bn: 'ডেলিভার্ড (Delivered)' },
  'orders.status_cancelled': { en: 'Cancelled', bn: 'বাতিল (Cancelled)' },
  'orders.invoice': { en: 'Invoice', bn: 'ইনভয়েস' },
  'orders.view_details': { en: 'View Details', bn: 'বিস্তারিত' },
  'orders.dispatch_rider': { en: 'Dispatch Rider', bn: 'রাইডার নিয়োগ' },

  // Vendors Page
  'vendors.title': { en: 'Vendor Governance & Multi-Store Management', bn: 'সেলার / ভেন্ডর প্রশাসন (Vendor Governance)' },
  'vendors.subtitle': { en: 'Store approvals, commission rates, escrow payout audits, and KYC verification', bn: 'সেলার অনুমোদন, কমিশন রেট নিয়ন্ত্রণ ও পে-আউট হিসাব' },
  'vendors.th_store': { en: 'Store Name & Rating', bn: 'দোকানের নাম' },
  'vendors.th_owner': { en: 'Owner & Contact', bn: 'মালিক ও যোগাযোগ' },
  'vendors.th_address': { en: 'Address', bn: 'ঠিকানা' },
  'vendors.th_sales': { en: 'Total Sales (GMV)', bn: 'মোট বিক্রয়' },
  'vendors.th_commission': { en: 'Commission Rate', bn: 'কমিশন রেট' },
  'vendors.th_status': { en: 'Account Status', bn: 'স্ট্যাটাস' },
  'vendors.btn_approve': { en: 'Approve', bn: 'অনুমোদন দিন' },
  'vendors.btn_suspend': { en: 'Suspend', bn: 'স্থগিত করুন' },
  'vendors.verified_seller': { en: 'Verified Seller', bn: 'যাচাইকৃত সেলার' },

  // SaaS Subscriptions Page
  'saas.title': { en: 'Multi-Tenant Cloud SaaS & Subscriptions Hub', bn: 'SaaS মাল্টি-টেন্যান্ট ও সাবস্ক্রিপশন প্রশাসন' },
  'saas.subtitle': { en: 'Vendor cloud storefront plans, Monthly Recurring Revenue (MRR), subdomains, and escrow control', bn: 'ভেন্ডরদের ক্লাউড স্টোরফ্রন্ট সাবস্ক্রিপশন, মাসিক এমআরআর (MRR), সাবডোমেইন ও এসক্রো ট্র্যাকিং।' },
  'saas.sync_dns': { en: 'Sync Cloud DNS & SSL', bn: 'DNS ও SSL সিঙ্ক করুন' },
  'saas.mrr': { en: 'SaaS Monthly MRR', bn: 'মাসিক সাবস্ক্রিপশন ফি (MRR)' },
  'saas.arr': { en: 'Annualized ARR', bn: 'বাৎসরিক রানরেট (ARR)' },
  'saas.gmv': { en: 'Total Tenant GMV', bn: 'সকল টেন্যান্টের বিক্রয় (GMV)' },
  'saas.active_tenants': { en: 'Active Tenant Stores', bn: 'সক্রিয় ক্লাউড স্টোরফ্রন্ট' },
  'saas.uptime': { en: '99.99% Edge Uptime', bn: '৯৯.৯৯% ক্লাউড আপটাইম' },
  'saas.th_store': { en: 'Storefront & Subdomain', bn: 'দোকান ও সাবডোমেইন' },
  'saas.th_owner': { en: 'Owner / Email', bn: 'মালিক / ইমেইল' },
  'saas.th_plan': { en: 'SaaS Plan', bn: 'SaaS প্ল্যান' },
  'saas.th_fee': { en: 'Monthly Fee (MRR)', bn: 'মাসিক ফি (MRR)' },
  'saas.th_commission': { en: 'Platform Fee', bn: 'মার্কেটপ্লেস ফি' },
  'saas.th_sales': { en: 'Tenant Sales (GMV)', bn: 'মোট বিক্রয় (GMV)' },
  'saas.th_ssl': { en: 'SSL & Edge Status', bn: 'SSL ও ক্লাউড স্ট্যাটাস' },
  'saas.visit': { en: 'Visit Store', bn: 'ভিজিট' },

  // Riders Page
  'riders.title': { en: 'Delivery Riders & GPS Fleet Command', bn: 'ডেলিভারি রাইডার ও লাইভ জিপিএস ফ্লিট' },
  'riders.subtitle': { en: 'Active riders status, route telemetry, COD reconciliation, and ratings', bn: 'সক্রিয় রাইডারদের স্থিতি, সফল ডেলিভারি ও রেটিং' },
  'riders.stat_total': { en: 'Total Fleet Riders', bn: 'সর্বমোট রাইডার' },
  'riders.stat_active': { en: 'Active on Route', bn: 'অন-রুট সক্রিয়' },
  'riders.stat_deliveries': { en: 'Delivered Today', bn: 'আজকের ডেলিভারি' },
  'riders.stat_cod': { en: 'COD In Transit', bn: 'ট্রানজিটে COD টাকা' },
  'riders.online': { en: 'Online & Ready', bn: 'অনলাইন' },
  'riders.vehicle': { en: 'Vehicle:', bn: 'গাড়ি:' },
  'riders.deliveries': { en: 'Completed Deliveries:', bn: 'মোট ডেলিভারি:' },
  'riders.call': { en: 'Call Rider', bn: 'কল করুন' },

  // Products Page
  'products.title': { en: 'Product Catalog & Inventory Engine', bn: 'পণ্য ক্যাটালগ ও ইনভেন্টরি' },
  'products.subtitle': { en: 'Manage active catalog SKUs, pricing, stock levels, and flash sales', bn: 'সর্বমোট পণ্য ও স্টক ব্যবস্থাপনা' },
  'products.add_new': { en: 'Add New Product', bn: 'নতুন পণ্য যোগ করুন' },
  'products.search_placeholder': { en: 'Search by title, SKU, or category...', bn: 'পণ্যের নাম দিয়ে খুঁজুন...' },
  'products.th_product': { en: 'Product', bn: 'পণ্য' },
  'products.th_category': { en: 'Category', bn: 'ক্যাটাগরি' },
  'products.th_price': { en: 'Price', bn: 'মূল্য' },
  'products.th_stock': { en: 'Stock', bn: 'স্টক' },
  'products.th_sold': { en: 'Sold', bn: 'বিক্রয় সংখ্যা' },
  'products.th_tags': { en: 'Tags & Badges', bn: 'ট্যাগ / ফিচার' },
  'products.stock_left': { en: 'left', bn: 'টি বাকি' },
  'products.organic': { en: 'Organic', bn: 'অর্গানিক' },
  'products.flash': { en: 'Flash Sale', bn: 'ফ্ল্যাশ সেল' },

  // Login Page
  'login.title': { en: 'ShopX BD Command Center', bn: 'ShopX BD কমান্ড সেন্টার' },
  'login.subtitle': { en: 'Super Admin & Vendor SaaS Portal', bn: 'Super Admin ও Vendor SaaS Portal' },
  'login.email': { en: 'Email Address', bn: 'ইমেইল এড্রেস' },
  'login.password': { en: 'Password', bn: 'পাসওয়ার্ড' },
  'login.submit': { en: 'Enter Command Center', bn: 'কমান্ড সেন্টারে প্রবেশ করুন' },
  'login.verifying': { en: 'Authenticating...', bn: 'যাচাই করা হচ্ছে...' },
};

export const useAdminLanguageStore = create<LanguageState>((set, get) => {
  const savedLang = (localStorage.getItem('shopx_admin_lang') as AdminLanguage) || 'en';

  return {
    lang: savedLang,
    setLang: (lang: AdminLanguage) => {
      localStorage.setItem('shopx_admin_lang', lang);
      set({ lang });
    },
    toggleLang: () => {
      const nextLang: AdminLanguage = get().lang === 'en' ? 'bn' : 'en';
      localStorage.setItem('shopx_admin_lang', nextLang);
      set({ lang: nextLang });
    },
    t: (key: string, defaultEn?: string) => {
      const currentLang = get().lang;
      if (translations[key]) {
        return translations[key][currentLang] || translations[key].en;
      }
      return defaultEn || key;
    },
  };
});
