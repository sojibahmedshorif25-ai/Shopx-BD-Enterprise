import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  vendor: mongoose.Types.ObjectId;
  title: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
  vendorCommissionAmount: number;
}

export interface IOrder extends Document {
  orderId: string; // Human-friendly e.g. SX-98421
  customer?: mongoose.Types.ObjectId;
  customerInfo: {
    name: string;
    phone: string;
    altPhone?: string;
    email?: string;
    address: string;
    city: string;
    district: string;
    division?: string;
    thana?: string;
    deliveryZone: 'inside_dhaka' | 'outside_dhaka';
    geoLocation?: {
      lat: number;
      lng: number;
      address?: string;
    };
  };
  items: IOrderItem[];
  subTotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: 'cod' | 'sslcommerz' | 'bkash' | 'nagad' | 'rocket' | 'upay';
  paymentStatus: 'pending' | 'pending_verification' | 'paid' | 'failed' | 'refunded';
  orderStatus:
    | 'placed'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'out_for_delivery'
    | 'delivered'
    | 'cancelled'
    | 'returned';
  senderNumber?: string;
  transactionId?: string;
  paymentScreenshot?: string;
  sslTransactionId?: string;
  sslBankTranId?: string;
  rider?: mongoose.Types.ObjectId;
  trackingHistory: Array<{
    status: string;
    message: string;
    location?: string;
    timestamp: Date;
  }>;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    customerInfo: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      altPhone: { type: String },
      email: { type: String },
      address: { type: String, required: true },
      city: { type: String, default: 'Dhaka' },
      district: { type: String, default: 'Dhaka' },
      division: { type: String, default: 'Dhaka' },
      thana: { type: String },
      deliveryZone: { type: String, enum: ['inside_dhaka', 'outside_dhaka'], default: 'inside_dhaka' },
      geoLocation: {
        lat: { type: Number, default: 23.8103 },
        lng: { type: Number, default: 90.4125 },
        address: { type: String },
      },
    },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
        title: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        variant: { type: String },
        vendorCommissionAmount: { type: Number, default: 0 },
      },
    ],
    subTotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true, default: 60 },
    discount: { type: Number, default: 0 },
    couponCode: { type: String },
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cod', 'sslcommerz', 'bkash', 'nagad', 'rocket', 'upay'],
      default: 'cod',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'pending_verification', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    senderNumber: { type: String },
    transactionId: { type: String },
    paymentScreenshot: { type: String },
    orderStatus: {
      type: String,
      enum: [
        'placed',
        'confirmed',
        'processing',
        'shipped',
        'out_for_delivery',
        'delivered',
        'cancelled',
        'returned',
      ],
      default: 'placed',
    },
    sslTransactionId: { type: String },
    sslBankTranId: { type: String },
    rider: { type: Schema.Types.ObjectId, ref: 'Rider', default: null },
    trackingHistory: [
      {
        status: { type: String, required: true },
        message: { type: String, required: true },
        location: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    notes: { type: String },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
