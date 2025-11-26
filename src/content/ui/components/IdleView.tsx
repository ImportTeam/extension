import React from 'react';
import colors from '../../../popup/styles/colors';

const IDLE_STYLES = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    width: '100%',
    minHeight: 'auto',
    padding: '12px 0',
  },
  card: {
    padding: '20px 18px',
    backgroundColor: colors.cardBg,
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
    textAlign: 'center' as const,
    maxWidth: '260px',
    width: '100%',
  },
  label: {
    fontSize: '12px',
    color: colors.textOnGray,
    margin: '0 0 10px 0',
    opacity: 0.85,
    fontWeight: '600',
    letterSpacing: '0.3px',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: '6px',
  },
  amount: {
    fontSize: '32px',
    fontWeight: '900',
    color: colors.textOnGray,
    margin: '0 0 6px 0',
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
  },
  text: {
    fontSize: '12px',
    color: colors.textOnGray,
    margin: '0',
    opacity: 0.8,
    fontWeight: '400',
  },
};

export const IdleView: React.FC = () => {
  return (
    <div style={IDLE_STYLES.container}>
      <div style={IDLE_STYLES.card}>
        <div style={IDLE_STYLES.label}>
          <span>이번달</span>
        </div>
        <div style={IDLE_STYLES.amount}>
          ₩123,456
        </div>
        <p style={IDLE_STYLES.text}>
          절약했어요
        </p>
      </div>
    </div>
  );
};

