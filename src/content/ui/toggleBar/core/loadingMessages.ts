/**
 * Idle Loading Messages for Lowest Price Mode
 * lowest-price 모드의 Idle 상태(패널 닫힘)에서만 표시할 메시지들
 * card-benefits 모드에서는 사용되지 않음
 */

const LOADING_MESSAGES = [
  '잠깐만요, 확인 중',
  '지금 찾고 있어요',
  '곧 보여드릴게요',
  '조금만 기다려요',
  '계산 중이에요',
  '정리하고 있어요',
  '비교하는 중이에요',
  '거의 다 됐어요',
  '지금 처리 중',
  '금방 끝나요',
  '찾는 중이에요',
  '잠시만요',
];

let messageIndex = 0;

export const getIdleLoadingMessage = (): string => {
	const message = LOADING_MESSAGES[messageIndex];
	messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
	return message;
};

export const resetMessageIndex = (): void => {
	messageIndex = 0;
};
