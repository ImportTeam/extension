/**
 * 11번가 혜택 정보 추출 모듈
 */

import { extractNumber } from '../../utils';
import { ELEVEN_ST_SELECTORS } from '../constants';
import { parseLog, ErrorCode } from '../../../../shared/utils/logger';

export interface PointInfo {
  amount: number;        // 포인트 금액
  type: string;          // 포인트 유형 (적립포인트, 11pay포인트 등)
  description: string;   // 설명
}

export interface CardBenefitInfo {
  cardName: string;      // 카드명 (예: '11번가 신한카드')
  benefitAmount: number; // 혜택 금액
  benefitType: string;   // 혜택 유형 (포인트, 할인, 무이자 등)
  condition: string;     // 조건 (예: '결제 시')
}

export interface InstallmentInfo {
  cardName: string;           // 카드명
  maxMonths: number;          // 최대 무이자 개월수
  minAmount: number | null;   // 최소 결제 금액
  months: string;             // 할부 개월 표시 (예: "2,3,4,5개월")
  condition: string;          // 조건 (예: "5만원 ↑")
}

export interface CouponInfo {
  name: string;          // 쿠폰명
  discountAmount: number | null;  // 할인 금액
  discountRate: number | null;    // 할인율 (%)
}

export interface BenefitsInfo {
  points: PointInfo[];
  cardBenefits: CardBenefitInfo[];
  installments: InstallmentInfo[];
  coupons: CouponInfo[];
  totalPointAmount: number;
  totalCardBenefitAmount: number;
  maxInstallmentMonths: number;
}

/**
 * 전체 혜택 정보 추출
 */
export const extractBenefits = (doc: Document): BenefitsInfo => {
  const result: BenefitsInfo = {
    points: [],
    cardBenefits: [],
    installments: [],
    coupons: [],
    totalPointAmount: 0,
    totalCardBenefitAmount: 0,
    maxInstallmentMonths: 0,
  };

  try {
    // 포인트 추출
    result.points = extractPoints(doc);
    result.totalPointAmount = result.points.reduce((sum, p) => sum + p.amount, 0);

    // 카드 혜택 추출 (할인 + 적립)
    result.cardBenefits = extractCardBenefits(doc);
    result.totalCardBenefitAmount = result.cardBenefits.reduce((sum, c) => sum + c.benefitAmount, 0);

    // 무이자 할부 추출
    result.installments = extractInstallments(doc);
    result.maxInstallmentMonths = result.installments.reduce(
      (max, i) => Math.max(max, i.maxMonths), 0
    );

    // 쿠폰 추출
    result.coupons = extractCoupons(doc);

    parseLog.debug('혜택 정보', {
      totalPointAmount: result.totalPointAmount,
      totalCardBenefitAmount: result.totalCardBenefitAmount,
      maxInstallmentMonths: result.maxInstallmentMonths,
    });
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E003, '혜택 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return result;
};

/**
 * 포인트 정보 추출
 * 11번가의 #max_saveing_point_layer 구조에서 파싱
 */
export const extractPoints = (doc: Document): PointInfo[] => {
  const points: PointInfo[] = [];
  const selectors = ELEVEN_ST_SELECTORS.pointDetail;

  try {
    // 최대 적립 포인트 레이어
    const pointLayer = doc.querySelector(selectors.container);
    if (pointLayer) {
      // 메인 포인트 금액 (총 최대 적립)
      const totalPointEl = pointLayer.querySelector(selectors.totalPoint);
      if (totalPointEl?.textContent) {
        const amount = extractNumber(totalPointEl.textContent);
        if (amount) {
          points.push({
            amount,
            type: '최대적립포인트',
            description: '최대 적립 가능 포인트',
          });
          parseLog.debug('최대 적립 포인트', { amount });
        }
      }

      // 11pay 포인트 영역
      const elevenPaySection = pointLayer.querySelector(selectors.elevenPaySection);
      if (elevenPaySection) {
        const elevenPayTotal = elevenPaySection.querySelector('.total .value');
        if (elevenPayTotal?.textContent) {
          const amount = extractNumber(elevenPayTotal.textContent);
          // 중복 체크 (총 최대 포인트와 같은 경우 스킵)
          if (amount && !points.find(p => p.amount === amount && p.type === '최대적립포인트')) {
            points.push({
              amount,
              type: '11pay포인트',
              description: '11pay 결제 시 적립',
            });
            parseLog.debug('11pay 포인트 총액', { amount });
          }
        }

        // 개별 포인트 항목들 (.desc li)
        const pointItems = elevenPaySection.querySelectorAll('.desc li');
        pointItems.forEach((item: Element) => {
          const button = item.querySelector('.c_layer_expand button.c_product_btn');
          const valueEl = item.querySelector('.value');
          
          if (button && valueEl) {
            const type = button.textContent?.trim() || '';
            const amount = extractNumber(valueEl.textContent || '');
            
            // 이미 추가된 경우 스킵, 카드 혜택은 cardBenefits에서 처리
            if (amount && type && !type.includes('카드')) {
              points.push({
                amount,
                type,
                description: type,
              });
              parseLog.debug('포인트 항목', { type, amount });
            }
          }
        });
      }
    }

    // 기본 포인트 표시 영역 (레이어가 없는 경우)
    if (points.length === 0) {
      const basicPointEl = doc.querySelector('.max_saveing_point .point, [class*="point_value"]');
      if (basicPointEl?.textContent) {
        const amount = extractNumber(basicPointEl.textContent);
        if (amount) {
          points.push({
            amount,
            type: '기본적립',
            description: '기본 적립 포인트',
          });
          parseLog.debug('기본 포인트', { amount });
        }
      }
    }
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E003, '포인트 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return points;
};

/**
 * 카드 혜택 정보 추출
 * 11번가의 other_benefits 섹션에서 신한카드 등의 혜택 파싱
 */
export const extractCardBenefits = (doc: Document): CardBenefitInfo[] => {
  const benefits: CardBenefitInfo[] = [];
  const selectors = ELEVEN_ST_SELECTORS.cardDiscount;

  try {
    // other_benefits 컨테이너에서 카드 혜택 추출
    // 다이얼로그 내부 (.dialog_cont) 또는 페이지 어디서든 찾기
    // .benefit은 .dialog_cont .other_benefits dl 안에 있음
    const containerSelectors = [
      '.dialog_cont .other_benefits',
      '#atf_additionalBenefitPopup .other_benefits',
      selectors.container,
      '.other_benefits',
    ];
    
    let container: Element | null = null;
    for (const sel of containerSelectors) {
      container = doc.querySelector(sel);
      if (container) {
        parseLog.debug('카드 혜택 컨테이너 찾음', { selector: sel });
        break;
      }
    }
    
    parseLog.debug('other_benefits 컨테이너', { found: !!container });
    
    if (container) {
      // .benefit 블록 찾기 - 다양한 셀렉터 시도
      // DOM 구조: .other_benefits > dl > div.benefit
      const benefitSelectors = [
        'dl > .benefit',
        'dl > div.benefit', 
        'dl .benefit',
        '.benefit',
        'div.benefit',
      ];
      
      let benefitBlocks: NodeListOf<Element> | null = null;
      for (const sel of benefitSelectors) {
        benefitBlocks = container.querySelectorAll(sel);
        if (benefitBlocks.length > 0) {
          parseLog.debug('benefit 블록 찾음', { selector: sel, count: benefitBlocks.length });
          break;
        }
      }
      
      parseLog.debug('benefit 블록 수', { count: benefitBlocks?.length || 0 });
      
      // benefit 블록이 없으면 dl 내부 직접 확인
      if (!benefitBlocks || benefitBlocks.length === 0) {
        const dlElement = container.querySelector('dl');
        parseLog.debug('dl 요소', { found: !!dlElement });
        if (dlElement) {
          // dl 직접 children 확인
          const children = dlElement.children;
          parseLog.debug('dl children', { count: children.length });
        }
      }
      
      if (benefitBlocks && benefitBlocks.length > 0) {
        benefitBlocks.forEach((block: Element) => {
          const titleEl = block.querySelector('dt');
          const mainTitle = titleEl?.textContent?.trim() || '';
          
          parseLog.debug('메인 타이틀', { mainTitle });
          
          if (!mainTitle) return;
          
          // 메인 타이틀도 혜택으로 추가 (요약 정보)
          const mainParsed = parseCardDiscountTitle(mainTitle);
          if (mainParsed && mainParsed.benefitAmount > 0) {
            benefits.push(mainParsed);
            parseLog.debug('메인 혜택 추가', { mainParsed });
          }
          
          // dd 안의 서브타이틀과 리스트 항목 추출
          const dd = block.querySelector('dd');
          if (dd) {
            // 서브타이틀들 (.tit_sub)과 그 뒤의 ul 매칭
            const subTitles = dd.querySelectorAll('.tit_sub');
            parseLog.debug('서브타이틀 수', { count: subTitles.length });
            
            subTitles.forEach((subTitleEl: Element) => {
              const subTitle = subTitleEl.textContent?.trim() || '';
              
              parseLog.debug('서브타이틀', { subTitle });
              
              // '적립 안내사항', '포인트 적립제외' 등은 스킵
              if (subTitle.includes('안내사항') || subTitle.includes('적립제외')) {
                return;
              }
              
              // 서브타이틀 바로 다음의 ul 찾기
              let nextEl = subTitleEl.nextElementSibling;
              while (nextEl && nextEl.tagName !== 'UL' && nextEl.tagName !== 'SPAN') {
                nextEl = nextEl.nextElementSibling;
              }
              
              if (nextEl && nextEl.tagName === 'UL') {
                const items = nextEl.querySelectorAll('li');
                parseLog.debug('리스트 아이템 수', { count: items.length });
                
                items.forEach((li: Element) => {
                  const itemText = li.textContent?.trim() || '';
                  parseLog.debug('아이템', { itemText });
                  
                  const subBenefit = parseCardBenefitDetailItem(subTitle, itemText);
                  if (subBenefit) {
                    // 중복 체크
                    const isDuplicate = benefits.find(b => 
                      b.cardName === subBenefit.cardName && 
                      b.benefitType === subBenefit.benefitType &&
                      b.benefitAmount === subBenefit.benefitAmount
                    );
                    if (!isDuplicate) {
                      benefits.push(subBenefit);
                      parseLog.debug('서브 혜택 추가', { subBenefit });
                    }
                  }
                });
              }
            });
          }
        });
      }
    } else {
      parseLog.warn('other_benefits 컨테이너를 찾을 수 없음');
    }

    // 포인트 적립 레이어에서도 카드 혜택 찾기
    const pointLayer = doc.querySelector('#max_saveing_point_layer');
    if (pointLayer) {
      const cardButtons = pointLayer.querySelectorAll('.c_layer_expand button.c_product_btn');
      cardButtons.forEach((btn: Element) => {
        const btnText = btn.textContent?.trim() || '';
        if (btnText.includes('카드') || btnText.includes('신한')) {
          const valueEl = btn.closest('li')?.querySelector('.value');
          const value = valueEl?.textContent?.trim() || '';
          const amount = extractNumber(value);
          
          if (amount) {
            const cardName = btnText.replace(' 결제 시', '').trim();
            // 중복 체크
            if (!benefits.find(b => b.cardName === cardName && b.benefitType === '포인트')) {
              benefits.push({
                cardName,
                benefitAmount: amount,
                benefitType: '포인트',
                condition: '결제 시',
              });
            }
          }
        }
      });
    }

    parseLog.info('추출된 카드 혜택', { count: benefits.length, benefits });
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E003, '카드 혜택 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return benefits;
};

/**
 * 카드 할인 타이틀 파싱
 * 예: "11번가 신한카드 첫 결제할인 + 최대 5% 적립"
 */
function parseCardDiscountTitle(title: string): CardBenefitInfo | null {
  if (!title) return null;

  // 카드명 추출 (신한카드, KB국민, 현대카드 등)
  const cardPatterns = [
    /(11번가\s*신한카드)/,
    /(신한카드)/,
    /(KB국민)/,
    /(국민카드)/,
    /(현대카드)/,
    /(삼성카드)/,
    /(롯데카드)/,
    /(하나카드)/,
    /(우리카드)/,
    /(비씨카드)/,
    /(농협카드)/,
  ];

  let cardName = '';
  for (const pattern of cardPatterns) {
    const match = title.match(pattern);
    if (match) {
      cardName = match[1];
      break;
    }
  }

  if (!cardName) return null;

  // 혜택 금액 추출
  let benefitAmount = 0;
  let benefitType = '';
  let condition = '';

  // 퍼센트 적립 (최대 5% 적립)
  const percentMatch = title.match(/최대\s*(\d+)%\s*적립/);
  if (percentMatch) {
    benefitAmount = parseInt(percentMatch[1], 10);
    benefitType = '적립';
    condition = '결제 시';
  }

  // 금액 할인 (30,000원 할인)
  const amountMatch = title.match(/([\d,]+)원\s*할인/);
  if (amountMatch) {
    benefitAmount = extractNumber(amountMatch[1]) || 0;
    benefitType = '할인';
  }

  // 조건 추출
  if (title.includes('첫 결제')) {
    condition = '첫 결제 시';
  } else if (title.includes('결제 시')) {
    condition = '결제 시';
  }

  return {
    cardName,
    benefitAmount,
    benefitType: benefitType || (title.includes('할인') ? '할인' : '적립'),
    condition,
  };
}

/**
 * 카드 혜택 상세 아이템 파싱
 * 예: subTitle="11번가 신한카드 11pay 첫 결제 할인", itemText="신용카드 30,000원 할인"
 * 예: subTitle="11번가 신한카드 11pay 결제 시", itemText="신용카드 최대 5% 적립 (기본 적립 1% + 프로모션 적립 4%)"
 */
function parseCardBenefitDetailItem(subTitle: string, itemText: string): CardBenefitInfo | null {
  if (!itemText) return null;

  let cardName = '';
  let benefitAmount = 0;
  let benefitType = '';
  let condition = '';

  // 카드 종류 (신용카드, 체크카드)
  if (itemText.includes('신용카드')) {
    cardName = '신용카드';
  } else if (itemText.includes('체크카드')) {
    cardName = '체크카드';
  }

  // subTitle에서 카드사명 추출하여 접두어로 붙이기
  if (subTitle.includes('신한카드')) {
    cardName = cardName ? `11번가 신한 ${cardName}` : '11번가 신한카드';
  }

  // 금액 할인 (30,000원 할인)
  const amountMatch = itemText.match(/([\d,]+)원\s*할인/);
  if (amountMatch) {
    benefitAmount = extractNumber(amountMatch[1]) || 0;
    benefitType = '할인';
  }

  // 퍼센트 적립 (최대 5% 적립, 기본 0.5% 적립)
  const percentMatch = itemText.match(/(?:최대\s*)?(\d+(?:\.\d+)?)%\s*적립/);
  if (percentMatch && !benefitType) {
    benefitAmount = parseFloat(percentMatch[1]);
    benefitType = '적립';
  }

  // 조건 추출
  if (subTitle.includes('첫 결제')) {
    condition = '첫 결제 시';
  } else if (subTitle.includes('결제 시')) {
    condition = '결제 시';
  }

  // 카드명이 없거나 혜택 금액이 없으면 null
  if (!cardName || !benefitAmount || !benefitType) return null;

  return {
    cardName,
    benefitAmount,
    benefitType,
    condition,
  };
}

/**
 * 무이자 할부 정보 추출
 * 11번가의 .card_benefits .card_box 구조에서 파싱
 */
export const extractInstallments = (doc: Document): InstallmentInfo[] => {
  const installments: InstallmentInfo[] = [];
  const selectors = ELEVEN_ST_SELECTORS.installment;

  try {
    // .dialog_cont .card_benefits 컨테이너에서 추출
    const cardBenefitsContainer = doc.querySelector(selectors.dialogContainer);
    
    if (cardBenefitsContainer) {
      // 카드별 무이자 박스 (.card_box)
      const cardBoxes = cardBenefitsContainer.querySelectorAll('.card_box');
      
      cardBoxes.forEach((box: Element) => {
        const cardNameEl = box.querySelector('dt');
        const cardName = cardNameEl?.textContent?.trim() || '';
        
        if (!cardName) return;
        
        // 여러 dd가 있을 수 있음 (조건별로 다른 무이자 옵션)
        const conditions = box.querySelectorAll('dd');
        
        conditions.forEach((dd: Element) => {
          const conditionText = dd.textContent?.trim() || '';
          if (!conditionText) return;
          
          const parsed = parseInstallmentCondition(cardName, conditionText);
          if (parsed) {
            installments.push(parsed);
          }
        });
      });
      
      parseLog.debug('card_box에서 할부 추출', { count: installments.length });
    }

    // DOM에서 직접 텍스트 패턴 검색 (레이어 팝업이 열리지 않은 경우)
    if (installments.length === 0) {
      // 추가 혜택 버튼에서 요약 정보 추출
      const triggerBtn = doc.querySelector(selectors.triggerButton);
      if (triggerBtn) {
        const btnText = triggerBtn.textContent?.trim() || '';
        // "최대 22개월 무이자 할부 외 1건"
        const maxMonthMatch = btnText.match(/최대\s*(\d+)개월\s*무이자/);
        if (maxMonthMatch) {
          // '카드사' 대신 '무이자할부' 타입으로 표시 (필터링용)
          installments.push({
            cardName: '__INSTALLMENT_SUMMARY__',
            maxMonths: parseInt(maxMonthMatch[1], 10),
            minAmount: null,
            months: `최대 ${maxMonthMatch[1]}개월`,
            condition: '무이자 할부',
          });
        }
      }
      
      // 추가로 페이지 텍스트에서 검색
      const installmentFromText = extractInstallmentFromPageText(doc);
      installmentFromText.forEach(item => {
        if (!installments.find(i => i.cardName === item.cardName)) {
          installments.push(item);
        }
      });
    }

    parseLog.info('총 무이자 할부 카드', { count: installments.length });
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E003, '무이자 할부 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return installments;
};

/**
 * 무이자 할부 조건 텍스트 파싱
 * 예: "2,3개월(5만원 ↑)" 또는 "7,8,9,10,11,12,13,14,15,16개월(100만원 ↑, 11pay 결제 시)"
 */
function parseInstallmentCondition(cardName: string, text: string): InstallmentInfo | null {
  if (!text) return null;
  
  // 개월수 추출 (예: "2,3,4,5개월")
  const monthsMatch = text.match(/([\d,]+)개월/);
  if (!monthsMatch) return null;
  
  const monthsStr = monthsMatch[1];
  const monthNumbers = monthsStr.split(',').map((m: string) => parseInt(m.trim(), 10));
  const validMonths = monthNumbers.filter((n: number) => !isNaN(n));
  const maxMonths = validMonths.length > 0 ? Math.max(...validMonths) : 0;
  
  if (maxMonths === 0) return null;
  
  // 최소 금액 추출 (예: "5만원 ↑" 또는 "100만원 ↑")
  let minAmount: number | null = null;
  const amountMatch = text.match(/(\d+)만원/);
  if (amountMatch) {
    minAmount = parseInt(amountMatch[1], 10) * 10000;
  }
  
  // 결제 조건 추출
  let condition = '';
  if (text.includes('11pay')) {
    condition = '11pay 결제 시';
  } else if (text.includes('카카오페이')) {
    condition = '카카오페이 결제 시';
  } else if (minAmount) {
    condition = `${minAmount / 10000}만원 이상`;
  }
  
  return {
    cardName,
    maxMonths,
    minAmount,
    months: `${monthsStr  }개월`,
    condition,
  };
}



/**
 * 페이지 텍스트에서 무이자 할부 정보 추출
 * (레이어가 열리지 않은 경우 대비)
 */
function extractInstallmentFromPageText(doc: Document): InstallmentInfo[] {
  const results: InstallmentInfo[] = [];
  
  // 카드 무이자 관련 버튼/링크 텍스트 검색
  const cardKeywords = ['신한', 'KB국민', '국민', '비씨', 'BC', '우리', '현대', '삼성', '하나', '롯데', '농협', 'NH'];
  
  // 무이자 할부 관련 요소 검색
  const elements = doc.querySelectorAll('[class*="installment"], [class*="할부"], [data-log-actionid*="무이자"]');
  
  elements.forEach((el: Element) => {
    const text = el.textContent || '';
    
    // "최대 22개월 무이자" 같은 요약 정보 파싱
    const maxMonthMatch = text.match(/최대\s*(\d+)\s*개월\s*무이자/);
    if (maxMonthMatch && results.length === 0) {
      results.push({
        cardName: '카드',
        maxMonths: parseInt(maxMonthMatch[1], 10),
        minAmount: null,
        months: `최대 ${maxMonthMatch[1]}개월`,
        condition: '무이자 할부',
      });
    }

    // 개별 카드 정보 파싱
    cardKeywords.forEach((keyword) => {
      if (text.includes(keyword)) {
        const cardSection = text.substring(text.indexOf(keyword));
        const monthMatch = cardSection.match(/([\d,]+)개월/);
        if (monthMatch) {
          const existing = results.find(r => r.cardName.includes(keyword));
          if (!existing) {
            const monthsStr = monthMatch[1];
            const monthNumbers = monthsStr.split(',').map((m: string) => parseInt(m.trim(), 10));
            const maxMonths = Math.max(...monthNumbers.filter((n: number) => !isNaN(n)));
            
            results.push({
              cardName: `${keyword  }카드`,
              maxMonths,
              minAmount: null,
              months: `${monthsStr  }개월`,
              condition: '',
            });
          }
        }
      }
    });
  });

  return results;
}

/**
 * 쿠폰 정보 추출
 */
export const extractCoupons = (doc: Document): CouponInfo[] => {
  const coupons: CouponInfo[] = [];
  const selectors = ELEVEN_ST_SELECTORS.coupon;

  try {
    // 쿠폰 다운로드 버튼/배지
    const couponBadge = doc.querySelector(selectors.badge);
    if (couponBadge?.textContent) {
      const text = couponBadge.textContent.trim();
      const coupon = parseCouponText(text);
      if (coupon) {
        coupons.push(coupon);
        parseLog.debug('쿠폰 추출', { coupon });
      }
    }

    // 쿠폰 목록
    const couponItems = doc.querySelectorAll(selectors.item);
    couponItems.forEach((item) => {
      const nameEl = item.querySelector(selectors.name);
      const discountEl = item.querySelector(selectors.discount);
      
      if (nameEl || discountEl) {
        const name = nameEl?.textContent?.trim() || '쿠폰';
        const discountText = discountEl?.textContent || '';
        
        const discountAmount = discountText.includes('원') 
          ? extractNumber(discountText) 
          : null;
        const discountRate = discountText.includes('%') 
          ? extractNumber(discountText) 
          : null;

        coupons.push({
          name,
          discountAmount,
          discountRate,
        });
      }
    });
  } catch (error) {
    parseLog.error(ErrorCode.PAR_E003, '쿠폰 추출 오류', {
      error: error instanceof Error ? error : new Error(String(error)),
    });
  }

  return coupons;
};

/**
 * 쿠폰 텍스트 파싱
 */
function parseCouponText(text: string): CouponInfo | null {
  if (!text) return null;

  // 금액 할인 쿠폰
  const amountMatch = text.match(/([\d,]+)\s*원\s*(?:할인)?/);
  if (amountMatch) {
    return {
      name: text,
      discountAmount: extractNumber(amountMatch[1]),
      discountRate: null,
    };
  }

  // 퍼센트 할인 쿠폰
  const percentMatch = text.match(/(\d+)\s*%\s*(?:할인)?/);
  if (percentMatch) {
    return {
      name: text,
      discountAmount: null,
      discountRate: parseInt(percentMatch[1], 10),
    };
  }

  return {
    name: text,
    discountAmount: null,
    discountRate: null,
  };
}
