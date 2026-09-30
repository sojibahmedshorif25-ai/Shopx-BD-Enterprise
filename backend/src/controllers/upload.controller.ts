import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary.js';

export const uploadSingleImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: 'shopx/uploads',
      transformation: [{ width: 1000, crop: 'limit' }, { quality: 'auto', fetch_format: 'auto' }],
    });

    res.status(200).json({
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadMultipleImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: 'No files uploaded' });
      return;
    }

    const uploadPromises = files.map((file) => {
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;
      return cloudinary.uploader.upload(dataURI, {
        folder: 'shopx/uploads',
        transformation: [{ width: 1000, crop: 'limit' }, { quality: 'auto', fetch_format: 'auto' }],
      });
    });

    const results = await Promise.all(uploadPromises);
    const urls = results.map((r) => r.secure_url);

    res.status(200).json({ success: true, urls });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
