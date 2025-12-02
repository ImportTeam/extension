import { CSSProperties } from 'react';

export const autoNotificationStyles: Record<string, CSSProperties> = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f3f4f6', // Gray-100
    color: '#1f2937', // Gray-800
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: '#374151', // Dark Gray
    color: '#ffffff',
    flexShrink: 0,
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logo: {
    width: '24px',
    height: '24px',
    objectFit: 'contain',
  },
  title: {
    fontSize: '16px',
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#9ca3af',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
  },
  content: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  // 1. Product Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    padding: '20px',
  },
  productSection: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  imageWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  productInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minWidth: 0,
  },
  productTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111827',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    flexWrap: 'wrap',
  },
  finalPrice: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#111827',
  },
  originalPrice: {
    fontSize: '13px',
    color: '#9ca3af',
    textDecoration: 'line-through',
  },
  discountBadge: {
    padding: '2px 8px',
    borderRadius: '6px',
    backgroundColor: '#eef2ff',
    color: '#6366f1', // Indigo-500
    fontSize: '12px',
    fontWeight: 700,
  },
  shippingText: {
    fontSize: '12px',
    color: '#6b7280',
  },

  // 2. Benefit Section (High Visibility)
  sectionHeader: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  benefitCard: {
    backgroundColor: '#fffbeb', // Amber-50
    border: '1px solid #fcd34d', // Amber-300
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'relative',
    overflow: 'hidden',
  },
  bestBadge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#fbbf24', // Amber-400
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: 700,
    padding: '4px 12px',
    borderBottomLeftRadius: '12px',
  },
  benefitRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
  },
  benefitTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#92400e', // Amber-800
    marginBottom: '4px',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.4',
  },
  benefitDesc: {
    fontSize: '13px',
    color: '#b45309', // Amber-700
    fontWeight: 500,
  },
  benefitAmount: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#b91c1c', // Red-700
    textAlign: 'right',
  },
  benefitTotal: {
    fontSize: '12px',
    color: '#92400e',
    textAlign: 'right',
    marginTop: '2px',
  },

  // Nested Additional Benefits
  nestedBenefitDivider: {
    height: '1px',
    backgroundColor: 'rgba(251, 191, 36, 0.4)', // Amber-400 with opacity
    margin: '4px 0',
  },
  nestedBenefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #fcd34d', // Amber-300
  },
  nestedIconCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#fff7ed', // Orange-50
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ea580c', // Orange-600
    flexShrink: 0,
  },
  nestedBenefitText: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#6366f1', // Indigo-500
  },

  // 3. Options Section
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  optionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  optionLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
  },
  optionPrice: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#111827',
  },

  // Footer
  footer: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    marginTop: 'auto',
  },
  ctaButton: {
    width: '100%',
    height: '52px',
    backgroundColor: '#6366f1', // Indigo-500
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 700,
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
};
