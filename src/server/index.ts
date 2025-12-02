/**
 * 가격 비교 서버
 * 
 * Playwright 기반 웹 스크래핑 서버
 * 다나와, 네이버 쇼핑, 쿠팡에서 가격 비교 검색
 * 
 * 실행: pnpm run server
 * 또는: tsx src/server/index.ts
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { compareRoutes, healthRoutes } from './routes';
import { getAllProviders } from './providers';

// 환경 변수
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Express 앱 생성
const app: Application = express();

// ===== 미들웨어 설정 =====

// CORS 설정 (Chrome Extension에서 접근 허용)
app.use(
  cors({
    origin: [
      'chrome-extension://*', // Chrome Extension
      'http://localhost:*', // 로컬 개발
      'http://127.0.0.1:*',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// JSON 파싱
app.use(express.json({ limit: '10kb' }));

// 요청 로깅
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ===== 라우트 설정 =====

// 헬스 체크
app.use('/api/health', healthRoutes);

// 가격 비교 API
app.use('/api/compare', compareRoutes);

// 루트 경로
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'PicSel Price Comparison Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      compare: '/api/compare',
      providers: '/api/compare/providers',
    },
    documentation: 'POST /api/compare with { query: string, providers?: string[], maxResults?: number }',
  });
});

// 404 처리
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: '엔드포인트를 찾을 수 없습니다',
  });
});

// 에러 핸들러
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]', err);
  res.status(500).json({
    success: false,
    error: NODE_ENV === 'development' ? err.message : '서버 오류가 발생했습니다',
  });
});

// ===== 서버 시작 =====

async function startServer() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 PicSel Price Comparison Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Provider 정보 출력
  const providers = getAllProviders();
  console.log('\n📦 등록된 Provider:');
  providers.forEach(p => {
    console.log(`   • ${p.displayName} (${p.name}) - ${p.baseUrl}`);
  });

  // 서버 시작
  app.listen(Number(PORT), HOST, () => {
    console.log(`\n✅ 서버 시작됨: http://${HOST}:${PORT}`);
    console.log(`   환경: ${NODE_ENV}`);
    console.log('\n📡 API 엔드포인트:');
    console.log(`   GET  http://${HOST}:${PORT}/api/health`);
    console.log(`   POST http://${HOST}:${PORT}/api/compare`);
    console.log(`   GET  http://${HOST}:${PORT}/api/compare/providers`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 사용 예시:');
    console.log('   curl -X POST http://localhost:3001/api/compare \\');
    console.log('     -H "Content-Type: application/json" \\');
    console.log('     -d \'{"query": "아이폰 15"}\'');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  });
}

// 그레이스풀 셧다운
process.on('SIGINT', async () => {
  console.log('\n\n🛑 서버 종료 중...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n🛑 서버 종료 중...');
  process.exit(0);
});

// 서버 시작
startServer().catch(err => {
  console.error('서버 시작 실패:', err);
  process.exit(1);
});

export default app;
