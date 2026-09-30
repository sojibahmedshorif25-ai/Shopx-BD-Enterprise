import { create } from 'zustand';
import { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  couponCode: string;
  discount: number;
  deliveryZone: 'inside_dhaka' | 'outside_dhaka';
  addItem: (product: Product, quantity?: number, selectedVariant?: string, price?: number) => void;
  removeItem: (productId: string, selectedVariant?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedVariant?: string) => void;
  clearCart: () => void;
  setDrawerOpen: (isOpen: boolean) => void;
  setDeliveryZone: (zone: 'inside_dhaka' | 'outside_dhaka') => void;
  setCoupon: (code: string, discount: number) => void;
  getSubTotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

const loadInitialCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('shopx_cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  items: loadInitialCart(),
  isDrawerOpen: false,
  couponCode: '',
  discount: 0,
  deliveryZone: 'inside_dhaka',

  addItem: (product, quantity = 1, selectedVariant, overridePrice) => {
    set((state) => {
      const price = overridePrice || product.discountPrice || product.price;
      const existingIndex = state.items.findIndex(
        (item) => item.product._id === product._id && item.selectedVariant === selectedVariant
      );

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
      } else {
        newItems = [...state.items, { product, quantity, selectedVariant, price }];
      }

      localStorage.setItem('shopx_cart', JSON.stringify(newItems));
      return { items: newItems, isDrawerOpen: true };
    });
  },

  removeItem: (productId, selectedVariant) => {
    set((state) => {
      const newItems = state.items.filter(
        (item) => !(item.product._id === productId && item.selectedVariant === selectedVariant)
      );
      localStorage.setItem('shopx_cart', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  updateQuantity: (productId, quantity, selectedVariant) => {
    set((state) => {
      if (quantity <= 0) {
        const newItems = state.items.filter(
          (item) => !(item.product._id === productId && item.selectedVariant === selectedVariant)
        );
        localStorage.setItem('shopx_cart', JSON.stringify(newItems));
        return { items: newItems };
      }

      const newItems = state.items.map((item) => {
        if (item.product._id === productId && item.selectedVariant === selectedVariant) {
          return { ...item, quantity };
        }
        return item;
      });

      localStorage.setItem('shopx_cart', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  clearCart: () => {
    localStorage.removeItem('shopx_cart');
    set({ items: [], couponCode: '', discount: 0 });
  },

  setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
  setDeliveryZone: (zone) => set({ deliveryZone: zone }),
  setCoupon: (code, discount) => set({ couponCode: code, discount }),

  getSubTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getDeliveryFee: () => {
    return get().deliveryZone === 'outside_dhaka' ? 120 : 60;
  },

  getTotal: () => {
    const subTotal = get().getSubTotal();
    const delivery = get().getDeliveryFee();
    const discount = get().discount;
    return Math.max(0, subTotal + delivery - discount);
  },
}));
