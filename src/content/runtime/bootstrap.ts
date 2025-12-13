/**
 * Content Script Bootstrap
 * 책임: iframe 체크 및 DOMContentLoaded 대기
 */

import { bootstrapLog } from '@/shared/utils/logger';

export const isMainFrame = window.self === window.top;

export function bootstrap(runner: () => void): void {
	if (!isMainFrame) {
		bootstrapLog.debug('Skipping iframe context');
		return;
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', runner);
	} else {
		runner();
	}
}
