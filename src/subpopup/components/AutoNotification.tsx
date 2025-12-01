import React, { useRef, useMemo } from 'react';
import { useProductData, useWindowResize } from '../../shared/hooks';
import { autoNotificationStyles as styles } from '../../popup/styles/subpopup/autoNotificationStyles';
import { CreditCard, Tag } from 'lucide-react';

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
  
  // Load product data from Chrome storage (topBenefits already sorted and sliced to 3)
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
  }, [product?.variants]);

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
      {/* Header - [플랫폼명] 혜택 정보 */}
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
        
        {/* 1. Hero Product Section - 3:7 ratio */}
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
              {discountRate > 0 && (
                <span style={styles.discountBadge}>-{discountRate}%</span>
              )}
            </div>
            {product.shippingInfo && (
              <span style={styles.shippingText}>배송: {product.shippingInfo}</span>
            )}
          </div>
        </div>

        {/* 2. Card Benefits TOP 3 */}
        {topBenefits.length > 0 && (
          <div style={styles.benefitsSection}>
            <div style={styles.sectionHeader}>
              <CreditCard size={14} />
              카드 혜택 TOP
            </div>
            <div style={styles.benefitsList}>
              {topBenefits.map((benefit, index) => (
                <div key={index} style={styles.benefitItem}>
                  <div style={styles.benefitRank}>{index + 1}</div>
                  <div style={styles.benefitContent}>
                    <div style={styles.benefitCardName}>{benefit.cardName || '카드'}</div>
                    <div style={styles.benefitDesc}>
                      {benefit.rate 
                        ? `${benefit.rate}% 할인`
                        : benefit.benefit || '혜택 정보'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Additional Benefits (Cashback, Gift Card) */}
        {hasAdditionalBenefits && (
          <div style={styles.additionalBenefitsSection}>
            <div style={styles.sectionHeader}>
              <Tag size={14} />
              추가 혜택
            </div>
            {hasCashback && (
              <div style={styles.additionalBenefitItem}>
                <span style={styles.additionalBenefitIcon}>💰</span>
                <span style={styles.additionalBenefitText}>
                  {typeof cashbackInfo === 'object' && cashbackInfo.description 
                    ? cashbackInfo.description 
                    : `캐시백 ${cashbackInfo}원 적립`}
                </span>
              </div>
            )}
            {hasGiftCard && (
              <div style={styles.additionalBenefitItem}>
                <span style={styles.additionalBenefitIcon}>🎁</span>
                <span style={styles.additionalBenefitText}>
                  {typeof giftCardInfo === 'object' && giftCardInfo.description 
                    ? giftCardInfo.description 
                    : `기프트카드 ${giftCardInfo}원 할인`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 4. Variants Section - Horizontal Scroll */}
        {variants.length > 0 && (
          <div style={styles.variantsSection}>
            <div style={styles.sectionHeader}>다른 구성</div>
            <div style={styles.variantsScrollContainer}>
              {variants.map((variant, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const isSelected = (variant as any).isSelected || false;
                return (
                  <div
                    key={index}
                    style={isSelected ? styles.variantItemSelected : styles.variantItem}
                  >
                    <div style={isSelected ? styles.variantLabelSelected : styles.variantLabel}>
                      {variant.name || `옵션 ${index + 1}`}
                    </div>
                    {variant.price && (
                      <div style={isSelected ? styles.variantPriceSelected : styles.variantPrice}>
                        ₩{variant.price.toLocaleString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state if no benefits */}
        {topBenefits.length === 0 && !hasAdditionalBenefits && variants.length === 0 && (
          <div style={styles.emptyState}>
            이 상품에 대한 추가 혜택 정보가 없습니다.
          </div>
        )}

      </div>
    </div>
  );
};


export default AutoNotification;
