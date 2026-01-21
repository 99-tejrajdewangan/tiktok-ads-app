// Application constants
export const APP_CONFIG = {
  APP_NAME: 'TikTok Ads Creative Flow',
  VERSION: '1.0.0',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORT_EMAIL: 'support@tiktok-ads-demo.com',
  API_TIMEOUT: 30000, // 30 seconds
};

// OAuth Constants
export const OAUTH_CONSTANTS = {
  SCOPES: {
    BASIC: 'ads.management',
    MUSIC: 'ads.music.basic',
    ANALYTICS: 'ads.analytics.basic',
    ALL: 'ads.management,ads.music.basic,ads.analytics.basic'
  },
  
  RESPONSE_TYPES: {
    CODE: 'code',
    TOKEN: 'token'
  },
  
  GRANT_TYPES: {
    AUTHORIZATION_CODE: 'authorization_code',
    REFRESH_TOKEN: 'refresh_token'
  },
  
  ERROR_CODES: {
    INVALID_REQUEST: 'invalid_request',
    UNAUTHORIZED_CLIENT: 'unauthorized_client',
    ACCESS_DENIED: 'access_denied',
    UNSUPPORTED_RESPONSE_TYPE: 'unsupported_response_type',
    INVALID_SCOPE: 'invalid_scope',
    SERVER_ERROR: 'server_error',
    TEMPORARILY_UNAVAILABLE: 'temporarily_unavailable'
  }
};

// Campaign Constants
export const CAMPAIGN_CONSTANTS = {
  OBJECTIVES: {
    TRAFFIC: {
      value: 'traffic',
      label: 'Traffic',
      description: 'Drive users to your website',
      icon: 'Users',
      requiresMusic: false
    },
    CONVERSIONS: {
      value: 'conversions',
      label: 'Conversions',
      description: 'Get users to take action',
      icon: 'TrendingUp',
      requiresMusic: true
    }
  },
  
  CTA_OPTIONS: [
    { value: 'shop_now', label: 'Shop Now', icon: 'ShoppingBag' },
    { value: 'download', label: 'Download', icon: 'Download' },
    { value: 'learn_more', label: 'Learn More', icon: 'ExternalLink' },
    { value: 'contact_us', label: 'Contact Us', icon: 'Phone' },
    { value: 'sign_up', label: 'Sign Up', icon: 'UserPlus' },
    { value: 'watch_more', label: 'Watch More', icon: 'PlayCircle' }
  ],
  
  MUSIC_OPTIONS: {
    EXISTING: {
      value: 'existing',
      label: 'Use Existing Music ID',
      description: 'Enter a TikTok Music ID'
    },
    CUSTOM: {
      value: 'custom',
      label: 'Upload Custom Music',
      description: 'Upload your own audio file'
    },
    NONE: {
      value: 'none',
      label: 'No Music',
      description: 'Create ad without background music'
    }
  },
  
  VALIDATION_LIMITS: {
    CAMPAIGN_NAME_MIN: 3,
    CAMPAIGN_NAME_MAX: 100,
    AD_TEXT_MIN: 10,
    AD_TEXT_MAX: 100,
    MUSIC_ID_MIN: 5,
    MUSIC_ID_MAX: 50
  }
};

// API Constants
export const API_CONSTANTS = {
  BASE_URL: 'https://open-api.tiktok.com',
  ENDPOINTS: {
    OAUTH: '/oauth/authorize',
    TOKEN: '/oauth/access_token',
    REFRESH: '/oauth/refresh_token',
    AD_CREATE: '/ad/create',
    AD_UPDATE: '/ad/update',
    AD_GET: '/ad/get',
    MUSIC_VALIDATE: '/music/validate',
    MUSIC_SEARCH: '/music/search',
    ADVERTISER_INFO: '/advertiser/info'
  },
  
  STATUS_CODES: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    RATE_LIMIT: 429,
    SERVER_ERROR: 500,
    GEO_RESTRICTED: 451
  },
  
  ERROR_CODES: {
    INVALID_TOKEN: 'INVALID_TOKEN',
    EXPIRED_TOKEN: 'EXPIRED_TOKEN',
    INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
    GEO_RESTRICTED: 'GEO_RESTRICTED',
    RATE_LIMITED: 'RATE_LIMITED',
    INVALID_MUSIC_ID: 'INVALID_MUSIC_ID',
    MUSIC_NOT_AVAILABLE: 'MUSIC_NOT_AVAILABLE',
    AD_CREATION_FAILED: 'AD_CREATION_FAILED'
  }
};

// UI Constants
export const UI_CONSTANTS = {
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536
  },
  
  COLORS: {
    PRIMARY: {
      DEFAULT: '#7C3AED',
      LIGHT: '#8B5CF6',
      DARK: '#6D28D9'
    },
    SECONDARY: {
      DEFAULT: '#EC4899',
      LIGHT: '#F472B6',
      DARK: '#DB2777'
    },
    STATUS: {
      SUCCESS: '#10B981',
      ERROR: '#EF4444',
      WARNING: '#F59E0B',
      INFO: '#3B82F6'
    }
  },
  
  ANIMATION: {
    DURATION: {
      FAST: '150ms',
      NORMAL: '300ms',
      SLOW: '500ms'
    },
    TIMING: {
      EASE: 'ease',
      EASE_IN: 'ease-in',
      EASE_OUT: 'ease-out',
      EASE_IN_OUT: 'ease-in-out'
    }
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'tiktok_access_token',
  REFRESH_TOKEN: 'tiktok_refresh_token',
  TOKEN_EXPIRY: 'tiktok_token_expiry',
  ADVERTISER_INFO: 'tiktok_advertiser_info',
  OAUTH_STATE: 'oauth_state',
  LAST_CAMPAIGN: 'last_campaign_data',
  USER_PREFERENCES: 'user_preferences'
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_MUSIC_VALIDATION: true,
  ENABLE_AD_PREVIEW: true,
  ENABLE_ERROR_RETRY: true,
  ENABLE_ANALYTICS: false,
  ENABLE_MULTI_LANGUAGE: false,
  ENABLE_THEME_SWITCHER: false
};

export default {
  APP_CONFIG,
  OAUTH_CONSTANTS,
  CAMPAIGN_CONSTANTS,
  API_CONSTANTS,
  UI_CONSTANTS,
  STORAGE_KEYS,
  FEATURE_FLAGS
};