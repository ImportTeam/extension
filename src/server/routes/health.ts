/**
 * Health Check 라우트
 * 
 * 서버 상태 확인 엔드포인트
 */

import { Router, Request, Response } from 'express';
import { getAllProviders } from '../providers';

const router = Router();

/**
 * GET /api/health
 * 
 * 서버 상태 확인
 */
router.get('/', (_req: Request, res: Response) => {
  const providers = getAllProviders();
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    providers: {
      count: providers.length,
      list: providers.map(p => p.name),
    },
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB',
    },
  });
});

export default router;
