/**
 * 가격 비교 API 라우트
 * 
 * /api/compare 엔드포인트 처리
 * 여러 쇼핑몰에서 동시에 가격 검색
 */

import { Router, Request, Response } from 'express';
import NodeCache from 'node-cache';
import { providers, getAllProviders, getProvider } from '../providers';
import type {
  ComparisonRequest,
  ComparisonResponse,
  ProviderResult,
  ProviderType,
} from '../../shared/types/comparison';

const router = Router();

// 캐시 설정: 5분 TTL
const cache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: true,
});

const isProvider = (value: string): value is ProviderType => value in providers;

const buildErrorResponse = (
  query: string,
  durationMs: number,
  errorMessage: string,
): ComparisonResponse => ({
  success: false,
  query,
  timestamp: Date.now(),
  totalDuration: durationMs,
  fromCache: false,
  results: [],
  error: errorMessage,
});

/**
 * 캐시 키 생성
 */
function getCacheKey(query: string, providers: ProviderType[]): string {
  const sortedProviders = [...providers].sort().join(',');
  return `compare:${query}:${sortedProviders}`;
}

/**
 * POST /api/compare
 * 
 * 여러 쇼핑몰에서 가격 비교 검색
 * 
 * Request Body:
 * {
 *   query: string;           // 검색어
 *   providers?: ProviderType[]; // 검색할 쇼핑몰 (기본: 전체)
 *   maxResults?: number;     // 쇼핑몰당 최대 결과 수 (기본: 10)
 *   useCache?: boolean;      // 캐시 사용 여부 (기본: true)
 * }
 */
router.post('/', async (req: Request, res: Response) => {
  const startTime = Date.now();

  try {
    const {
      query,
      providers: requestedProviders,
      maxResults = 10,
      useCache = true,
    } = req.body as ComparisonRequest;

    // 검색어 유효성 검사
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      const errorResponse = buildErrorResponse('', Date.now() - startTime, '검색어가 필요합니다');
      res.status(400).json(errorResponse);
      return;
    }

    const trimmedQuery = query.trim();


    // 사용할 Provider 결정
    const providerTypesToUse: ProviderType[] = requestedProviders && requestedProviders.length > 0
      ? requestedProviders.filter(isProvider)
      : (Object.keys(providers) as ProviderType[]);

    if (providerTypesToUse.length === 0) {
      const errorResponse = buildErrorResponse(
        trimmedQuery,
        Date.now() - startTime,
        '유효한 쇼핑몰이 지정되지 않았습니다',
      );
      res.status(400).json(errorResponse);
      return;
    }

    // 캐시 확인
    const cacheKey = getCacheKey(trimmedQuery, providerTypesToUse);
    if (useCache) {
      const cachedResult = cache.get<ComparisonResponse>(cacheKey);
      if (cachedResult) {
        console.log(`[Compare] 캐시 히트: ${trimmedQuery}`);
        res.json({
          ...cachedResult,
          fromCache: true,
        });
        return;
      }
    }

    console.log(`[Compare] 검색 시작: "${trimmedQuery}" (${providerTypesToUse.join(', ')})`);

    // 모든 Provider에서 병렬 검색
    const searchPromises = providerTypesToUse.map(async (providerType): Promise<ProviderResult> => {
      const provider = getProvider(providerType);
      if (!provider) {
        return {
          provider: providerType,
          success: false,
          products: [],
          error: 'Provider를 찾을 수 없습니다',
          duration: 0,
        };
      }

      try {
        const result = await provider.search(trimmedQuery, maxResults);
        return {
          provider: providerType,
          success: result.success,
          products: result.data || [],
          error: result.error,
          duration: result.duration,
        };
      } catch (error) {
        console.error(`[Compare] ${providerType} 검색 실패:`, error);
        return {
          provider: providerType,
          success: false,
          products: [],
          error: error instanceof Error ? error.message : '알 수 없는 오류',
          duration: 0,
        };
      }
    });

    const results = await Promise.all(searchPromises);

    const totalDuration = Date.now() - startTime;
    const successCount = results.filter(r => r.success).length;

    const response: ComparisonResponse = {
      success: successCount > 0,
      query: trimmedQuery,
      timestamp: Date.now(),
      results,
      totalDuration,
      fromCache: false,
    };

    // 성공한 결과가 있으면 캐시에 저장
    if (successCount > 0) {
      cache.set(cacheKey, response);
    }

    console.log(`[Compare] 검색 완료: ${successCount}/${results.length} 성공 (${totalDuration}ms)`);

    res.json(response);
  } catch (error) {
    console.error('[Compare] 서버 에러:', error);
    const response = buildErrorResponse(
      typeof req.body?.query === 'string' ? req.body.query.trim() : '',
      Date.now() - startTime,
      error instanceof Error ? error.message : '서버 오류가 발생했습니다',
    );
    res.status(500).json(response);
  }
});

/**
 * GET /api/compare/providers
 * 
 * 사용 가능한 Provider 목록 반환
 */
router.get('/providers', (_req: Request, res: Response) => {
  const allProviders = getAllProviders();
  const providerInfo = allProviders.map(p => ({
    type: p.name,
    displayName: p.displayName,
    baseUrl: p.baseUrl,
    currency: p.currency,
  }));

  res.json({
    success: true,
    providers: providerInfo,
  });
});

/**
 * GET /api/compare/cache/stats
 * 
 * 캐시 통계 반환
 */
router.get('/cache/stats', (_req: Request, res: Response) => {
  res.json({
    success: true,
    stats: cache.getStats(),
  });
});

/**
 * POST /api/compare/cache/clear
 * 
 * 캐시 초기화
 */
router.post('/cache/clear', (_req: Request, res: Response) => {
  cache.flushAll();
  res.json({
    success: true,
    message: '캐시가 초기화되었습니다',
  });
});

export default router;
