/**
 * Price Comparison API Module
 *
 * 책임:
 * - 가격 비교 서버와의 통신
 * - API timeout 관리
 * - 응답 포맷팅
 */

// 가격 비교 서버 URL
const COMPARISON_SERVER_URL = 'http://localhost:8000';

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
}

/**
 * 가격 비교 API 호출
 * @param query - 검색 쿼리
 * @param providers - 검색 제공자 목록 (선택)
 * @throws {Error} 타임아웃(10초) 또는 네트워크 오류
 */
export async function fetchPriceComparison(
  query: string,
  providers?: string[]
): Promise<ComparisonResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 timeout

  try {
    const response = await fetch(`${COMPARISON_SERVER_URL}/api/compare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        providers,
        maxResults: 5,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간 초과 (10초)');
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
    const response = await fetch(`${COMPARISON_SERVER_URL}/api/health`, {
      signal: controller.signal,
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('서버 응답 시간 초과');
    }
    throw new Error('가격 비교 서버에 연결할 수 없습니다');
  } finally {
    clearTimeout(timeoutId);
  }
}
