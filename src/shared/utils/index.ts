/**
 * Chrome Storage Utilities
 * Helpers for interacting with chrome.storage API
 */

export const chromeStorage = {
  /**
   * Get value from chrome.storage.local
   */
  get: <T = unknown>(key: string): Promise<T | null> => {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve((result[key] as T) ?? null);
      });
    });
  },

  /**
   * Set value in chrome.storage.local
   */
  set: <T = unknown>(key: string, value: T): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve();
      });
    });
  },

  /**
   * Remove value from chrome.storage.local
   */
  remove: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.remove([key], () => {
        resolve();
      });
    });
  },

  /**
   * Clear all data in chrome.storage.local
   */
  clear: (): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve();
      });
    });
  },
};

/**
 * Chrome Message Utilities
 * Helpers for sending/receiving messages between components
 */

export const chromeMessage = {
  /**
   * Send message to background script
   */
  send: <T = unknown>(message: unknown): Promise<T> => {
    return new Promise((resolve, reject) => {
      try {
        chrome.runtime.sendMessage(message, (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(response as T);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  /**
   * Listen for messages from content/background script
   */
  listen: <T = unknown>(
    callback: (message: T, sender: chrome.runtime.MessageSender) => void | Promise<void>
  ): (() => void) => {
    const listener = (
      message: T,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: unknown) => void
    ) => {
      try {
        const result = callback(message, sender);
        if (result instanceof Promise) {
          result.catch((error) => sendResponse({ error: error.message }));
        }
      } catch (error) {
        sendResponse({ error: (error as Error).message });
      }
    };

    chrome.runtime.onMessage.addListener(listener);

    // Return unsubscribe function
    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  },
};

/**
 * Currency Formatting
 */

export const formatCurrency = (amount: number): string => {
  return `₩${amount.toLocaleString('ko-KR')}`;
};

/**
 * Percentage Formatting
 */

export const formatPercentage = (value: number, decimals = 2): string => {
  return `${value.toFixed(decimals)}%`;
};
