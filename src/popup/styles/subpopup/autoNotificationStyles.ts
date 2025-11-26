import colors from '../colors';

export const autoNotificationStyles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.background,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: colors.textPrimary,
    overflow: 'hidden',
  } as React.CSSProperties,

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: colors.backgroundSecondary,
    flexShrink: 0,
  } as React.CSSProperties,

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as React.CSSProperties,

  logo: {
    width: '28px',
    height: '28px',
    objectFit: 'contain',
  } as React.CSSProperties,

  title: {
    fontSize: '16px',
    fontWeight: '700',
    color: colors.textPrimary,
  } as React.CSSProperties,

  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    fontSize: '18px',
    color: colors.textSecondary,
    borderRadius: '4px',
    transition: 'all 0.2s',
  } as React.CSSProperties,

  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  } as React.CSSProperties,

  productCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '12px',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: '8px',
    borderLeft: `3px solid ${colors.textSecondary}`,
  } as React.CSSProperties,

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
  } as React.CSSProperties,

  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block',
  } as React.CSSProperties,

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
  } as React.CSSProperties,

  indicators: {
    position: 'absolute',
    bottom: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '6px',
    zIndex: 10,
  } as React.CSSProperties,

  indicator: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'white',
    transition: 'opacity 0.3s',
  } as React.CSSProperties,

  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,

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
  } as React.CSSProperties,

  priceGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'wrap',
  } as React.CSSProperties,

  originalPrice: {
    fontSize: '11px',
    color: colors.textSecondary,
    textDecoration: 'line-through',
  } as React.CSSProperties,

  discountTag: {
    fontSize: '11px',
    fontWeight: '700',
    backgroundColor: colors.accent,
    color: colors.textPrimary,
    padding: '2px 6px',
    borderRadius: '3px',
  } as React.CSSProperties,

  finalPrice: {
    fontSize: '15px',
    fontWeight: '800',
    color: colors.textPrimary,
    width: '100%',
  } as React.CSSProperties,

  shippingInfo: {
    fontSize: '10px',
    color: colors.textSecondary,
    fontWeight: '600',
  } as React.CSSProperties,

  benefitsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  } as React.CSSProperties,

  sectionTitle: {
    margin: '0',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: colors.textSecondary,
    opacity: 0.7,
  } as React.CSSProperties,

  benefitCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 10px',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: '6px',
    fontSize: '11px',
  } as React.CSSProperties,

  benefitInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  } as React.CSSProperties,

  cardName: {
    fontWeight: '600',
    color: colors.textPrimary,
  } as React.CSSProperties,

  benefitText: {
    fontSize: '10px',
    color: colors.textSecondary,
  } as React.CSSProperties,

  rateTag: {
    fontSize: '11px',
    fontWeight: '700',
    backgroundColor: colors.accent,
    color: colors.textPrimary,
    padding: '2px 8px',
    borderRadius: '4px',
    marginLeft: '8px',
    flexShrink: 0,
  } as React.CSSProperties,

  extraSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    paddingTop: '6px',
    borderTop: `1px solid ${colors.border}`,
  } as React.CSSProperties,

  extraItem: {
    padding: '8px 10px',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: '6px',
    fontSize: '11px',
    color: colors.textPrimary,
    fontWeight: '500',
  } as React.CSSProperties,

  variantsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingTop: '6px',
    borderTop: `1px solid ${colors.border}`,
  } as React.CSSProperties,

  variantsScroll: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '4px',
    scrollBehavior: 'smooth',
  } as React.CSSProperties,

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
  } as React.CSSProperties,

  variantName: {
    fontSize: '10px',
    fontWeight: '600',
    color: colors.textSecondary,
  } as React.CSSProperties,

  variantPrice: {
    fontSize: '12px',
    fontWeight: '700',
    color: colors.textPrimary,
  } as React.CSSProperties,

  variantDiscount: {
    fontSize: '9px',
    fontWeight: '700',
    backgroundColor: colors.accent,
    color: colors.textPrimary,
    padding: '1px 4px',
    borderRadius: '2px',
    alignSelf: 'flex-start',
  } as React.CSSProperties,
};
