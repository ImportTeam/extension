/**
 * Background Service Worker - Entry Point
 *
 * 모듈 구조:
 * - messageHandlers.ts: Chrome Runtime 메시지 처리
 * - priceComparison.ts: 가격 비교 API 통신
 */

import { extLog } from '@/shared/utils/logger';
import { setupMessageHandlers } from './messageHandlers';

extLog.info('🟢 Service Worker initialized');

// 메시지 핸들러 등록
setupMessageHandlers();
