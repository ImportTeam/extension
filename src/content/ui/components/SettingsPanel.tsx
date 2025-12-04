/**
 * settgins Page - 지금은 사용하지 않음
 */

import React from 'react';
import { useRecommendation } from '../../../shared/store';

export const SettingsPanel: React.FC = () => {
  const recommendation = useRecommendation();

  if (!recommendation) {
    return null;
  }

  return (
    <div style={{ padding: '12px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
          수수료 명세
        </h3>
        <div style={{ backgroundColor: '#f9fafb', borderRadius: '6px', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
            <span>{recommendation.name} 수수료:</span>
            <span style={{ fontWeight: 'bold' }}>{recommendation.fee}%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
            <span>기준 수수료:</span>
            <span style={{ fontWeight: 'bold' }}>{recommendation.baseFee}%</span>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '8px', marginTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ fontWeight: 'bold', color: '#10b981' }}>절약액:</span>
              <span style={{ fontWeight: 'bold', color: '#10b981' }}>
                ₩{recommendation.savingAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {recommendation.hasInstallment && recommendation.installmentInfo && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
            할부 정보
          </h3>
          <div style={{ backgroundColor: '#eff6ff', borderRadius: '6px', padding: '12px', fontSize: '12px', color: '#0284c7' }}>
            {recommendation.installmentInfo}
          </div>
        </div>
      )}

      {recommendation.confidence >= 0.95 && (
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
            추천 신뢰도
          </h3>
          <div style={{ fontSize: '12px', color: '#10b981' }}>
            ✓ {Math.round(recommendation.confidence * 100)}% 신뢰도
          </div>
        </div>
      )}
    </div>
  );
};
