import React, { useEffect, useState } from 'react';
import { idleViewStyles as styles } from '../../../popup/styles/popup/idleViewStyles';
import { DashboardService } from '@/shared/utils/dashboardService';

const DEFAULT_SAVINGS = '₩0';

export const IdleView: React.FC = () => {
  const [savingsAmount, setSavingsAmount] = useState<string>(DEFAULT_SAVINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSavings = async (): Promise<void> => {
      try {
        const metrics = await DashboardService.getSavingsMetrics();
        if (metrics?.savingsAmountKrw) {
          setSavingsAmount(metrics.savingsAmountKrw);
        } else {
          // API 응답 없음 → 기본값
          setSavingsAmount(DEFAULT_SAVINGS);
        }
      } catch (err) {
        console.warn('Failed to load savings:', err);
        // 오류 시 기본값 사용
        setSavingsAmount(DEFAULT_SAVINGS);
      } finally {
        setIsLoading(false);
      }
    };

    // 약간의 지연 추가 (토큰 초기화 완료 대기)
    const timer = setTimeout(loadSavings, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.label} className="idle-label">
          <span>이번달</span>
        </div>
        <div style={styles.amount}>
          {isLoading ? '로딩...' : savingsAmount}
        </div>
        <p style={styles.text}>
          절약했어요
        </p>
      </div>
    </div>
  );
};

