/**
 * Provider 모듈 인덱스
 * 
 * 모든 쇼핑 사이트 스크래퍼 Provider 내보내기
 */

export { BaseProvider } from './base';
export { danawaProvider, DanawaProvider } from './danawa';
export { naverShoppingProvider, NaverShoppingProvider } from './naver-shopping';
export { coupangSearchProvider, CoupangSearchProvider } from './coupang-search';

// Provider 타입 맵
import { danawaProvider } from './danawa';
import { naverShoppingProvider } from './naver-shopping';
import { coupangSearchProvider } from './coupang-search';
import type { ProviderType } from '../../shared/types/comparison';
import type { BaseProvider } from './base';

export const providers: Record<ProviderType, BaseProvider> = {
  danawa: danawaProvider,
  naver: naverShoppingProvider,
  coupang: coupangSearchProvider,
};

export function getProvider(type: ProviderType): BaseProvider | undefined {
  return providers[type];
}

export function getAllProviders(): BaseProvider[] {
  return Object.values(providers);
}
