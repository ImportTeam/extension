/**
 * 쿠팡 파서 구현 완료 가이드
 *
 * 이 문서는 Content Script의 CoupangParser 개선사항을 설명합니다.
 */

/**
 * ==========================================
 * 1. CoupangParser 주요 개선사항
 * ==========================================
 */

/*
 * 변경 전 문제점:
 * - 단순한 선택자 기반 파싱 (Lazy Render 대응 불충분)
 * - iframe 감지만 있고 MutationObserver 미포함
 * - 가격이 정가/와우회원가 구별 안 함
 *
 * 개선 후:
 * ✅ window.load 이후 800ms 대기 → 모든 DOM 로드 완료
 * ✅ MutationObserver로 새 상품 진입 자동 감지
 * ✅ 정가(sales-price-amount) vs 와우회원가(final-price-amount) 구별
 * ✅ iframe nested 구조 정확히 파싱
 *    card-benefit-popup > card-benefit-popup__content > card-benefit-popup__content-iframe
 * ✅ iframe URL을 background로 전달 (cross-origin fetch 처리)
 */

/**
 * ==========================================
 * 2. 주요 메서드 설명
 * ==========================================
 */

/*
 * 메서드: parse()
 * 책임: 메인 파싱 플로우 조정
 * 흐름:
 *   1. waitForCoupangDOM() → window.load 이후 800ms 대기
 *   2. extractCoupangProductInfo() → 상품 정보 추출
 *   3. 가격 검증 (필수)
 *   4. detectCardBenefitIframe() → iframe URL 감지
 *   5. 신뢰도 계산
 */

/*
 * 메서드: waitForCoupangDOM()
 * 책임: 쿠팡의 Lazy Render 대응
 * 구현:
 *   - if (document.readyState !== 'complete') → window load 이벤트 대기
 *   - setTimeout(800ms) 추가 대기
 * 이유: React SPA는 DOMContentLoaded에서 모든 데이터 로드 안 됨
 */

/*
 * 메서드: extractPriceInfo()
 * 책임: 정가, 와우회원가, 할인율 추출
 * 선택자:
 *   - 정가: span.price-amount.sales-price-amount
 *   - 와우회원가: span.price-amount.final-price-amount
 *   - 할인율: .prod-price .discount-rate
 * 로직: finalPrice ?? originalPrice 우선순위
 */

/*
 * 메서드: detectCardBenefitIframe()
 * 책임: 카드 혜택 iframe 감지
 * 구조:
 *   .card-benefit-popup
 *     └─ .card-benefit-popup__content
 *        └─ iframe.card-benefit-popup__content-iframe
 * 특징: 사용자 클릭 후에만 이 iframe이 로드됨
 * 해결: iframe.src URL을 content/index.ts → background.js로 전달
 */

/*
 * 메서드: setupProductChangeObserver()
 * 책임: pushState 기반 상품 변경 감지
 * 구현:
 *   - MutationObserver로 DOM 변화 감시
 *   - .prod-buy-header 추가 감지 → 새 상품
 *   - 콜백 호출 → 재파싱
 * 이유: 쿠팡은 페이지 새로고침 없이 SPA로 상품 변경
 */

/**
 * ==========================================
 * 3. Content Script (src/content/index.ts) 개선 필요사항
 * ==========================================
 */

/*
 * 변경 사항:
 * 
 * 1. CoupangParser.setupProductChangeObserver() 호출
 *    └─ content/index.ts init() 함수에서 설정
 * 
 * 2. MutationObserver 콜백 → parseAndNotify() 실행
 *    └─ 새 상품 감지시 자동 재파싱
 * 
 * 3. iframe URL 감지 후 처리
 *    ├─ CoupangParser.detectCardBenefitIframe() 호출
 *    └─ iframe 존재시:
 *        ├─ content/utils.ts의 handleCardBenefitIframe() 호출
 *        ├─ Background에 URL 전달 (cross-origin fetch)
 *        └─ AutoNotification 트리거
 * 
 * 4. 클릭 감시 개선
 *    ├─ .card-benefit-popup 부모 감시 (더 정확)
 *    └─ 사용자 클릭 후 500ms 대기 → iframe 감지
 */

/**
 * ==========================================
 * 4. 쿠팡 특화 Selector 참고
 * ==========================================
 */

/*
 * 상품 정보:
 * - 제목: h2.prod-buy-header__title
 * - 이미지: img.twc-w-full.twc-max-h-[546px]
 * 
 * 가격:
 * - 정가: span.price-amount.sales-price-amount
 * - 와우회원: span.price-amount.final-price-amount
 * - 할인율: .prod-price .discount-rate
 * 
 * 카드 혜택:
 * - 팝업 부모: .card-benefit-popup
 * - Content: .card-benefit-popup__content
 * - iframe: iframe.card-benefit-popup__content-iframe
 * - iframe.src: https://payment.coupang.com/payments/card-benefit?...
 * 
 * 주의: 이 선택자들은 쿠팡이 업데이트 시 변경될 수 있음
 *       → data-testid 기반 fallback 추가 필요
 */

/**
 * ==========================================
 * 5. 다음 단계: Background Script 개선
 * ==========================================
 */

/*
 * Background Script (src/background/index.ts)에 추가 필요:
 * 
 * 1. iframe fetch 처리
 *    chrome.runtime.onMessage.addListener(async (msg) => {
 *      if (msg.type === 'FETCH_CARD_BENEFIT_IFRAME') {
 *        const res = await fetch(msg.data.iframeUrl);
 *        const html = await res.text();
 *        // iframe HTML 파싱 → 카드 혜택 추출
 *      }
 *    });
 * 
 * 2. iframe HTML 파싱 로직
 *    ├─ DOMParser 또는 cheerio로 HTML 파싱
 *    └─ 카드사별 혜택 정보 추출
 * 
 * 3. 추출된 데이터를 chrome.storage에 저장
 *    └─ AutoNotification에서 조회
 */

/**
 * ==========================================
 * 6. 테스트 체크리스트
 * ==========================================
 */

/*
 * ✅ 필수 테스트:
 * 
 * 1. 쿠팡 상품 페이지 방문
 *    └─ 800ms 이후 가격, 제목, 이미지 파싱 확인
 * 
 * 2. 다른 상품으로 상품 변경 (카테고리 → 상품)
 *    └─ MutationObserver 트리거 확인
 *    └─ 새 가격, 제목 파싱 확인
 * 
 * 3. 카드 혜택 아이콘 클릭
 *    └─ .card-benefit-popup 로드 확인
 *    └─ iframe 감지 확인
 *    └─ iframe URL을 console에서 확인
 * 
 * 4. Background에서 iframe URL fetch
 *    └─ fetch 성공/실패 console log 확인
 *    └─ 파싱된 카드 혜택 데이터 구조 확인
 * 
 * 5. SubPopup AutoNotification 표시
 *    └─ 상품 정보, 카드 혜택 표시 확인
 */

/**
 * ==========================================
 * 7. 디버깅 팁
 * ==========================================
 */

/*
 * 문제: 가격이 0 또는 null
 * 원인: window.load 이후에도 가격 미로드
 * 해결: waitForCoupangDOM() 대기 시간 증가 (800ms → 1000ms+)
 * 
 * 문제: iframe이 감지되지 않음
 * 원인: 사용자가 카드 혜택 버튼을 아직 클릭 안 함
 * 해결: 정상 → 사용자 클릭 후에만 감지됨
 * 
 * 문제: MutationObserver가 계속 트리거됨
 * 원인: .prod-buy-header 재렌더링
 * 해결: lastProductTitle 비교로 실제 변경만 감지
 * 
 * 문제: iframe fetch CORS 오류
 * 원인: manifest.json에 host_permissions 미설정
 * 해결: "host_permissions": ["https://payment.coupang.com/*"] 추가
 */

export default {};
