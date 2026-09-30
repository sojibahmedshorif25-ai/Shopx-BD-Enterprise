import mongoose, { Document, Schema } from 'mongoose';

export interface IQA extends Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  userName: string;
  question: string;
  answer?: string;
  answeredBy?: string;
  answeredAt?: Date;
  isAnswered: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QASchema = new Schema<IQA>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    userName: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String },
    answeredBy: { type: String, default: 'ShopX Official Support' },
    answeredAt: { type: Date },
    isAnswered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const QA = mongoose.model<IQA>('QA', QASchema);
