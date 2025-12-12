/**
 * Chrome Storage Adapter for Zustand Persist Middleware
 *
 * SRP: Storage 관련 로직만 담당
 * - chrome.storage.local API wrapper
 * - Zustand PersistStorage 인터페이스 구현
 */

import type { PersistStorage } from 'zustand/middleware';
import { storeLog, ErrorCode } from '@/shared/utils/logger';

/**
 * StateStorage 인터페이스 구현
 * Zustand persist middleware에서 사용
 */
export interface ChromeStorageAdapter {
  getItem: (name: string) => Promise<string | null>;
  setItem: (name: string, value: string) => Promise<void>;
  removeItem: (name: string) => Promise<void>;
}

/**
 * Chrome Storage Local Adapter
 * chrome.storage.local을 Zustand persist storage로 사용
 * 
 * 주의: chrome.runtime.lastError 체크 포함
 */
export const chromeStorageAdapter: ChromeStorageAdapter = {
  getItem: async (name: string): Promise<string | null> => new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        if (chrome.runtime.lastError) {
          // 에러가 있어도 null 반환 (graceful degradation)
          storeLog.warn('chromeStorage getItem failed', {
            key: name,
            error: chrome.runtime.lastError.message,
          });
          resolve(null);
          return;
        }
        resolve((result[name] as string) ?? null);
      });
    }),

  setItem: async (name: string, value: string): Promise<void> => new Promise((resolve, reject) => {
      chrome.storage.local.set({ [name]: value }, () => {
        if (chrome.runtime.lastError) {
          const err = new Error(`chromeStorage setItem failed: ${chrome.runtime.lastError.message}`);
          storeLog.error(ErrorCode.STO_E001, 'chromeStorage setItem failed', {
            data: { key: name },
            error: err,
          });
          reject(new Error(chrome.runtime.lastError.message ?? 'Failed to save to storage'));
          return;
        }
        resolve();
      });
    }),

  removeItem: async (name: string): Promise<void> => new Promise((resolve, reject) => {
      chrome.storage.local.remove([name], () => {
        if (chrome.runtime.lastError) {
          const err = new Error(`chromeStorage removeItem failed: ${chrome.runtime.lastError.message}`);
          storeLog.error(ErrorCode.STO_E001, 'chromeStorage removeItem failed', {
            data: { key: name },
            error: err,
          });
          reject(new Error(chrome.runtime.lastError.message ?? 'Failed to remove from storage'));
          return;
        }
        resolve();
      });
    }),
};

/**
 * Type-safe chrome storage 캐스팅
 * Zustand persist middleware와 호환되는 타입으로 변환
 */
export function asPersistStorage<T>(): PersistStorage<T> {
  return chromeStorageAdapter as unknown as PersistStorage<T>;
}

/**
 * Storage key constants
 * 일관된 키 관리를 위한 상수
 */
export const STORAGE_KEYS = {
  RECOMMENDATION: 'picsel-recommendation',
  SUBPOPUP: 'subpopup-store',
  SETTINGS: 'picsel-settings',
} as const;

/**
 * Max age for stale data (30 minutes)
 */
export const MAX_CACHE_AGE = 30 * 60 * 1000;
