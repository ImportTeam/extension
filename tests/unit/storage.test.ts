import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storage } from '@/shared/storage';

describe('Storage Wrapper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get items from storage', async () => {
    const mockData = { key1: 'value1', key2: 'value2' };
    
    // Mock chrome.storage.local.get
    const mockGet = vi.fn((keys, callback) => {
      callback(mockData);
    });
    (global.chrome.storage.local.get as any) = mockGet;

    const result = await storage.get(['key1', 'key2']);

    expect(mockGet).toHaveBeenCalledWith(['key1', 'key2'], expect.any(Function));
    expect(result).toEqual(mockData);
  });

  it('should set items in storage', async () => {
    const mockSet = vi.fn((data, callback) => {
      callback();
    });
    (global.chrome.storage.local.set as any) = mockSet;

    const testData = { key1: 'value1' };
    await storage.set(testData);

    expect(mockSet).toHaveBeenCalledWith(testData, expect.any(Function));
  });

  it('should remove item from storage', async () => {
    const mockRemove = vi.fn((key, callback) => {
      callback();
    });
    (global.chrome.storage.local.remove as any) = mockRemove;

    await storage.remove('testKey');

    expect(mockRemove).toHaveBeenCalledWith('testKey', expect.any(Function));
  });

  it('should clear all items from storage', async () => {
    const mockClear = vi.fn((callback) => {
      callback();
    });
    (global.chrome.storage.local.clear as any) = mockClear;

    await storage.clear();

    expect(mockClear).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should handle storage errors', async () => {
    const mockError = new Error('Storage error');
    const mockGet = vi.fn((keys, callback) => {
      (global.chrome.runtime as any).lastError = mockError;
      callback({});
    });
    (global.chrome.storage.local.get as any) = mockGet;

    await expect(storage.get(['key1'])).rejects.toThrow('Storage error');
  });
});
