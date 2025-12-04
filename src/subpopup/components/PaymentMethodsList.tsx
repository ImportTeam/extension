import React from 'react';
import {
  useCustomPaymentMethods,
  useSubPopupActions,
} from '../../shared/store';

/**
 * PaymentMethodsList Component
 * 저장된 결제 수단 목록 및 관리
 */
export const PaymentMethodsList: React.FC = () => {
  const customMethods = useCustomPaymentMethods();
  const { deletePaymentMethod } = useSubPopupActions();

  if (customMethods.length === 0) {
    return (
      <div className="payment-list-empty">
        <div className="payment-list-empty-icon">�️</div>
        <div className="payment-list-empty-text">아직 결제 수단이 없어요</div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '8px' }}>
          새로운 결제 수단을 추가해보세요
        </div>
      </div>
    );
  }

  const handleDelete = (id: string): void => {
    if (window.confirm('정말 이 결제 수단을 삭제하시겠어요?')) {
      deletePaymentMethod(id);
    }
  };

  const getPaymentIcon = (name: string): string => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('카드')) return '💳';
    if (nameLower.includes('계좌') || nameLower.includes('송금')) return '🏦';
    if (nameLower.includes('포인트') || nameLower.includes('쿠폰')) return '🎫';
    if (nameLower.includes('페이') || nameLower.includes('pay')) return '📱';
    if (nameLower.includes('현금')) return '💵';
    return '💰';
  };

  return (
    <div className="payment-list">
      {customMethods.map((method) => {
        const isHighConfidence = method.confidence >= 0.95;
        const icon = getPaymentIcon(method.name);
        
        return (
          <div key={method.id} className="payment-item">
            <div className="payment-item-icon">{icon}</div>

            <div className="payment-item-content">
              {/* Header Row with Name & Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                <div>
                  <div className="payment-item-name">{method.name}</div>
                  <div className="payment-item-meta">
                    <span>{new Date(method.createdAt).toLocaleDateString('ko-KR')}</span>
                  </div>
                </div>
                {isHighConfidence && (
                  <div className="payment-item-badge success">
                    ⭐ 우수
                  </div>
                )}
              </div>

              {/* Detailed Info Grid */}
              <div className="payment-item-info">
                <div className="payment-item-info-item">
                  <span className="payment-item-info-label">절약액</span>
                  <span className="payment-item-info-value">
                    ₩{method.savingAmount.toLocaleString()}
                  </span>
                </div>
                <div className="payment-item-info-item">
                  <span className="payment-item-info-label">수수료</span>
                  <span className="payment-item-info-value">{method.fee}%</span>
                </div>
                <div className="payment-item-info-item">
                  <span className="payment-item-info-label">신뢰도</span>
                  <span className="payment-item-info-value">
                    {(method.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="payment-item-info-item">
                  <span className="payment-item-info-label">기본수수료</span>
                  <span className="payment-item-info-value">{method.baseFee}%</span>
                </div>
              </div>

              {/* Installment Info */}
              {method.hasInstallment && method.installmentInfo && (
                <div
                  style={{
                    fontSize: '12px',
                    padding: 'var(--spacing-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-md)',
                    borderLeft: '3px solid var(--color-primary-lighter)',
                    fontWeight: '500'
                  }}
                >
                  <strong>할부 정보:</strong> {method.installmentInfo}
                </div>
              )}

              {/* Action Buttons */}
              <div className="payment-item-actions" style={{ justifyContent: 'space-between' }}>
                <button
                  className="payment-item-btn payment-item-btn-edit"
                  onClick={() => alert('수정 기능은 곧 추가됩니다.')}
                  style={{ flex: 1 }}
                  title="수정"
                >
                  ✏️ 수정
                </button>
                <button
                  className="payment-item-btn payment-item-btn-delete"
                  onClick={() => handleDelete(method.id)}
                  style={{ flex: 1 }}
                  title="삭제"
                >
                  🗑️ 삭제
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
