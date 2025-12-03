/**
 * Content Script Entry Point
 * index.ts는 오직 import/export 및 bootstrap만 담당
 */

import { bootstrap } from './bootstrap';
import { runContentScript } from './contentRunner';

bootstrap(runContentScript);
