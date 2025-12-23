/**
 * Chrome Storage Token Manager
 * JWT 토큰을 chrome.storage.local에 안전하게 저장/로드
 */

import type { AuthToken } from '../store/slices/auth';

const STORAGE_KEY = 'picsel_auth_token';
const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5분 전부터 갱신 시작

export const TokenManager = {
  /**
   * 토큰을 chrome.storage.local에 저장
   */
  async saveToken(token: AuthToken): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [STORAGE_KEY]: token }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    });
  },

  /**
   * 저장된 토큰 로드
   */
  async getToken(): Promise<AuthToken | null> {
    return new Promise((resolve) => {
      chrome.storage.local.get(STORAGE_KEY, (result) => {
        const token = result[STORAGE_KEY] as AuthToken | undefined;
        resolve(token || null);
      });
    });
  },

  /**
   * 토큰이 유효한지 확인 (만료 시간 기준)
   */
  isTokenValid(token: AuthToken | null): boolean {
    if (!token) return false;
    return token.expiresAt > Date.now();
  },

  /**
   * 토큰 갱신이 필요한지 확인
   */
  shouldRefreshToken(token: AuthToken | null): boolean {
    if (!token) return false;
    const timeUntilExpiry = token.expiresAt - Date.now();
    return timeUntilExpiry < REFRESH_THRESHOLD;
  },

  /**
   * 토큰 삭제
   */
  async clearToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(STORAGE_KEY, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    });
  },

  /**
   * 만료된 토큰 자동 정리
   */
  async cleanupExpiredToken(): Promise<void> {
    const token = await this.getToken();
    if (token && !this.isTokenValid(token)) {
      await this.clearToken();
    }
  },
};
