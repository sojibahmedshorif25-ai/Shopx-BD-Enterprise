import { Router } from 'express';
import { getRiderStatus, updateRiderLocation } from '../controllers/rider.controller.js';
import { uploadSingleImage, uploadMultipleImages } from '../controllers/upload.controller.js';
import { upload } from '../middleware/upload.js';

export const riderRouter = Router();
riderRouter.get('/status', getRiderStatus);
riderRouter.post('/location', updateRiderLocation);

export const uploadRouter = Router();
uploadRouter.post('/single', upload.single('image'), uploadSingleImage);
uploadRouter.post('/multiple', upload.array('images', 8), uploadMultipleImages);
