/**
 * Logger utility for PicSel Chrome Extension
 *
 * Enhanced logger with component identification, rich typing, and PII masking
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type ComponentType = 'popup' | 'content' | 'background' | 'offscreen' | 'options';

interface LogEntry {
  level: LogLevel;
  message: string;
  component: ComponentType;
  data?: any;
  timestamp: number;
  userId?: string;
  sessionId?: string;
  error?: Error;
  stack?: string;
  url?: string;
  userAgent?: string;
}

interface LogData {
  [key: string]: any;
  error?: Error;
  url?: string;
  userAgent?: string;
  stack?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private batchSize = 50;
  private flushInterval = 30000; // 30 seconds
  private component: ComponentType;

  constructor(component: ComponentType) {
    this.component = component;
    // Auto-flush logs periodically
    setInterval(() => this.flush(), this.flushInterval);
  }

  debug(message: string, data?: LogData) {
    this.log('debug', message, data);
  }

  info(message: string, data?: LogData) {
    this.log('info', message, data);
  }

  warn(message: string, data?: LogData) {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error, data?: LogData) {
    const logData = { ...data, error };
    if (error) {
      logData.stack = error.stack;
    }
    this.log('error', message, logData);
    // Critical errors are sent immediately
    this.flush();
  }

  private log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      level,
      message,
      component: this.component,
      data: this.maskSensitive(data),
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    };

    this.logs.push(entry);

    // Console output for development with component prefix
    if (process.env.NODE_ENV === 'development') {
      const prefix = `[${this.component.toUpperCase()}]`;
      console[level](`${prefix} [${level.toUpperCase()}] ${message}`, data);
    }

    // Flush if batch is full
    if (this.logs.length >= this.batchSize) {
      this.flush();
    }
  }

  private maskSensitive(data: any): any {
    if (!data) return data;

    // Handle different data types
    if (typeof data === 'string') {
      return this.maskString(data);
    }

    if (Array.isArray(data)) {
      return data.map(item => this.maskSensitive(item));
    }

    if (typeof data === 'object' && data.constructor === Object) {
      return this.maskObject(data);
    }

    // Return primitive types as-is
    return data;
  }

  private maskString(str: string): string {
    const sensitivePatterns = [
      /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g, // Credit card numbers
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Emails
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, // Phone numbers
    ];

    let masked = str;
    sensitivePatterns.forEach(pattern => {
      masked = masked.replace(pattern, '***MASKED***');
    });

    return masked;
  }

  private maskObject(obj: any): any {
    const sensitiveKeys = [
      'password', 'token', 'key', 'secret', 'email', 'phone',
      'creditCard', 'cardNumber', 'cvv', 'pin', 'ssn', 'apiKey'
    ];

    const masked = { ...obj };

    for (const key in masked) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        masked[key] = '***MASKED***';
      } else {
        // Recursively mask nested objects
        masked[key] = this.maskSensitive(masked[key]);
      }
    }

    return masked;
  }

  private async flush() {
    if (this.logs.length === 0) return;

    const logsToSend = [...this.logs];
    this.logs = [];

    try {
      // TODO: Send to backend/monitoring service
      // Note: Not logging here to avoid infinite recursion
    } catch (err) {
      // Note: Not logging here to avoid infinite recursion
      // Re-add logs to queue for retry
      this.logs.unshift(...logsToSend);
    }
  }
}

// Factory functions for different components
export const createLogger = (component: ComponentType) => new Logger(component);

// Pre-configured loggers for each component
export const backgroundLogger = new Logger('background');
export const contentLogger = new Logger('content');
export const popupLogger = new Logger('popup');
export const offscreenLogger = new Logger('offscreen');
export const optionsLogger = new Logger('options');

// Legacy export for backward compatibility (background)
export const logger = backgroundLogger;
