import React, { useState } from 'react';
import { useSubPopupActions } from '../../shared/store/subpopupStore';
import type { CustomPaymentMethod } from '../../shared/types';

/**
 * AddPaymentForm Component
 * 새로운 결제 수단 추가 폼
 */
export const AddPaymentForm: React.FC = () => {
  const { addPaymentMethod } = useSubPopupActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    savingAmount: 0,
    fee: 0.8,
    baseFee: 0.8,
    confidence: 0.8,
    hasInstallment: false,
    installmentInfo: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? parseFloat(value) || 0
            : value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.id.trim()) {
      setError('결제 수단 ID를 입력해주세요.');
      return false;
    }

    if (!formData.name.trim()) {
      setError('결제 수단 이름을 입력해주세요.');
      return false;
    }

    if (formData.savingAmount < 0) {
      setError('절약 금액은 0 이상이어야 합니다.');
      return false;
    }

    if (formData.fee < 0 || formData.fee > 100) {
      setError('수수료는 0 ~ 100 사이여야 합니다.');
      return false;
    }

    if (formData.confidence < 0 || formData.confidence > 1) {
      setError('신뢰도는 0 ~ 1 사이여야 합니다.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newMethod: Omit<CustomPaymentMethod, 'createdAt' | 'updatedAt' | 'isCustom'> = {
        id: `custom-${Date.now()}`,
        name: formData.name,
        savingAmount: formData.savingAmount,
        fee: formData.fee,
        baseFee: formData.baseFee,
        confidence: formData.confidence,
        hasInstallment: formData.hasInstallment,
        installmentInfo: formData.installmentInfo || undefined,
      };

      addPaymentMethod(newMethod);

      setSuccess(true);
      setFormData({
        id: '',
        name: '',
        savingAmount: 0,
        fee: 0.8,
        baseFee: 0.8,
        confidence: 0.8,
        hasInstallment: false,
        installmentInfo: '',
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form-section" onSubmit={handleSubmit}>
      {error && (
        <div className="error-message">
          <strong>⚠️ 오류</strong>
          <div style={{ marginTop: '4px' }}>{error}</div>
        </div>
      )}
      {success && (
        <div className="success-message">
          <strong>✓ 완료!</strong>
          <div style={{ marginTop: '4px' }}>결제 수단이 추가되었습니다</div>
        </div>
      )}

      {/* Section Title */}
      <div style={{
        fontSize: '12px',
        fontWeight: '700',
        color: 'var(--color-primary)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 'var(--spacing-lg)',
        paddingBottom: 'var(--spacing-md)',
        borderBottom: '2px solid var(--color-primary-lighter)'
      }}>
        결제 수단 정보
      </div>

      {/* Payment Method Name */}
      <div className="form-group">
        <label className="form-label">결제 수단 이름</label>
        <input
          type="text"
          name="name"
          className="form-input"
          placeholder="예: 신한카드, 토스머니"
          value={formData.name}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <div className="form-hint">💡 사용자에게 표시될 결제 수단 이름</div>
      </div>

      {/* Saving Amount */}
      <div className="form-group">
        <label className="form-label">예상 절약 금액</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <input
            type="number"
            name="savingAmount"
            className="form-input"
            placeholder="0"
            value={formData.savingAmount}
            onChange={handleInputChange}
            disabled={isLoading}
            min="0"
            style={{ flex: 1 }}
          />
          <span style={{ color: 'var(--color-text-tertiary)', fontWeight: '600' }}>원</span>
        </div>
        <div className="form-hint">💡 이 결제 수단 선택 시 절약 가능한 금액</div>
      </div>

      {/* Fee Information */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">수수료율</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <input
              type="number"
              name="fee"
              className="form-input"
              placeholder="0.5"
              value={formData.fee}
              onChange={handleInputChange}
              disabled={isLoading}
              min="0"
              max="100"
              step="0.1"
              style={{ flex: 1 }}
            />
            <span style={{ color: 'var(--color-text-tertiary)', fontWeight: '600' }}>%</span>
          </div>
          <div className="form-hint">💡 현재 수수료</div>
        </div>

        <div className="form-group">
          <label className="form-label">기준 수수료</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <input
              type="number"
              name="baseFee"
              className="form-input"
              placeholder="0.8"
              value={formData.baseFee}
              onChange={handleInputChange}
              disabled={isLoading}
              min="0"
              max="100"
              step="0.1"
              style={{ flex: 1 }}
            />
            <span style={{ color: 'var(--color-text-tertiary)', fontWeight: '600' }}>%</span>
          </div>
          <div className="form-hint">💡 기준 수수료</div>
        </div>
      </div>

      {/* Confidence */}
      <div className="form-group">
        <label className="form-label">신뢰도</label>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-md)',
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--color-bg-tertiary)',
          borderRadius: 'var(--radius-md)'
        }}>
          <input
            type="range"
            name="confidence"
            min="0"
            max="1"
            step="0.1"
            value={formData.confidence}
            onChange={handleInputChange}
            disabled={isLoading}
            style={{
              flex: 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              accentColor: 'var(--color-primary)'
            }}
          />
          <span style={{
            fontSize: '14px',
            fontWeight: '700',
            color: 'var(--color-primary)',
            minWidth: '40px',
            textAlign: 'right'
          }}>
            {(formData.confidence * 100).toFixed(0)}%
          </span>
        </div>
        <div className="form-hint">💡 0%는 최하, 100%는 최고 신뢰도</div>
      </div>

      {/* Installment Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--spacing-md)',
        backgroundColor: 'var(--color-bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease'
      }}>
        <input
          type="checkbox"
          name="hasInstallment"
          id="has-installment"
          checked={formData.hasInstallment}
          onChange={handleInputChange}
          disabled={isLoading}
          style={{
            accentColor: 'var(--color-primary)',
            cursor: 'pointer',
            marginRight: 'var(--spacing-md)',
            width: '18px',
            height: '18px'
          }}
        />
        <label htmlFor="has-installment" style={{ cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
          할부 지원
        </label>
      </div>

      {formData.hasInstallment && (
        <div className="form-group">
          <label className="form-label">할부 정보</label>
          <input
            type="text"
            name="installmentInfo"
            className="form-input"
            placeholder="예: 3개월 무이자, 6개월 이상 가능"
            value={formData.installmentInfo}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <div className="form-hint">💡 할부 옵션 상세 정보</div>
        </div>
      )}

      {/* Submit Button */}
      <div className="button-group" style={{ marginTop: 'var(--spacing-xl)' }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
          style={{
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? (
            <>
              <span className="spinner" style={{ width: '14px', height: '14px', borderWidth: '2px' }} />
              저장 중...
            </>
          ) : (
            <>✓ 추가하기</>
          )}
        </button>
      </div>
    </form>
  );
};
