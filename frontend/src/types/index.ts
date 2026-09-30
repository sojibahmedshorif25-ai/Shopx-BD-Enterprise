export interface Product {
  _id: string;
  title: string;
  banglaTitle?: string;
  slug: string;
  shortDescription: string;
  description: string;
  banglaDescription?: string;
  category: {
    _id: string;
    name: string;
    banglaName?: string;
    slug: string;
  } | string;
  categorySlug: string;
  brand?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  soldCount: number;
  sku: string;
  images: string[];
  thumbnail: string;
  variants: Array<{
    name: string;
    options: Array<{
      title: string;
      price: number;
      stock: number;
    }>;
  }>;
  attributes: Array<{ name: string; value: string }>;
  tags: string[];
  isOrganic: boolean;
  isFeatured: boolean;
  isFlashSale: boolean;
  flashSaleDiscountPercent?: number;
  deliveryInsideDhaka: number;
  deliveryOutsideDhaka: number;
  rating: number;
  numReviews: number;
  unit?: string;
  vendor?: {
    _id: string;
    storeName: string;
    storeSlug?: string;
    logo?: string;
    rating?: number;
    phone?: string;
    address?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  price: number;
}

export interface Category {
  _id: string;
  name: string;
  banglaName?: string;
  slug: string;
  icon: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'vendor' | 'admin' | 'rider';
  avatar?: string;
  gender?: 'male' | 'female' | 'other';
  dob?: string;
  division?: string;
  district?: string;
  upazila?: string;
  bio?: string;
  loyaltyCoins: number;
  addresses?: Array<{
    _id?: string;
    title: string;
    name?: string;
    phone?: string;
    division?: string;
    district?: string;
    upazila?: string;
    street: string;
    landmark?: string;
    isDefault: boolean;
  }>;
  vendor?: any;
}
