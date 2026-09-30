import { Router } from 'express';
import {
  getAdminStats,
  getAllVendors,
  updateVendorStatus,
  getAllOrders,
  getAllUsers,
  updateUserRoleAndStatus,
  deleteUser,
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

export default router;
