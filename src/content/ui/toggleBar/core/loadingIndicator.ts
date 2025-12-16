/**
 * Idle Loading Indicator Manager
 * Idle 상태(패널 닫힘)에서만 circle + 메시지 표시
 */

import { state } from '../core/state';
import { getIdleLoadingMessage, resetMessageIndex } from './loadingMessages';

let messageUpdateInterval: NodeJS.Timeout | null = null;

export const updateIdleLoadingIndicator = (): void => {
	const { toggleButton, buttonLabelEl } = state;
	if (!toggleButton || !buttonLabelEl) return;

	// Idle 상태일 때만 circle + 메시지 표시
	if (buttonLabelEl.textContent === 'PicSel 혜택 보기') {
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
