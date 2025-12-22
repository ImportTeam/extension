/**
 * Coupang Parser - Selected Options Extractor
 * 사용자가 선택한 옵션 정보 추출
 * 예: M4 Pro 14코어, 24GB RAM, 512GB SSD, 실버, 한글 등
 */

import { parseLog, ErrorCode } from '../../../../shared/utils/logger';

/**
 * 쿠팡에서 선택된 옵션 추출
 * 선택자: .c_product_option > 선택된 옵션 정보
 */
export const extractSelectedOptions = (
  doc: Document
): Array<{ name: string; value: string }> => {
  try {
    const options: Array<{ name: string; value: string }> = [];
    
    // 쿠팡의 여러 옵션 UI 패턴 지원
    
    // 패턴 1: 새로운 Tailwind CSS 기반 UI (.option-picker-select)
    const pickerElements = doc.querySelectorAll('.option-picker-select');
    
    for (const picker of pickerElements) {
      try {
        // option-picker-select 내부 구조가 케이스별로 다름
        // - (닫힌 상태) 첫 번째 자식 div가 실제 선택된 옵션 UI(라벨/값)를 포함
        // - (펼친 리스트) 다음 형제에 ul/li/price 등이 길게 존재할 수 있어 제외해야 함
        const headerEl = picker.querySelector(':scope > div:first-child');
        if (!headerEl) continue;

        // 라벨: twc-text-[12px] 이면서 font-bold가 아닌 것
        const nameEl = headerEl.querySelector(
          '[class*="twc-text-[12px]"]:not([class*="twc-font-bold"])'
        );

        // 값: twc-font-bold 텍스트(정확히 선택된 값)
        const valueEl = headerEl.querySelector('[class*="twc-font-bold"]');

        const name = nameEl?.textContent?.trim();
        const value = valueEl?.textContent?.trim();
        
        if (name && value) {
          options.push({
            name: name.replace(/\s+/g, ' ').trim(),
            value: value.replace(/\s+/g, ' ').trim(),
          });
          
          parseLog.debug('✅ [Coupang] Found option from picker', { name, value });
        }
      } catch (err) {
        parseLog.debug('[Coupang] Error parsing picker', { error: err });
      }
    }

    // 패턴 2: 기존 dt/dd 구조 (.c_product_option, .option_selected)
    if (options.length === 0) {
      const optionElements = doc.querySelectorAll(
        '.c_product_option .option_selected .option,' +
        '[class*="option_selected"] dl.option,' +
        '.option_selected .option,' +
        'dl.option'
      );
      
      for (const optionEl of optionElements) {
        try {
          const dtEl = optionEl.querySelector('dt');
          const ddEl = optionEl.querySelector('dd');

          if (!dtEl || !ddEl) continue;

          const name = dtEl.textContent?.trim();
          const value = ddEl.textContent?.trim();

          if (!name || !value) continue;

          options.push({
            name: name.replace(/\s+/g, ' ').trim(),
            value: value.replace(/\s+/g, ' ').trim(),
          });
          
          parseLog.debug('✅ [Coupang] Found option from dt/dd', { name, value });
        } catch (err) {
          parseLog.debug('[Coupang] Error parsing dt/dd option', { error: err });
        }
      }
    }

    // 패턴 3: 상품명에서 옵션 정보 추출 (최후의 수단)
    // 예: "LG 2025 그램 15인치 인텔 U5 225H DDR5 32GB PD충전..."
    if (options.length === 0) {
      try {
        // 상품명 찾기
        const productTitle = doc.querySelector('[class*="product_title"], h2, h1')?.textContent?.trim() || '';
        
        if (productTitle) {
          parseLog.debug('[Coupang] Attempting to extract options from title', { 
            title: productTitle.substring(0, 80) 
          });
          
          // RAM 추출
          const ramMatch = productTitle.match(/DDR[45]?\s+(\d+GB)/i);
          if (ramMatch) {
            options.push({
              name: 'RAM',
              value: ramMatch[1].trim(),
            });
          }
          
          // 프로세서 추출
          const cpuMatch = productTitle.match(/인텔\s+([A-Z0-9]+)(?:\s|$)/i);
          if (cpuMatch) {
            options.push({
              name: 'CPU',
              value: cpuMatch[1].trim(),
            });
          }
          
          // 화면 크기 추출
          const sizeMatch = productTitle.match(/(\d+(?:\.\d+)?인치)/);
          if (sizeMatch) {
            options.push({
              name: '화면크기',
              value: sizeMatch[1].trim(),
            });
          }
          
          // 색상 추출 (마지막 한글 단어)
          const colorMatch = productTitle.match(/([가-힣]+색상?|화이트|실버|검정|회색)\s*$/i);
          if (colorMatch) {
            options.push({
              name: '색상',
              value: colorMatch[1].trim(),
            });
          }
        }
      } catch (err) {
        parseLog.debug('[Coupang] Error extracting options from title', { error: err });
      }
    }

    parseLog.info('✅ [Coupang] Extracted selected options', {
      count: options.length,
      options: options.map(o => `${o.name}: ${o.value}`).join(', '),
      isEmpty: options.length === 0 ? '⚠️ NO OPTIONS FOUND' : 'OK',
    });

    return options;
  } catch (err) {
    parseLog.error(ErrorCode.PAR_E001, 'Error extracting selected options', {
      error: err instanceof Error ? err : new Error(String(err)),
    });
    return [];
  }
};
