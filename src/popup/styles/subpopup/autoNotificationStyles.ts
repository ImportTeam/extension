export const autoNotificationStyles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f3f4f6', // Gray-100 for background depth
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#1f2937', // Gray-800
    overflow: 'hidden',
  } as React.CSSProperties,

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: '#111827', // Gray-900 (Dark header)
    color: '#ffffff',
    flexShrink: 0,
  } as React.CSSProperties,

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as React.CSSProperties,

  logo: {
    width: '20px',
    height: '20px',
    objectFit: 'contain',
  } as React.CSSProperties,

  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
  } as React.CSSProperties,

  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    fontSize: '20px',
    color: '#9ca3af', // Gray-400
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
  } as React.CSSProperties,

  content: {
    flex: 1,
    overflowY: 'hidden', // Prevent scrolling on main container
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
  } as React.CSSProperties,

  // Common Card Style
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Shadow-sm
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } as React.CSSProperties,

  // Product Section
  productSection: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  } as React.CSSProperties,

  imageWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    flexShrink: 0,
    border: '1px solid #e5e7eb',
  } as React.CSSProperties,

  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } as React.CSSProperties,

  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  } as React.CSSProperties,

  productTitle: {
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '1.4',
    color: '#111827', // Gray-900
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
  } as React.CSSProperties,

  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginTop: '4px',
  } as React.CSSProperties,

  finalPrice: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#111827',
  } as React.CSSProperties,

  originalPrice: {
    fontSize: '13px',
    color: '#9ca3af', // Gray-400
    textDecoration: 'line-through',
  } as React.CSSProperties,

  discountBadge: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#4f46e5', // Indigo-600
    backgroundColor: '#eef2ff', // Indigo-50
    padding: '2px 6px',
    borderRadius: '4px',
  } as React.CSSProperties,

  shippingText: {
    fontSize: '12px',
    color: '#6b7280', // Gray-500
    marginTop: '2px',
  } as React.CSSProperties,

  // Section Headers
  sectionHeader: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
  } as React.CSSProperties,

  // Benefits Card
  benefitCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '16px',
  } as React.CSSProperties,

  benefitTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '4px',
  } as React.CSSProperties,

  benefitDesc: {
    fontSize: '13px',
    color: '#6b7280',
  } as React.CSSProperties,

  // Additional Benefit (Coupang Cash)
  extraBenefitCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '2px solid #818cf8', // Indigo-400 border
    padding: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.1)', // Indigo shadow
  } as React.CSSProperties,

  iconCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#eef2ff', // Indigo-50
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4f46e5',
    fontSize: '16px',
    flexShrink: 0,
  } as React.CSSProperties,

  extraBenefitText: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#4f46e5', // Indigo-600
  } as React.CSSProperties,

  // Options Section
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,

  optionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,

  optionLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  } as React.CSSProperties,

  optionPrice: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#111827',
  } as React.CSSProperties,

  // Footer CTA
  footer: {
    padding: '0 20px 20px 20px',
    marginTop: 'auto',
  } as React.CSSProperties,

  ctaButton: {
    width: '100%',
    height: '52px',
    backgroundColor: '#4f46e5', // Indigo-600
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
};
