import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Check, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCurrencyStore } from '../store/useCurrencyStore';
import { useRecentViewedStore } from '../store/useRecentViewedStore';

interface ProductCardProps {
  product: Product;
  onQuickOrder?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickOrder,
  onQuickView,
}) => {
  const { addItem } = useCartStore();
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  const { lang } = useLanguageStore();
  const { formatPrice } = useCurrencyStore();
  const { addProduct: recordView } = useRecentViewedStore();

  const [isAdded, setIsAdded] = useState(false);

  const isLiked = isInWishlist(product._id);
  const title = lang === 'bn' && product.banglaTitle ? product.banglaTitle : product.title;
  const price = product.price;
  const discountPrice = product.discountPrice;
  const hasDiscount = discountPrice && discountPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  // Determine tag badge
  const getBadge = () => {
    if (product.isOrganic) {
      return { text: lang === 'bn' ? 'অর্গানিক' : 'Organic', bg: 'bg-emerald-600 text-white' };
    }
    if (hasDiscount && discountPercentage >= 20) {
      return { text: lang === 'bn' ? `ছাড় -${discountPercentage}%` : `Sale -${discountPercentage}%`, bg: 'bg-rose-500 text-white' };
    }
    if ((product.soldCount || 0) > 30) {
      return { text: lang === 'bn' ? 'বেস্ট সেলার' : 'Best Seller', bg: 'bg-amber-500 text-white' };
    }
    return { text: lang === 'bn' ? 'জেনুইন' : 'Genuine', bg: 'bg-emerald-700 text-white' };
  };

  const badge = getBadge();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  // Category name extraction
  const getCategoryLabel = () => {
    if (typeof product.category === 'object' && product.category) {
      return lang === 'bn' ? (product.category as any).banglaName || (product.category as any).name : (product.category as any).name;
    }
    if (typeof product.category === 'string') {
      return product.category.replace('-', ' ');
    }
    return product.categorySlug ? product.categorySlug.replace('-', ' ') : 'General';
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden p-3.5">
      {/* Top Badges & Actions */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm ${badge.bg}`}>
          {badge.text}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isLiked) removeWishlist(product._id);
            else addWishlist(product);
          }}
          className="text-slate-300 hover:text-rose-500 transition p-1"
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link
        to={`/product/${product.slug}`}
        onClick={() => recordView(product)}
        className="relative block aspect-square bg-[#f8fafc] rounded-xl overflow-hidden mb-3"
      >
        <img
          src={product.thumbnail || product.images[0]}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View on Hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            recordView(product);
            if (onQuickView) onQuickView(product);
          }}
          className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-xl shadow opacity-0 group-hover:opacity-100 transition-opacity"
          title={lang === 'bn' ? 'কুইক ভিউ' : 'Quick View'}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </Link>

      {/* Body Details */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category info */}
          <span className="text-[11px] text-slate-400 font-medium capitalize">
            {getCategoryLabel()}
          </span>

          {/* Title */}
          <Link
            to={`/product/${product.slug}`}
            onClick={() => recordView(product)}
            className="block text-xs sm:text-sm font-bold text-slate-800 hover:text-emerald-700 transition line-clamp-2 leading-snug"
          >
            {title}
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-1 text-xs text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-[11px] text-slate-700">
              {product.rating || 4.9}
            </span>
            <span className="text-[10px] text-slate-400">
              ({product.soldCount || 18})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-sm sm:text-base font-extrabold text-emerald-800 font-mono">
              {formatPrice(discountPrice || price)}
            </div>
            {hasDiscount && (
              <div className="text-[11px] text-slate-400 line-through font-mono">
                {formatPrice(price)}
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition shadow-sm ${
              isAdded
                ? 'bg-emerald-800 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{lang === 'bn' ? 'যোগ হয়েছে' : 'Added'}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>{lang === 'bn' ? '+ কার্ট' : '+ Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
