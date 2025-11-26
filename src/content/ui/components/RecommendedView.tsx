import React from 'react';
import {
  useSelectedTab,
  useRecommendationActions,
} from '../../../shared/store/recommendationStore';
import { RecommendationCard } from './RecommendationCard';
import { SettingsPanel } from './SettingsPanel';

/**
 * RecommendedView - Full UI when recommendation exists
 *
 * Display:
 * - Tab navigation (추천 / 상세정보)
 * - RecommendationCard (Tab 1)
 * - SettingsPanel (Tab 2)
 * - Full layout (420px × auto)
 *
 * Purpose:
 * - Show comprehensive payment method information
 * - Allow detailed comparison
 * - Emphasize savings
 */
export const RecommendedView: React.FC = () => {
  const selectedTab = useSelectedTab();
  const { setSelectedTab } = useRecommendationActions();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setSelectedTab('recommendation')}
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: selectedTab === 'recommendation' ? '#4f46e5' : '#f3f4f6',
            color: selectedTab === 'recommendation' ? '#ffffff' : '#374151',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          추천
        </button>
        <button
          onClick={() => setSelectedTab('settings')}
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: selectedTab === 'settings' ? '#4f46e5' : '#f3f4f6',
            color: selectedTab === 'settings' ? '#ffffff' : '#374151',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          상세정보
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === 'recommendation' && <RecommendationCard />}
      {selectedTab === 'settings' && <SettingsPanel />}
    </div>
  );
};
