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
    
    // 쿠팡의 선택 옵션 컨테이너
    // 예: <div class="option_selected"><dl class="option"><dt>CPU</dt><dd>M4 Pro 14코어</dd></dl></div>
    const optionElements = doc.querySelectorAll(
      '.c_product_option .option_selected .option, [class*="option_selected"] dl.option'
    );

    for (const optionEl of optionElements) {
      try {
        const dtEl = optionEl.querySelector('dt');
        const ddEl = optionEl.querySelector('dd');

        if (!dtEl || !ddEl) continue;

        const name = dtEl.textContent?.trim();
        const value = ddEl.textContent?.trim();

        if (!name || !value) continue;

        // 공백 정규화
        const normalizedName = name.replace(/\s+/g, ' ');
        const normalizedValue = value.replace(/\s+/g, ' ');

        options.push({
          name: normalizedName,
          value: normalizedValue,
        });

        parseLog.debug('🔍 [Coupang] Found option', {
          name: normalizedName,
          value: normalizedValue,
        });
      } catch (err) {
        parseLog.warn('Error parsing option element', { error: err });
        continue;
      }
    }

    parseLog.info('✅ [Coupang] Extracted selected options', {
      count: options.length,
      options: options.map(o => `${o.name}: ${o.value}`).join(', '),
    });

    return options;
  } catch (err) {
    parseLog.error(ErrorCode.PAR_E001, 'Error extracting selected options', {
      error: err instanceof Error ? err : new Error(String(err)),
    });
    return [];
  }
};
