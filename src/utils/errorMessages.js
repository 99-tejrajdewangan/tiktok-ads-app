// Centralized error messages for the application
export const ERROR_MESSAGES = {
  // Authentication errors
  auth: {
    invalid_code: 'Invalid authorization code. Please try connecting again.',
    invalid_token: 'Your session has expired. Please reconnect your TikTok account.',
    expired_token: 'Your access token has expired. Please reconnect.',
    invalid_refresh_token: 'Unable to refresh session. Please reconnect.',
    geo_restricted: 'This feature is not available in your region.',
    rate_limited: 'Too many requests. Please try again in a few minutes.',
    insufficient_permissions: 'Your account lacks required permissions for this action.',
    connection_failed: 'Failed to connect to TikTok. Please check your internet connection.',
    oauth_failed: 'Failed to complete authorization. Please try again.',
    state_mismatch: 'Security verification failed. Please restart the connection process.'
  },
  
  // API errors
  api: {
    network_error: 'Network error. Please check your connection and try again.',
    timeout_error: 'Request timed out. Please try again.',
    server_error: 'TikTok servers are experiencing issues. Please try again later.',
    maintenance_error: 'TikTok API is under maintenance. Please try again later.',
    unknown_error: 'An unexpected error occurred. Please try again.'
  },
  
  // Validation errors
  validation: {
    campaign_name_required: 'Campaign name is required.',
    campaign_name_too_short: 'Campaign name must be at least 3 characters.',
    campaign_name_too_long: 'Campaign name cannot exceed 100 characters.',
    campaign_name_invalid_chars: 'Campaign name contains invalid characters.',
    
    ad_text_required: 'Ad text is required.',
    ad_text_too_short: 'Ad text should be at least 10 characters.',
    ad_text_too_long: 'Ad text cannot exceed 100 characters.',
    too_many_emojis: 'Too many emojis. Please use 5 or fewer.',
    
    objective_required: 'Please select a campaign objective.',
    cta_required: 'Please select a call-to-action.',
    
    music_id_required: 'Music ID is required for existing music.',
    music_id_too_short: 'Music ID must be at least 5 characters.',
    music_id_invalid_format: 'Music ID contains invalid characters.',
    
    file_required: 'Please select a file to upload.',
    file_too_large: 'File size must be less than 10MB.',
    file_invalid_type: 'Invalid file type. Please upload MP3, WAV, or AAC files.',
    
    form_incomplete: 'Please fill in all required fields.'
  },
  
  // Music specific errors
  music: {
    required_for_conversions: 'Music is required for Conversion campaigns.',
    invalid_id: 'The Music ID is invalid or not accessible.',
    not_found: 'Music not found. Please check the ID and try again.',
    not_available: 'This music is not available in your region.',
    validation_failed: 'Failed to validate music. Please try again.',
    upload_failed: 'Failed to upload music. Please try again.'
  },
  
  // Ad submission errors
  submission: {
    submission_failed: 'Failed to submit ad. Please try again.',
    invalid_music_selection: 'Invalid music selection for this campaign objective.',
    missing_required_fields: 'Please fill in all required fields.',
    rate_limited: 'You\'ve submitted too many ads. Please wait before trying again.',
    review_failed: 'Ad submission failed review. Please check your content.'
  },
  
  // User interface errors
  ui: {
    browser_not_supported: 'Your browser is not supported. Please use Chrome, Firefox, or Safari.',
    screen_too_small: 'Screen size too small. Please use a larger device.',
    component_error: 'Component failed to load. Please refresh the page.'
  },
  
  // General errors
  general: {
    something_went_wrong: 'Something went wrong. Please try again.',
    try_again: 'An error occurred. Please try again.',
    contact_support: 'Please contact support if the issue persists.',
    refresh_page: 'Please refresh the page and try again.'
  }
};

// Error code mappings for API responses
export const ERROR_CODE_MAPPINGS = {
  // TikTok API error codes
  '40001': ERROR_MESSAGES.auth.invalid_token,
  '40002': ERROR_MESSAGES.auth.expired_token,
  '40003': ERROR_MESSAGES.auth.insufficient_permissions,
  '40004': ERROR_MESSAGES.music.not_available,
  '40005': ERROR_MESSAGES.auth.geo_restricted,
  '40006': ERROR_MESSAGES.auth.rate_limited,
  
  // Custom error codes
  'VALIDATION_ERROR': ERROR_MESSAGES.validation.form_incomplete,
  'NETWORK_ERROR': ERROR_MESSAGES.api.network_error,
  'TIMEOUT_ERROR': ERROR_MESSAGES.api.timeout_error,
  'SERVER_ERROR': ERROR_MESSAGES.api.server_error
};

// Get user-friendly error message
export const getErrorMessage = (error, context = 'general') => {
  if (!error) return ERROR_MESSAGES.general.something_went_wrong;
  
  // If error has a user-friendly message, use it
  if (error.message && typeof error.message === 'string') {
    return error.message;
  }
  
  // If error has a code, map it
  if (error.code && ERROR_CODE_MAPPINGS[error.code]) {
    return ERROR_CODE_MAPPINGS[error.code];
  }
  
  // Return context-specific default
  return ERROR_MESSAGES[context]?.try_again || ERROR_MESSAGES.general.try_again;
};

// Get actionable error message with recovery steps
export const getActionableErrorMessage = (error) => {
  const baseMessage = getErrorMessage(error);
  
  switch (error?.code) {
    case '40001': // Invalid token
    case '40002': // Expired token
      return {
        message: baseMessage,
        action: {
          label: 'Reconnect TikTok Account',
          onClick: () => {
            localStorage.removeItem('tiktok_access_token');
            window.location.href = '/';
          }
        }
      };
      
    case '40005': // Geo-restricted
      return {
        message: baseMessage,
        action: {
          label: 'Learn More',
          onClick: () => window.open('https://support.tiktok.com/', '_blank')
        }
      };
      
    case 'NETWORK_ERROR':
      return {
        message: baseMessage,
        action: {
          label: 'Check Connection',
          onClick: () => window.location.reload()
        }
      };
      
    default:
      return {
        message: baseMessage,
        action: {
          label: 'Try Again',
          onClick: () => window.location.reload()
        }
      };
  }
};

// Field-specific error messages
export const getFieldErrorMessage = (fieldName, errorType) => {
  const fieldMessages = {
    campaignName: {
      required: ERROR_MESSAGES.validation.campaign_name_required,
      minLength: ERROR_MESSAGES.validation.campaign_name_too_short,
      maxLength: ERROR_MESSAGES.validation.campaign_name_too_long,
      pattern: ERROR_MESSAGES.validation.campaign_name_invalid_chars
    },
    adText: {
      required: ERROR_MESSAGES.validation.ad_text_required,
      minLength: ERROR_MESSAGES.validation.ad_text_too_short,
      maxLength: ERROR_MESSAGES.validation.ad_text_too_long,
      validate: ERROR_MESSAGES.validation.too_many_emojis
    },
    objective: {
      required: ERROR_MESSAGES.validation.objective_required
    },
    cta: {
      required: ERROR_MESSAGES.validation.cta_required
    },
    musicId: {
      required: ERROR_MESSAGES.validation.music_id_required,
      minLength: ERROR_MESSAGES.validation.music_id_too_short,
      pattern: ERROR_MESSAGES.validation.music_id_invalid_format
    }
  };
  
  return fieldMessages[fieldName]?.[errorType] || ERROR_MESSAGES.validation.form_incomplete;
};

export default ERROR_MESSAGES;