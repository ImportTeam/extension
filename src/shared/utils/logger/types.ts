/**
 * Logger System - Type Definitions
 */

import {
  LogLevel,
  LogEnvironment,
  LogDomain,
  ErrorCodeType,
} from './constants';

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
  code?: ErrorCodeType;
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

// Re-export constants for convenience
export {
  LogLevel,
  LogEnvironment,
  LogDomain,
  ErrorCode,
  ERROR_MESSAGES,
  LOG_LEVEL_NAMES,
  LOG_LEVEL_COLORS,
  LOG_LEVEL_EMOJI,
  DEFAULT_CONFIG,
} from './constants';

export type { ErrorCodeType } from './constants';
