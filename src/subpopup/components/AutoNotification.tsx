import React, { useRef, useMemo } from 'react';
import { useProductData, useWindowResize } from '../../shared/hooks';
import { autoNotificationStyles as styles } from '../../popup/styles/subpopup/autoNotificationStyles';
import { CreditCard, Gift, Tag } from 'lucide-react';

// Platform display names
const platformNames: Record<string, string> = {
  coupang: '쿠팡',
  amazon: '아마존',
  ebay: '이베이',
  gmarket: 'G마켓',
  '11st': '11번가',
  naver: '네이버쇼핑',
  tmon: '티몬',
  wemakeprice: '위메프',
};

export const AutoNotification: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  
  // Load product data from Chrome storage
  const { product, topBenefits, loading } = useProductData();
  
  // Auto-resize window to fit content
  useWindowResize({
    enabled: !loading,
    contentRef,
  });

  // Process variants
  const variants = useMemo(() => {
    if (!product?.variants) return [];
    return product.variants.slice(0, 6); // Limit to 6 variants
  }, [product?.variants]); // Keep as is to avoid breaking change, or update if safe. Linter suggested product.variants.

  if (loading || !product) {
    return null;
  }

  const originalPrice = product.originalPrice || 0;
  const finalPrice = product.discountPrice || product.price || product.amount || 0;
  const discountRate = product.discountRate || (
    originalPrice > 0 && finalPrice > 0
      ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
      : 0
  );

  // Platform name for header
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const platform = (product as any).platform || (product as any).source || '';
  const platformDisplayName = platform 
    ? (platformNames[platform.toLowerCase()] || platform)
    : '쇼핑';

  const logoUrl = chrome.runtime.getURL('assets/icon/picsel-logo.png');

  // Check for additional benefits
  const cashbackInfo = product.cashback;
  const giftCardInfo = product.giftCardDiscount;
  const hasCashback = !!cashbackInfo;
  const hasGiftCard = !!giftCardInfo;
  const hasAdditionalBenefits = hasCashback || hasGiftCard;

  return (
    <div ref={contentRef} style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoWrapper}>
          <img
            src={logoUrl}
            alt="PicSel"
            style={styles.logo}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <span style={styles.title}>{platformDisplayName} 혜택 정보</span>
        </div>
        <button style={styles.closeBtn} onClick={() => window.close()}>
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        
        {/* 1. Product Card */}
        <div style={styles.card}>
          <div style={styles.productSection}>
            <div style={styles.imageWrapper}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt="Product" style={styles.productImage} />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#9ca3af',
                  fontSize: '12px'
                }}>
                  No Image
                </div>
              )}
            </div>
            <div style={styles.productInfo}>
              <div style={styles.productTitle}>{product.title || '상품명 없음'}</div>
              <div style={styles.priceRow}>
                <span style={styles.finalPrice}>₩{finalPrice.toLocaleString()}</span>
                {originalPrice > 0 && originalPrice !== finalPrice && (
                  <span style={styles.originalPrice}>₩{originalPrice.toLocaleString()}</span>
                )}
              </div>
              <div style={styles.priceRow}>
                {discountRate > 0 && (
                  <span style={styles.discountBadge}>-{discountRate}%</span>
                )}
                {product.shippingInfo && (
                  <span style={styles.shippingText}>배송: {product.shippingInfo}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Card Benefits (Nested Structure) */}
        <div>
          <div style={styles.sectionHeader}>
            <CreditCard size={18} />
            <span>카드별 혜택 비교</span>
          </div>
          <div style={styles.benefitCard}>
            {/* Best Badge */}
            <div style={styles.bestBadge}>최고 혜택</div>

            {/* Main Benefit (Card) */}
            <div style={styles.benefitRow}>
              <div>
                <div style={styles.benefitTitle}>
                  {topBenefits.length > 0 ? topBenefits[0].cardName : '제휴 카드'}
                </div>
                <div style={styles.benefitDesc}>
                  {topBenefits.length > 0 ? topBenefits[0].benefit : '최대 5% 즉시할인 (와우전용)'}
                </div>
              </div>
              <div>
                 <div style={styles.benefitAmount}>
                    -{Math.round(finalPrice * 0.05).toLocaleString()}원
                 </div>
                 <div style={styles.benefitTotal}>
                    최종 {Math.round(finalPrice * 0.95).toLocaleString()}
                 </div>
              </div>
            </div>

            {/* Nested Additional Benefits */}
            {hasAdditionalBenefits && (
              <>
                <div style={styles.nestedBenefitDivider} />
                
                {hasCashback && (
                  <div style={styles.nestedBenefitItem}>
                    <div style={styles.nestedIconCircle}>
                      <Tag size={18} />
                    </div>
                    <span style={styles.nestedBenefitText}>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      쿠팡캐시 {(cashbackInfo as any)?.amount?.toLocaleString() || ''} 원 적립
                    </span>
                  </div>
                )}
                
                {hasGiftCard && (
                  <div style={styles.nestedBenefitItem}>
                    <div style={styles.nestedIconCircle}>
                      <Gift size={18} />
                    </div>
                    <span style={styles.nestedBenefitText}>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(giftCardInfo as any)?.description || '기프트카드 혜택'}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* 3. Other Options */}
        <div>
          <div style={styles.sectionHeader}>
            <span>다른 구성</span>
          </div>
          <div style={styles.optionsList}>
            {variants.length > 0 ? (
              variants.map((variant, index) => (
                <div 
                  key={index}
                  style={styles.optionItem}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <span style={styles.optionLabel}>{variant.name}</span>
                  <span style={styles.optionPrice}>
                    ₩{(variant.price || finalPrice).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div 
                  style={styles.optionItem}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <span style={styles.optionLabel}>512GB</span>
                  <span style={styles.optionPrice}>₩{finalPrice.toLocaleString()}</span>
                </div>
                <div 
                  style={styles.optionItem}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <span style={styles.optionLabel}>16GB</span>
                  <span style={styles.optionPrice}>₩{finalPrice.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <button 
          style={styles.ctaButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6366f1')}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const url = (product as any).url || window.location.href;
            window.open(url, '_blank');
          }}
        >
          결제시 쿠폰 적용
        </button>
      </div>
    </div>
  );
};

export default AutoNotification;
