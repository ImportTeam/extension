/**
 * Dashboard API Service
 * 대시보드 데이터 (절약액 등) 조회
 */

import { AuthService } from '@/shared/utils/authService';

export interface SavingsMetrics {
  savingsAmountKrw: string;
  lastYearSameMonthSavingsAmount: number;
  savingsDeltaAmount: number;
  savingsDeltaDirection: string;
  compareMessage: string;
  savingsRatePercent: number;
}

const API_BASE = (() => {
  if (typeof process !== 'undefined' && process.env?.REACT_APP_SERVER_URL) {
    return process.env.REACT_APP_SERVER_URL;
  }
  return 'https://api.picsel.kr';
})();

export const DashboardService = {
  /**
   * 절약액 메트릭 조회
   * 토큰이 없으면 null 반환 (조용히 실패)
   */
  async getSavingsMetrics(): Promise<SavingsMetrics | null> {
    try {
      const response = await AuthService.fetchWithAuth(
        `${API_BASE}/api/dashboard/metrics/savings`
      );

      if (!response.ok) {
        console.warn('Failed to fetch savings metrics:', response.statusText);
        return null;
      }

      const json = (await response.json()) as { data: SavingsMetrics };
      return json.data || null;
    } catch (err) {
      // 미로그인 상태 또는 네트워크 오류 → 조용히 실패
      if (err instanceof Error && err.message.includes('Not authenticated')) {
        console.warn('Savings metrics: user not authenticated');
      } else {
        console.warn('Error fetching savings metrics:', err);
      }
      return null;
    }
  },
};
