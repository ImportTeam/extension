/**
 * Chrome Storage Wrapper
 * 
 * 반드시 이 파일을 통해서만 chrome.storage.local 접근.
 * 모든 함수는 Promise 반환.
 * 
 * 사용 시: import { storage } from '../shared/storage';
 */

import type { AppSettings, PaymentMethod, Transaction, UserProfile } from './types';

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
  },

  // === Typed Helper Functions ===

  /**
   * Get app settings
   */
  async getSettings(): Promise<AppSettings> {
    const result = await this.get('settings');
    return result.settings || {
      theme: 'system',
      language: 'ko',
      notifications: true,
      autoDetect: true,
      savingsAlerts: true,
      dataSync: false,
    };
  },

  /**
   * Save app settings
   */
  async setSettings(settings: Partial<AppSettings>): Promise<void> {
    const current = await this.getSettings();
    await this.set({ settings: { ...current, ...settings } });
  },

  /**
   * Get all payment methods
   */
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const result = await this.get('paymentMethods');
    return result.paymentMethods || [];
  },

  /**
   * Add a new payment method
   */
  async addPaymentMethod(method: Omit<PaymentMethod, 'id' | 'createdAt'>): Promise<PaymentMethod> {
    const methods = await this.getPaymentMethods();
    const newMethod: PaymentMethod = {
      ...method,
      id: `pm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };
    
    // If this is set as primary, unset others
    if (newMethod.primary) {
      methods.forEach(m => m.primary = false);
    }
    
    methods.push(newMethod);
    await this.set({ paymentMethods: methods });
    return newMethod;
  },

  /**
   * Update a payment method
   */
  async updatePaymentMethod(id: string, updates: Partial<PaymentMethod>): Promise<void> {
    const methods = await this.getPaymentMethods();
    const index = methods.findIndex(m => m.id === id);
    
    if (index === -1) {
      throw new Error(`Payment method with id ${id} not found`);
    }
    
    // If setting as primary, unset others
    if (updates.primary) {
      methods.forEach(m => m.primary = false);
    }
    
    methods[index] = {
      ...methods[index],
      ...updates,
      updatedAt: Date.now(),
    };
    
    await this.set({ paymentMethods: methods });
  },

  /**
   * Delete a payment method
   */
  async deletePaymentMethod(id: string): Promise<void> {
    const methods = await this.getPaymentMethods();
    const filtered = methods.filter(m => m.id !== id);
    await this.set({ paymentMethods: filtered });
  },

  /**
   * Get all transactions
   */
  async getTransactions(): Promise<Transaction[]> {
    const result = await this.get('transactions');
    return result.transactions || [];
  },

  /**
   * Add a new transaction
   */
  async addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
    const transactions = await this.getTransactions();
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };
    
    transactions.unshift(newTransaction); // Add to beginning
    await this.set({ transactions });
    return newTransaction;
  },

  /**
   * Get user profile
   */
  async getUserProfile(): Promise<UserProfile | null> {
    const result = await this.get('userProfile');
    return result.userProfile || null;
  },

  /**
   * Save user profile
   */
  async setUserProfile(profile: Partial<UserProfile>): Promise<void> {
    const current = await this.getUserProfile();
    const updated: UserProfile = current
      ? { ...current, ...profile, updatedAt: Date.now() }
      : { ...profile, createdAt: Date.now() } as UserProfile;
    
    await this.set({ userProfile: updated });
  },
};
