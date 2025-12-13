/**
 * Toggle Bar 모듈 진입점
 * 
 * 모듈 구조:
 * - state.ts: 전역 상태 관리
 * - mount.ts: DOM 마운트/언마운트
 * - render.ts: UI 렌더링
 * - styles.ts: CSS 스타일
 * - components/: UI 컴포넌트
 *   - HeroSection.ts: 상품 정보
 *   - CardBenefitsSection.ts: 카드별 혜택 비교 (메인)
 *   - FooterSection.ts: 추가 혜택
 */

export type { ToggleProductData } from './types';
export { mountToggleBar, updateToggleBar, setPanelOpen } from './mount';
export { renderContent, updateBadge, startLowestPriceComparisonAndRender } from './render';
export { state, getPlatformDisplayName } from './state';
