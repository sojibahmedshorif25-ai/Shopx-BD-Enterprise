import { Request, Response } from 'express';
import { Rider } from '../models/Rider.js';
import { User } from '../models/User.js';
import { Order } from '../models/Order.js';

// 1. Submit Application for Delivery Hero / Rider
export const applyForRider = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, email, vehicleType, vehicleNumber, nidNumber, drivingLicense, cityHub, pin } = req.body;

    if (!name || !phone) {
      res.status(400).json({ success: false, message: 'নাম এবং মোবাইল নম্বর আবশ্যক।' });
      return;
    }

    const cleanPhone = phone.trim();
    let user = await User.findOne({ phone: cleanPhone });

    if (!user) {
      user = await User.create({
        name,
        phone: cleanPhone,
        email: email?.trim() || `rider_${Date.now()}@shopxbd.com`,
        password: pin || '1234',
        role: 'rider',
        isVerified: true,
      });
    } else {
      user.role = 'rider';
      if (pin) user.password = pin;
      await user.save();
    }

    let rider = await Rider.findOne({ user: user._id });
    if (!rider) {
      rider = await Rider.create({
        user: user._id,
        name,
        phone: cleanPhone,
        email: email?.trim() || user.email,
        vehicleType: vehicleType || 'bike',
        vehicleNumber: vehicleNumber || 'ঢাকা মেট্রো হ-৪৪৯১',
        nidNumber,
        drivingLicense,
        cityHub: cityHub || 'Dhaka Hub',
        status: 'pending',
        isOnline: true,
      });
    } else {
      rider.name = name;
      rider.phone = cleanPhone;
      rider.vehicleType = vehicleType || rider.vehicleType;
      rider.vehicleNumber = vehicleNumber || rider.vehicleNumber;
      rider.cityHub = cityHub || rider.cityHub;
      rider.status = 'pending';
      await rider.save();
    }

    res.status(201).json({
      success: true,
      message: '✅ ডেলিভারি রাইডার হিসেবে আপনার আবেদন সফলভাবে জমা হয়েছে! এডমিন পর্যালোচনা করে অ্যাপ্রুভ করার সাথে সাথেই আপনি ডেলিভারি শুরু করতে পারবেন।',
      data: rider,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Admin: Get all riders with status and live GPS
export const getAllRidersAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const riders = await Rider.find().populate('user', 'name phone email avatar').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: riders.length, data: riders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Admin: Approve or Reject Rider
export const updateRiderApprovalStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' | 'rejected' | 'pending'

    const rider = await Rider.findById(id);
    if (!rider) {
      res.status(404).json({ success: false, message: 'রাইডার খুঁজে পাওয়া যায়নি।' });
      return;
    }

    rider.status = status;
    await rider.save();

    res.status(200).json({
      success: true,
      message: `রাইডার স্ট্যাটাস সফলভাবে '${status}' করা হয়েছে।`,
      data: rider,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Get Online Riders for Dispatch & Tracking
export const getRiderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const riders = await Rider.find({ status: 'approved' });
    res.status(200).json({ success: true, data: riders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Update Real-Time Rider GPS Location
export const updateRiderLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { riderId, lat, lng, address } = req.body;
    const rider = await Rider.findById(riderId);

    if (!rider) {
      res.status(404).json({ success: false, message: 'Rider not found' });
      return;
    }

    rider.currentLocation = {
      lat: Number(lat),
      lng: Number(lng),
      address: address || rider.currentLocation.address,
      lastUpdated: new Date(),
    };

    await rider.save();
    res.status(200).json({ success: true, data: rider.currentLocation });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

