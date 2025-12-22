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
    
    // 쿠팡의 새로운 Tailwind CSS 기반 옵션 선택자
    // 구조: <div class="option-picker-select">
    //        <div class="twc-text-[12px]">라벨</div>
    //        <div class="twc-font-bold">선택된값</div>
    //       </div>
    
    const pickerElements = doc.querySelectorAll('.option-picker-select');
    
    if (pickerElements.length === 0) {
      parseLog.debug('No .option-picker-select elements found');
      return [];
    }

    for (const picker of pickerElements) {
      try {
        // 직접 자식 div 요소들 가져오기
        const divs = picker.querySelectorAll(':scope > div');
        
        if (divs.length < 2) continue;
        
        // 첫 번째 div: 라벨
        const name = divs[0]?.textContent?.trim();
        // 두 번째 div: 선택된 값 (twc-font-bold 가 있을 것)
        const value = divs[1]?.textContent?.trim();
        
        if (name && value) {
          const normalizedName = name.replace(/\s+/g, ' ').trim();
          const normalizedValue = value.replace(/\s+/g, ' ').trim();
          
          options.push({
            name: normalizedName,
            value: normalizedValue,
          });
          
          parseLog.debug('✅ [Coupang] Extracted option from picker', {
            name: normalizedName,
            value: normalizedValue,
          });
        }
      } catch (err) {
        parseLog.debug('Error parsing option picker', { error: err });
        continue;
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
