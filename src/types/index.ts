export type Language = 'bn' | 'en';

export interface PriceHistoryPoint {
  date: string;
  price: number;
  event?: string;
  note?: string;
  isLowest?: boolean;
}

export interface SellerInfo {
  id: string;
  name: string;
  nameBn: string;
  rating: number; // e.g. 4.9
  ratingCount: number;
  shipOnTime: number; // percentage e.g. 99
  chatResponseRate: number; // percentage e.g. 98
  isOfficialMall: boolean; // BazaarMall
  tradeLicenseVerified: boolean;
  joinDate: string;
  district: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  district: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  userImages?: string[];
  helpfulCount: number;
}

export interface Product {
  id: string;
  titleEn: string;
  titleBn: string;
  slug: string;
  brand: string;
  category: string;
  categoryBn: string;
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  priceHistory: PriceHistoryPoint[];
  rating: number;
  reviewCount: number;
  stock: number;
  soldCount: number;
  isFlashDeal?: boolean;
  flashDiscount?: number;
  isBazaarMall?: boolean;
  isDarazPriceBeater?: boolean;
  images: string[];
  thumbnail: string;
  descriptionEn: string;
  descriptionBn: string;
  keyFeaturesEn: string[];
  keyFeaturesBn: string[];
  specifications: Record<string, string>;
  seller: SellerInfo;
  reviews: ReviewItem[];
  shipping: {
    dhakaFee: number;
    outsideDhakaFee: number;
    estimatedDhakaDays: string;
    estimatedOutsideDays: string;
    freeShippingThreshold: number;
    expressDeliveryAvailable: boolean;
  };
  returnPolicy: {
    days: number;
    instantWalletRefund: boolean;
    doorstepPickup: boolean;
  };
  warrantyTextEn: string;
  warrantyTextBn: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface DistrictData {
  id: string;
  nameEn: string;
  nameBn: string;
  divisionEn: string;
  divisionBn: string;
  shippingFee: number;
  deliveryEstimateDays: string;
  thanas: string[];
}

export interface PaymentOption {
  id: 'bkash' | 'nagad' | 'rocket' | 'shurjopay' | 'cod' | 'wallet';
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  iconName: string;
  badge?: string;
  instantCashback?: string;
}
