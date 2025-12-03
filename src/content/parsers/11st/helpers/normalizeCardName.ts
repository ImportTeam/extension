export function normalizeCardName(cardName: string): string {
  // '11번가' 접두사 제거
  const normalized = cardName.replace(/11번가\s*/g, '').trim();

  const cardMapping: Array<{ keywords: string[]; name: string }> = [
    { keywords: ['신한', 'SHINHAN'], name: '신한카드' },
    { keywords: ['KB', '국민', '케이비'], name: 'KB국민카드' },
    { keywords: ['현대', 'HYUNDAI'], name: '현대카드' },
    { keywords: ['삼성', 'SAMSUNG'], name: '삼성카드' },
    { keywords: ['롯데', 'LOTTE'], name: '롯데카드' },
    { keywords: ['하나', 'HANA'], name: '하나카드' },
    { keywords: ['우리', 'WOORI'], name: '우리카드' },
    { keywords: ['농협', 'NH'], name: 'NH농협카드' },
    { keywords: ['BC', '비씨'], name: 'BC카드' },
    { keywords: ['씨티', 'CITI'], name: '씨티카드' },
  ];

  for (const { keywords, name } of cardMapping) {
    for (const keyword of keywords) {
      if (normalized.toUpperCase().includes(keyword.toUpperCase())) {
        if (normalized.includes('신용카드')) {
          return `${name} (신용)`;
        }
        if (normalized.includes('체크카드')) {
          return `${name} (체크)`;
        }
        return name;
      }
    }
  }

  return normalized || cardName;
}
