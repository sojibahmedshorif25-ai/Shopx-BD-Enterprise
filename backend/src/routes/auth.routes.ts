import { Router } from 'express';
import {
  register,
  login,
  sellerLogin,
  riderLogin,
  adminLoginStep1,
  adminLoginStep2,
  googleAuth,
  facebookAuth,
  sendEmailOTP,
  verifyEmailOTP,
  sendPhoneOTP,
  verifyPhoneOTP,
  claimDailyCheckin,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
  logout,
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/seller/login', sellerLogin);
router.post('/rider/login', riderLogin);
router.post('/admin/login-step1', adminLoginStep1);
router.post('/admin/login-step2', adminLoginStep2);
router.post('/google', googleAuth);
router.post('/facebook', facebookAuth);
router.post('/send-email-otp', sendEmailOTP);
router.post('/verify-email-otp', verifyEmailOTP);
router.post('/send-otp', sendPhoneOTP);
router.post('/verify-otp', verifyPhoneOTP);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/profile', authenticate, updateProfile);
router.post('/daily-checkin', authenticate, claimDailyCheckin);
router.get('/me', authenticate, getMe);
router.post('/logout', logout);

export default router;
