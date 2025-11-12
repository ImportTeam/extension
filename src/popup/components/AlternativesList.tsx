import React from 'react';
import {
  useAlternatives,
  useRecommendationActions,
} from '../../shared/store/recommendationStore';

/**
 * AlternativesList (Layer 2)
 *
 * Displays alternative payment methods when expanded
 *
 * Psychology:
 * - Social Proof: "다른 옵션도 좋습니다"
 * - Comparative Advantage: 각 옵션의 절약액 표시
 * - Choice Overload 회피: 기본 1개 선택 후 확장
 */
export const AlternativesList: React.FC = () => {
  const alternatives = useAlternatives();
  const { setRecommendation } = useRecommendationActions();

  if (!alternatives || alternatives.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        추가 옵션이 없습니다.
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        다른 결제 수단
      </h4>

      <div className="space-y-2">
        {alternatives.map((method) => (
          <button
            key={method.id}
            onClick={() => setRecommendation(method)}
            className="
              w-full p-3 rounded-md
              bg-white dark:bg-gray-700
              border border-gray-200 dark:border-gray-600
              hover:border-primary dark:hover:border-primary
              transition-all
              text-left
            "
          >
            <div className="flex justify-between items-start">
              {/* Left: Method Name + Installment */}
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {method.name}
                </p>
                {method.hasInstallment && method.installmentInfo && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {method.installmentInfo}
                  </p>
                )}
              </div>

              {/* Right: Savings Amount */}
              <p className="font-semibold text-success text-sm">
                ₩{method.savingAmount.toLocaleString()}
              </p>
            </div>

            {/* Fee Info */}
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              수수료: {method.fee}%
              {method.baseFee > method.fee && (
                <span className="text-success ml-1">
                  (vs {method.baseFee}%)
                </span>
              )}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
