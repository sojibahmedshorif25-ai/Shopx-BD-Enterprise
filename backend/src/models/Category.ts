import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  banglaName?: string;
  slug: string;
  icon: string;
  image?: string;
  parent?: mongoose.Types.ObjectId;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    banglaName: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    icon: { type: String, default: 'ShoppingBag' },
    image: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    isFeatured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
