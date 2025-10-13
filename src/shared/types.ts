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
