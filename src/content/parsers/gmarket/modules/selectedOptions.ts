/**
 * G마켓 Parser - Selected Options Extractor
 * 사용자가 선택한 옵션 정보 추출
 * G마켓은 상품명에 옵션 정보가 포함되어 있음
 * 예: "맥북에어 13 M4 (CPU 10코어/GPU 8코어) RAM 16GB SSD 256GB 미드나이트 MW123KH/A"
 */

import { parseLog, ErrorCode } from '../../../../shared/utils/logger';

/**
 * G마켓에서 선택된 옵션 추출
 * 상품명에서 괄호 안의 정보와 주요 사양을 옵션으로 파싱
 */
export const extractSelectedOptions = (
  doc: Document
): Array<{ name: string; value: string }> => {
  try {
    const options: Array<{ name: string; value: string }> = [];
    
    // G마켓의 선택된 상품명
    // 구조: <span class="item_tit">상품명 (옵션1/옵션2) 옵션3 옵션4 옵션5</span>
    const selectedItemEl = doc.querySelector('.select-item_option .item_tit');
    
    if (!selectedItemEl) {
      parseLog.debug('[Gmarket] No selected item title found');
      return [];
    }

    const productTitle = selectedItemEl.textContent?.trim() || '';
    
    if (!productTitle) {
      return [];
    }

    parseLog.debug('[Gmarket] Product title', { title: productTitle.substring(0, 100) });

    // 패턴: (CPU 10코어/GPU 8코어) RAM 16GB SSD 256GB 색상 모델명
    // 괄호 안의 정보 추출
    const cpuGpuMatch = productTitle.match(/\(([^)]+)\)/);
    if (cpuGpuMatch) {
      const cpuGpu = cpuGpuMatch[1].trim();
      options.push({
        name: 'CPU / GPU',
        value: cpuGpu,
      });
      parseLog.debug('[Gmarket] Found CPU/GPU', { value: cpuGpu });
    }

    // RAM 추출 (예: "RAM 16GB")
    const ramMatch = productTitle.match(/RAM\s+(\d+GB)/i);
    if (ramMatch) {
      const ram = ramMatch[1].trim();
      options.push({
        name: 'RAM',
        value: ram,
      });
      parseLog.debug('[Gmarket] Found RAM', { value: ram });
    }

    // SSD 추출 (예: "SSD 256GB" 또는 "SSD 512GB")
    const ssdMatch = productTitle.match(/SSD\s+(\d+(?:GB|TB))/i);
    if (ssdMatch) {
      const ssd = ssdMatch[1].trim();
      options.push({
        name: 'SSD',
        value: ssd,
      });
      parseLog.debug('[Gmarket] Found SSD', { value: ssd });
    }

    // 색상 추출 - SSD 이후의 한글 단어
    // 제외할 패턴: 모델명(영문+숫자), 숫자 등
    const afterSsd = productTitle.split(/SSD\s+\d+(?:GB|TB)/i)[1] || '';
    const colorCandidates = afterSsd
      .split(/\s+/)
      .filter((word) => {
        // 한글만 포함된 단어 (색상)이고 2글자 이상
        const isKorean = /^[가-힣]+$/.test(word);
        const validLength = word.length >= 2;
        return isKorean && validLength;
      });

    if (colorCandidates.length > 0) {
      const color = colorCandidates[0];
      options.push({
        name: '색상',
        value: color,
      });
      parseLog.debug('[Gmarket] Found color', { value: color });
    }

    parseLog.info('✅ [Gmarket] Extracted selected options', {
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
