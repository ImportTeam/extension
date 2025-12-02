import React, { useRef, useMemo } from 'react';
import { useProductData, useWindowResize } from '../../shared/hooks';
import { autoNotificationStyles as styles } from '../../popup/styles/subpopup/autoNotificationStyles';
import { X, CreditCard, Coins, Gift, Award } from 'lucide-react';

// Benefit type for unified ranking
interface RankedBenefit {
  id: string;
  type: 'card' | 'cashback' | 'giftcard' | 'point';
  title: string;
  description: string;
  amount: number; // 혜택 금액 (원)
  icon: 'card' | 'coins' | 'gift';
}

export const AutoNotification: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  
  // Load product data from Chrome storage
  const { product, topBenefits, loading } = useProductData();
  
  // Auto-resize window to fit content
  useWindowResize({
    enabled: !loading,
    contentRef,
  });

  // 모든 혜택을 금액 기준으로 통합 랭킹
  const rankedBenefits = useMemo((): RankedBenefit[] => {
    if (!product) return [];
    
    const benefits: RankedBenefit[] = [];
    const finalPrice = product.discountPrice || product.price || product.amount || 0;
    
    // 1. 캐시백 혜택
    if (product.cashback) {
      const cashbackAmount = (product.cashback as { amount?: number })?.amount || 0;
      if (cashbackAmount > 0) {
        benefits.push({
          id: 'cashback',
          type: 'cashback',
          title: '쿠팡캐시 적립',
          description: '혜택 금액이 가장 큽니다. (적립)',
          amount: cashbackAmount,
          icon: 'coins',
        });
      }
    }
    
    // 2. 카드 혜택
    if (topBenefits && topBenefits.length > 0) {
      topBenefits.forEach((benefit, idx) => {
        const rate = (benefit as { rate?: number; discount?: number }).rate ?? 
                     (benefit as { rate?: number; discount?: number }).discount ?? 0;
        const cardAmount = rate > 0 ? Math.round(finalPrice * (rate / 100)) : 0;
        
        if (cardAmount > 0) {
          benefits.push({
            id: `card-${idx}`,
            type: 'card',
            title: benefit.cardName || benefit.card || '제휴 카드',
            description: benefit.benefit || `${rate}% 즉시 할인 (최대 3만)`,
            amount: cardAmount,
            icon: 'card',
          });
        }
      });
    }
    
    // 3. 기프트카드 혜택
    if (product.giftCardDiscount) {
      const giftRate = (product.giftCardDiscount as { rate?: number })?.rate || 0;
      const giftAmount = giftRate > 0 ? Math.round(finalPrice * (giftRate / 100)) : 0;
      
      if (giftAmount > 0) {
        benefits.push({
          id: 'giftcard',
          type: 'giftcard',
          title: '기프트카드 할인',
          description: (product.giftCardDiscount as { description?: string })?.description || `${giftRate}% 할인`,
          amount: giftAmount,
          icon: 'gift',
        });
      }
    }
    
    // 금액 기준 내림차순 정렬
    return benefits.sort((a, b) => b.amount - a.amount);
  }, [product, topBenefits]);

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

  // Icon component selector
  const getIcon = (iconType: RankedBenefit['icon']): React.ReactElement => {
    switch (iconType) {
      case 'card': return <CreditCard size={18} />;
      case 'coins': return <Coins size={18} />;
      case 'gift': return <Gift size={18} />;
      default: return <CreditCard size={18} />;
    }
  };

  return (
    <div ref={contentRef} style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoWrapper}>
          <span style={styles.title}>PicSel 결제 추천</span>
        </div>
        <button style={styles.closeBtn} onClick={() => window.close()}>
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        
        {/* 1. Product Card - Compact */}
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
                  fontSize: '11px'
                }}>
                  Product
                </div>
              )}
            </div>
            <div style={styles.productInfo}>
              <div style={styles.productTitle}>{product.title || '상품명 없음'}</div>
              <div style={styles.priceRow}>
                <span style={styles.finalPrice}>₩{finalPrice.toLocaleString()}</span>
                {discountRate > 0 && (
                  <span style={styles.discountBadge}>-{discountRate}%</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Unified Benefit Ranking */}
        <div>
          <div style={styles.sectionHeader}>
            <span>결제 혜택 랭킹 TOP {rankedBenefits.length}</span>
          </div>
          
          <div style={styles.rankingList}>
            {rankedBenefits.length > 0 ? (
              rankedBenefits.map((benefit, index) => (
                <div 
                  key={benefit.id} 
                  style={index === 0 ? styles.rankItemBest : styles.rankItem}
                >
                  {/* Rank Badge */}
                  {index === 0 && (
                    <div style={styles.rankBadgeBest}>
                      <Award size={12} style={{ marginRight: '4px' }} />#1 BEST
                    </div>
                  )}
                  
                  {/* Content */}
                  <div style={styles.rankContent}>
                    <div style={styles.rankLeft}>
                      <div style={index === 0 ? styles.rankIconBest : styles.rankIcon}>
                        {getIcon(benefit.icon)}
                      </div>
                      <div>
                        <div style={index === 0 ? styles.rankTitleBest : styles.rankTitle}>
                          {benefit.title}
                        </div>
                        <div style={index === 0 ? styles.rankDescBest : styles.rankDesc}>
                          {benefit.description}
                        </div>
                      </div>
                    </div>
                    <div style={index === 0 ? styles.rankAmountBest : styles.rankAmount}>
                      ₩{benefit.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>
                혜택 정보를 불러오는 중...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <button 
          style={styles.ctaButton}
          onClick={() => window.close()}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AutoNotification;
