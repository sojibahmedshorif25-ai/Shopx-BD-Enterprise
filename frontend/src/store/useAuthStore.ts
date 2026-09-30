import { create } from 'zustand';
import { User } from '../types';
import { api } from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  googleLogin: (data: any) => Promise<void>;
  facebookLogin: (data: any) => Promise<void>;
  setAuthData: (user: User, token: string) => void;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('shopx_token'),
  isLoading: false,

  setAuthData: (user, token) => {
    localStorage.setItem('shopx_token', token);
    set({ user, token, isLoading: false });
  },

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/login', credentials);
      if (res.data.success) {
        localStorage.setItem('shopx_token', res.data.token);
        set({ user: res.data.user, token: res.data.token, isLoading: false });
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (userData) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data.success) {
        localStorage.setItem('shopx_token', res.data.token);
        set({ user: res.data.user, token: res.data.token, isLoading: false });
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  googleLogin: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/google', data);
      if (res.data.success) {
        localStorage.setItem('shopx_token', res.data.token);
        set({ user: res.data.user, token: res.data.token, isLoading: false });
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || 'Google login failed');
    }
  },

  facebookLogin: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/facebook', data);
      if (res.data.success) {
        localStorage.setItem('shopx_token', res.data.token);
        set({ user: res.data.user, token: res.data.token, isLoading: false });
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || 'Facebook login failed');
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    localStorage.removeItem('shopx_token');
    set({ user: null, token: null });
  },

  fetchCurrentUser: async () => {
    const token = localStorage.getItem('shopx_token');
    if (!token) return;
    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        set({ user: res.data.user });
      }
    } catch {
      localStorage.removeItem('shopx_token');
      set({ user: null, token: null });
    }
  },
}));

