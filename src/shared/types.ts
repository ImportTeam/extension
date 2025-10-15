/**
 * Task type for queue
 */
export type Task = {
  id: string;
  type: string;
  payload: any;
  attempts?: number;
  createdAt: number;
  updatedAt?: number;
};

/**
 * Parsed checkout data
 */
export type ParsedData = {
  amount: number;
  currency: string;
  methods: string[];
  confidence: number; // 0-1
  metadata?: Record<string, any>;
};

/**
 * Exchange rates
 */
export type ExchangeRates = {
  [currency: string]: number;
  timestamp: number;
};

/**
 * Recommendation result
 */
export type Recommendation = {
  method: string;
  savings: number;
  confidence: number;
  details?: string;
};

/**
 * Message types for chrome.runtime.sendMessage
 */
export type MessageType = 
  | 'CALCULATE_PAYMENT'
  | 'GET_QUEUE_STATUS'
  | 'TRIGGER_PROCESS'
  | 'UPDATE_RECOMMENDATION'
  | 'OFFSCREEN_TASK';

/**
 * Message payload
 */
export type Message = {
  type: MessageType;
  data?: any;
  payload?: any;
};

/**
 * App Settings
 */
export type AppSettings = {
  theme: 'light' | 'dark' | 'system';
  language: 'ko' | 'en' | 'ja';
  notifications: boolean;
  autoDetect: boolean;
  savingsAlerts: boolean;
  dataSync: boolean;
  autoRecommend?: boolean;
  preferredCurrency?: string;
};

/**
 * Payment Method Type
 */
export type PaymentMethodType = 'card' | 'bank' | 'mobile';

/**
 * Payment Method
 */
export type PaymentMethod = {
  id: string;
  type: PaymentMethodType;
  name: string;
  number: string; // Masked card/account number or balance for mobile
  primary: boolean;
  createdAt: number;
  updatedAt?: number;
  metadata?: {
    issuer?: string;
    cardType?: string;
    benefits?: string[];
  };
};

/**
 * Transaction Status
 */
export type TransactionStatus = 'completed' | 'pending' | 'failed';

/**
 * Transaction
 */
export type Transaction = {
  id: string;
  store: string;
  amount: number;
  date: string;
  paymentMethod: string;
  paymentMethodId?: string;
  savings: number;
  status: TransactionStatus;
  category: string;
  createdAt: number;
};

/**
 * User Profile
 */
export type UserProfile = {
  name?: string;
  email?: string;
  avatar?: string;
  createdAt: number;
  updatedAt?: number;
};
