import React, { ReactElement } from 'react';
import {
  useRecommendation,
  useIsExpanded,
  useRecommendationActions,
  useDiscounts,
  useCardBenefits,
} from '../../../shared/store/recommendationStore';
import { AlternativesList } from './AlternativesList';

/**
 * RecommendationCard - Simplified Inline Styles Version
 *
 * Displays:
 * - Layer 1: Payment method + savings + fee comparison (always visible)
 * - Layer 2: Alternative methods (visible when expanded)
 */

const renderDiscounts = (discounts: Array<{rate: number; type: string}> | null): ReactElement | null => {
  if (!discounts || discounts.length === 0) return null;
  return (
    <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
      <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#92400e', margin: '0 0 8px 0' }}>
        💰 추가 할인 정보
      </p>
      {discounts.map((discount, idx) => (
        <div key={idx} style={{ fontSize: '12px', color: '#78350f', marginBottom: idx < discounts.length - 1 ? '4px' : '0' }}>
          • {discount.type}: {discount.rate}% 할인
        </div>
      ))}
    </div>
  );
};

const renderCardBenefits = (cardBenefits: Array<{card: string; benefit: string}> | null): ReactElement | null => {
  if (!cardBenefits || cardBenefits.length === 0) return null;
  return (
    <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#fce7f3', borderRadius: '6px' }}>
      <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#831843', margin: '0 0 8px 0' }}>
        🎁 카드 혜택
      </p>
      {cardBenefits.map((benefit, idx) => (
        <div key={idx} style={{ fontSize: '12px', color: '#9f1239', marginBottom: idx < cardBenefits.length - 1 ? '4px' : '0' }}>
          • {benefit.card}: {benefit.benefit}
        </div>
      ))}
    </div>
  );
};

const renderActionButton = (): ReactElement => (
  <button
    style={{
      width: '100%',
      padding: '12px',
      backgroundColor: '#4f46e5',
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4338ca')}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
    onClick={() => window.close()}
  >
    이 결제 수단으로 결제하기
  </button>
);

export const RecommendationCard: React.FC = () => {
  const recommendation = useRecommendation();
  const isExpanded = useIsExpanded();
  const discounts = useDiscounts();
  const cardBenefits = useCardBenefits();
  const { toggleExpanded } = useRecommendationActions();

  if (!recommendation) {
    return (
      <div style={{ padding: '16px', textAlign: 'center', color: '#999' }}>
        추천할 결제 수단이 없습니다.
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', marginBottom: '0' }}>
      {/* Layer 1: Main Recommendation */}
      <div style={{ padding: '12px' }}>
        {/* Header: Payment Method Name */}
        <div style={{ marginBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0', color: '#000' }}>
            {recommendation.name}
          </h3>
        </div>

        {/* Primary Info: Savings Amount (24px, bold, green) */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: 'clamp(20px, 8vw, 28px)', fontWeight: 'bold', color: '#10b981', margin: '0 0 4px 0' }}>
            ₩{recommendation.savingAmount.toLocaleString()} 절약
          </div>
          <p style={{ fontSize: 'clamp(10px, 3vw, 12px)', color: '#666', margin: '0' }}>
            이 결제 수단 선택 시 절약 가능
          </p>
        </div>

        {/* Fee Comparison */}
        <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <p style={{ fontSize: '12px', color: '#555', margin: '0' }}>
            수수료:
            <span style={{ fontWeight: 'bold', marginLeft: '4px' }}>
              {recommendation.fee}%
            </span>
            {' vs '}
            <span style={{ fontWeight: 'bold', marginLeft: '4px' }}>
              {recommendation.baseFee}%
            </span>
          </p>
        </div>

        {/* Confidence Badge */}
        {recommendation.confidence >= 0.95 && (
          <div style={{ marginBottom: '12px', fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>
            ✓ 높은 신뢰도 추천
          </div>
        )}

        {/* Installment Info */}
        {recommendation.hasInstallment && recommendation.installmentInfo && (
          <div style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#eff6ff', borderRadius: '6px', fontSize: '12px', color: '#0284c7' }}>
            {recommendation.installmentInfo}
          </div>
        )}

        {/* 할인 정보 */}
        {renderDiscounts(discounts)}

        {/* 카드 혜택 */}
        {renderCardBenefits(cardBenefits)}

        {/* Action Button */}
        {renderActionButton()}
      </div>

      {/* Layer 2: Expandable Alternatives */}
      {isExpanded && (
        <div style={{ borderTop: '1px solid #e5e7eb' }}>
          <AlternativesList />
        </div>
      )}

      {/* Expand/Collapse Button */}
      <button
        onClick={toggleExpanded}
        style={{
          width: '100%',
          padding: '12px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#4f46e5',
          backgroundColor: '#f9fafb',
          border: 'none',
          cursor: 'pointer',
          borderTop: '1px solid #e5e7eb',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
      >
        {isExpanded ? '옵션 숨기기' : '다른 옵션 보기'}
      </button>
    </div>
  );
};
