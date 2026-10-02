import mongoose, { Document, Schema } from 'mongoose';

export interface IRider extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email?: string;
  vehicleType: 'bike' | 'bicycle' | 'van';
  vehicleNumber?: string;
  nidNumber?: string;
  drivingLicense?: string;
  cityHub?: string;
  status: 'pending' | 'approved' | 'rejected';
  currentLocation: {
    lat: number;
    lng: number;
    lastUpdated: Date;
    address?: string;
  };
  isOnline: boolean;
  activeOrder?: mongoose.Types.ObjectId;
  completedDeliveries: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const RiderSchema = new Schema<IRider>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    vehicleType: { type: String, enum: ['bike', 'bicycle', 'van'], default: 'bike' },
    vehicleNumber: { type: String },
    nidNumber: { type: String },
    drivingLicense: { type: String },
    cityHub: { type: String, default: 'Dhaka Central Hub' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    currentLocation: {
      lat: { type: Number, default: 23.8103 },
      lng: { type: Number, default: 90.4125 }, // Default Dhaka
      lastUpdated: { type: Date, default: Date.now },
      address: { type: String, default: 'Dhaka Central Logistics Hub' },
    },
    isOnline: { type: Boolean, default: true },
    activeOrder: { type: Schema.Types.ObjectId, ref: 'Order', default: null },
    completedDeliveries: { type: Number, default: 0 },
    rating: { type: Number, default: 4.9 },
  },
  { timestamps: true }
);

export const Rider = mongoose.model<IRider>('Rider', RiderSchema);

