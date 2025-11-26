import React, { useEffect, useState, useRef } from 'react';
import colors from '../../popup/styles/colors';

import type { ParsedProductInfo } from '../../shared/types';

interface CardBenefit {
  cardName: string;
  rate?: number;
  benefit?: string;
}

export const AutoNotification: React.FC = () => {
  const [product, setProduct] = useState<ParsedProductInfo | null>(null);
  const [topBenefits, setTopBenefits] = useState<CardBenefit[]>([]);
  const [imageSlides, setImageSlides] = useState<string[]>([]);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadProductData();
  }, []);

  useEffect(() => {
    if (!loading && contentRef.current) {
      // 초기 높이 계산
      const calculateAndResizeWindow = () => {
        if (!contentRef.current) return;

        const contentHeight = contentRef.current.scrollHeight;
        console.log('[AutoNotification] Content scroll height:', contentHeight);

        // 헤더 높이 측정
        const headerEl = document.querySelector('[style*="flexShrink"]');
        const headerHeight = headerEl ? headerEl.clientHeight : 52;

        // 전체 필요 높이 = header + content + 여유공간
        const totalHeight = Math.min(headerHeight + contentHeight + 24, 900);

        console.log('[AutoNotification] Calculated total height:', {
          headerHeight,
          contentHeight,
          totalHeight,
        });

        try {
          window.resizeTo(420, totalHeight);
          console.log('[AutoNotification] Window resized to:', { width: 420, height: totalHeight });
        } catch (err) {
          console.warn('[AutoNotification] Cannot resize window:', err);
        }
      };

      // ResizeObserver 설정
      const resizeObserver = new ResizeObserver(() => {
        calculateAndResizeWindow();
      });

      // content 요소 관찰
      resizeObserver.observe(contentRef.current);

      // 초기 계산 (지연 없이)
      calculateAndResizeWindow();

      // 이미지 로드 후 재계산
      const images = contentRef.current.querySelectorAll('img');
      let loadedCount = 0;

      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          console.log('[AutoNotification] All images loaded, recalculating height');
          setTimeout(calculateAndResizeWindow, 100);
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener('load', onImageLoad);
          img.addEventListener('error', onImageLoad);
        }
      });

      if (loadedCount === images.length) {
        setTimeout(calculateAndResizeWindow, 100);
      }

      return () => {
        resizeObserver.disconnect();
        images.forEach((img) => {
          img.removeEventListener('load', onImageLoad);
          img.removeEventListener('error', onImageLoad);
        });
      };
    }
  }, [loading, product, topBenefits, imageSlides]);

  const loadProductData = async () => {
    try {
      const result = await chrome.storage.local.get(['currentProduct']);
      if (result.currentProduct) {
        const p = result.currentProduct;
        console.log('[AutoNotification] Loaded product:', {
          title: p.title?.substring(0, 50),
          imageUrl: p.imageUrl?.substring(0, 80) || 'none',
          imagesCount: p.images?.length || 0,
          variantsCount: p.variants?.length || 0,
          variants: p.variants,
        });
        setProduct(p);

        if (Array.isArray(p.cardBenefits)) {
          const sorted = [...p.cardBenefits]
            .sort((a: CardBenefit, b: CardBenefit) => (b.rate || 0) - (a.rate || 0))
            .slice(0, 3);
          setTopBenefits(sorted);
        }

        const slides: string[] = [];
        if (p.imageUrl) {
          slides.push(p.imageUrl);
        }
        if (Array.isArray(p.images) && p.images.length > 0) {
          slides.push(...p.images.filter((img: unknown) => typeof img === 'string'));
        }

        setImageSlides(slides);
        console.log('[AutoNotification] Images loaded:', slides.length);
      }
    } catch (err) {
      console.error('[AutoNotification] Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevSlide = () => {
    if (imageSlides.length > 1) {
      setCurrentSlideIdx((idx) => (idx - 1 + imageSlides.length) % imageSlides.length);
    }
  };

  const handleNextSlide = () => {
    if (imageSlides.length > 1) {
      setCurrentSlideIdx((idx) => (idx + 1) % imageSlides.length);
    }
  };

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

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.background,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: colors.textPrimary,
    overflow: 'hidden',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: colors.backgroundSecondary,
    flexShrink: 0,
  },

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  logo: {
    width: '28px',
    height: '28px',
    objectFit: 'contain',
  },

  title: {
    fontSize: '16px',
    fontWeight: '700',
    color: colors.textPrimary,
  },

  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    fontSize: '18px',
    color: colors.textSecondary,
    borderRadius: '4px',
    transition: 'all 0.2s',
  },

  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  },

  productCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '12px',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: '8px',
    borderLeft: `3px solid ${colors.textSecondary}`,
  },

  imageCarousel: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1.5',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block',
  },

  carouselBtn: {
    position: 'absolute',
    top: '50%',
    left: '8px',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
    zIndex: 10,
  },

  indicators: {
    position: 'absolute',
    bottom: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '6px',
    zIndex: 10,
  },

  indicator: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'white',
    transition: 'opacity 0.3s',
  },

  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  title3: {
    margin: '0',
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    color: colors.textPrimary,
  },

  priceGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'wrap',
  },

  originalPrice: {
    fontSize: '11px',
    color: colors.textSecondary,
    textDecoration: 'line-through',
  },

  discountTag: {
    fontSize: '11px',
    fontWeight: '700',
    backgroundColor: colors.accent,
    color: colors.textPrimary,
    padding: '2px 6px',
    borderRadius: '3px',
  },

  finalPrice: {
    fontSize: '15px',
    fontWeight: '800',
    color: colors.textPrimary,
    width: '100%',
  },

  shippingInfo: {
    fontSize: '10px',
    color: colors.textSecondary,
    fontWeight: '600',
  },

  benefitsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },

  sectionTitle: {
    margin: '0',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: colors.textSecondary,
    opacity: 0.7,
  },

  benefitCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 10px',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: '6px',
    fontSize: '11px',
  },

  benefitInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  },

  cardName: {
    fontWeight: '600',
    color: colors.textPrimary,
  },

  benefitText: {
    fontSize: '10px',
    color: colors.textSecondary,
  },

  rateTag: {
    fontSize: '11px',
    fontWeight: '700',
    backgroundColor: colors.accent,
    color: colors.textPrimary,
    padding: '2px 8px',
    borderRadius: '4px',
    marginLeft: '8px',
    flexShrink: 0,
  },

  extraSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    paddingTop: '6px',
    borderTop: `1px solid ${colors.border}`,
  },

  extraItem: {
    padding: '8px 10px',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: '6px',
    fontSize: '11px',
    color: colors.textPrimary,
    fontWeight: '500',
  },

  variantsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingTop: '6px',
    borderTop: `1px solid ${colors.border}`,
  },

  variantsScroll: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '4px',
    scrollBehavior: 'smooth',
  },

  variantCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '8px 12px',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: '6px',
    fontSize: '10px',
    whiteSpace: 'nowrap',
    minWidth: '100px',
    border: `1px solid ${colors.border}`,
    flex: '0 0 auto',
  },

  variantName: {
    fontSize: '10px',
    fontWeight: '600',
    color: colors.textSecondary,
  },

  variantPrice: {
    fontSize: '12px',
    fontWeight: '700',
    color: colors.textPrimary,
  },

  variantDiscount: {
    fontSize: '9px',
    fontWeight: '700',
    backgroundColor: colors.accent,
    color: colors.textPrimary,
    padding: '1px 4px',
    borderRadius: '2px',
    alignSelf: 'flex-start',
  },
};

export default AutoNotification;
