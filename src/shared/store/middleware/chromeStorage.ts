/**
 * Chrome Storage Adapter for Zustand Persist Middleware
 *
 * SRP: Storage 관련 로직만 담당
 * - chrome.storage.local API wrapper
 * - Zustand PersistStorage 인터페이스 구현
 */

import type { PersistStorage } from 'zustand/middleware';
import { storeLog, ErrorCode } from '@/shared/utils/logger';

const memoryFallbackStore = new Map<string, string>();
let didWarnNoChromeStorage = false;

function isChromeStorageAvailable(): boolean {
  return (
    typeof chrome !== 'undefined' &&
    !!chrome.storage?.local &&
    // runtime may not exist in some non-extension contexts
    typeof chrome.runtime !== 'undefined'
  );
}

function getProtocol(): string {
  try {
    return globalThis.location?.protocol ?? '';
  } catch {
    return '';
  }
}

function isLocalhost(): boolean {
  try {
    const hostname = globalThis.location?.hostname ?? '';
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
  } catch {
    return false;
  }
}

function shouldUseLocalStorageFallback(): boolean {
  const protocol = getProtocol();
  return protocol === 'chrome-extension:' || (protocol === 'http:' || protocol === 'https:') && isLocalhost();
}

function safeLocalStorageGetItem(key: string): string | null {
  try {
    return globalThis.localStorage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function safeLocalStorageSetItem(key: string, value: string): boolean {
  try {
    globalThis.localStorage?.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeLocalStorageRemoveItem(key: string): boolean {
  try {
    globalThis.localStorage?.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function warnOnceNoChromeStorage(storageKey: string): void {
  if (didWarnNoChromeStorage) return;
  didWarnNoChromeStorage = true;

  const context = {
    key: storageKey,
    protocol: getProtocol() || 'unknown',
    href: (() => {
      try {
        return globalThis.location?.href;
      } catch {
        return undefined;
      }
    })(),
  };

  // Only warn loudly when we are in a safe context where fallback is expected.
  if (shouldUseLocalStorageFallback()) {
    storeLog.warn('chrome.storage.local not available, using fallback storage', context);
  } else {
    // Avoid noise on restricted contexts (e.g. chrome://*) or non-extension pages.
    storeLog.debug('chrome.storage.local not available, using in-memory storage (no persistence)', context);
  }
}

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
      // Fallback for non-extension environment (e.g. localhost)
      if (!isChromeStorageAvailable()) {
        warnOnceNoChromeStorage(name);

        if (shouldUseLocalStorageFallback()) {
          resolve(safeLocalStorageGetItem(name));
          return;
        }

        resolve(memoryFallbackStore.get(name) ?? null);
        return;
      }

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
      // Fallback for non-extension environment
      if (!isChromeStorageAvailable()) {
        warnOnceNoChromeStorage(name);

        if (shouldUseLocalStorageFallback()) {
          const ok = safeLocalStorageSetItem(name, value);
          if (ok) {
            resolve();
          } else {
            reject(new Error('localStorage setItem failed'));
          }
          return;
        }

        // In restricted/non-extension contexts we do not persist to page localStorage.
        memoryFallbackStore.set(name, value);
        resolve();
        return;
      }

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
      if (!isChromeStorageAvailable()) {
        warnOnceNoChromeStorage(name);

        if (shouldUseLocalStorageFallback()) {
          const ok = safeLocalStorageRemoveItem(name);
          if (ok) {
            resolve();
          } else {
            reject(new Error('localStorage removeItem failed'));
          }
          return;
        }

        memoryFallbackStore.delete(name);
        resolve();
        return;
      }

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
