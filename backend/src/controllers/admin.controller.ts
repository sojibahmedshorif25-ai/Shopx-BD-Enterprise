import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { Vendor } from '../models/Vendor.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
import { Rider } from '../models/Rider.js';
import { Coupon } from '../models/Coupon.js';

export const getAdminStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalUsers,
      totalVendors,
      totalProducts,
      totalOrders,
      orders,
      totalRiders,
    ] = await Promise.all([
      User.countDocuments(),
      Vendor.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.find().sort({ createdAt: -1 }),
      Rider.countDocuments(),
    ]);

    let totalGMV = 0;
    let totalCommissionEarned = 0;

    orders.forEach((order) => {
      if (order.orderStatus !== 'cancelled') {
        totalGMV += order.totalAmount;
        order.items.forEach((item) => {
          totalCommissionEarned += item.vendorCommissionAmount || 0;
        });
      }
    });

    res.status(200).json({
      success: true,
      stats: {
        totalGMV,
        totalCommissionEarned,
        totalOrders,
        totalProducts,
        totalVendors,
        totalUsers,
        totalRiders,
        pendingOrders: orders.filter((o) => o.orderStatus === 'placed').length,
      },
      recentOrders: orders.slice(0, 10),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllVendors = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendors = await Vendor.find().populate('user', 'name email phone').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: vendors });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateVendorStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, commissionRate } = req.body;
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      res.status(404).json({ success: false, message: 'Vendor not found' });
      return;
    }

    if (status) vendor.status = status;
    if (commissionRate !== undefined) vendor.commissionRate = Number(commissionRate);

    await vendor.save();
    res.status(200).json({ success: true, message: 'Vendor updated successfully', data: vendor });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate('rider', 'name phone')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, search } = req.query;
    const query: any = {};

    if (role && role !== 'all') {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      total: users.length,
      users,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserRoleAndStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role, isActive, loyaltyCoins, name, phone } = req.body;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = Boolean(isActive);
    if (loyaltyCoins !== undefined) user.loyaltyCoins = Number(loyaltyCoins);
    if (name) user.name = name.trim();
    if (phone) user.phone = phone.trim();

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    if (user.email === 'sojibahmedshorif25@gmail.com') {
      res.status(403).json({ success: false, message: 'Cannot delete Super Admin account!' });
      return;
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User removed successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
