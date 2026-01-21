// Authentication service for TikTok OAuth
import { ERROR_MESSAGES } from "../utils/errorMessages";

// Mock OAuth configuration
const MOCK_CONFIG = {
  clientId: import.meta.env.VITE_TIKTOK_CLIENT_ID || "mock_client_id",
  clientSecret:
    import.meta.env.VITE_TIKTOK_CLIENT_SECRET || "mock_client_secret",
  redirectUri:
    import.meta.env.VITE_REDIRECT_URI || "http://localhost:3000/oauth-callback",
  apiBaseUrl: "https://www.tiktok.com/v2/auth/authorize/",
};

// Simulate API delays
const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock OAuth callback handler
export const mockOAuthCallback = async (code) => {
  await simulateDelay(1000);

  // Simulate different error scenarios
  if (code === "error_invalid_code") {
    throw new Error(ERROR_MESSAGES.auth.invalid_code);
  }

  if (code === "error_geo_restricted") {
    throw new Error(ERROR_MESSAGES.auth.geo_restricted);
  }

  if (code === "error_rate_limit") {
    throw new Error(ERROR_MESSAGES.auth.rate_limited);
  }

  // Simulate successful token response
  return {
    access_token: `tt_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`,
    refresh_token: `rt_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`,
    expires_in: 3600,
    scope: "ads.management,ads.music.basic",
    advertiser_ids: ["123456789"],
    open_id: "mock_open_id",
  };
};

// Mock token validation
export const validateAccessToken = async (token) => {
  await simulateDelay(500);

  if (!token || token === "invalid_token") {
    throw new Error(ERROR_MESSAGES.auth.invalid_token);
  }

  if (token.includes("expired")) {
    throw new Error(ERROR_MESSAGES.auth.expired_token);
  }

  return {
    valid: true,
    advertiser_id: "123456789",
    permissions: ["ads.management", "ads.music.basic"],
    expires_at: Date.now() + 3600000,
  };
};

// Mock token refresh
export const refreshAccessToken = async (refreshToken) => {
  await simulateDelay(800);

  if (!refreshToken || refreshToken === "invalid_refresh_token") {
    throw new Error(ERROR_MESSAGES.auth.invalid_refresh_token);
  }

  return {
    access_token: `tt_refreshed_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`,
    refresh_token: `rt_new_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`,
    expires_in: 3600,
  };
};

// Get advertiser info
export const getAdvertiserInfo = async (token) => {
  await simulateDelay(600);

  if (!token) {
    throw new Error(ERROR_MESSAGES.auth.invalid_token);
  }

  return {
    advertiser_id: "123456789",
    advertiser_name: "Demo TikTok Advertiser",
    currency: "USD",
    timezone: "America/New_York",
    language: "en",
    status: "ACTIVE",
  };
};

// Check permissions
export const checkPermissions = async (token, requiredScopes = []) => {
  await simulateDelay(300);

  const validation = await validateAccessToken(token);

  if (!validation.valid) {
    return { hasPermission: false, missingScopes: requiredScopes };
  }

  const missingScopes = requiredScopes.filter(
    (scope) => !validation.permissions.includes(scope),
  );

  return {
    hasPermission: missingScopes.length === 0,
    missingScopes,
    grantedScopes: validation.permissions,
  };
};

// Logout (clear local data)
export const logout = () => {
  // Clear all TikTok related data from localStorage
  const keys = [
    "tiktok_access_token",
    "tiktok_refresh_token",
    "tiktok_token_expiry",
    "tiktok_advertiser_info",
    "oauth_state",
  ];

  keys.forEach((key) => localStorage.removeItem(key));

  return { success: true, message: "Logged out successfully" };
};

// Export configuration
export const getOAuthConfig = () => ({
  ...MOCK_CONFIG,
  authUrl: "https://www.tiktok.com/v2/auth/authorize/",
  tokenUrl: "https://open-api.tiktok.com/oauth/access_token/",
});
