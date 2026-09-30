import mongoose, { Document, Schema } from 'mongoose';

export interface IBanner extends Document {
  title: string;
  subtitle?: string;
  banglaTitle?: string;
  banglaSubtitle?: string;
  image: string;
  mobileImage?: string;
  linkUrl: string;
  position: 'hero' | 'promo_top' | 'promo_middle' | 'sidebar';
  order: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    banglaTitle: { type: String },
    banglaSubtitle: { type: String },
    image: { type: String, required: true },
    mobileImage: { type: String },
    linkUrl: { type: String, default: '/products' },
    position: {
      type: String,
      enum: ['hero', 'promo_top', 'promo_middle', 'sidebar'],
      default: 'hero',
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

export const Banner = mongoose.model<IBanner>('Banner', BannerSchema);
