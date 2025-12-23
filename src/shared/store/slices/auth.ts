/**
 * Auth Store Slice
 * 로그인 상태, 토큰 관리
 */

import { create } from 'zustand';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthState {
  token: AuthToken | null;
  user: {
    id: string;
    email: string;
    name?: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions
  setToken: (token: AuthToken | null) => void;
  setUser: (user: AuthState['user']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  logout: () => set({
    token: null,
    user: null,
    isAuthenticated: false,
    error: null,
  }),
}));
