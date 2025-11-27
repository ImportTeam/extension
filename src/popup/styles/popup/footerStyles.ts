import colors from '../colors';

export const footerStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    padding: '16px 20px 20px 20px',
    backgroundColor: colors.background,
    borderTop: 'none', // Removed border for cleaner look
    flexShrink: 0,
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '48px',
    border: 'none',
    borderRadius: '14px',
    backgroundColor: colors.buttonDark,
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2), 0 2px 4px -1px rgba(79, 70, 229, 0.1)',
  },
  primaryButtonHover: {
    backgroundColor: colors.buttonHover,
    transform: 'translateY(-1px)',
    boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3), 0 4px 6px -2px rgba(79, 70, 229, 0.15)',
  },
  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '44px',
    border: '1px solid transparent', // Transparent border to maintain size
    borderRadius: '14px',
    backgroundColor: 'transparent',
    color: colors.textSecondary,
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  secondaryButtonHover: {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
  },
};
