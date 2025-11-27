import React, { useRef } from 'react';
import { useProductData, useWindowResize } from '../../shared/hooks';
import { autoNotificationStyles as styles } from '../../popup/styles/subpopup/autoNotificationStyles';
import { Gift } from 'lucide-react';

export const AutoNotification: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  
  // Load product data from Chrome storage
  const { product, loading } = useProductData();
  
  // Auto-resize window to fit content
  useWindowResize({
    enabled: !loading,
    contentRef,
  });

  if (loading || !product) {
    return null;
  }

  const originalPrice = product.originalPrice || 0;
  const finalPrice = product.discountPrice || product.amount || 0;
  const discountRate = originalPrice > 0
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    : 0;

  const logoUrl = chrome.runtime.getURL('assets/icon/picsel-logo.png');

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
          <span style={styles.title}>PicSel 혜택 정보</span>
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
              {product.imageUrl && (
                <img src={product.imageUrl} alt="Product" style={styles.productImage} />
              )}
            </div>
            <div style={styles.productInfo}>
              <div style={styles.productTitle}>{product.title}</div>
              <div style={styles.priceRow}>
                <span style={styles.finalPrice}>₩{finalPrice.toLocaleString()}</span>
                {originalPrice > 0 && (
                  <span style={styles.originalPrice}>₩{originalPrice.toLocaleString()}</span>
                )}
              </div>
              <div style={styles.priceRow}>
                {discountRate > 0 && (
                  <span style={styles.discountBadge}>-{discountRate}%</span>
                )}
                <span style={styles.shippingText}>배송: 무료배송</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Card Benefits */}
        <div>
          <div style={styles.sectionHeader}>카드 혜택 TOP</div>
          <div style={styles.benefitCard}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={styles.benefitTitle}>제휴 카드</div>
              <div style={styles.benefitDesc}>최대 5% 즉시할인 (와우전용)</div>
            </div>
          </div>
        </div>

        {/* 3. Additional Benefits (Coupang Cash) */}
        <div>
          <div style={styles.sectionHeader}>추가 혜택</div>
          <div style={styles.extraBenefitCard}>
            <div style={styles.iconCircle}>
              <Gift size={18} />
            </div>
            <span style={styles.extraBenefitText}>쿠팡캐시 27,960 원 적립</span>
          </div>
        </div>

        {/* 4. Other Options */}
        <div>
          <div style={styles.sectionHeader}>다른 구성</div>
          <div style={styles.optionsList}>
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
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <button 
          style={styles.ctaButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4338ca')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
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
