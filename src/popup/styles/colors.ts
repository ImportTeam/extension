/**
 * Color System - Light & Dark Mode
 * 
 * Used throughout PicSel popup UI
 * Supports both light and dark themes
 * 
 * Enhanced for better contrast and visibility
 */

export const Colors = {
  // Light Mode (Default - Minimalist Gray Theme)
  light: {
    // Backgrounds
    background: '#ffffff',           // Main background (white)
    backgroundSecondary: '#f5f5f5',  // Section background (neutral light gray)
    
    // Card & Button Backgrounds
    cardBg: '#6b6b6b',               // Main card background (refined dark gray)
    cardBgAlt: '#8b8b8b',            // Alternative card background (medium gray - deprecated)
    buttonDark: '#222222',           // Primary button (dark/black)
    buttonLight: '#d0d0d0',          // Secondary button (light gray)
    
    // Semantic Backgrounds (Removed colored tints)
    successBg: '#8b8b8b',            // Repurposed for card
    primaryBg: '#f5f5f5',            // Repurposed for light backgrounds
    accentBg: '#e8e8e8',             // Repurposed for hover states
    
    // Borders
    border: '#c0c0c0',               // Gray borders
    borderLight: '#e0e0e0',          // Light gray borders
    successBorder: '#8b8b8b',        // Gray border (no color accent)
    primaryBorder: '#c0c0c0',        // Gray border
    
    // Text
    textPrimary: '#1a1a1a',          // Very dark gray/black (main text)
    textSecondary: '#555555',        // Medium gray (secondary text)
    textTertiary: '#888888',         // Medium-light gray (tertiary)
    textOnGray: '#ffffff',           // White text on gray cards
    labelColor: '#555555',           // Label text
    
    // Semantic Colors
    primary: '#222222',              // Dark button color
    success: '#8b8b8b',              // Gray (repurposed from green)
    accent: '#d0d0d0',               // Light gray (repurposed from amber)
    
    // States
    hover: '#e8e8e8',                // Light gray hover
    active: '#c0c0c0',               // Gray active state
  },
  
  // Dark Mode (Future)
  dark: {
    // Backgrounds
    background: '#1f2937',
    backgroundSecondary: '#111827',
    
    // Borders
    border: '#374151',
    borderLight: '#4b5563',
    
    // Text
    textPrimary: '#f3f4f6',
    textSecondary: '#d1d5db',
    textTertiary: '#9ca3af',
    labelColor: '#e5e7eb',
    
    // Semantic Colors
    primary: '#818cf8',
    success: '#34d399',
    accent: '#fcd34d',
    
    // States
    hover: '#374151',
    active: '#4b5563',
  },
};

/**
 * Get color based on theme
 * @param theme 'light' or 'dark'
 * @returns Color palette object
 */
export const getColors = (theme: 'light' | 'dark' = 'light') => {
  return Colors[theme];
};

// Export default light mode colors for convenience
export default Colors.light;
