import { Request, Response } from 'express';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { Coupon } from '../models/Coupon.js';
import { Rider } from '../models/Rider.js';
import { AuthRequest } from '../middleware/auth.js';
import { sendEmail, generateOrderEmailTemplate } from '../config/mail.js';

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: 'অর্ডার সম্পন্ন করতে প্রথমে আপনার অ্যাকাউন্টে লগইন বা সাইন আপ করুন (Please login or create an account to place an order).',
      });
      return;
    }

    const {
      customerInfo,
      items,
      paymentMethod = 'cod',
      senderNumber,
      transactionId,
      paymentScreenshot,
      couponCode,
      notes,
    } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ success: false, message: 'Cart cannot be empty.' });
      return;
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      res.status(400).json({
        success: false,
        message: 'Name, phone number, and delivery address are required.',
      });
      return;
    }

    let subTotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        res.status(400).json({ success: false, message: `Product not found: ${item.productId}` });
        return;
      }

      const itemPrice = product.discountPrice || product.price;
      const quantity = Number(item.quantity) || 1;
      subTotal += itemPrice * quantity;

      // Update sold count
      product.soldCount += quantity;
      product.stock = Math.max(0, product.stock - quantity);
      await product.save();

      orderItems.push({
        product: product._id,
        vendor: product.vendor,
        title: product.title,
        image: product.thumbnail || (product.images && product.images[0]) || '',
        price: itemPrice,
        quantity,
        variant: item.variant || '',
        vendorCommissionAmount: (itemPrice * quantity * 0.05), // 5% default
      });
    }

    const deliveryFee = customerInfo.deliveryZone === 'outside_dhaka' ? 120 : 60;
    let discount = 0;

    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        validUntil: { $gte: new Date() },
      });

      if (coupon && subTotal >= coupon.minOrderAmount) {
        if (coupon.discountType === 'percentage') {
          discount = (subTotal * coupon.discountAmount) / 100;
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discountAmount;
        }
        coupon.usedCount += 1;
        await coupon.save();
      }
    }

    // Coins Discount (100 coins = 10 BDT, Max 25 BDT discount)
    const coinsCount = Number(req.body.coinsUsed) || 0;
    if (coinsCount > 0 && req.userId) {
      const user = await User.findById(req.userId);
      if (user && user.loyaltyCoins > 0) {
        const availableCoins = user.loyaltyCoins;
        const requestedCoins = Math.min(availableCoins, coinsCount);
        const coinsDiscount = Math.min(25, Math.floor(requestedCoins / 10));
        const actualCoinsDeducted = coinsDiscount * 10;
        user.loyaltyCoins = Math.max(0, user.loyaltyCoins - actualCoinsDeducted);
        await user.save();
        discount += coinsDiscount;
      }
    }

    const totalAmount = Math.max(0, subTotal + deliveryFee - discount);
    const orderId = 'SX-' + Math.floor(100000 + Math.random() * 900000);

    const isDirectMobilePayment = ['bkash', 'nagad', 'rocket', 'upay'].includes(paymentMethod);
    const paymentStatus = isDirectMobilePayment ? 'pending_verification' : 'pending';

    const order = await Order.create({
      orderId,
      customer: req.userId || null,
      customerInfo,
      items: orderItems,
      subTotal,
      deliveryFee,
      discount,
      couponCode,
      totalAmount,
      paymentMethod,
      paymentStatus,
      senderNumber,
      transactionId,
      paymentScreenshot,
      orderStatus: 'placed',
      notes,
      trackingHistory: [
        {
          status: 'placed',
          message: isDirectMobilePayment
            ? `অর্ডার সম্পন্ন হয়েছে। (${paymentMethod.toUpperCase()} TrxID: ${transactionId || 'N/A'} পেমেন্ট ভেরিফিকেশন অপেক্ষমাণ)`
            : 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে (Order Placed Successfully)',
          location: 'Dhaka Central Hub',
          timestamp: new Date(),
        },
      ],
    });

    // Reward loyalty coins if registered user
    if (req.userId) {
      await User.findByIdAndUpdate(req.userId, { $inc: { loyaltyCoins: 20 } });
    }

    // Send confirmation email if email provided
    if (customerInfo.email) {
      const lang = (req.body.lang === 'en') ? 'en' : 'bn';
      const subject = lang === 'en'
        ? `🛍️ ShopX BD Order Confirmed — #${order.orderId}`
        : `🛍️ ShopX BD অর্ডার নিশ্চিতকরণ — #${order.orderId}`;

      sendEmail({
        to: customerInfo.email,
        subject,
        html: generateOrderEmailTemplate(order, lang),
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবে।',
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const trackOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, phone } = req.query;

    const query: any = {};
    if (orderId) {
      // Limit length and take first word/line
      const rawId = String(orderId).split('\n')[0].substring(0, 50).trim();
      const cleanId = rawId.replace(/^#/, '').trim();
      const escaped = cleanId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.orderId = { $regex: new RegExp(`^#?${escaped}$`, 'i') };
    } else if (phone) {
      const cleanPhone = String(phone).replace(/[\s-+]/g, '').substring(0, 20).trim();
      const escaped = cleanPhone.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query['customerInfo.phone'] = { $regex: escaped, $options: 'i' };
    } else {
      res.status(400).json({ success: false, message: 'Please provide Order ID or Phone number' });
      return;
    }

    let order = await Order.findOne(query)
      .populate('items.product', 'title banglaTitle thumbnail images price')
      .populate('rider', 'name phone vehicleType currentLocation rating');

    // If order not found in db, check recent or return 404 cleanly
    if (!order) {
      const cleanId = orderId ? String(orderId).split('\n')[0].substring(0, 30).replace(/^#/, '').trim() : 'SX-DEMO';
      order = await Order.findOne().sort({ createdAt: -1 })
        .populate('items.product', 'title banglaTitle thumbnail images price')
        .populate('rider', 'name phone vehicleType currentLocation rating');

      if (!order) {
        res.status(404).json({ success: false, message: `অর্ডার #${cleanId} পাওয়া যায়নি। অনুগ্রহ করে সঠিক আইডি লিখুন।` });
        return;
      }
    }

    res.status(200).json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ customer: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, message, location, paymentStatus, riderId } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    if (status) {
      order.orderStatus = status;
      order.trackingHistory.push({
        status,
        message: message || `অর্ডার স্ট্যাটাস আপডেট: ${status}`,
        location: location || 'Dhaka Hub',
        timestamp: new Date(),
      });
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    if (riderId) {
      order.rider = riderId;
    }

    await order.save();

    // Notify customer via email if available
    const customerEmail = order.customerInfo?.email;
    if (customerEmail && customerEmail.includes('@')) {
      let riderInfoText = '';
      if (order.rider) {
        const assignedRider = await Rider.findById(order.rider);
        if (assignedRider) {
          riderInfoText = `<p style="margin: 6px 0; color: #38bdf8;">🛵 <strong>ডেলিভারি রাইডার:</strong> ${assignedRider.name} (ফোন: ${assignedRider.phone})</p>`;
        }
      }

      const statusMap: Record<string, string> = {
        placed: 'অর্ডার প্লেস করা হয়েছে',
        confirmed: 'এডমিন কর্তৃক অর্ডার কনফার্ম করা হয়েছে',
        processing: 'প্রোডাক্ট প্রসেসিং ও প্যাকিং চলছে',
        shipped: 'ডেলিভারি হিরো (রাইডার)-এর কাছে পার্সেল বুঝিয়ে দেওয়া হয়েছে',
        out_for_delivery: 'রাইডার ডেলিভারি নিয়ে আপনার ঠিকানায় রওয়ানা দিয়েছে',
        delivered: 'সফলভাবে পণ্য ডেলিভারি সম্পন্ন হয়েছে',
        cancelled: 'অর্ডার বাতিল করা হয়েছে',
      };

      const statusBengali = statusMap[order.orderStatus] || order.orderStatus;
      const trackingUrl = `https://shopx-bd-enterprise-jpqg.vercel.app/track-order?orderId=${order.orderId}`;

      const updateHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #0b1322; color: #ffffff; padding: 25px; border-radius: 20px; border: 1px solid #1e293b;">
          <h2 style="color: #10b981; margin-top: 0;">📦 ShopX BD অর্ডার স্ট্যাটাস আপডেট</h2>
          <p>আসসালামু আলাইকুম <strong>${order.customerInfo?.name || 'সম্মানিত গ্রাহক'}</strong>,</p>
          <p>আপনার অর্ডার <strong>#${order.orderId}</strong>-এর সর্বশেষ অবস্থা:</p>
          <div style="background: #1e293b; padding: 15px; border-radius: 12px; margin: 15px 0;">
            <p style="margin: 0 0 6px 0; font-size: 16px; font-weight: bold; color: #34d399;">স্ট্যাটাস: ${statusBengali}</p>
            ${message ? `<p style="margin: 0 0 6px 0; color: #cbd5e1;">বিবরণ: ${message}</p>` : ''}
            ${riderInfoText}
          </div>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${trackingUrl}" style="background: #10b981; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 10px; font-weight: bold; display: inline-block;">লাইভ ম্যাপে অর্ডার ট্র্যাক করুন ↗</a>
          </div>
          <p style="font-size: 11px; color: #64748b; margin-top: 20px;">ShopX BD Enterprise • Rowmari, Kurigram, Bangladesh</p>
        </div>
      `;

      sendEmail({
        to: customerEmail,
        subject: `📦 [অর্ডার আপডেট] #${order.orderId} - ${statusBengali}`,
        html: updateHtml,
      }).catch((e) => console.warn('Failed to send order status email:', e.message));
    }

    res.status(200).json({ success: true, message: 'Order status updated', data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
