import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface CompareState {
  compareItems: Product[];
  isOpen: boolean;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  openCompare: () => void;
  closeCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareItems: [],
      isOpen: false,
      addToCompare: (product) => {
        const items = get().compareItems;
        if (items.some((item) => item._id === product._id)) {
          return;
        }
        if (items.length >= 4) {
          // Keep max 4
          set({ compareItems: [...items.slice(1), product], isOpen: true });
        } else {
          set({ compareItems: [...items, product], isOpen: true });
        }
      },
      removeFromCompare: (productId) => {
        set({ compareItems: get().compareItems.filter((i) => i._id !== productId) });
      },
      clearCompare: () => set({ compareItems: [] }),
      openCompare: () => set({ isOpen: true }),
      closeCompare: () => set({ isOpen: false }),
    }),
    {
      name: 'shopx-compare-store',
    }
  )
);
