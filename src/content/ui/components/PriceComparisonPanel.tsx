/**
 * 가격 비교 패널 컴포넌트
 * 
 * 다나와, 네이버쇼핑, 쿠팡에서 검색한 가격 비교 결과를 표시
 */

import React, { useState, useEffect } from 'react';

interface ComparedProduct {
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
  isRocketDelivery?: boolean;
  deliveryInfo?: string;
}

interface ProviderResult {
  provider: string;
  success: boolean;
  products: ComparedProduct[];
  error?: string;
  duration: number;
}

interface ComparisonData {
  success: boolean;
  query: string;
  results: ProviderResult[];
  totalDuration: number;
  fromCache?: boolean;
}

interface PriceComparisonPanelProps {
  productTitle: string;
  currentPrice: number;
  onClose: () => void;
}

// Provider 표시명
const PROVIDER_DISPLAY_NAMES: Record<string, string> = {
  danawa: '다나와',
  naver: '네이버쇼핑',
  coupang: '쿠팡',
};

// Provider 로고 색상
const PROVIDER_COLORS: Record<string, string> = {
  danawa: '#0066cc',
  naver: '#03cf5d',
  coupang: '#f73c00',
};

/**
 * 가격 포맷팅
 */
function formatPrice(price: number, currency = 'KRW'): string {
  if (currency === 'KRW') {
    return `${price.toLocaleString('ko-KR')}원`;
  }
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

/**
 * 할인율 계산
 */
function calculateDiscount(original: number, current: number): number {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

export const PriceComparisonPanel: React.FC<PriceComparisonPanelProps> = ({
  productTitle,
  currentPrice,
  onClose,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ComparisonData | null>(null);
  const [serverAvailable, setServerAvailable] = useState<boolean | null>(null);

  // 서버 상태 확인 및 가격 비교 검색
  useEffect(() => {
    async function checkServerAndSearch(): Promise<void> {
      try {
        // 먼저 서버 상태 확인
        const serverCheck = await chrome.runtime.sendMessage({
          type: 'CHECK_COMPARISON_SERVER',
        });

        if (!serverCheck.success) {
          setServerAvailable(false);
          setError('가격 비교 서버가 실행 중이 아닙니다. pnpm run server 실행이 필요합니다.');
          setLoading(false);
          return;
        }

        setServerAvailable(true);

        // 가격 비교 검색 요청
        const result = await chrome.runtime.sendMessage({
          type: 'COMPARE_PRICES',
          query: productTitle,
        });

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || '가격 비교 검색 실패');
        }
      } catch (err) {
        console.error('[PriceComparison] Error:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    }

    if (productTitle) {
      checkServerAndSearch();
    }
  }, [productTitle]);

  // 로딩 상태
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>🔍 가격 비교 중...</h3>
          <button onClick={onClose} style={styles.closeButton}>✕</button>
        </div>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>다나와, 네이버쇼핑, 쿠팡에서 검색 중...</p>
        </div>
      </div>
    );
  }

  // 서버 미실행 상태
  if (serverAvailable === false) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>⚠️ 서버 연결 필요</h3>
          <button onClick={onClose} style={styles.closeButton}>✕</button>
        </div>
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>{error}</p>
          <code style={styles.codeBlock}>pnpm run server</code>
          <p style={styles.helpText}>터미널에서 위 명령어를 실행한 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>❌ 검색 실패</h3>
          <button onClick={onClose} style={styles.closeButton}>✕</button>
        </div>
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  // 결과가 없는 경우
  if (!data || data.results.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>📭 검색 결과 없음</h3>
          <button onClick={onClose} style={styles.closeButton}>✕</button>
        </div>
        <div style={styles.emptyContainer}>
          <p>"{productTitle}"에 대한 검색 결과가 없습니다.</p>
        </div>
      </div>
    );
  }

  // 결과 표시
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>💰 가격 비교</h3>
        <div style={styles.headerInfo}>
          {data.fromCache && <span style={styles.cacheTag}>캐시</span>}
          <span style={styles.duration}>{(data.totalDuration / 1000).toFixed(1)}s</span>
          <button onClick={onClose} style={styles.closeButton}>✕</button>
        </div>
      </div>

      <div style={styles.currentPrice}>
        <span>현재 페이지 가격:</span>
        <strong style={styles.priceHighlight}>{formatPrice(currentPrice)}</strong>
      </div>

      <div style={styles.resultsContainer}>
        {data.results.map((result) => (
          <div key={result.provider} style={styles.providerSection}>
            <div style={styles.providerHeader}>
              <span
                style={{
                  ...styles.providerName,
                  color: PROVIDER_COLORS[result.provider] || '#333',
                }}
              >
                {PROVIDER_DISPLAY_NAMES[result.provider] || result.provider}
              </span>
              {result.success ? (
                <span style={styles.productCount}>{result.products.length}개</span>
              ) : (
                <span style={styles.errorBadge}>실패</span>
              )}
            </div>

            {result.success && result.products.length > 0 ? (
              <div style={styles.productList}>
                {result.products.slice(0, 3).map((product) => {
                  const discount = calculateDiscount(product.originalPrice || 0, product.price);
                  const isCheaper = product.price < currentPrice;
                  const priceDiff = currentPrice - product.price;

                  return (
                    <a
                      key={product.id}
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.productItem}
                    >
                      {product.image && (
                        <img src={product.image} alt="" style={styles.productImage} />
                      )}
                      <div style={styles.productInfo}>
                        <p style={styles.productName}>{product.name}</p>
                        <div style={styles.priceRow}>
                          <span
                            style={{
                              ...styles.productPrice,
                              color: isCheaper ? '#e91e63' : '#333',
                            }}
                          >
                            {formatPrice(product.price)}
                          </span>
                          {discount > 0 && (
                            <span style={styles.discountBadge}>{discount}%↓</span>
                          )}
                          {isCheaper && (
                            <span style={styles.savingBadge}>
                              {formatPrice(priceDiff)} 저렴
                            </span>
                          )}
                        </div>
                        <div style={styles.metaRow}>
                          {product.rating && (
                            <span style={styles.rating}>⭐ {product.rating}</span>
                          )}
                          {product.deliveryInfo && (
                            <span style={styles.delivery}>{product.deliveryInfo}</span>
                          )}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : result.error ? (
              <p style={styles.providerError}>{result.error}</p>
            ) : (
              <p style={styles.noResults}>검색 결과 없음</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 스타일 정의
const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    width: '380px',
    maxHeight: '500px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    zIndex: 999999,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #eee',
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    color: '#333',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cacheTag: {
    fontSize: '10px',
    padding: '2px 6px',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    borderRadius: '4px',
  },
  duration: {
    fontSize: '12px',
    color: '#888',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#888',
    cursor: 'pointer',
    padding: '4px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    color: '#666',
    fontSize: '14px',
  },
  errorContainer: {
    padding: '24px',
    textAlign: 'center',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: '12px',
  },
  codeBlock: {
    display: 'block',
    padding: '12px',
    backgroundColor: '#2d3748',
    color: '#68d391',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '12px',
  },
  helpText: {
    color: '#666',
    fontSize: '12px',
  },
  emptyContainer: {
    padding: '24px',
    textAlign: 'center',
    color: '#666',
  },
  currentPrice: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#fff9e6',
    borderBottom: '1px solid #ffeaa7',
  },
  priceHighlight: {
    fontSize: '18px',
    color: '#f39c12',
  },
  resultsContainer: {
    maxHeight: '350px',
    overflowY: 'auto',
  },
  providerSection: {
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
  },
  providerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  providerName: {
    fontSize: '14px',
    fontWeight: 600,
  },
  productCount: {
    fontSize: '12px',
    color: '#888',
  },
  errorBadge: {
    fontSize: '10px',
    padding: '2px 6px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '4px',
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  productItem: {
    display: 'flex',
    gap: '10px',
    padding: '8px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'background-color 0.2s',
  },
  productImage: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  productInfo: {
    flex: 1,
    minWidth: 0,
  },
  productName: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    color: '#333',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '2px',
  },
  productPrice: {
    fontSize: '14px',
    fontWeight: 600,
  },
  discountBadge: {
    fontSize: '10px',
    padding: '1px 4px',
    backgroundColor: '#fff3e0',
    color: '#e65100',
    borderRadius: '3px',
  },
  savingBadge: {
    fontSize: '10px',
    padding: '1px 4px',
    backgroundColor: '#fce4ec',
    color: '#c2185b',
    borderRadius: '3px',
  },
  metaRow: {
    display: 'flex',
    gap: '8px',
    fontSize: '11px',
    color: '#888',
  },
  rating: {
    color: '#ff9800',
  },
  delivery: {
    color: '#4caf50',
  },
  providerError: {
    fontSize: '12px',
    color: '#e74c3c',
    padding: '8px',
  },
  noResults: {
    fontSize: '12px',
    color: '#888',
    padding: '8px',
    textAlign: 'center',
  },
};

// CSS 키프레임 애니메이션 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(styleSheet);
}

export default PriceComparisonPanel;
