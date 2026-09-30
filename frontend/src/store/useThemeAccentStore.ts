import { create } from 'zustand';

export type AccentColor = 'orange' | 'emerald' | 'cyan' | 'purple' | 'amber' | 'rose';

export interface AccentConfig {
  id: AccentColor;
  name: string;
  banglaName: string;
  primary: string; // Tailwind color class or hex
  glow: string;
  bgGradient: string;
}

export const ACCENTS: Record<AccentColor, AccentConfig> = {
  orange: {
    id: 'orange',
    name: 'Cyber Orange',
    banglaName: 'সাইবার অরেঞ্জ',
    primary: '#f97316',
    glow: 'rgba(249, 115, 22, 0.4)',
    bgGradient: 'from-orange-500 to-amber-500',
  },
  emerald: {
    id: 'emerald',
    name: 'Neon Emerald',
    banglaName: 'নিয়ন এমারেল্ড',
    primary: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    bgGradient: 'from-emerald-500 to-teal-500',
  },
  cyan: {
    id: 'cyan',
    name: 'Cyberpunk Cyan',
    banglaName: 'সাইবার সায়ান',
    primary: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    bgGradient: 'from-cyan-500 to-blue-500',
  },
  purple: {
    id: 'purple',
    name: 'Royal Purple',
    banglaName: 'রয়্যাল পার্পল',
    primary: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    bgGradient: 'from-purple-500 to-indigo-500',
  },
  amber: {
    id: 'amber',
    name: 'Golden Luxury',
    banglaName: 'গোল্ডেন লাক্সারি',
    primary: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    bgGradient: 'from-amber-400 to-yellow-500',
  },
  rose: {
    id: 'rose',
    name: 'Crimson Rose',
    banglaName: 'ক্রিমসন রোজ',
    primary: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.4)',
    bgGradient: 'from-rose-500 to-pink-500',
  },
};

interface ThemeAccentState {
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
}

export const useThemeAccentStore = create<ThemeAccentState>((set) => ({
  accent: (localStorage.getItem('shopx_accent') as AccentColor) || 'orange',
  setAccent: (accent) => {
    localStorage.setItem('shopx_accent', accent);
    set({ accent });
  },
}));
