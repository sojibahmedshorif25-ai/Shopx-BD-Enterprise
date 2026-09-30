import { Router } from 'express';
import {
  getAdminStats,
  getAllVendors,
  updateVendorStatus,
  getAllOrders,
  getAllUsers,
  updateUserRoleAndStatus,
  deleteUser,
  getAllCategoriesAdmin,
  createCategoryAdmin,
  updateCategoryAdmin,
  deleteCategoryAdmin,
  getAllCouponsAdmin,
  createCouponAdmin,
  deleteCouponAdmin,
  getSystemSettingsAdmin,
} from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/stats', authenticate, authorize('admin'), getAdminStats);
router.get('/vendors', authenticate, authorize('admin'), getAllVendors);
router.put('/vendors/:id', authenticate, authorize('admin'), updateVendorStatus);
router.get('/orders', authenticate, authorize('admin'), getAllOrders);
router.get('/users', authenticate, authorize('admin'), getAllUsers);
router.put('/users/:id', authenticate, authorize('admin'), updateUserRoleAndStatus);
router.delete('/users/:id', authenticate, authorize('admin'), deleteUser);

// Categories
router.get('/categories', authenticate, authorize('admin'), getAllCategoriesAdmin);
router.post('/categories', authenticate, authorize('admin'), createCategoryAdmin);
router.put('/categories/:id', authenticate, authorize('admin'), updateCategoryAdmin);
router.delete('/categories/:id', authenticate, authorize('admin'), deleteCategoryAdmin);

// Coupons
router.get('/coupons', authenticate, authorize('admin'), getAllCouponsAdmin);
router.post('/coupons', authenticate, authorize('admin'), createCouponAdmin);
router.delete('/coupons/:id', authenticate, authorize('admin'), deleteCouponAdmin);

// Settings & System Health
router.get('/settings', authenticate, authorize('admin'), getSystemSettingsAdmin);

export default router;
