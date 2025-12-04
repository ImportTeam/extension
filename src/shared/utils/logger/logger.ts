/**
 * Logger Core Implementation
 *
 * 실무 표준 로깅 시스템 구현
 * - Singleton 패턴
 * - 환경별 자동 감지
 * - 레벨별 메서드 (debug, info, warn, error, fatal)
 * - 에러 코드 기반 로깅
 * - 구조화된 출력
 */

import {
  LogLevel,
  LogEnvironment,
  LogDomain,
  ERROR_MESSAGES,
  LOG_LEVEL_NAMES,
  LOG_LEVEL_COLORS,
  LOG_LEVEL_EMOJI,
  DEFAULT_CONFIG,
  type ErrorCodeType,
} from './constants';

import type {
  LoggerConfig,
  LogEntry,
  SourceLocation,
  FormattedLogEntry,
} from './types';

// ─────────────────────────────────────────────────────────────
// Logger Class
// ─────────────────────────────────────────────────────────────

class Logger {
  private static instance: Logger;
  private config: LoggerConfig;
  private storedLogs: LogEntry[] = [];
  private correlationId: string | undefined;

  private constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      environment: this.detectEnvironment(),
      ...config,
    };
  }

  /**
   * Singleton instance getter
   */
  public static getInstance(config?: Partial<LoggerConfig>): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(config);
    }
    return Logger.instance;
  }

  /**
   * 환경 자동 감지
   */
  private detectEnvironment(): LogEnvironment {
    // Chrome Extension 환경 확인
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      const url = globalThis.location?.href || '';

      if (url.includes('popup.html')) return LogEnvironment.POPUP;
      if (url.includes('subpopup') || url.includes('auto=true')) return LogEnvironment.SUBPOPUP;
      if (url.includes('options.html')) return LogEnvironment.OPTIONS;
      if (url.includes('offscreen')) return LogEnvironment.OFFSCREEN;

      // Background service worker
      if (typeof window === 'undefined' || !document) {
        return LogEnvironment.BACKGROUND;
      }

      // Content script (웹페이지 컨텍스트)
      return LogEnvironment.CONTENT;
    }

    return LogEnvironment.CONTENT;
  }

  /**
   * 소스 위치 추출 (Error stack 파싱)
   */
  private getSourceLocation(): SourceLocation | undefined {
    if (!this.config.includeLocation) return undefined;

    try {
      const stack = new Error().stack;
      if (!stack) return undefined;

      // Stack에서 Logger 호출 이후의 위치 찾기
      const lines = stack.split('\n');
      // Logger 메서드 호출 이후의 라인 (보통 4번째)
      const callerLine = lines[4] || lines[3] || '';

      // Chrome/V8 스택 포맷: "at functionName (file:line:column)"
      const match = callerLine.match(/at\s+(?:(.+?)\s+)?\(?(.+?):(\d+):(\d+)\)?/);
      if (match) {
        return {
          function: match[1] || 'anonymous',
          file: match[2]?.split('/').pop() || match[2],
          line: parseInt(match[3], 10),
          column: parseInt(match[4], 10),
        };
      }
    } catch {
      // Stack parsing failed
    }

    return undefined;
  }

  /**
   * 로그 엔트리 생성
   */
  private createEntry(
    level: LogLevel,
    domain: LogDomain,
    message: string,
    options: {
      code?: ErrorCodeType;
      data?: unknown;
      error?: Error;
    } = {}
  ): LogEntry {
    return {
      timestamp: Date.now(),
      level,
      environment: this.config.environment,
      domain,
      message,
      code: options.code,
      location: this.getSourceLocation(),
      data: options.data,
      error: options.error,
      correlationId: this.correlationId,
    };
  }

  /**
   * 로그 엔트리 포맷팅 (콘솔 출력용)
   */
  private formatEntry(entry: LogEntry): FormattedLogEntry {
    const emoji = LOG_LEVEL_EMOJI[entry.level];
    const levelName = LOG_LEVEL_NAMES[entry.level];
    const color = LOG_LEVEL_COLORS[entry.level];
    const envShort = entry.environment.substring(0, 3).toUpperCase();
    const domainShort = entry.domain.substring(0, 3).toUpperCase();

    // 시간 포맷 (HH:mm:ss.mmm)
    const date = new Date(entry.timestamp);
    const time = date.toTimeString().split(' ')[0] + '.' + String(date.getMilliseconds()).padStart(3, '0');

    // 위치 정보
    const loc = entry.location
      ? `${entry.location.file}:${entry.location.line}`
      : '';

    // 에러 코드
    const code = entry.code ? `[${entry.code}]` : '';

    // 프리픽스 구성: [시간] [환경/도메인] [레벨] [코드] [위치]
    const prefix = `${emoji} [${time}] [${envShort}/${domainShort}] ${levelName}${code ? ' ' + code : ''}${loc ? ' @ ' + loc : ''}`;

    return {
      prefix,
      message: entry.message,
      style: `color: ${color}; font-weight: bold;`,
      data: entry.data,
    };
  }

  /**
   * 로그 출력
   */
  private output(entry: LogEntry): void {
    // 레벨 필터링
    if (entry.level < this.config.minLevel) return;

    // 콘솔 출력
    if (this.config.enableConsole) {
      const formatted = this.formatEntry(entry);
      const consoleMethod = this.getConsoleMethod(entry.level);

      // 스타일 적용 출력
      if (formatted.data !== undefined) {
        consoleMethod(`%c${formatted.prefix}`, formatted.style, formatted.message, formatted.data);
      } else {
        consoleMethod(`%c${formatted.prefix}`, formatted.style, formatted.message);
      }

      // 에러 객체가 있으면 스택 출력
      if (entry.error) {
        consoleMethod(entry.error);
      }
    }

    // 스토리지 저장
    if (this.config.enableStorage) {
      this.storeLog(entry);
    }
  }

  /**
   * 레벨별 콘솔 메서드 반환
   */
  private getConsoleMethod(level: LogLevel): typeof console.log {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug.bind(console);
      case LogLevel.INFO:
        return console.info.bind(console);
      case LogLevel.WARN:
        return console.warn.bind(console);
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        return console.error.bind(console);
      default:
        return console.log.bind(console);
    }
  }

  /**
   * 로그 스토리지 저장
   */
  private storeLog(entry: LogEntry): void {
    this.storedLogs.push(entry);

    // 최대 저장 수 초과 시 오래된 로그 제거
    if (this.storedLogs.length > this.config.maxStoredLogs) {
      this.storedLogs = this.storedLogs.slice(-this.config.maxStoredLogs);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Public API
  // ─────────────────────────────────────────────────────────────

  /**
   * 설정 업데이트
   */
  public configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 환경 설정
   */
  public setEnvironment(env: LogEnvironment): void {
    this.config.environment = env;
  }

  /**
   * Correlation ID 설정 (요청 추적용)
   */
  public setCorrelationId(id: string): void {
    this.correlationId = id;
  }

  /**
   * Correlation ID 초기화
   */
  public clearCorrelationId(): void {
    this.correlationId = undefined;
  }

  /**
   * DEBUG 레벨 로그
   */
  public debug(domain: LogDomain, message: string, data?: unknown): void {
    this.output(this.createEntry(LogLevel.DEBUG, domain, message, { data }));
  }

  /**
   * INFO 레벨 로그
   */
  public info(domain: LogDomain, message: string, data?: unknown): void {
    this.output(this.createEntry(LogLevel.INFO, domain, message, { data }));
  }

  /**
   * WARN 레벨 로그
   */
  public warn(domain: LogDomain, message: string, data?: unknown): void {
    this.output(this.createEntry(LogLevel.WARN, domain, message, { data }));
  }

  /**
   * ERROR 레벨 로그 (에러 코드 포함)
   */
  public error(
    domain: LogDomain,
    code: ErrorCodeType,
    message?: string,
    options?: { data?: unknown; error?: Error }
  ): void {
    const finalMessage = message || ERROR_MESSAGES[code];
    this.output(
      this.createEntry(LogLevel.ERROR, domain, finalMessage, {
        code,
        data: options?.data,
        error: options?.error,
      })
    );
  }

  /**
   * FATAL 레벨 로그 (치명적 에러)
   */
  public fatal(
    domain: LogDomain,
    code: ErrorCodeType,
    message?: string,
    options?: { data?: unknown; error?: Error }
  ): void {
    const finalMessage = message || ERROR_MESSAGES[code];
    this.output(
      this.createEntry(LogLevel.FATAL, domain, finalMessage, {
        code,
        data: options?.data,
        error: options?.error,
      })
    );
  }

  /**
   * 저장된 로그 조회
   */
  public getLogs(filter?: {
    level?: LogLevel;
    domain?: LogDomain;
    since?: number;
  }): LogEntry[] {
    let logs = [...this.storedLogs];

    if (filter?.level !== undefined) {
      const minLevel = filter.level;
      logs = logs.filter((l) => l.level >= minLevel);
    }
    if (filter?.domain) {
      logs = logs.filter((l) => l.domain === filter.domain);
    }
    if (filter?.since !== undefined) {
      const sinceTime = filter.since;
      logs = logs.filter((l) => l.timestamp >= sinceTime);
    }

    return logs;
  }

  /**
   * 저장된 로그 초기화
   */
  public clearLogs(): void {
    this.storedLogs = [];
  }

  /**
   * 로그 내보내기 (디버깅용)
   */
  public exportLogs(): string {
    return JSON.stringify(this.storedLogs, null, 2);
  }

  /**
   * 그룹 로깅 시작
   */
  public group(label: string): void {
    if (this.config.enableConsole) {
      console.group(label);
    }
  }

  /**
   * 그룹 로깅 종료
   */
  public groupEnd(): void {
    if (this.config.enableConsole) {
      console.groupEnd();
    }
  }

  /**
   * 성능 측정 시작
   */
  public time(label: string): void {
    if (this.config.enableConsole) {
      console.time(label);
    }
  }

  /**
   * 성능 측정 종료
   */
  public timeEnd(label: string): void {
    if (this.config.enableConsole) {
      console.timeEnd(label);
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Export Singleton Instance
// ─────────────────────────────────────────────────────────────

export const logger = Logger.getInstance();

// 타입도 함께 export
export { Logger };
