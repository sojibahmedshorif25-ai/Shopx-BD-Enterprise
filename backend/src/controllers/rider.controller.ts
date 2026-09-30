import { Request, Response } from 'express';
import { Rider } from '../models/Rider.js';
import { Order } from '../models/Order.js';

export const getRiderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const riders = await Rider.find({ isOnline: true });
    res.status(200).json({ success: true, data: riders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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
