/**
 * Price Comparison API Module
 *
 * 책임:
 * - 가격 비교 서버와의 통신
 * - API timeout 관리
 * - 응답 포맷팅
 */

// 가격 비교 서버 URL (환경변수에서 읽기, 없으면 기본값)
const COMPARISON_SERVER_URL_RAW = (typeof process !== 'undefined' && process.env?.VITE_BACKEND_URL) || 'http://localhost:8000';
const COMPARISON_SERVER_URL = String(COMPARISON_SERVER_URL_RAW).replace(/\/$/, '');

interface PriceSearchRequest {
  product_name: string;
  current_price?: number;
  current_url?: string;
  product_code?: string;
}

interface PriceApiTopPrice {
  rank: number;
  mall: string;
  price: number;
  free_shipping?: boolean;
  delivery?: string;
  link?: string;
}

interface PriceApiData {
  is_cheaper: boolean;
  price_diff: number;
  lowest_price: number;
  link: string;
  mall: string;
  free_shipping: boolean;
  top_prices: PriceApiTopPrice[];
  price_trend?: Array<{ label: string; price: number }> | null;
}

interface PriceApiResponse {
  status: 'success' | 'error';
  data: PriceApiData;
  message: string;
}

export interface ComparisonResponse {
  success: boolean;
  query: string;
  results: Array<{
    provider: string;
    success: boolean;
    products: Array<{
      id: string;
      name: string;
      price: number;
      originalPrice?: number;
      currency: string;
      url: string;
      image?: string;
      rating?: number;
      ratingCount?: number;
      isFreeShipping?: boolean;
      deliveryInfo?: string;
    }>;
    error?: string;
    duration: number;
  }>;
  totalDuration: number;
  fromCache?: boolean;
  // 새 API 스펙에서 추가된 필드
  is_cheaper?: boolean;
  price_diff?: number;
  lowest_price?: number;
  mall?: string;
  link?: string;
}

/**
 * 가격 비교 API 호출
 * @param query - 검색 쿼리
 * @param providers - 검색 제공자 목록 (선택)
 * @throws {Error} 타임아웃(10초) 또는 네트워크 오류
 */
export async function fetchPriceComparison(
  query: string,
  providers?: string[],
  currentPrice?: number,
  currentUrl?: string
): Promise<ComparisonResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 권장 15초 timeout

  const trimmed = String(query ?? '').trim();
  const requestUrl = `${COMPARISON_SERVER_URL}/api/v1/price/search`;

  const requestBody: PriceSearchRequest = {
    product_name: trimmed,
  };

  if (currentPrice) {
    requestBody.current_price = currentPrice;
  }
  if (currentUrl) {
    requestBody.current_url = currentUrl;
  }

  const startedAt = Date.now();

  // eslint-disable-next-line no-console
  console.info('🔗 [BACKEND] Fetching price comparison:', {
    url: requestUrl,
    body: requestBody,
    providers: providers || 'all',
  });

  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    // eslint-disable-next-line no-console
    console.info('📡 [BACKEND] Response status:', response.status);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('상품을 찾을 수 없습니다. (404)');
      }
      if (response.status === 400) {
        throw new Error('요청 파라미터가 올바르지 않습니다. (400)');
      }
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const apiResult = (await response.json()) as PriceApiResponse;
    // eslint-disable-next-line no-console
    console.info('✅ [BACKEND] Response data:', apiResult);

    if (apiResult.status !== 'success' || !apiResult.data) {
      throw new Error(apiResult.message || '검색 실패');
    }

    const durationMs = Date.now() - startedAt;
    const data = apiResult.data;
    const products = Array.isArray(data.top_prices)
      ? data.top_prices
          .filter((p) => p && typeof p.price === 'number')
          .map((p) => ({
            id: `${p.rank}`,
            name: p.mall,
            price: p.price,
            currency: 'KRW',
            url: p.link || '',
            isFreeShipping: !!p.free_shipping,
            deliveryInfo: p.delivery,
          }))
      : [];

    const mapped: ComparisonResponse = {
      success: true,
      query: trimmed,
      results: [
        {
          provider: 'danawa',
          success: true,
          products,
          duration: durationMs,
        },
      ],
      totalDuration: durationMs,
      fromCache: false,
      // 메타데이터 필드 추가
      is_cheaper: data.is_cheaper,
      price_diff: data.price_diff,
      lowest_price: data.lowest_price,
      mall: data.mall,
      link: data.link,
    };

    return mapped;
  } catch (error) {
    console.error('❌ [BACKEND] Fetch error:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간 초과 (15초)');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * 가격 비교 서버 상태 확인
 * @throws {Error} 타임아웃(5초) 또는 서버 다운
 */
export async function checkComparisonServerHealth(): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 timeout

  try {
    const response = await fetch(`${COMPARISON_SERVER_URL}/health`, {
      signal: controller.signal,
    });

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      // ignore
    }

    return {
      ok: response.ok,
      status: response.status,
      data: payload,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('서버 응답 시간 초과');
    }
    throw new Error('가격 비교 서버에 연결할 수 없습니다');
  } finally {
    clearTimeout(timeoutId);
  }
}
