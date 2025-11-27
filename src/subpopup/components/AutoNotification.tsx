import React, { useRef } from 'react';
import { useProductData, useImageSlider, useWindowResize } from '../../shared/hooks';
import { autoNotificationStyles as styles } from '../../popup/styles/subpopup/autoNotificationStyles';

export const AutoNotification: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  
  // Load product data from Chrome storage
  const { product, topBenefits, imageSlides, loading } = useProductData();
  
  // Image slider functionality
  const { currentSlideIdx, handlePrevSlide, handleNextSlide } = useImageSlider(imageSlides.length);
  
  // Auto-resize window to fit content
  useWindowResize({
    enabled: !loading,
    contentRef,
  });

  if (loading) {
    return null;
  }

  if (!product) {
    return null;
  }

  const originalPrice = product.originalPrice || 0;
  const finalPrice = product.discountPrice || product.amount || 0;
  const discountRate = originalPrice > 0
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    : 0;

  const logoUrl = chrome.runtime.getURL('assets/icon/picsel-logo.png');
  const currentImage = imageSlides[currentSlideIdx];

  return (
    <div ref={contentRef} style={styles.wrapper}>
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
          <span style={styles.title}>PicSel</span>
        </div>
        <button style={styles.closeBtn} onClick={() => window.close()}>
          ✕
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.productCard}>
          {currentImage && (
            <div style={styles.imageCarousel}>
              <img
                src={currentImage}
                alt="Product image"
                style={styles.productImage}
                onError={(e) => {
                  console.error('[AutoNotification] Image failed:', currentImage);
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
                onLoad={() => {
                  console.log('[AutoNotification] Image loaded:', currentImage);
                }}
              />

              {imageSlides.length > 1 && (
                <>
                  <button
                    style={styles.carouselBtn}
                    onClick={handlePrevSlide}
                    aria-label="이전"
                  >
                    ‹
                  </button>
                  <button
                    style={{ ...styles.carouselBtn, right: '8px' }}
                    onClick={handleNextSlide}
                    aria-label="다음"
                  >
                    ›
                  </button>

                  <div style={styles.indicators}>
                    {imageSlides.map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          ...styles.indicator,
                          opacity: idx === currentSlideIdx ? 1 : 0.4,
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div style={styles.infoWrapper}>
            <h3 style={styles.title3}>{product.title}</h3>

            <div style={styles.priceGroup}>
              {originalPrice > 0 && originalPrice !== finalPrice ? (
                <>
                  <span style={styles.originalPrice}>
                    ₩{originalPrice.toLocaleString()}
                  </span>
                  {discountRate > 0 && (
                    <span style={styles.discountTag}>-{discountRate}%</span>
                  )}
                </>
              ) : null}
              <div style={styles.finalPrice}>
                ₩{finalPrice.toLocaleString()}
              </div>
            </div>

            {product.shippingInfo && (
              <span style={styles.shippingInfo}>
                📦 {product.shippingInfo}
              </span>
            )}
          </div>
        </div>

        {topBenefits.length > 0 && (
          <div style={styles.benefitsSection}>
            <h4 style={styles.sectionTitle}>
              💳 카드혜택 TOP{topBenefits.length}
            </h4>
            {topBenefits.map((benefit, idx) => (
              <div key={idx} style={styles.benefitCard}>
                <div style={styles.benefitInfo}>
                  <span style={styles.cardName}>{benefit.cardName}</span>
                  {benefit.benefit && (
                    <span style={styles.benefitText}>{benefit.benefit}</span>
                  )}
                </div>
                {benefit.rate && (
                  <span style={styles.rateTag}>{benefit.rate}%</span>
                )}
              </div>
            ))}
          </div>
        )}

        {(product.giftCardDiscount || product.cashback) && (
          <div style={styles.extraSection}>
            {product.giftCardDiscount && (
              <div style={styles.extraItem}>
                🎁 {product.giftCardDiscount.description}
              </div>
            )}
            {product.cashback && (
              <div style={styles.extraItem}>
                💰 {product.cashback.description}
              </div>
            )}
          </div>
        )}

        {product.variants && product.variants.length > 0 && (
          <div style={styles.variantsSection}>
            <h4 style={styles.sectionTitle}>📦 다른 구성</h4>
            <div style={styles.variantsScroll}>
              {product.variants.map((variant: { name: string; price?: number; discount?: string }, idx: number) => (
                <div key={idx} style={styles.variantCard}>
                  <span style={styles.variantName}>{variant.name}</span>
                  <span style={styles.variantPrice}>
                    ₩{variant.price?.toLocaleString()}
                  </span>
                  {variant.discount && (
                    <span style={styles.variantDiscount}>{variant.discount}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default AutoNotification;
