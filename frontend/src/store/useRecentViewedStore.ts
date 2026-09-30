import { create } from 'zustand';

export interface RecentProduct {
  _id: string;
  title: string;
  banglaTitle?: string;
  slug: string;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  categorySlug?: string;
  viewedAt: number;
}

interface RecentViewedState {
  items: RecentProduct[];
  isOpen: boolean;
  addProduct: (product: any) => void;
  clearAll: () => void;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

const STORAGE_KEY = 'shopx_recently_viewed';

const loadSavedItems = (): RecentProduct[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const useRecentViewedStore = create<RecentViewedState>((set, get) => ({
  items: loadSavedItems(),
  isOpen: false,
  addProduct: (product) => {
    if (!product || !product._id) return;
    const current = get().items.filter((i) => i._id !== product._id);
    const updated: RecentProduct[] = [
      {
        _id: product._id,
        title: product.title,
        banglaTitle: product.banglaTitle,
        slug: product.slug,
        price: product.price,
        discountPrice: product.discountPrice,
        thumbnail: product.thumbnail || product.images?.[0] || '',
        categorySlug: product.categorySlug,
        viewedAt: Date.now(),
      },
      ...current,
    ].slice(0, 12); // Keep last 12

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}

    set({ items: updated });
  },
  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ items: [] });
  },
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleOpen: () => set({ isOpen: !get().isOpen }),
}));
