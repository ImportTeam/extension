/**
 * Metrics utility
 * 
 * Collects and batches metrics for monitoring
 */

import { backgroundLogger as logger } from '@/shared/logger';

interface Metric {
  name: string;
  value: number;
  tags?: Record<string, string>;
  timestamp: number;
}

class Metrics {
  private metrics: Metric[] = [];
  private batchSize = 100;
  private flushInterval = 60000; // 1 minute

  constructor() {
    // Auto-flush metrics periodically
    setInterval(() => this.flush(), this.flushInterval);
  }

  /**
   * Increment a counter metric
   */
  increment(name: string, tags?: Record<string, string>) {
    this.addMetric(name, 1, tags);
  }

  /**
   * Record a timing metric
   */
  timing(name: string, value: number, tags?: Record<string, string>) {
    this.addMetric(name, value, tags);
  }

  /**
   * Record a gauge metric
   */
  gauge(name: string, value: number, tags?: Record<string, string>) {
    this.addMetric(name, value, tags);
  }

  private addMetric(name: string, value: number, tags?: Record<string, string>) {
    const metric: Metric = {
      name,
      value,
      tags,
      timestamp: Date.now()
    };

    this.metrics.push(metric);

    // Flush if batch is full
    if (this.metrics.length >= this.batchSize) {
      this.flush();
    }
  }

  private async flush() {
    if (this.metrics.length === 0) return;

    const metricsToSend = [...this.metrics];
    this.metrics = [];

    try {
      // TODO: Send to backend/monitoring service
      logger.debug('Flushing metrics', { count: metricsToSend.length });
    } catch (err) {
      logger.error('Failed to flush metrics', err as Error, { count: metricsToSend.length });
      // Re-add metrics to queue for retry
      this.metrics.unshift(...metricsToSend);
    }
  }
}

export const metrics = new Metrics();
