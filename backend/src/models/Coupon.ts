import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountAmount: number;
  minOrderAmount: number;
  maxDiscount?: number;
  validUntil: Date;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], default: 'fixed' },
    discountAmount: { type: Number, required: true },
    minOrderAmount: { type: Number, default: 0 },
    maxDiscount: { type: Number },
    validUntil: { type: Date, required: true },
    usageLimit: { type: Number, default: 1000 },
    usedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model<ICoupon>('Coupon', CouponSchema);
