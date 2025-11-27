

export const idleViewStyles = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    width: '100%',
    height: '100%',
    padding: '20px 0',
  },
  card: {
    padding: '24px 20px',
    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)', // Indigo Gradient
    borderRadius: '20px',
    boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4), 0 8px 10px -6px rgba(79, 70, 229, 0.2)', // Colored shadow
    textAlign: 'center' as const,
    maxWidth: '280px',
    width: '100%',
    color: '#ffffff',
    transition: 'transform 0.2s ease',
  },
  label: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '8px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
  },
  amount: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0 0 8px 0',
    lineHeight: '1.1',
    letterSpacing: '-1px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  text: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    fontWeight: '500',
  },
};
