import { Router } from 'express';
import { getVendorDashboard, getVendorProducts } from '../controllers/vendor.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', authenticate, authorize('vendor', 'admin'), getVendorDashboard);
router.get('/products', authenticate, authorize('vendor', 'admin'), getVendorProducts);

export default router;
