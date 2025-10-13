/**
 * Chrome Storage Wrapper
 * 
 * 반드시 이 파일을 통해서만 chrome.storage.local 접근.
 * 모든 함수는 Promise 반환.
 * 
 * 사용 시: import { storage } from '../shared/storage';
 */

export const storage = {
  /**
   * Get items from storage
   * @param keys - Key or array of keys to retrieve (null for all)
   */
  async get(keys: string | string[] | null = null): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        chrome.storage.local.get(keys, (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },

  /**
   * Set items in storage
   * @param obj - Object with key-value pairs to store
   */
  async set(obj: Record<string, any>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.local.set(obj, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },

  /**
   * Remove item from storage
   * @param key - Key to remove
   */
  async remove(key: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.local.remove(key, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },

  /**
   * Clear all items from storage
   */
  async clear(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.local.clear(() => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
};
