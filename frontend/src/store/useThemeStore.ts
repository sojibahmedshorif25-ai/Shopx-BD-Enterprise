import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => {
  const saved = localStorage.getItem('shopx_theme');
  const isDark = saved === 'dark';
  if (isDark) {
    document.documentElement.classList.add('dark');
  }

  return {
    isDark,
    toggleTheme: () => {
      const next = !get().isDark;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('shopx_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('shopx_theme', 'light');
      }
      set({ isDark: next });
    },
  };
});
