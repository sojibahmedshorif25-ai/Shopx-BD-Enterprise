import { create } from 'zustand';

export type CurrencyCode = 'BDT' | 'USD' | 'EUR' | 'AED' | 'SAR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromBDT: number; // 1 BDT in foreign currency
  prefix: boolean;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  BDT: { code: 'BDT', symbol: '৳', name: 'BDT (Bangladeshi Taka)', rateFromBDT: 1, prefix: true },
  USD: { code: 'USD', symbol: '$', name: 'USD (US Dollar)', rateFromBDT: 0.0083, prefix: true },
  EUR: { code: 'EUR', symbol: '€', name: 'EUR (Euro)', rateFromBDT: 0.0078, prefix: true },
  AED: { code: 'AED', symbol: 'AED ', name: 'AED (UAE Dirham)', rateFromBDT: 0.0305, prefix: true },
  SAR: { code: 'SAR', symbol: 'SAR ', name: 'SAR (Saudi Riyal)', rateFromBDT: 0.0312, prefix: true },
  GBP: { code: 'GBP', symbol: '£', name: 'GBP (British Pound)', rateFromBDT: 0.0066, prefix: true },
};

interface CurrencyState {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInBDT: number) => string;
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: (localStorage.getItem('shopx_currency') as CurrencyCode) || 'BDT',
  setCurrency: (currency) => {
    localStorage.setItem('shopx_currency', currency);
    set({ currency });
  },
  formatPrice: (amountInBDT: number) => {
    const cur = CURRENCIES[get().currency] || CURRENCIES.BDT;
    const converted = amountInBDT * cur.rateFromBDT;
    
    if (cur.code === 'BDT') {
      return `৳${Math.round(amountInBDT).toLocaleString('en-US')}`;
    }
    
    // Foreign currency formatting with 2 decimals
    return `${cur.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },
}));
