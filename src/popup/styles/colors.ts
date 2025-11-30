/**
 * Color System - Light & Dark Mode
 * 
 * Used throughout PicSel popup UI
 * Supports both light and dark themes
 * 
 * Enhanced for better contrast and visibility
 */

export const Colors = {
  // Light Mode (Modern Fintech Theme)
  light: {
    // Brand
    brand: '#393E44',                // PicSel Brand Color (Dark Gray)
    brandLight: '#4a5058',           // Brand hover/lighter variant
    brandDark: '#2d3136',            // Brand active/darker variant
    
    // Backgrounds
    background: '#ffffff',           // Clean white
    backgroundSecondary: '#f9fafb',  // Very light gray (Gray-50)
    
    // Card & Button Backgrounds
    cardBg: '#ffffff',               // White cards with shadow
    cardBgAlt: '#f3f4f6',            // Light gray (Gray-100)
    buttonDark: '#393E44',           // PicSel Brand (Primary Button)
    buttonLight: '#ffffff',          // White secondary buttons
    
    // Semantic Backgrounds
    successBg: '#ecfdf5',            // Green-50
    primaryBg: '#eef2ff',            // Indigo-50
    accentBg: '#fffbeb',             // Amber-50
    
    // Borders
    border: '#e5e7eb',               // Gray-200
    borderLight: '#f3f4f6',          // Gray-100
    successBorder: '#10b981',        // Green-500
    primaryBorder: '#4f46e5',        // Indigo-600
    
    // Text
    textPrimary: '#111827',          // Gray-900 (Main text)
    textSecondary: '#4b5563',        // Gray-600 (Secondary text)
    textTertiary: '#9ca3af',         // Gray-400 (Tertiary text)
    textOnGray: '#ffffff',           // White text (on dark backgrounds)
    labelColor: '#111827',           // Gray-500
    
    // Semantic Colors
    primary: '#111827',              // Indigo-600
    success: '#059669',              // Green-600
    accent: '#d97706',               // Amber-600
    error: '#dc2626',                // Red-600
    
    // States
    hover: '#f3f4f6',                // Gray-100 hover
    active: '#e5e7eb',               // Gray-200 active
    buttonHover: '#3B82F6',          // Indigo-700 (Primary button hover)
  },
  
  // Dark Mode (Future - Placeholder for now)
  dark: {
    // Brand
    brand: '#5a6169',                // PicSel Brand Color (Lighter for dark mode)
    brandLight: '#6b7178',           // Brand hover/lighter variant
    brandDark: '#4a5058',            // Brand active/darker variant
    
    background: '#1f2937',
    backgroundSecondary: '#111827',
    cardBg: '#374151',
    cardBgAlt: '#4b5563',
    buttonDark: '#5a6169',           // PicSel Brand for dark mode
    buttonLight: '#4b5563',
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
    textOnGray: '#ffffff',
    labelColor: '#e5e7eb',
    primary: '#818cf8',
    success: '#34d399',
    accent: '#fcd34d',
    error: '#ef4444',
    hover: '#374151',
    active: '#4b5563',
    buttonHover: '#6366f1',
  },
};

/**
 * Get color based on theme
 * @param theme 'light' or 'dark'
 * @returns Color palette object
 */
export const getColors = (theme: 'light' | 'dark' = 'light'): typeof Colors.light => {
  return Colors[theme];
};

// Export default light mode colors for convenience
export default Colors.light;
