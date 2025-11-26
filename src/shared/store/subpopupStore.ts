import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import type { 
  CustomPaymentMethod,
  SubPopupState,
  PersistedSubPopupState
} from '../types';

/**
 * Chrome Storage Adapter for Zustand Persist Middleware
 */
const chromeStorageAdapter = {
  getItem: async (name: string): Promise<string | null> => {
    return new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        resolve(result[name] ?? null);
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
 * SubPopup Store
 * 사용자 정의 결제 수단 관리
 */


export const useSubPopupStore = create<SubPopupState>()(
  persist<SubPopupState, [], [], PersistedSubPopupState>(
    (set) => ({
      // Initial state
      isOpen: false,
      activeTab: 'list',
      isLoading: false,
      error: null,
      customMethods: [],

      // UI Actions
      setIsOpen: (open: boolean): void => set({ isOpen: open }),
      setActiveTab: (tab: 'add' | 'list'): void => set({ activeTab: tab }),

      // Data Actions
      addPaymentMethod: (method: Omit<CustomPaymentMethod, 'createdAt' | 'updatedAt' | 'isCustom'>): void => {
        const now = Date.now();
        const newMethod: CustomPaymentMethod = {
          ...method,
          createdAt: now,
          updatedAt: now,
          isCustom: true,
        };

        set((state) => ({
          customMethods: [...state.customMethods, newMethod],
        }));
      },

      updatePaymentMethod: (id: string, updates: Partial<CustomPaymentMethod>): void => {
        set((state) => ({
          customMethods: state.customMethods.map((method) =>
            method.id === id
              ? {
                ...method,
                ...updates,
                updatedAt: Date.now(),
              }
              : method
          ),
        }));
      },

      deletePaymentMethod: (id: string): void => {
        set((state) => ({
          customMethods: state.customMethods.filter((method) => method.id !== id),
        }));
      },

      setCustomMethods: (methods: CustomPaymentMethod[]): void => {
        set({ customMethods: methods });
      },

      reset: (): void => {
        set({
          isOpen: false,
          activeTab: 'list',
          isLoading: false,
          error: null,
          customMethods: [],
        });
      },
    }),
    {
      name: 'subpopup-store',
      storage: chromeStorageAdapter as unknown as PersistStorage<PersistedSubPopupState>,
      partialize: (state): PersistedSubPopupState => ({
        customMethods: state.customMethods,
      }),
    }
  )
);

/**
 * Selectors for performance optimization
 */
export const useIsSubPopupOpen = (): boolean => useSubPopupStore((state) => state.isOpen);
export const useSubPopupActiveTab = (): 'add' | 'list' => useSubPopupStore((state) => state.activeTab);
export const useCustomPaymentMethods = (): CustomPaymentMethod[] => useSubPopupStore((state) => state.customMethods);
export const useSubPopupError = (): string | null => useSubPopupStore((state) => state.error);
export const useSubPopupActions = (): Pick<SubPopupState, 'setIsOpen' | 'setActiveTab' | 'addPaymentMethod' | 'updatePaymentMethod' | 'deletePaymentMethod' | 'setCustomMethods' | 'reset'> =>
  useSubPopupStore((state) => ({
    setIsOpen: state.setIsOpen,
    setActiveTab: state.setActiveTab,
    addPaymentMethod: state.addPaymentMethod,
    updatePaymentMethod: state.updatePaymentMethod,
    deletePaymentMethod: state.deletePaymentMethod,
    setCustomMethods: state.setCustomMethods,
    reset: state.reset,
  }));
