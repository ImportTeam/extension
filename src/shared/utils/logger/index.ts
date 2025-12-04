/**
 * Logger System - Public API
 *
 * Usage:
 * ```typescript
 * import { logger, LogDomain, ErrorCode } from '@/shared/utils/logger';
 *
 * // 일반 로깅
 * logger.debug(LogDomain.PARSER, 'Parsing started', { url });
 * logger.info(LogDomain.STORE, 'State updated', { newState });
 * logger.warn(LogDomain.DOM, 'Element not visible');
 *
 * // 에러 로깅 (에러 코드 필수)
 * logger.error(LogDomain.PARSER, ErrorCode.PAR_E001, 'Failed to extract price', {
 *   data: { selector, html },
 *   error: err,
 * });
 *
 * // 치명적 에러
 * logger.fatal(LogDomain.BOOTSTRAP, ErrorCode.BST_E001, 'Extension init failed');
 * ```
 */

// Core Logger
export { logger, Logger } from './logger';

// Types & Enums
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
} from './types';

export type {
  LoggerConfig,
  LogEntry,
  SourceLocation,
  FormattedLogEntry,
} from './types';

// ─────────────────────────────────────────────────────────────
// Convenience Shortcuts
// ─────────────────────────────────────────────────────────────

import { logger } from './logger';
import { LogDomain, ErrorCode, type ErrorCodeType } from './types';

// ─────────────────────────────────────────────────────────────
// Domain Logger Type
// ─────────────────────────────────────────────────────────────

interface ErrorOptions {
  data?: unknown;
  error?: Error;
}

interface DomainLogger {
  debug: (msg: string, data?: unknown) => void;
  info: (msg: string, data?: unknown) => void;
  warn: (msg: string, data?: unknown) => void;
  error: (code: ErrorCodeType, msg?: string, options?: ErrorOptions) => void;
  fatal: (code: ErrorCodeType, msg?: string, options?: ErrorOptions) => void;
}

// ─────────────────────────────────────────────────────────────
// Domain Logger Factory
// ─────────────────────────────────────────────────────────────

function createDomainLogger(domain: LogDomain, defaultErrorCode: ErrorCodeType): DomainLogger {
  return {
    debug: (msg: string, data?: unknown): void => logger.debug(domain, msg, data),
    info: (msg: string, data?: unknown): void => logger.info(domain, msg, data),
    warn: (msg: string, data?: unknown): void => logger.warn(domain, msg, data),
    error: (code: ErrorCodeType, msg?: string, options?: ErrorOptions): void =>
      logger.error(domain, code || defaultErrorCode, msg, options),
    fatal: (code: ErrorCodeType, msg?: string, options?: ErrorOptions): void =>
      logger.fatal(domain, code || defaultErrorCode, msg, options),
  };
}

/**
 * Parser 도메인 전용 로거
 */
export const parserLog = createDomainLogger(LogDomain.PARSER, ErrorCode.PAR_E001);

// Alias for parseLog (backward compatibility)
export const parseLog = parserLog;

/**
 * Store 도메인 전용 로거
 */
export const storeLog = createDomainLogger(LogDomain.STORE, ErrorCode.STO_E001);

/**
 * UI 도메인 전용 로거
 */
export const uiLog = createDomainLogger(LogDomain.UI, ErrorCode.UI_E001);

/**
 * Network 도메인 전용 로거
 */
export const networkLog = createDomainLogger(LogDomain.NETWORK, ErrorCode.NET_E001);

/**
 * DOM 도메인 전용 로거
 */
export const domLog = createDomainLogger(LogDomain.DOM, ErrorCode.DOM_E001);

/**
 * Bootstrap 도메인 전용 로거
 */
export const bootstrapLog = createDomainLogger(LogDomain.BOOTSTRAP, ErrorCode.BST_E001);

/**
 * Extension 도메인 전용 로거
 */
export const extLog = createDomainLogger(LogDomain.EXTENSION, ErrorCode.EXT_E001);
