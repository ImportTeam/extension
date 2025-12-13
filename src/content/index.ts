/**
 * Content Script Entry Point
 * index.ts는 오직 import/export 및 bootstrap만 담당
 */

import { bootstrap } from './runtime/bootstrap';
import { runContentScript } from './runtime/runContentScript';

bootstrap(runContentScript);
