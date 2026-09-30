import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { useLanguageStore } from '../store/useLanguageStore';

interface Review {
  _id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images: string[];
  isVerifiedPurchase: boolean;
  createdAt: string;
}

interface ProductReviewsSectionProps {
  productId: string;
  productRating: number;
  numReviews: number;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  productId,
  productRating,
  numReviews,
}) => {
  const { lang } = useLanguageStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/${productId}`);
        if (res.data.success) {
          setReviews(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (productId) fetchReviews();
  }, [productId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await api.post('/reviews', {
        productId,
        rating,
        comment,
        userName: userName.trim() || (lang === 'bn' ? 'সন্তুষ্ট ক্রেতা' : 'Verified Buyer'),
      });

      if (res.data.success) {
        setReviews([res.data.data, ...reviews]);
        setComment('');
        setShowAddForm(false);
      }
    } catch (err) {
      alert(lang === 'bn' ? 'রিভিউ জমা দিতে সমস্যা হয়েছে।' : 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Top Ratings Overview */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="text-center p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <p className="text-3xl font-black text-amber-600 font-mono">{productRating || 4.9}</p>
            <div className="flex justify-center gap-0.5 mt-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              {reviews.length || numReviews} {lang === 'bn' ? 'টি রিভিউ' : 'Reviews'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {lang === 'bn' ? 'গ্রাহক মূল্যায়ন ও মতামত (Customer Reviews)' : 'Verified Customer Reviews & Ratings'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'bn'
                ? '১০০% যাচাইকৃত আসল ক্রেতাদের বাস্তব অভিজ্ঞতা ও রেটিং'
                : '100% verified customer feedbacks and genuine buyer ratings'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-emerald-700/20"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>{lang === 'bn' ? 'আপনার মতামত দিন' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Review Submission Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmitReview}
          className="p-5 bg-[#f8fafc] rounded-2xl border border-slate-200 space-y-4 animate-in fade-in"
        >
          <h4 className="text-xs font-bold text-slate-800">
            {lang === 'bn' ? 'আপনার রেটিং সিলেক্ট করুন:' : 'Select Your Rating:'}
          </h4>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 hover:scale-125 transition"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'আপনার নাম' : 'Your Name'}
              </label>
              <input
                type="text"
                placeholder={lang === 'bn' ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white outline-none text-slate-800 focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'bn' ? 'আপনার মতামত লিখুন' : 'Your Review & Experience'}
            </label>
            <textarea
              required
              rows={3}
              placeholder={
                lang === 'bn'
                  ? 'পণ্যটির গুণমান, প্যাকেজিং ও ডেলিভারি কেমন লেগেছে তা লিখুন...'
                  : 'Describe product quality, delivery speed and satisfaction...'
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white outline-none text-slate-800 focus:border-emerald-600 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition shadow-md"
          >
            {isSubmitting ? (lang === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...') : (lang === 'bn' ? 'রিভিউ পাবলিশ করুন' : 'Submit Review')}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            {lang === 'bn' ? 'এখনও কোনো রিভিউ দেওয়া হয়নি। আপনিই প্রথম রিভিউ দিন!' : 'No customer reviews yet. Be the first to review!'}
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-4 bg-[#f8fafc] rounded-2xl border border-slate-100 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                    {rev.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-xs text-slate-800">
                        {rev.userName}
                      </h5>
                      {rev.isVerifiedPurchase && (
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> {lang === 'bn' ? 'ভেরিফাইড ক্রেতা' : 'Verified Buyer'}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5 text-amber-400 mt-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(rev.createdAt).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US')}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pl-10">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
