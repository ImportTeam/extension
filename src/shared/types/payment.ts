/**
 * 결제 수단 정보
 * Layer 1, 2, 3에서 사용되는 기본 단위
 */
export interface PaymentMethod {
  id: string; // "shinhan-card", "woori-cash" 등
  name: string; // "신한카드"
  savingAmount: number; // 원 단위, e.g., 500
  fee: number; // %, e.g., 0.5
  baseFee: number; // 기준 수수료 %, e.g., 0.8
  confidence: number; // 0-1, 추천도
  hasInstallment?: boolean; // 할부 가능 여부
  installmentInfo?: string; // "3개월 무이자" 등
}

/**
 * 사용자 정의 결제 수단 (SubPopup에서 관리)
 */
export interface CustomPaymentMethod extends PaymentMethod {
  createdAt: number; // 생성 시간
  updatedAt: number; // 수정 시간
  isCustom: true;
}
