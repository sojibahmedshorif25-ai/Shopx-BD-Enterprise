import React, { useState, useEffect } from 'react';
import {
  Star,
  Trash2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
} from 'lucide-react';
import { api } from '../services/api';

export const ReviewsAdminPage: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<{ [id: string]: string }>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/reviews');
      if (res.data.success) {
        setReviews(res.data.reviews || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this customer review?')) return;
    try {
      const res = await api.delete(`/admin/reviews/${id}`);
      if (res.data.success) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete review');
    }
  };

  const handleReplySubmit = async (id: string) => {
    const text = replyText[id];
    if (!text || !text.trim()) return;
    try {
      const res = await api.post(`/admin/reviews/${id}/reply`, { reply: text.trim() });
      if (res.data.success) {
        setReviews((prev) =>
          prev.map((r) => (r._id === id ? { ...r, vendorReply: { reply: text.trim(), repliedAt: new Date() } } : r))
        );
        setActiveReplyId(null);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit reply');
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const matchSearch =
      r.userName?.toLowerCase().includes(search.toLowerCase()) ||
      r.comment?.toLowerCase().includes(search.toLowerCase()) ||
      r.product?.title?.toLowerCase().includes(search.toLowerCase());
    const matchRating = ratingFilter === null || r.rating === ratingFilter;
    return matchSearch && matchRating;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Customer Feedback & Rating Moderation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Customer Reviews & Ratings Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Moderate, filter, delete inappropriate feedback, and provide official verified ShopX responses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            Total Reviews: <strong className="text-white font-mono">{reviews.length}</strong>
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full sm:w-auto max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, product, or comment..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 outline-none focus:border-amber-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setRatingFilter(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              ratingFilter === null ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            All Ratings
          </button>
          {[5, 4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              onClick={() => setRatingFilter(ratingFilter === stars ? null : stars)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                ratingFilter === stars ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>{stars}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <Star className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-300">No customer reviews found</h4>
            <p className="text-xs text-slate-500 mt-1">Reviews submitted on product detail pages will show up here.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                    {rev.userName?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{rev.userName}</h4>
                      {rev.isVerifiedPurchase && (
                        <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                          ✓ Verified Buyer
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {new Date(rev.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-white ml-1 font-mono">{rev.rating}.0</span>
                  </div>

                  <button
                    onClick={() => handleDelete(rev._id)}
                    className="p-2 rounded-xl bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 border border-rose-800 transition"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Reference */}
              {rev.product && (
                <div className="flex items-center gap-2 text-xs bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                  <span className="text-slate-500">Product:</span>
                  <strong className="text-white truncate">{rev.product.title}</strong>
                </div>
              )}

              {/* Review Text */}
              <p className="text-sm text-slate-200 leading-relaxed">{rev.comment}</p>

              {/* Official Vendor / Admin Reply */}
              {rev.vendorReply?.reply ? (
                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Official Verified ShopX Reply:</span>
                  </div>
                  <p className="text-slate-300">{rev.vendorReply.reply}</p>
                </div>
              ) : activeReplyId === rev._id ? (
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <textarea
                    rows={2}
                    value={replyText[rev._id] || ''}
                    onChange={(e) => setReplyText({ ...replyText, [rev._id]: e.target.value })}
                    placeholder="Write official ShopX support reply..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-emerald-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveReplyId(null)}
                      className="px-3 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReplySubmit(rev._id)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      Post Reply
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setActiveReplyId(rev._id)}
                  className="text-xs font-bold text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reply to customer</span>
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
