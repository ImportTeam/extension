/**
 * Auth Hook
 * 로그인 상태 확인 및 토큰 로드
 */

import { useEffect } from 'react';
import { useAuthStore } from '@/shared/store/slices/auth';
import { TokenManager } from '@/shared/utils/tokenManager';
import { AuthService } from '@/shared/utils/authService';

export const useAuthInit = (): void => {
  const { setToken, setAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      try {
        // 저장된 토큰 로드
        const token = await TokenManager.getToken();
        
        if (token) {
          if (TokenManager.isTokenValid(token)) {
            setToken(token);
            setAuthenticated(true);

            // 토큰 갱신 필요 시 백그라운드에서 처리
            if (TokenManager.shouldRefreshToken(token)) {
              try {
                await AuthService.refreshToken();
              } catch (err) {
                console.warn('Silent refresh failed:', err);
              }
            }
          } else {
            // 만료된 토큰 → 재로그인 필요
            logout();
          }
        }
      } catch (err) {
        console.error('Auth init failed:', err);
        logout();
      }
    };

    initAuth();
  }, [setToken, setAuthenticated, logout]);
};

export const useIsLoggedIn = (): boolean => useAuthStore((state) => state.isAuthenticated);

export const useLogout = (): (() => Promise<void>) => {
  const { logout } = useAuthStore();

  return async () => {
    try {
      await AuthService.logout();
      logout();
    } catch (err) {
      console.error('Logout failed:', err);
      logout(); // 로컬 스토어는 어쨌든 정리
    }
  };
};
