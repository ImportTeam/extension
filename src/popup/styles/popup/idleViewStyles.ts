
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
    background: '#ffffff',
    borderRadius: '20px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
    textAlign: 'center' as const,
    maxWidth: '260px',
    width: '100%',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  label: {
    fontSize: '12px',
    color: '#9ca3af',
    marginBottom: '6px',
    fontWeight: '500',
    letterSpacing: '0.3px',
  },
  amount: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#111827',
    margin: '0 0 6px 0',
    lineHeight: '1.1',
    letterSpacing: '-1.5px',
  },
  text: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0',
    fontWeight: '500',
  },
};
