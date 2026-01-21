// Mock API service for TikTok Ads integration
export const mockSubmitAd = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock validation errors
  const mockErrors = {
    invalid_token: {
      success: false,
      error: {
        type: "auth_error",
        code: "INVALID_TOKEN",
        message:
          "Your session has expired. Please reconnect your TikTok account.",
        actionable: true,
        action: { type: "reconnect", label: "Reconnect Now" },
      },
    },
    geo_restricted: {
      success: false,
      error: {
        type: "api_error",
        code: "GEO_RESTRICTED",
        message: "This feature is not available in your region.",
        actionable: false,
      },
    },
    invalid_music: {
      success: false,
      error: {
        type: "validation_error",
        code: "INVALID_MUSIC_ID",
        message: "The provided Music ID is invalid or not accessible.",
        field: "musicId",
      },
    },
    missing_permissions: {
      success: false,
      error: {
        type: "auth_error",
        code: "INSUFFICIENT_PERMISSIONS",
        message: "Your TikTok account doesn't have Ads management permissions.",
        actionable: true,
        action: { type: "review_permissions", label: "Review Permissions" },
      },
    },
  };

  // Simulate random errors (20% chance)
  if (Math.random() < 0.2) {
    const errorTypes = Object.keys(mockErrors);
    const randomError =
      errorTypes[Math.floor(Math.random() * errorTypes.length)];
    return mockErrors[randomError];
  }

  // Success case
  return {
    success: true,
    data: {
      adId: `ad_${Date.now()}`,
      status: "under_review",
      estimatedReviewTime: "24 hours",
    },
  };
};

export const validateMusicId = async (musicId) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock validation logic
  if (!musicId || musicId.length < 5) return false;
  if (musicId.includes("invalid")) return false;

  return true;
};

export const mockOAuthCallback = async (code) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate OAuth errors
  if (code === "invalid_code") {
    throw new Error("Invalid authorization code");
  }

  if (code === "geo_restricted") {
    throw new Error("Service not available in your region");
  }

  return {
    access_token: `mock_token_${Date.now()}`,
    expires_in: 3600,
    refresh_token: `mock_refresh_${Date.now()}`,
  };
};
