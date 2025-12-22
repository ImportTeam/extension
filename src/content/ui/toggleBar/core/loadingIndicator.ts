/**
 * Idle Loading Indicator Manager
 * Idle 상태(패널 닫힘)에서만 circle + 메시지 표시 (lowest-price 모드에서만)
 * 
 * 주의: 이 함수는 lowest-price 모드에서만 호출되어야 함
 */

import { state } from '../core/state';
import { getIdleLoadingMessage, resetMessageIndex } from './loadingMessages';
import { useSettingsStore } from '@/shared/store/slices/settings';

let messageUpdateInterval: NodeJS.Timeout | null = null;

export const updateIdleLoadingIndicator = (): void => {
	const { toggleButton, buttonLabelEl, panelEl } = state;
	if (!toggleButton || !buttonLabelEl || !panelEl) return;

	const { displayMode } = useSettingsStore.getState();
	
	// card-benefits 모드에서는 아무것도 하지 않음
	if (displayMode !== 'lowest-price') {
		return;
	}

	// lowest-price 모드: 패널이 닫혀있으면 loading indicator 표시
	const panelIsOpen = panelEl.classList.contains('open');
	
	if (!panelIsOpen) {
		// 이미 loading message가 표시되어 있으면 스킵
		const existingMessage = buttonLabelEl.querySelector('[data-loading-message="true"]');
		if (existingMessage) {
			return;
		}

		buttonLabelEl.innerHTML = '';

		const messageEl = document.createElement('div');
		messageEl.className = 'picsel-loading-message';
		messageEl.setAttribute('data-loading-message', 'true');
		messageEl.style.display = 'flex';
		messageEl.style.alignItems = 'center';
		messageEl.style.gap = '8px';

		const spinner = document.createElement('div');
		spinner.className = 'picsel-loading-spinner';

		const text = document.createElement('span');
		text.className = 'picsel-loading-text';
		text.textContent = getIdleLoadingMessage();

		messageEl.appendChild(spinner);
		messageEl.appendChild(text);
		buttonLabelEl.appendChild(messageEl);

		// 메시지 업데이트 시작 (2초마다)
		startMessageRotation(text);
	} else {
		// 패널이 열려있으면 loading message 제거
		stopMessageRotation();
		buttonLabelEl.innerHTML = '';
		buttonLabelEl.textContent = 'PicSel 혜택 닫기';
	}
};

const startMessageRotation = (textEl: HTMLSpanElement): void => {
	// 이전 인터벌 정리
	if (messageUpdateInterval) {
		clearInterval(messageUpdateInterval);
	}

	// 새로운 인터벌 시작
	messageUpdateInterval = setInterval(() => {
		textEl.textContent = getIdleLoadingMessage();
	}, 2000);
};

export const stopMessageRotation = (): void => {
	if (messageUpdateInterval) {
		clearInterval(messageUpdateInterval);
		messageUpdateInterval = null;
	}
	resetMessageIndex();
};
