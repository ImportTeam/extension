/**
 * Chrome Storage Adapter for Zustand Persist Middleware
 *
 * SRP: Storage 관련 로직만 담당
 * - chrome.storage.local API wrapper
 * - Zustand PersistStorage 인터페이스 구현
 */

import type { PersistStorage } from 'zustand/middleware';

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
 */
export const chromeStorageAdapter: ChromeStorageAdapter = {
  getItem: async (name: string): Promise<string | null> => {
    return new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        resolve((result[name] as string) ?? null);
      });
    });
  },

  setItem: async (name: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [name]: value }, () => {
        resolve();
      });
    });
  },

  removeItem: async (name: string): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.remove([name], () => {
        resolve();
      });
    });
  },
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
} as const;

/**
 * Max age for stale data (30 minutes)
 */
export const MAX_CACHE_AGE = 30 * 60 * 1000;
