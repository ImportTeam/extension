/**
 * Toggle Bar Render Facade
 * 외부 API는 유지하면서, 내부 책임은 SRP 기준으로 모듈에 위임
 */

export { renderContent } from './view/contentRenderer';
export { updateBadge } from './services/badge';

import { renderContent } from './view/contentRenderer';
import { startLowestPriceComparison } from './services/comparison';

export const startLowestPriceComparisonAndRender = (query: string): void => {
	startLowestPriceComparison(query, renderContent);
};
