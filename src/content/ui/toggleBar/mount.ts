/**
 * Toggle Bar 마운트 모듈
 * DOM 생성 및 이벤트 바인딩
 */

import type { ToggleProductData } from './types';
import { toggleBarStyles } from './styles';
import { renderContent } from './render';
import { HOST_ID, PANEL_ID, state, getPlatformDisplayName } from './state';

/**
 * 패널 열기/닫기 제어
 */
export const setPanelOpen = (open: boolean): void => {
	const { panelEl, toggleButton, buttonLabelEl } = state;
	
	if (!panelEl || !toggleButton || !buttonLabelEl) {
		return;
	}

	if (open) {
		panelEl.classList.add('open');
		panelEl.setAttribute('aria-hidden', 'false');
		toggleButton.setAttribute('aria-expanded', 'true');
		buttonLabelEl.textContent = 'PicSel 혜택 닫기';
	} else {
		panelEl.classList.remove('open');
		panelEl.setAttribute('aria-hidden', 'true');
		toggleButton.setAttribute('aria-expanded', 'false');
		buttonLabelEl.textContent = 'PicSel 혜택 보기';
	}
};

/**
 * DOM 마운트 보장
 */
const ensureMounted = (): void => {
	if (state.mounted) {
		return;
	}

	// 이미 존재하는 호스트 엘리먼트 확인
	if (document.getElementById(HOST_ID)) {
		const existingHost = document.getElementById(HOST_ID) as HTMLDivElement | null;
		if (existingHost) {
			state.hostElement = existingHost;
			state.shadowRoot = existingHost.shadowRoot;
			if (existingHost.shadowRoot) {
				state.toggleButton = existingHost.shadowRoot.querySelector<HTMLButtonElement>('.picsel-toggle-button');
				state.buttonLabelEl = existingHost.shadowRoot.querySelector<HTMLSpanElement>('.picsel-toggle-label');
				state.buttonBadgeEl = existingHost.shadowRoot.querySelector<HTMLSpanElement>('.picsel-toggle-badge');
				state.panelEl = existingHost.shadowRoot.querySelector<HTMLDivElement>(`#${PANEL_ID}`);
				state.closeButtonEl = existingHost.shadowRoot.querySelector<HTMLButtonElement>('.picsel-close-button');
				state.contentEl = existingHost.shadowRoot.querySelector<HTMLDivElement>('.picsel-panel-content');
				state.panelTitleEl = existingHost.shadowRoot.querySelector<HTMLDivElement>('.picsel-panel-title');
			}
		}
		state.mounted = true;
		return;
	}

	// 새 호스트 엘리먼트 생성
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
	state.buttonLabelEl.textContent = 'PicSel 혜택 보기';
	state.toggleButton.appendChild(state.buttonLabelEl);

	state.buttonBadgeEl = document.createElement('span');
	state.buttonBadgeEl.className = 'picsel-toggle-badge';
	state.toggleButton.appendChild(state.buttonBadgeEl);

	containerEl.appendChild(state.toggleButton);

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

	// 이벤트 바인딩 (클로저로 참조 유지)
	const panelEl = state.panelEl;
	const hostElement = state.hostElement;

	state.toggleButton.addEventListener('click', () => {
		const willOpen = !panelEl.classList.contains('open');
		setPanelOpen(willOpen);
	});

	state.closeButtonEl.addEventListener('click', () => {
		setPanelOpen(false);
	});

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			setPanelOpen(false);
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
				setPanelOpen(false);
			}
		},
		true
	);

	document.body.appendChild(state.hostElement);
	state.mounted = true;
};

/**
 * 패널 타이틀 업데이트
 */
const updatePanelTitle = (): void => {
	if (state.panelTitleEl && state.cachedData?.site) {
		const displayName = getPlatformDisplayName(state.cachedData.site);
		state.panelTitleEl.textContent = `${displayName} 혜택 정보`;
	}
};

/**
 * Toggle Bar 마운트
 */
export const mountToggleBar = (data: ToggleProductData): void => {
	state.cachedData = { ...data };
	ensureMounted();
	updatePanelTitle();
	renderContent();
	setPanelOpen(false);
};

/**
 * Toggle Bar 업데이트
 */
export const updateToggleBar = (data: ToggleProductData): void => {
	state.cachedData = { ...(state.cachedData ?? {}), ...data } as ToggleProductData;
	if (!state.mounted) {
		mountToggleBar(state.cachedData);
		return;
	}
	updatePanelTitle();
	renderContent();
};
