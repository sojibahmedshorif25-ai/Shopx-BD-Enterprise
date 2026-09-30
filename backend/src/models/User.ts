import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: 'customer' | 'vendor' | 'admin' | 'rider';
  avatar?: string;
  gender?: 'male' | 'female' | 'other';
  dob?: string;
  division?: string;
  district?: string;
  upazila?: string;
  bio?: string;
  googleId?: string;
  facebookId?: string;
  isVerified: boolean;
  isActive: boolean;
  loyaltyCoins: number;
  lastCheckInDate?: Date;
  checkInStreak?: number;
  addresses: Array<{
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
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, select: false },
    role: {
      type: String,
      enum: ['customer', 'vendor', 'admin', 'rider'],
      default: 'customer',
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/wb19kgrx/image/upload/v1/shopx/avatars/default-user.png',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    dob: { type: String },
    division: { type: String },
    district: { type: String },
    upazila: { type: String },
    bio: { type: String },
    googleId: { type: String },
    facebookId: { type: String },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    loyaltyCoins: { type: Number, default: 50 }, // 50 welcome coins
    lastCheckInDate: { type: Date },
    checkInStreak: { type: Number, default: 0 },
    addresses: [
      {
        title: { type: String, default: 'Home' },
        name: { type: String },
        phone: { type: String },
        division: { type: String },
        district: { type: String },
        upazila: { type: String },
        street: { type: String },
        landmark: { type: String },
        isDefault: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
