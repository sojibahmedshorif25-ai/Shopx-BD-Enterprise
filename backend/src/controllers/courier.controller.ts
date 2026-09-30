import { Request, Response } from 'express';
import { Order } from '../models/Order.js';

export const createSteadfastBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ orderId });

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    const consignmentId = `ST-${order.orderId}-${Math.floor(1000 + Math.random() * 9000)}`;

    order.trackingHistory.push({
      status: 'shipped',
      message: `Steadfast কুরিয়ারে বুকিং সম্পন্ন। কনসাইনমেন্ট ট্র্যাকিং আইডি: ${consignmentId}`,
      location: 'Steadfast Tejgaon Hub',
      timestamp: new Date(),
    });
    order.orderStatus = 'shipped';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Steadfast Courier Booking Created Successfully!',
      consignmentId,
      courier: 'Steadfast Courier BD',
      status: 'in_transit',
      estimatedDelivery: '24-48 Hours',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPathaoBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ orderId });

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    const consignmentId = `PTH-${order.orderId}-${Math.floor(1000 + Math.random() * 9000)}`;

    order.trackingHistory.push({
      status: 'shipped',
      message: `Pathao Courier পার্সেল পিকআপ বুকিং তৈরি হয়েছে। ট্র্যাকিং কোড: ${consignmentId}`,
      location: 'Pathao Banani Hub',
      timestamp: new Date(),
    });
    order.orderStatus = 'shipped';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Pathao Courier Booking Created Successfully!',
      consignmentId,
      courier: 'Pathao Courier',
      status: 'pickup_requested',
      estimatedDelivery: '24 Hours',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
