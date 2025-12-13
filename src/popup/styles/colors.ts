/**
 * Color System - TypeScript Reference
 * 
 * SINGLE SOURCE OF TRUTH: variables.css
 * This file mirrors CSS variables for TypeScript usage
 * 
 * When updating colors, update variables.css first,
 * then sync this file to match.
 */

export const Colors = {
  // Light Mode (matches :root in variables.css)
  light: {
    // Brand
    brand: '#393E44',
    brandLight: '#4a5058',
    brandDark: '#2d3136',
    
    // Backgrounds
    background: '#ffffff',
    backgroundSecondary: '#f9fafb',
    
    // Card & Button
    cardBg: '#ffffff',
    cardBgAlt: '#f3f4f6',
    buttonDark: '#393E44',
    buttonLight: '#ffffff',
    buttonHover: '#2d3136',
    
    // Semantic Backgrounds
    successBg: '#ecfdf5',
    primaryBg: '#eef2ff',
    accentBg: '#fffbeb',
    
    // Borders
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    successBorder: '#10b981',
    primaryBorder: '#4f46e5',
    
    // Text
    textPrimary: '#111827',
    textSecondary: '#4b5563',
    textTertiary: '#9ca3af',
    textOnDark: '#ffffff',
    labelColor: '#111827',
    
    // Semantic Colors
    primary: '#111827',
    success: '#059669',
    accent: '#d97706',
    error: '#dc2626',
    info: '#3b82f6',
    warning: '#d97706',
    
    // States
    hover: '#f3f4f6',
    active: '#e5e7eb',
  },
  
  // Dark Mode (matches @media (prefers-color-scheme: dark) in variables.css)
  dark: {
    brand: '#60a5fa',
    brandLight: '#93c5fd',
    brandDark: '#3b82f6',
    
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    cardBg: '#1e293b',
    cardBgAlt: '#334155',
    buttonDark: '#3b82f6',
    buttonLight: '#60a5fa',
    buttonHover: '#2563eb',
    
    successBg: '#d1fae5',
    primaryBg: '#dbeafe',
    accentBg: '#fef3c7',
    
    border: '#334155',
    borderLight: '#475569',
    successBorder: '#10b981',
    primaryBorder: '#3b82f6',
    
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    textOnDark: '#ffffff',
    labelColor: '#e2e8f0',
    
    primary: '#3b82f6',
    success: '#10b981',
    accent: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b',
    
    hover: '#334155',
    active: '#475569',
  },
};

type Theme = keyof typeof Colors;
type ColorScheme = (typeof Colors)[Theme];

export const getColors = (theme: Theme = 'light'): ColorScheme => Colors[theme];

export default Colors.light;
