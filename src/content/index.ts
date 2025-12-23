/**
 * Content Script Entry Point
 * index.ts는 오직 import/export 및 bootstrap만 담당
 */

import { bootstrap } from './runtime/bootstrap';
import { runContentScript } from './runtime/runContentScript';
import { setupAuthListener } from './services/authListener';

bootstrap(runContentScript);

// 웹에서 보낸 인증 토큰 수신
setupAuthListener();
