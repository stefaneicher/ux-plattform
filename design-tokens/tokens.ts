/**
 * CSS Insurance Design Tokens - TypeScript Definitions
 * Generated from tokens.json
 * Version: 1.0.0
 */

export interface DesignTokens {
  color: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  elevation: ElevationTokens;
  motion: MotionTokens;
  zIndex: ZIndexTokens;
  breakpoints: BreakpointTokens;
}

export interface ColorTokens {
  brand: {
    primary: ColorScale;
    secondary: ColorScale;
  };
  semantic: {
    success: { 50: string; 500: string; 700: string };
    warning: { 50: string; 500: string; 700: string };
    error: { 50: string; 500: string; 700: string };
    info: { 50: string; 500: string; 700: string };
  };
  neutral: NeutralColorScale;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    onPrimary: string;
    onDark: string;
    link: string;
  };
  surface: {
    primary: string;
    secondary: string;
    tertiary: string;
    overlay: string;
  };
  border: {
    default: string;
    strong: string;
    subtle: string;
  };
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface NeutralColorScale extends ColorScale {
  0: string;
  1000: string;
}

export interface TypographyTokens {
  fontFamily: {
    base: string;
    heading: string;
    monospace: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ElevationTokens {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface MotionTokens {
  duration: {
    instant: string;
    fast: string;
    normal: string;
    slow: string;
    slower: string;
  };
  easing: {
    standard: string;
    enter: string;
    exit: string;
    linear: string;
  };
}

export interface ZIndexTokens {
  dropdown: number;
  sticky: number;
  fixed: number;
  modalBackdrop: number;
  modal: number;
  popover: number;
  tooltip: number;
}

export interface BreakpointTokens {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
  ultra: string;
}

// Actual token values
export const tokens: DesignTokens = {
  color: {
    brand: {
      primary: {
        50: '#e8f2ff',
        100: '#c5e0ff',
        200: '#9eccff',
        300: '#77b8ff',
        400: '#50a4ff',
        500: '#2990ff',
        600: '#0070f0',
        700: '#0056d6',
        800: '#0042bd',
        900: '#002a95',
      },
      secondary: {
        50: '#f0f9ff',
        100: '#d9f0ff',
        200: '#b3e0ff',
        300: '#80cbff',
        400: '#4db3ff',
        500: '#1a9aff',
        600: '#0080ff',
        700: '#0066cc',
        800: '#004d99',
        900: '#003366',
      },
    },
    semantic: {
      success: {
        50: '#e8f8f2',
        500: '#10b981',
        700: '#047857',
      },
      warning: {
        50: '#fff8e1',
        500: '#f59e0b',
        700: '#c77700',
      },
      error: {
        50: '#fef2f2',
        500: '#ef4444',
        700: '#b91c1c',
      },
      info: {
        50: '#eff6ff',
        500: '#3b82f6',
        700: '#1d4ed8',
      },
    },
    neutral: {
      0: '#ffffff',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      1000: '#000000',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      tertiary: '#6b7280',
      disabled: '#9ca3af',
      onPrimary: '#ffffff',
      onDark: '#ffffff',
      link: '#0070f0',
    },
    surface: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    border: {
      default: '#e5e7eb',
      strong: '#d1d5db',
      subtle: '#f3f4f6',
    },
  },
  typography: {
    fontFamily: {
      base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monospace: "'Fira Code', 'Courier New', monospace",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  elevation: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  motion: {
    duration: {
      instant: '50ms',
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms',
    },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enter: 'cubic-bezier(0, 0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
      linear: 'linear',
    },
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
    ultra: '1920px',
  },
};

export default tokens;
