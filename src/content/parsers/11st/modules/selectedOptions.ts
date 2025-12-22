/**
 * 11번가 Parser - Selected Options Extractor
 * 사용자가 선택한 옵션 정보 추출
 * 예: CPU/GPU: 10/10, 색상: 실버, RAM: 32GB, SSD: 1TB, 키보드: 한국어
 */

import { parseLog, ErrorCode } from '../../../../shared/utils/logger';

/**
 * 11번가에서 선택된 옵션 추출
 * 선택자: .option_selected dl.option > 선택된 옵션들
 */
export const extractSelectedOptions = (
  doc: Document
): Array<{ name: string; value: string }> => {
  try {
    const options: Array<{ name: string; value: string }> = [];

    // 11번가의 선택 옵션 컨테이너 (새 구조)
    // 구조: <div class="option_selected">
    //        <dl class="option">
    //          <dt>옵션명</dt>
    //          <dd>선택값</dd>
    //        </dl>
    //       </div>
    // 각 옵션이 dd > div 안에 있는 경우도 있음
    
    const optionSelectedDivs = doc.querySelectorAll(
      '.c_product_option .option_selected'
    );

    if (optionSelectedDivs.length === 0) {
      parseLog.debug('[11st] No .option_selected divs found');
      return [];
    }

    for (const optionDiv of optionSelectedDivs) {
      try {
        // 각 option_selected 아래의 dl.option 찾기
        const dlElement = optionDiv.querySelector('dl.option');
        if (!dlElement) continue;

        const dtEl = dlElement.querySelector('dt');
        const ddEl = dlElement.querySelector('dd');

        if (!dtEl || !ddEl) continue;

        const name = dtEl.textContent?.trim();
        let value = ddEl.textContent?.trim();

        if (!name || !value) continue;

        // 공백 정규화
        const normalizedName = name.replace(/\s+/g, ' ').trim();
        const normalizedValue = value.replace(/\s+/g, ' ').trim();

        options.push({
          name: normalizedName,
          value: normalizedValue,
        });

        parseLog.debug('✅ [11st] Found option', {
          name: normalizedName,
          value: normalizedValue,
        });
      } catch (err) {
        parseLog.debug('[11st] Error parsing option element', { error: err });
        continue;
      }
    }

    parseLog.info('✅ [11st] Extracted selected options', {
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
