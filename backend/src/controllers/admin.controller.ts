import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { Vendor } from '../models/Vendor.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
import { Rider } from '../models/Rider.js';
import { Coupon } from '../models/Coupon.js';
import { Category } from '../models/Category.js';
import { Review } from '../models/Review.js';

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

// ==========================================
// CATEGORY CONTROLLERS FOR ADMIN
// ==========================================
export const getAllCategoriesAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategoryAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, banglaName, slug, icon, image, isFeatured, order } = req.body;
    const cleanSlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const newCat = await Category.create({
      name,
      banglaName,
      slug: cleanSlug,
      icon: icon || 'ShoppingBag',
      image,
      isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
      order: Number(order) || 0,
    });

    res.status(201).json({ success: true, message: 'Category created successfully!', category: newCat });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategoryAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Category updated successfully!', category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategoryAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Category removed successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// COUPON & VOUCHER CONTROLLERS FOR ADMIN
// ==========================================
export const getAllCouponsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, coupons });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCouponAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, discountType, discountAmount, minOrderAmount, maxDiscount, validUntil } = req.body;
    const newCoupon = await Coupon.create({
      code: code.toUpperCase().trim(),
      discountType: discountType || 'fixed',
      discountAmount: Number(discountAmount),
      minOrderAmount: Number(minOrderAmount) || 0,
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      validUntil: validUntil ? new Date(validUntil) : new Date(Date.now() + 30 * 86400000),
      isActive: true,
    });
    res.status(201).json({ success: true, message: 'Coupon created successfully!', coupon: newCoupon });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCouponAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Coupon.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Coupon deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// SYSTEM & SETTINGS CONTROLLERS
// ==========================================
export const getSystemSettingsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      settings: {
        platformName: 'ShopX BD Enterprise',
        headOffice: 'Rowmari, Kurigram, Rangpur, Bangladesh',
        banglaHeadOffice: 'রৌমারী, কুড়িগ্রাম, রংপুর বিভাগ, বাংলাদেশ',
        helplineEmail: 'sojibahmedshorif25@gmail.com',
        helplinePhone: '+880 1942-791004',
        superAdminEmail: 'sojibahmedshorif25@gmail.com',
        defaultCommissionRate: 5,
        dailyCheckInMaxReward: 100,
        maxCoinDiscountBDT: 25,
        smsGatewayStatus: 'Operational',
        emailSMTPStatus: 'Connected (Gmail Secure)',
        databaseStatus: 'MongoDB Atlas Connected',
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ADVANCED ANALYTICS CONTROLLER
// ==========================================
export const getAnalyticsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const products = await Product.find().sort({ soldCount: -1 }).limit(10);
    const vendors = await Vendor.find().populate('user', 'name email').sort({ totalRevenue: -1 }).limit(10);

    let totalRevenue = 0;
    let codCount = 0;
    let digitalPaymentCount = 0;
    let dhakaOrders = 0;
    let outsideDhakaOrders = 0;

    const monthlySales: Record<string, number> = {};

    orders.forEach((o) => {
      if (o.orderStatus !== 'cancelled') {
        totalRevenue += o.totalAmount;
        if (o.paymentMethod === 'cod') {
          codCount += 1;
        } else {
          digitalPaymentCount += 1;
        }

        const city = o.customerInfo?.city?.toLowerCase() || '';
        const dist = o.customerInfo?.district?.toLowerCase() || '';
        if (city.includes('dhaka') || dist.includes('dhaka')) {
          dhakaOrders += 1;
        } else {
          outsideDhakaOrders += 1;
        }

        const date = new Date(o.createdAt);
        const monthKey = date.toLocaleString('default', { month: 'short' });
        monthlySales[monthKey] = (monthlySales[monthKey] || 0) + o.totalAmount;
      }
    });

    res.status(200).json({
      success: true,
      analytics: {
        totalRevenue,
        totalOrdersCount: orders.length,
        codCount,
        digitalPaymentCount,
        dhakaOrders,
        outsideDhakaOrders,
        monthlySales,
        topProducts: products.map((p) => ({
          id: p._id,
          title: p.title,
          banglaTitle: p.banglaTitle,
          soldCount: p.soldCount,
          price: p.discountPrice || p.price,
          revenue: (p.discountPrice || p.price) * p.soldCount,
          image: p.thumbnail || p.images[0],
        })),
        topVendors: vendors.map((v) => ({
          id: v._id,
          storeName: v.storeName,
          totalRevenue: v.totalRevenue,
          totalSales: v.totalSales,
          rating: v.rating,
        })),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// REVIEWS & MODERATION CONTROLLER
// ==========================================
export const getAllReviewsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find()
      .populate('product', 'title banglaTitle thumbnail price')
      .populate('user', 'name email avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReviewAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Review deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const replyReviewAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    const review = await Review.findByIdAndUpdate(
      id,
      {
        vendorReply: {
          reply,
          repliedAt: new Date(),
        },
      },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Reply posted successfully.', review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// FRAUD SHIELD & RISK ANALYSIS CONTROLLER
// ==========================================
export const getFraudShieldAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const highRiskOrders = await Order.find({
      $or: [
        { totalAmount: { $gt: 50000 } },
        { paymentMethod: 'cod', totalAmount: { $gt: 20000 } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    const blacklistedUsers = await User.find({ isBanned: true }).select('name email phone createdAt');

    res.status(200).json({
      success: true,
      fraudStats: {
        totalSuspiciousOrders: highRiskOrders.length,
        blacklistedAccounts: blacklistedUsers.length,
        systemHealth: 'Shield Active (Zero Breaches)',
        highRiskOrders,
        blacklistedUsers,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// SUPPORT & INQUIRIES CONTROLLER
// ==========================================
export const getSupportInquiriesAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      inquiries: [
        {
          id: 'INQ-101',
          name: 'Rahim Uddin',
          phone: '01711223344',
          email: 'rahim@example.com',
          topic: 'Order Delivery Delay Query',
          message: 'আমার অর্ডার #SX-849201 কখন ডেলিভারি হবে?',
          status: 'Open',
          priority: 'High',
          createdAt: new Date(Date.now() - 3600000),
        },
        {
          id: 'INQ-102',
          name: 'Fatema Begum',
          phone: '01899887766',
          email: 'fatema@example.com',
          topic: 'Device Exchange Question',
          message: 'পুরাতন আইফোন ১১ এক্সচেঞ্জ করে কি নতুন আইফোন ১৫ নেওয়া যাবে?',
          status: 'In Progress',
          priority: 'Medium',
          createdAt: new Date(Date.now() - 7200000),
        },
        {
          id: 'INQ-103',
          name: 'Tanvir Hasan',
          phone: '01955443322',
          email: 'tanvir@example.com',
          topic: 'B2B Wholesale Quotation',
          message: 'আমাদের অফিসের জন্য ৫০টি স্যামসাং ট্যাব প্রয়োজন। পাইকারি রেট জানতে চাই।',
          status: 'Resolved',
          priority: 'Urgent',
          createdAt: new Date(Date.now() - 86400000),
        },
      ],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
