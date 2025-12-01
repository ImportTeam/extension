export const autoNotificationStyles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb', // Gray-50 for softer background
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#1f2937', // Gray-800
    overflow: 'hidden',
  } as React.CSSProperties,

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    backgroundColor: '#393E44', // Brand color
    color: '#ffffff',
    flexShrink: 0,
  } as React.CSSProperties,

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as React.CSSProperties,

  logo: {
    width: '18px',
    height: '18px',
    objectFit: 'contain',
  } as React.CSSProperties,

  title: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
  } as React.CSSProperties,

  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
  } as React.CSSProperties,

  content: {
    flex: 1,
    overflowY: 'auto', // Enable vertical scroll if needed
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  } as React.CSSProperties,

  // Common Card Style
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  } as React.CSSProperties,

  // Hero Product Section - 3:7 ratio
  productSection: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '12px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  } as React.CSSProperties,

  imageWrapper: {
    flex: '0 0 30%', // 3:7 ratio - image takes 30%
    aspectRatio: '1',
    maxWidth: '90px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
  } as React.CSSProperties,

  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } as React.CSSProperties,

  productInfo: {
    flex: '0 0 70%', // 3:7 ratio - info takes 70%
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0, // Allow text truncation
  } as React.CSSProperties,

  productTitle: {
    fontSize: '13px',
    fontWeight: '600',
    lineHeight: '1.4',
    color: '#111827',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
  } as React.CSSProperties,

  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
    marginTop: '4px',
    flexWrap: 'wrap',
  } as React.CSSProperties,

  finalPrice: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#111827',
  } as React.CSSProperties,

  originalPrice: {
    fontSize: '12px',
    color: '#9ca3af',
    textDecoration: 'line-through',
  } as React.CSSProperties,

  discountBadge: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#dc2626', // Red for discount
    backgroundColor: '#fef2f2',
    padding: '2px 5px',
    borderRadius: '4px',
  } as React.CSSProperties,

  shippingText: {
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '2px',
  } as React.CSSProperties,

  // Section Headers
  sectionHeader: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#374151',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  } as React.CSSProperties,

  // Card Benefits Section
  benefitsSection: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '12px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  } as React.CSSProperties,

  benefitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,

  benefitItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '8px 10px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  } as React.CSSProperties,

  benefitRank: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#ffffff',
    backgroundColor: '#393E44',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  } as React.CSSProperties,

  benefitContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,

  benefitCardName: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#111827',
  } as React.CSSProperties,

  benefitDesc: {
    fontSize: '11px',
    color: '#6b7280',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  // Additional Benefits Section
  additionalBenefitsSection: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '12px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  } as React.CSSProperties,

  additionalBenefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px',
    backgroundColor: '#fef3c7', // Amber-100 for highlight
    borderRadius: '8px',
    marginTop: '6px',
  } as React.CSSProperties,

  additionalBenefitIcon: {
    fontSize: '16px',
    flexShrink: 0,
  } as React.CSSProperties,

  additionalBenefitText: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#92400e', // Amber-700
  } as React.CSSProperties,

  // Variants Section (horizontal scroll)
  variantsSection: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '12px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  } as React.CSSProperties,

  variantsScrollContainer: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '4px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#d1d5db transparent',
  } as React.CSSProperties,

  variantItem: {
    flexShrink: 0,
    padding: '10px 12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '100px',
    textAlign: 'center',
  } as React.CSSProperties,

  variantItemSelected: {
    flexShrink: 0,
    padding: '10px 12px',
    backgroundColor: '#393E44',
    borderRadius: '8px',
    border: '1px solid #393E44',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '100px',
    textAlign: 'center',
  } as React.CSSProperties,

  variantLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  variantLabelSelected: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  variantPrice: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#111827',
  } as React.CSSProperties,

  variantPriceSelected: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#ffffff',
  } as React.CSSProperties,

  // Empty state
  emptyState: {
    padding: '16px',
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '13px',
  } as React.CSSProperties,
};
