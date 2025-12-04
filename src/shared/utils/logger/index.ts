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
import { LogDomain, ErrorCode } from './types';

/**
 * Parser 도메인 전용 로거
 */
export const parserLog = {
  debug: (msg: string, data?: unknown): void => logger.debug(LogDomain.PARSER, msg, data),
  info: (msg: string, data?: unknown): void => logger.info(LogDomain.PARSER, msg, data),
  warn: (msg: string, data?: unknown): void => logger.warn(LogDomain.PARSER, msg, data),
  error: (code: ErrorCode, msg?: string, opts?: { data?: unknown; error?: Error }): void =>
    logger.error(LogDomain.PARSER, code, msg, opts),
};

/**
 * Store 도메인 전용 로거
 */
export const storeLog = {
  debug: (msg: string, data?: unknown): void => logger.debug(LogDomain.STORE, msg, data),
  info: (msg: string, data?: unknown): void => logger.info(LogDomain.STORE, msg, data),
  warn: (msg: string, data?: unknown): void => logger.warn(LogDomain.STORE, msg, data),
  error: (code: ErrorCode, msg?: string, opts?: { data?: unknown; error?: Error }): void =>
    logger.error(LogDomain.STORE, code, msg, opts),
};

/**
 * UI 도메인 전용 로거
 */
export const uiLog = {
  debug: (msg: string, data?: unknown): void => logger.debug(LogDomain.UI, msg, data),
  info: (msg: string, data?: unknown): void => logger.info(LogDomain.UI, msg, data),
  warn: (msg: string, data?: unknown): void => logger.warn(LogDomain.UI, msg, data),
  error: (code: ErrorCode, msg?: string, opts?: { data?: unknown; error?: Error }): void =>
    logger.error(LogDomain.UI, code, msg, opts),
};

/**
 * Network 도메인 전용 로거
 */
export const networkLog = {
  debug: (msg: string, data?: unknown): void => logger.debug(LogDomain.NETWORK, msg, data),
  info: (msg: string, data?: unknown): void => logger.info(LogDomain.NETWORK, msg, data),
  warn: (msg: string, data?: unknown): void => logger.warn(LogDomain.NETWORK, msg, data),
  error: (code: ErrorCode, msg?: string, opts?: { data?: unknown; error?: Error }): void =>
    logger.error(LogDomain.NETWORK, code, msg, opts),
};

/**
 * DOM 도메인 전용 로거
 */
export const domLog = {
  debug: (msg: string, data?: unknown): void => logger.debug(LogDomain.DOM, msg, data),
  info: (msg: string, data?: unknown): void => logger.info(LogDomain.DOM, msg, data),
  warn: (msg: string, data?: unknown): void => logger.warn(LogDomain.DOM, msg, data),
  error: (code: ErrorCode, msg?: string, opts?: { data?: unknown; error?: Error }): void =>
    logger.error(LogDomain.DOM, code, msg, opts),
};

/**
 * Bootstrap 도메인 전용 로거
 */
export const bootstrapLog = {
  debug: (msg: string, data?: unknown): void => logger.debug(LogDomain.BOOTSTRAP, msg, data),
  info: (msg: string, data?: unknown): void => logger.info(LogDomain.BOOTSTRAP, msg, data),
  warn: (msg: string, data?: unknown): void => logger.warn(LogDomain.BOOTSTRAP, msg, data),
  error: (code: ErrorCode, msg?: string, opts?: { data?: unknown; error?: Error }): void =>
    logger.error(LogDomain.BOOTSTRAP, code, msg, opts),
};
