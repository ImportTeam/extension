import { CSSProperties } from 'react';

export const autoNotificationStyles: Record<string, CSSProperties> = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8fafc', // Slate-50
    color: '#1e293b', // Slate-800
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    flexShrink: 0,
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  title: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: '-0.3px',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
    borderRadius: '6px',
  },
  content: {
    flex: 1,
    padding: '16px 20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  // 1. Product Card - Compact
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    border: '1px solid #e2e8f0',
    padding: '16px',
  },
  productSection: {
    display: 'flex',
    gap: '14px',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
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
    fontSize: '14px',
    fontWeight: 600,
    color: '#1e293b',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  finalPrice: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#0f172a',
  },
  discountBadge: {
    padding: '2px 6px',
    borderRadius: '4px',
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    fontSize: '11px',
    fontWeight: 700,
  },

  // 2. Section Header
  sectionHeader: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#334155',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  // 3. Ranking List - 통합 혜택 랭킹
  rankingList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  // Best Item (1등)
  rankItemBest: {
    backgroundColor: '#4f46e5', // Indigo-600
    borderRadius: '16px',
    padding: '18px',
    position: 'relative',
    overflow: 'hidden',
  },
  rankBadgeBest: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: '999px',
    marginBottom: '12px',
  },
  rankContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
  },
  rankLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    minWidth: 0,
  },
  rankIconBest: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    flexShrink: 0,
  },
  rankTitleBest: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '2px',
  },
  rankDescBest: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 500,
  },
  rankAmountBest: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#ffffff',
    flexShrink: 0,
  },

  // Normal Items (2등 이하)
  rankItem: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    border: '1px solid #e2e8f0',
    padding: '16px',
  },
  rankBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    fontSize: '11px',
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: '999px',
    marginBottom: '10px',
  },
  rankIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
    flexShrink: 0,
  },
  rankTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '2px',
  },
  rankDesc: {
    fontSize: '12px',
    color: '#64748b',
  },
  rankAmount: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#dc2626',
    flexShrink: 0,
  },

  // Empty State
  emptyState: {
    padding: '32px',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '14px',
  },

  // Footer
  footer: {
    padding: '16px 20px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    marginTop: 'auto',
  },
  ctaButton: {
    width: '100%',
    height: '48px',
    backgroundColor: '#1e293b', // Slate-800
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 700,
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
