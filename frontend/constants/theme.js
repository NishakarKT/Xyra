// Dark mode colors based on #041F30 as the darkest shade
export const COLORS = {
  // Primary brand colors
  primary: '#2BA9D1',      // Bright accent for dark mode
  secondary: '#1A7A9B',    // Medium shade
  accent: '#0A4A6B',       // Lighter shade of #041F30
  
  // Background colors (dark mode)
  background: '#041F30',   // Darkest shade as main background
  surface: '#0A2F45',      // Slightly lighter surface
  card: '#0F3A52',         // Card background
  
  // Text colors (dark mode)
  text: {
    primary: '#FFFFFF',     // White for primary text
    secondary: '#E2E8F0',  // Light gray for secondary text
    tertiary: '#CBD5E1',   // Lighter gray for tertiary text
    light: '#FFFFFF',
    muted: '#94A3B8',      // Muted text
  },
  
  // Status colors
  error: '#F87171',
  success: '#34D399',
  warning: '#FBBF24',
  info: '#60A5FA',
  
  // Border and divider colors (dark mode)
  border: '#1E3A5F',       // Darker borders
  divider: '#0F3A52',      // Darker dividers
  
  // Overlay colors
  overlay: 'rgba(4, 31, 48, 0.8)',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography
export const FONTS = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Border Radius
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Shadows
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Animation
export const ANIMATION = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
  },
};

// Layout
export const LAYOUT = {
  screenPadding: SPACING.md,
  tabBarHeight: 56,
  headerHeight: 56,
  fabSize: 56,
  avatarSize: {
    small: 32,
    medium: 50,
    large: 64,
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  auth: {
    token: '@auth_token',
    user: '@auth_user',
  },
  settings: {
    theme: '@settings_theme',
    language: '@settings_language',
  },
};

// Validation
export const VALIDATION = {
  email: {
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Please enter a valid email address',
  },
  phone: {
    pattern: /^\+?[1-9]\d{1,14}$/,
    message: 'Please enter a valid phone number',
  },
  otp: {
    length: 6,
    message: 'Please enter a valid 6-digit OTP',
  },
};
