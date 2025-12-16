/**
 * Toggle Bar DOM Mounting
 * DOM 생성/주입 및 (최초 1회) 이벤트 바인딩만 책임
 */

import { toggleBarStyles } from '../styles';
import { HOST_ID, PANEL_ID, state } from '../core/state';
import { updateIdleLoadingIndicator, stopMessageRotation } from '../core/loadingIndicator';
import { useSettingsStore } from '@/shared/store/slices/settings';

interface Handlers {
	setPanelOpen: (open: boolean) => void;
	startLowestPriceComparisonNoPanel?: () => void;
}

export const ensureMounted = (handlers: Handlers): void => {
	if (state.mounted) {
		return;
	}

	// 이미 존재하는 호스트 엘리먼트 확인
	const existing = document.getElementById(HOST_ID) as HTMLDivElement | null;
	if (existing) {
		state.hostElement = existing;
		state.shadowRoot = existing.shadowRoot;
		if (existing.shadowRoot) {
			state.toggleButton = existing.shadowRoot.querySelector<HTMLButtonElement>('.picsel-toggle-button');
			state.buttonLabelEl = existing.shadowRoot.querySelector<HTMLSpanElement>('.picsel-toggle-label');
			state.buttonBadgeEl = existing.shadowRoot.querySelector<HTMLSpanElement>('.picsel-toggle-badge');
			state.panelEl = existing.shadowRoot.querySelector<HTMLDivElement>(`#${PANEL_ID}`);
			state.closeButtonEl = existing.shadowRoot.querySelector<HTMLButtonElement>('.picsel-close-button');
			state.contentEl = existing.shadowRoot.querySelector<HTMLDivElement>('.picsel-panel-content');
			state.panelTitleEl = existing.shadowRoot.querySelector<HTMLDivElement>('.picsel-panel-title');
		}
		state.mounted = true;
		return;
	}

	state.hostElement = document.createElement('div');
	state.hostElement.id = HOST_ID;
	state.hostElement.style.position = 'fixed';
	state.hostElement.style.bottom = '24px';
	state.hostElement.style.right = '24px';
	state.hostElement.style.zIndex = String(2147483647);

	state.shadowRoot = state.hostElement.attachShadow({ mode: 'open' });

	const styleEl = document.createElement('style');
	styleEl.textContent = toggleBarStyles;
	state.shadowRoot.appendChild(styleEl);

	const containerEl = document.createElement('div');
	containerEl.className = 'picsel-toggle-container';
	state.shadowRoot.appendChild(containerEl);

	// 토글 버튼
	state.toggleButton = document.createElement('button');
	state.toggleButton.className = 'picsel-toggle-button';
	state.toggleButton.type = 'button';
	state.toggleButton.setAttribute('aria-expanded', 'false');

	state.buttonLabelEl = document.createElement('span');
	state.buttonLabelEl.className = 'picsel-toggle-label';
	state.toggleButton.appendChild(state.buttonLabelEl);

	state.buttonBadgeEl = document.createElement('span');
	state.buttonBadgeEl.className = 'picsel-toggle-badge';
	state.toggleButton.appendChild(state.buttonBadgeEl);

	containerEl.appendChild(state.toggleButton);

	// Idle 상태에서 circle + 메시지 표시
	updateIdleLoadingIndicator();

	// 패널
	state.panelEl = document.createElement('div');
	state.panelEl.className = 'picsel-panel';
	state.panelEl.id = PANEL_ID;
	state.panelEl.setAttribute('role', 'dialog');
	state.panelEl.setAttribute('aria-hidden', 'true');
	state.toggleButton.setAttribute('aria-controls', PANEL_ID);

	const panelHeaderEl = document.createElement('div');
	panelHeaderEl.className = 'picsel-panel-header';

	state.panelTitleEl = document.createElement('div');
	state.panelTitleEl.className = 'picsel-panel-title';
	state.panelTitleEl.textContent = 'PicSel 혜택 정보';

	state.closeButtonEl = document.createElement('button');
	state.closeButtonEl.type = 'button';
	state.closeButtonEl.className = 'picsel-close-button';
	state.closeButtonEl.setAttribute('aria-label', '닫기');
	state.closeButtonEl.textContent = '✕';

	panelHeaderEl.appendChild(state.panelTitleEl);
	panelHeaderEl.appendChild(state.closeButtonEl);
	state.panelEl.appendChild(panelHeaderEl);

	state.contentEl = document.createElement('div');
	state.contentEl.className = 'picsel-panel-content';
	state.panelEl.appendChild(state.contentEl);

	containerEl.appendChild(state.panelEl);

	const panelEl = state.panelEl;
	const hostElement = state.hostElement;

	state.toggleButton.addEventListener('click', () => {
		const isOpen = panelEl.classList.contains('open');
		const { displayMode } = useSettingsStore.getState();
		
		// 패널이 닫혀있고 최저가 모드일 때: 비교 시작
		if (!isOpen && displayMode === 'lowest-price' && handlers.startLowestPriceComparisonNoPanel) {
			stopMessageRotation();
			handlers.startLowestPriceComparisonNoPanel();
			return;
		}

		// 그 외: 패널 토글
		const willOpen = !isOpen;
		handlers.setPanelOpen(willOpen);
	});

	state.closeButtonEl.addEventListener('click', () => {
		handlers.setPanelOpen(false);
	});

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			handlers.setPanelOpen(false);
		}
	});

	document.addEventListener(
		'click',
		(event) => {
			if (!panelEl.classList.contains('open')) {
				return;
			}

			const path = event.composedPath();
			if (hostElement && !path.includes(hostElement)) {
				handlers.setPanelOpen(false);
			}
		},
		true
	);

	document.body.appendChild(state.hostElement);
	state.mounted = true;
};
