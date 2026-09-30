import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, DistrictData, Language, Product } from "@/types";
import { districts, products } from "./data";

interface StoreState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;

  selectedDistrict: DistrictData;
  setSelectedDistrict: (district: DistrictData) => void;
  selectedThana: string;
  setSelectedThana: (thana: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  activeProductModal: Product | null;
  setActiveProductModal: (prod: Product | null) => void;

  activePriceHistoryProduct: Product | null;
  setActivePriceHistoryProduct: (prod: Product | null) => void;

  isDarazComparisonOpen: boolean;
  setIsDarazComparisonOpen: (open: boolean) => void;

  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  isDataSaverActive: boolean;
  toggleDataSaver: () => void;
}

export const useBazaarStore = create<StoreState>()(
  persist(
    (set, get) => ({
      language: "bn",
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === "bn" ? "en" : "bn" })),

      selectedDistrict: districts[0], // Default Dhaka
      setSelectedDistrict: (district) =>
        set({
          selectedDistrict: district,
          selectedThana: district.thanas[0] || "",
        }),
      selectedThana: districts[0].thanas[0],
      setSelectedThana: (thana) => set({ selectedThana: thana }),

      cart: [
        {
          product: products[0],
          quantity: 1,
        },
      ],
      addToCart: (product, quantity = 1) => {
        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex(
          (item) => item.product.id === product.id
        );
        if (existingIndex > -1) {
          const updated = [...currentCart];
          updated[existingIndex].quantity += quantity;
          set({ cart: updated, isCartOpen: true });
        } else {
          set({
            cart: [...currentCart, { product, quantity }],
            isCartOpen: true,
          });
        }
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
      isCartOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),

      wishlist: ["bx-prod-002"],
      toggleWishlist: (productId) => {
        const current = get().wishlist;
        if (current.includes(productId)) {
          set({ wishlist: current.filter((id) => id !== productId) });
        } else {
          set({ wishlist: [...current, productId] });
        }
      },

      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: "all",
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      activeProductModal: null,
      setActiveProductModal: (prod) => set({ activeProductModal: prod }),

      activePriceHistoryProduct: null,
      setActivePriceHistoryProduct: (prod) =>
        set({ activePriceHistoryProduct: prod }),

      isDarazComparisonOpen: false,
      setIsDarazComparisonOpen: (open) =>
        set({ isDarazComparisonOpen: open }),

      isOrderTrackingOpen: false,
      setIsOrderTrackingOpen: (open) => set({ isOrderTrackingOpen: open }),

      isCheckoutOpen: false,
      setIsCheckoutOpen: (open) => set({ isCheckoutOpen: open }),

      isDataSaverActive: false,
      toggleDataSaver: () =>
        set((state) => ({ isDataSaverActive: !state.isDataSaverActive })),
    }),
    {
      name: "bazaarx-session-storage",
      partialize: (state) => ({
        language: state.language,
        selectedDistrict: state.selectedDistrict,
        cart: state.cart,
        wishlist: state.wishlist,
        isDataSaverActive: state.isDataSaverActive,
      }),
    }
  )
);
