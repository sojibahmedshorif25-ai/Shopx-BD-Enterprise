import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { Vendor } from '../models/Vendor.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';

export const getVendorDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const vendor = await Vendor.findOne({ user: req.userId });
    if (!vendor) {
      res.status(200).json({
        success: true,
        data: {
          vendor: null,
          stats: {
            productsCount: 0,
            ordersCount: 0,
            totalRevenue: 0,
            balance: 0,
            rating: 5,
          },
          recentOrders: [],
        },
      });
      return;
    }

    const [productsCount, orders] = await Promise.all([
      Product.countDocuments({ vendor: vendor._id }),
      Order.find({ 'items.vendor': vendor._id }).sort({ createdAt: -1 }),
    ]);

    let totalRevenue = 0;
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.vendor.toString() === vendor._id.toString() && order.paymentStatus === 'paid') {
          totalRevenue += item.price * item.quantity;
        }
      });
    });

    res.status(200).json({
      success: true,
      data: {
        vendor,
        stats: {
          productsCount,
          ordersCount: orders.length,
          totalRevenue,
          balance: vendor.balance,
          rating: vendor.rating,
        },
        recentOrders: orders.slice(0, 10),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVendorProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const vendor = await Vendor.findOne({ user: req.userId });
    if (!vendor) {
      res.status(404).json({ success: false, message: 'Vendor profile not found' });
      return;
    }

    const products = await Product.find({ vendor: vendor._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
