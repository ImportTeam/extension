/**
 * Auth API Service
 * https://api.picsel.kr 와 연동
 */

import { TokenManager } from './tokenManager';
import type { AuthToken } from '../store/slices/auth';

// .env의 SERVER_URL 사용, 없으면 기본값
const API_BASE = (() => {
  // Chrome Extension 환경에서는 process.env가 제한적이므로
  // 런타임에 동적으로 로드
  if (typeof process !== 'undefined' && process.env?.REACT_APP_SERVER_URL) {
    return process.env.REACT_APP_SERVER_URL;
  }
  return 'https://api.picsel.kr';
})();

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
}

export const AuthService = {
  /**
   * 로그인 (웹에서 토큰을 받아와서 저장)
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password } as LoginRequest),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = (await response.json()) as LoginResponse;
    
    // 토큰 저장
    const token: AuthToken = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresAt: Date.now() + data.expiresIn * 1000,
    };
    
    await TokenManager.saveToken(token);
    return data;
  },

  /**
   * 토큰 갱신 (silent refresh)
   */
  async refreshToken(): Promise<AuthToken> {
    const currentToken = await TokenManager.getToken();
    
    if (!currentToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentToken.refreshToken}`,
      },
    });

    if (!response.ok) {
      // 갱신 실패 = 토큰 무효 → 재로그인 필요
      await TokenManager.clearToken();
      throw new Error('Token refresh failed');
    }

    const data = (await response.json()) as RefreshResponse;
    
    const newToken: AuthToken = {
      accessToken: data.accessToken,
      refreshToken: currentToken.refreshToken, // 동일하게 유지
      expiresAt: Date.now() + data.expiresIn * 1000,
    };
    
    await TokenManager.saveToken(newToken);
    return newToken;
  },

  /**
   * 로그아웃
   */
  async logout(): Promise<void> {
    const token = await TokenManager.getToken();
    
    if (token) {
      try {
        await fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
      } catch (err) {
        // 로그아웃 API 실패해도 로컬 토큰 삭제는 진행
        console.warn('Logout API failed:', err);
      }
    }
    
    await TokenManager.clearToken();
  },

  /**
   * 현재 사용자 정보 조회
   */
  async getCurrentUser(token: string) {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return response.json();
  },

  /**
   * API 요청 시 자동으로 토큰 추가
   */
  async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = await TokenManager.getToken();

    // 토큰 없음 = 미로그인
    if (!token) {
      throw new Error('Not authenticated: Please login first');
    }

    // 토큰 갱신 필요 확인
    if (TokenManager.shouldRefreshToken(token)) {
      try {
        const refreshedToken = await this.refreshToken();
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${refreshedToken.accessToken}`,
        };
      } catch (err) {
        console.warn('Silent refresh failed:', err);
        // 갱신 실패 시 기존 토큰 사용
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.accessToken}`,
        };
      }
    } else {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token.accessToken}`,
      };
    }

    const response = await fetch(url, options);

    // 401 Unauthorized = 토큰 만료 또는 무효
    if (response.status === 401) {
      await TokenManager.clearToken();
      throw new Error('Unauthorized: Please login again');
    }

    return response;
  },
};
