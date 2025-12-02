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
    brand: '#5a6169',
    brandLight: '#6b7178',
    brandDark: '#4a5058',
    
    background: '#1f2937',
    backgroundSecondary: '#111827',
    cardBg: '#374151',
    cardBgAlt: '#4b5563',
    buttonDark: '#5a6169',
    buttonLight: '#4b5563',
    buttonHover: '#6366f1',
    
    successBg: '#065f46',
    primaryBg: '#1e3a8a',
    accentBg: '#78350f',
    
    border: '#374151',
    borderLight: '#4b5563',
    successBorder: '#059669',
    primaryBorder: '#1d4ed8',
    
    textPrimary: '#f3f4f6',
    textSecondary: '#d1d5db',
    textTertiary: '#9ca3af',
    textOnDark: '#ffffff',
    labelColor: '#e5e7eb',
    
    primary: '#818cf8',
    success: '#34d399',
    accent: '#fcd34d',
    error: '#ef4444',
    info: '#60a5fa',
    warning: '#fcd34d',
    
    hover: '#374151',
    active: '#4b5563',
  },
};

type Theme = keyof typeof Colors;
type ColorScheme = (typeof Colors)[Theme];

export const getColors = (theme: Theme = 'light'): ColorScheme => Colors[theme];

export default Colors.light;
