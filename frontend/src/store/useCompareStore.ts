import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface CompareState {
  items: Product[];
  compareItems: Product[];
  isOpen: boolean;
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  setIsOpen: (isOpen: boolean) => void;
  openCompare: () => void;
  closeCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      get compareItems() {
        return get().items;
      },
      isOpen: false,
      addToCompare: (product: Product) => {
        const { items } = get();
        if (items.some((p) => p._id === product._id)) {
          return false;
        }
        if (items.length >= 4) {
          alert('You can compare up to 4 products at a time.');
          return false;
        }
        set({ items: [...items, product] });
        return true;
      },
      removeFromCompare: (productId: string) => {
        set({ items: get().items.filter((p) => p._id !== productId) });
      },
      clearCompare: () => set({ items: [] }),
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
      openCompare: () => set({ isOpen: true }),
      closeCompare: () => set({ isOpen: false }),
      isInCompare: (productId: string) => {
        return get().items.some((p) => p._id === productId);
      },
    }),
    {
      name: 'shopx-compare-storage',
    }
  )
);
