import colors from '../colors';

/**
 * IdleView Styles
 * Uses colors from colors.ts (synced with CSS variables in variables.css)
 */
export const idleViewStyles = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    width: '100%',
    height: '100%',
    padding: '16px 0',
  },
  card: {
    padding: '24px 20px',
    background: colors.cardBg,
    borderRadius: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    textAlign: 'center' as const,
    maxWidth: '260px',
    width: '100%',
  },
  label: {
    fontSize: '14px',
    color: colors.textPrimary,
    marginBottom: '8px',
    fontWeight: '700',
    letterSpacing: '0.3px',
  },
  amount: {
    fontSize: '36px',
    fontWeight: '900',
    color: colors.textPrimary,
    margin: '0 0 6px 0',
    lineHeight: '1.1',
    letterSpacing: '-1.5px',
  },
  text: {
    fontSize: '13px',
    color: colors.textSecondary,
    margin: '0',
    fontWeight: '500',
  },
};
