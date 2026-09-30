import { create } from 'zustand';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const loadWishlist = (): Product[] => {
  try {
    const saved = localStorage.getItem('shopx_wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: loadWishlist(),

  addItem: (product: Product) => {
    set((state) => {
      if (state.items.some((item) => item._id === product._id)) {
        return state;
      }
      const newItems = [...state.items, product];
      localStorage.setItem('shopx_wishlist', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  removeItem: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter((item) => item._id !== productId);
      localStorage.setItem('shopx_wishlist', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  isInWishlist: (productId: string) => {
    return get().items.some((item) => item._id === productId);
  },

  clearWishlist: () => {
    localStorage.removeItem('shopx_wishlist');
    set({ items: [] });
  },
}));
