/**
 * Toggle Bar 모듈 진입점
 * 
 * 모듈 구조:
 * - core/: 타입/상태/유틸
 * - dom/: DOM 생성/바인딩
 * - services/: 데이터 요청/상태 갱신
 * - view/: DOM 렌더링/컴포넌트
 * - controller/: 조율(오케스트레이션)
 * - mount.ts/render.ts: 외부 API facade
 * - styles.ts: CSS 스타일
 */

export type { ToggleProductData } from './core/types';
export { mountToggleBar, updateToggleBar, setPanelOpen } from './mount';
export { renderContent, updateBadge, startLowestPriceComparisonAndRender } from './render';
export { state, getPlatformDisplayName } from './core/state';
