/**
 * G마켓 Parser - Selected Options Extractor
 * 사용자가 선택한 옵션 정보 추출
 * 예: 맥북에어 13 M4 (CPU 10코어/GPU 10코어) RAM 16GB SSD 512GB 실버
 */

import { parseLog, ErrorCode } from '../../../../shared/utils/logger';

/**
 * G마켓에서 선택된 옵션 추출
 * G마켓은 상품 제목 또는 옵션 영역에서 옵션 정보를 추출
 */
export const extractSelectedOptions = (
  doc: Document
): Array<{ name: string; value: string }> => {
  try {
    const options: Array<{ name: string; value: string }> = [];

    // G마켓 방식 1: 옵션 컨테이너가 있을 경우
    // <div class="option_selected"><dl class="option"><dt>색상</dt><dd>실버</dd></dl></div>
    const optionElements = doc.querySelectorAll(
      '.option_selected .option, [class*="option_selected"] dl, .c_product_option dl'
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

        parseLog.debug('🔍 [Gmarket] Found option', {
          name: normalizedName,
          value: normalizedValue,
        });
      } catch (err) {
        parseLog.warn('Error parsing option element', { error: err });
        continue;
      }
    }

    // G마켓 방식 2: 제목에서 옵션 정보 추출 (선택사항)
    if (options.length === 0) {
      try {
        const titleEl = doc.querySelector('.c_product_info_title h2, [class*="product"] h1, h1[class*="product"]');
        if (titleEl) {
          const titleText = titleEl.textContent?.trim() || '';
          // 제목 예: "맥북에어 13 M4 (CPU 10코어/GPU 10코어) RAM 16GB SSD 512GB 실버"
          // 정규식으로 주요 사양 추출 가능
          parseLog.debug('🔍 [Gmarket] Product title found', { title: titleText });
        }
      } catch (err) {
        parseLog.warn('Error parsing title for options', { error: err });
      }
    }

    parseLog.info('✅ [Gmarket] Extracted selected options', {
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
