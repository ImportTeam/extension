/**
 * Logger System - Type Definitions
 *
 * 실무 표준 로깅 시스템
 * - 환경 구분 (FE/BE/Extension)
 * - 레벨별 로깅 (DEBUG, INFO, WARN, ERROR, FATAL)
 * - 에러 코드 체계
 * - 위치 추적 (파일, 함수, 라인)
 */

// ─────────────────────────────────────────────────────────────
// Log Levels
// ─────────────────────────────────────────────────────────────

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export const LOG_LEVEL_NAMES: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR',
  [LogLevel.FATAL]: 'FATAL',
};

export const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: '#9E9E9E', // Gray
  [LogLevel.INFO]: '#2196F3',  // Blue
  [LogLevel.WARN]: '#FF9800',  // Orange
  [LogLevel.ERROR]: '#F44336', // Red
  [LogLevel.FATAL]: '#9C27B0', // Purple
};

export const LOG_LEVEL_EMOJI: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: '🔍',
  [LogLevel.INFO]: '📘',
  [LogLevel.WARN]: '⚠️',
  [LogLevel.ERROR]: '❌',
  [LogLevel.FATAL]: '💀',
};

// ─────────────────────────────────────────────────────────────
// Environment / Domain
// ─────────────────────────────────────────────────────────────

/**
 * 실행 환경 구분
 */
export enum LogEnvironment {
  /** Content Script (웹페이지 내 실행) */
  CONTENT = 'CONTENT',
  /** Background Service Worker */
  BACKGROUND = 'BACKGROUND',
  /** Popup UI */
  POPUP = 'POPUP',
  /** SubPopup UI */
  SUBPOPUP = 'SUBPOPUP',
  /** Options Page */
  OPTIONS = 'OPTIONS',
  /** Offscreen Document */
  OFFSCREEN = 'OFFSCREEN',
}

/**
 * 기능 도메인 구분
 */
export enum LogDomain {
  /** Parser 관련 */
  PARSER = 'PARSER',
  /** Store 상태 관리 */
  STORE = 'STORE',
  /** UI 컴포넌트 */
  UI = 'UI',
  /** 네트워크/메시징 */
  NETWORK = 'NETWORK',
  /** DOM 조작 */
  DOM = 'DOM',
  /** Storage 관련 */
  STORAGE = 'STORAGE',
  /** 보안 관련 */
  SECURITY = 'SECURITY',
  /** 초기화/부트스트랩 */
  BOOTSTRAP = 'BOOTSTRAP',
  /** 일반/기타 */
  GENERAL = 'GENERAL',
}

// ─────────────────────────────────────────────────────────────
// Error Codes
// ─────────────────────────────────────────────────────────────

/**
 * 에러 코드 체계
 * Format: [Domain][Level][Sequence]
 * Example: PAR-E001 = Parser Error 001
 */
export enum ErrorCode {
  // Parser Errors (PAR-E)
  PAR_E001 = 'PAR-E001', // Price extraction failed
  PAR_E002 = 'PAR-E002', // Product info extraction failed
  PAR_E003 = 'PAR-E003', // Card benefits extraction failed
  PAR_E004 = 'PAR-E004', // Selector not found
  PAR_E005 = 'PAR-E005', // Invalid data format
  PAR_E006 = 'PAR-E006', // Site not supported
  PAR_E007 = 'PAR-E007', // DOM structure changed

  // Store Errors (STO-E)
  STO_E001 = 'STO-E001', // State update failed
  STO_E002 = 'STO-E002', // Persist failed
  STO_E003 = 'STO-E003', // Rehydration failed
  STO_E004 = 'STO-E004', // Invalid state

  // Network Errors (NET-E)
  NET_E001 = 'NET-E001', // Message send failed
  NET_E002 = 'NET-E002', // Message receive timeout
  NET_E003 = 'NET-E003', // Invalid message format
  NET_E004 = 'NET-E004', // Port disconnected

  // UI Errors (UI-E)
  UI_E001 = 'UI-E001',   // Render failed
  UI_E002 = 'UI-E002',   // Component mount failed
  UI_E003 = 'UI-E003',   // Event handler error

  // DOM Errors (DOM-E)
  DOM_E001 = 'DOM-E001', // Element not found
  DOM_E002 = 'DOM-E002', // Mutation observer error
  DOM_E003 = 'DOM-E003', // Injection failed

  // Storage Errors (STG-E)
  STG_E001 = 'STG-E001', // Read failed
  STG_E002 = 'STG-E002', // Write failed
  STG_E003 = 'STG-E003', // Quota exceeded

  // Security Errors (SEC-E)
  SEC_E001 = 'SEC-E001', // XSS attempt detected
  SEC_E002 = 'SEC-E002', // CSP violation
  SEC_E003 = 'SEC-E003', // Invalid origin

  // Bootstrap Errors (BST-E)
  BST_E001 = 'BST-E001', // Init failed
  BST_E002 = 'BST-E002', // Dependency missing
  BST_E003 = 'BST-E003', // Context invalid

  // General Errors (GEN-E)
  GEN_E001 = 'GEN-E001', // Unknown error
  GEN_E002 = 'GEN-E002', // Validation failed
  GEN_E003 = 'GEN-E003', // Type mismatch
}

/**
 * 에러 코드별 메시지
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.PAR_E001]: 'Price extraction failed',
  [ErrorCode.PAR_E002]: 'Product info extraction failed',
  [ErrorCode.PAR_E003]: 'Card benefits extraction failed',
  [ErrorCode.PAR_E004]: 'Selector not found',
  [ErrorCode.PAR_E005]: 'Invalid data format',
  [ErrorCode.PAR_E006]: 'Site not supported',
  [ErrorCode.PAR_E007]: 'DOM structure changed',

  [ErrorCode.STO_E001]: 'State update failed',
  [ErrorCode.STO_E002]: 'Persist failed',
  [ErrorCode.STO_E003]: 'Rehydration failed',
  [ErrorCode.STO_E004]: 'Invalid state',

  [ErrorCode.NET_E001]: 'Message send failed',
  [ErrorCode.NET_E002]: 'Message receive timeout',
  [ErrorCode.NET_E003]: 'Invalid message format',
  [ErrorCode.NET_E004]: 'Port disconnected',

  [ErrorCode.UI_E001]: 'Render failed',
  [ErrorCode.UI_E002]: 'Component mount failed',
  [ErrorCode.UI_E003]: 'Event handler error',

  [ErrorCode.DOM_E001]: 'Element not found',
  [ErrorCode.DOM_E002]: 'Mutation observer error',
  [ErrorCode.DOM_E003]: 'Injection failed',

  [ErrorCode.STG_E001]: 'Storage read failed',
  [ErrorCode.STG_E002]: 'Storage write failed',
  [ErrorCode.STG_E003]: 'Storage quota exceeded',

  [ErrorCode.SEC_E001]: 'XSS attempt detected',
  [ErrorCode.SEC_E002]: 'CSP violation',
  [ErrorCode.SEC_E003]: 'Invalid origin',

  [ErrorCode.BST_E001]: 'Initialization failed',
  [ErrorCode.BST_E002]: 'Dependency missing',
  [ErrorCode.BST_E003]: 'Invalid context',

  [ErrorCode.GEN_E001]: 'Unknown error',
  [ErrorCode.GEN_E002]: 'Validation failed',
  [ErrorCode.GEN_E003]: 'Type mismatch',
};

// ─────────────────────────────────────────────────────────────
// Log Entry Types
// ─────────────────────────────────────────────────────────────

/**
 * 소스 위치 정보
 */
export interface SourceLocation {
  file?: string;
  function?: string;
  line?: number;
  column?: number;
}

/**
 * 로그 엔트리 (출력 전)
 */
export interface LogEntry {
  timestamp: number;
  level: LogLevel;
  environment: LogEnvironment;
  domain: LogDomain;
  message: string;
  code?: ErrorCode;
  location?: SourceLocation;
  data?: unknown;
  error?: Error;
  correlationId?: string;
}

/**
 * 포맷된 로그 엔트리 (출력용)
 */
export interface FormattedLogEntry {
  prefix: string;
  message: string;
  style: string;
  data?: unknown;
}

// ─────────────────────────────────────────────────────────────
// Logger Configuration
// ─────────────────────────────────────────────────────────────

export interface LoggerConfig {
  /** 최소 로그 레벨 */
  minLevel: LogLevel;
  /** 환경 (자동 감지 가능) */
  environment: LogEnvironment;
  /** 콘솔 출력 여부 */
  enableConsole: boolean;
  /** 스토리지 저장 여부 */
  enableStorage: boolean;
  /** 리모트 전송 여부 */
  enableRemote: boolean;
  /** 소스 위치 포함 여부 */
  includeLocation: boolean;
  /** 최대 저장 로그 수 */
  maxStoredLogs: number;
}

export const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  environment: LogEnvironment.CONTENT,
  enableConsole: true,
  enableStorage: process.env.NODE_ENV === 'production',
  enableRemote: false,
  includeLocation: process.env.NODE_ENV !== 'production',
  maxStoredLogs: 1000,
};
