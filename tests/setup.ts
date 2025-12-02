/**
 * Vitest 테스트 환경 설정
 *
 * Chrome Extension API Mock 설정
 */

import { vi } from 'vitest';

// Chrome Storage Mock
const mockStorage: Record<string, unknown> = {};

const createStorageArea = () => ({
  get: vi.fn((keys: string | string[] | null, callback?: (result: Record<string, unknown>) => void) => {
    const result: Record<string, unknown> = {};
    if (keys === null) {
      Object.assign(result, mockStorage);
    } else if (typeof keys === 'string') {
      result[keys] = mockStorage[keys];
    } else if (Array.isArray(keys)) {
      keys.forEach((key) => {
        result[key] = mockStorage[key];
      });
    }
    if (callback) {
      callback(result);
    }
    return Promise.resolve(result);
  }),
  set: vi.fn((items: Record<string, unknown>, callback?: () => void) => {
    Object.assign(mockStorage, items);
    if (callback) {
      callback();
    }
    return Promise.resolve();
  }),
  remove: vi.fn((keys: string | string[], callback?: () => void) => {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    keysArray.forEach((key) => {
      delete mockStorage[key];
    });
    if (callback) {
      callback();
    }
    return Promise.resolve();
  }),
  clear: vi.fn((callback?: () => void) => {
    Object.keys(mockStorage).forEach((key) => {
      delete mockStorage[key];
    });
    if (callback) {
      callback();
    }
    return Promise.resolve();
  }),
});

// Chrome Runtime Mock
const messageListeners: Array<(
  message: unknown,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void
) => boolean | void> = [];

const chromeMock = {
  runtime: {
    lastError: null as chrome.runtime.LastError | null,
    id: 'test-extension-id',
    getURL: vi.fn((path: string) => `chrome-extension://test-extension-id/${path}`),
    sendMessage: vi.fn((message: unknown, callback?: (response: unknown) => void) => {
      // 메시지 리스너에 전달
      const mockSender: chrome.runtime.MessageSender = {
        id: 'test-extension-id',
        url: 'chrome-extension://test-extension-id/popup.html',
      };
      
      let responseValue: unknown = undefined;
      const sendResponse = (response?: unknown) => {
        responseValue = response;
      };

      for (const listener of messageListeners) {
        const result = listener(message, mockSender, sendResponse);
        if (result === true) {
          // 비동기 응답
          setTimeout(() => {
            if (callback) callback(responseValue);
          }, 0);
          return;
        }
      }

      if (callback) callback(responseValue);
    }),
    onMessage: {
      addListener: vi.fn((callback: typeof messageListeners[0]) => {
        messageListeners.push(callback);
      }),
      removeListener: vi.fn((callback: typeof messageListeners[0]) => {
        const index = messageListeners.indexOf(callback);
        if (index > -1) {
          messageListeners.splice(index, 1);
        }
      }),
      hasListener: vi.fn((callback: typeof messageListeners[0]) => {
        return messageListeners.includes(callback);
      }),
    },
  },
  storage: {
    local: createStorageArea(),
    sync: createStorageArea(),
    session: createStorageArea(),
  },
  windows: {
    create: vi.fn((options: chrome.windows.CreateData, callback?: (window?: chrome.windows.Window) => void) => {
      const mockWindow: chrome.windows.Window = {
        id: Math.floor(Math.random() * 1000),
        focused: true,
        incognito: false,
        alwaysOnTop: false,
        state: 'normal',
        type: options.type || 'normal',
        width: options.width || 800,
        height: options.height || 600,
      };
      if (callback) {
        callback(mockWindow);
      }
      return Promise.resolve(mockWindow);
    }),
  },
  action: {
    openPopup: vi.fn(),
    setIcon: vi.fn(),
    setBadgeText: vi.fn(),
    setBadgeBackgroundColor: vi.fn(),
  },
  tabs: {
    query: vi.fn(() => Promise.resolve([])),
    sendMessage: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
};

// Global에 chrome 객체 설정
Object.defineProperty(globalThis, 'chrome', {
  value: chromeMock,
  writable: true,
  configurable: true,
});

// Fetch Mock 설정
export const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

// 테스트 유틸리티 함수들
export const testUtils = {
  /**
   * Mock Storage 초기화
   */
  clearMockStorage: () => {
    Object.keys(mockStorage).forEach((key) => {
      delete mockStorage[key];
    });
  },

  /**
   * Mock Storage에 데이터 설정
   */
  setMockStorage: (data: Record<string, unknown>) => {
    Object.assign(mockStorage, data);
  },

  /**
   * Mock Storage 데이터 가져오기
   */
  getMockStorage: () => ({ ...mockStorage }),

  /**
   * Message Listener 초기화
   */
  clearMessageListeners: () => {
    messageListeners.length = 0;
  },

  /**
   * Fetch Mock 응답 설정
   */
  mockFetchResponse: (data: unknown, ok = true, status = 200) => {
    mockFetch.mockResolvedValueOnce({
      ok,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    });
  },

  /**
   * Fetch Mock 에러 설정
   */
  mockFetchError: (error: string) => {
    mockFetch.mockRejectedValueOnce(new Error(error));
  },

  /**
   * Chrome 객체 참조
   */
  chrome: chromeMock,
};

// 각 테스트 전 초기화
beforeEach(() => {
  vi.clearAllMocks();
  testUtils.clearMockStorage();
  testUtils.clearMessageListeners();
  mockFetch.mockReset();
});
