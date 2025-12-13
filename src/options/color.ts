/**
 * Options Page - Color Constants
 * 색상 상수 중앙 관리
 */

export const COLORS = {
  // Selected state (dark)
  selected: {
    background: '#1a1a1a',
    iconBackground: '#2d2d2d',
    text: '#ffffff',
    subText: '#d1d5db',
    icon: '#ffffff',
  },

  // Unselected state (light)
  unselected: {
    background: '#ffffff',
    backgroundHover: '#f9fafb',
    border: '#e5e7eb',
    borderHover: '#d1d5db',
    iconBackground: '#f3f4f6',
    text: '#1f2937',
    subText: '#6b7280',
    icon: '#6b7280',
  },

  // Toggle switch
  toggle: {
    backgroundOn: '#1a1a1a',
    backgroundOff: '#e5e7eb',
    thumb: '#ffffff',
    focusOutline: '#1a1a1a',
  },

  // Reset button
  reset: {
    background: '#ffffff',
    backgroundHover: '#fef2f2',
    text: '#dc2626',
    border: '#dc2626',
  },

  // Auto section
  auto: {
    background: '#ffffff',
    border: '#e5e7eb',
    iconBackground: '#f3f4f6',
    icon: '#6b7280',
  },
} as const;

export type OptionsColors = typeof COLORS;
