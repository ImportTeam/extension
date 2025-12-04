import React from 'react';
import { idleViewStyles as styles } from '../../../popup/styles/popup/idleViewStyles';

export const IdleView: React.FC = () => (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.label} className="idle-label">
          <span>이번달</span>
        </div>
        <div style={styles.amount}>
          ₩12,000
        </div>
        <p style={styles.text}>
          절약했어요
        </p>
      </div>
    </div>
  );

