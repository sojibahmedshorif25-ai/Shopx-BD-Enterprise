import { create } from 'zustand';
import { api } from '../services/api';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'vendor';
  avatar?: string;
  vendor?: any;
}

interface AdminAuthState {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  sendLoginOTP: (credentials: { email: string; password: string; lang?: string }) => Promise<{ success: boolean; message: string; otp?: string }>;
  verifyLoginOTP: (payload: { email: string; otp: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  user: null,
  token: localStorage.getItem('shopx_admin_token'),
  isLoading: false,

  sendLoginOTP: async (credentials) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/admin/login-step1', credentials);
      set({ isLoading: false });
      return res.data;
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || error.message || 'OTP প্রেরণ ব্যর্থ হয়েছে');
    }
  },

  verifyLoginOTP: async ({ email, otp }) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/admin/login-step2', { email, otp });
      if (res.data.success) {
        localStorage.setItem('shopx_admin_token', res.data.token);
        set({ user: res.data.user, token: res.data.token, isLoading: false });
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || error.message || 'OTP ভেরিফিকেশন ব্যর্থ হয়েছে');
    }
  },

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/login', credentials);
      if (res.data.success) {
        if (res.data.user.role !== 'admin' && res.data.user.role !== 'vendor') {
          throw new Error('এই পোর্টালে শুধুমাত্র এডমিন ও সেলারগণ প্রবেশ করতে পারবেন।');
        }
        localStorage.setItem('shopx_admin_token', res.data.token);
        set({ user: res.data.user, token: res.data.token, isLoading: false });
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    localStorage.removeItem('shopx_admin_token');
    set({ user: null, token: null });
  },

  fetchCurrentUser: async () => {
    const token = localStorage.getItem('shopx_admin_token');
    if (!token) return;
    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        if (res.data.user.role === 'admin' || res.data.user.role === 'vendor') {
          set({ user: res.data.user });
        } else {
          localStorage.removeItem('shopx_admin_token');
          set({ user: null, token: null });
        }
      }
    } catch {
      localStorage.removeItem('shopx_admin_token');
      set({ user: null, token: null });
    }
  },
}));
