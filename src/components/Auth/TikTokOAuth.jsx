import React from "react";
import { Music, Upload, Ban, CheckCircle, Shield, Lock } from "lucide-react";
import toast from "react-hot-toast";

const TikTokOAuth = () => {
  const TIKTOK_OAUTH_URL = "https://www.tiktok.com/v2/auth/authorize/";

  const handleOAuth = () => {
    const clientId = import.meta.env.VITE_TIKTOK_CLIENT_ID || "sbawlaarlcgzs22yyt";
    const redirectUri = `${window.location.origin}/oauth-callback`;
    const scope = "ads.management";

    // Generate a secure state parameter
    const state =
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("oauth_state", state);

    const params = new URLSearchParams({
      client_key: clientId,
      response_type: "code",
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
    });

    const oauthUrl = `${TIKTOK_OAUTH_URL}?${params.toString()}`;

    // Show loading toast
    toast.loading("Redirecting to TikTok...", { duration: 2000 });

    // Redirect to TikTok OAuth
    setTimeout(() => {
      window.location.href = oauthUrl;
    }, 500);
  };

  const handleFeatureClick = (feature) => {
    toast.success(
      `You'll be able to ${feature} after connecting your account!`,
      {
        icon: "🔒",
      },
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg border border-purple-100 max-w-md mx-auto">
      {/* Header with icon */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-full mb-4">
          <Music className="w-10 h-10 text-white" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-green-600">
            Secure Connection
          </span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
        Connect Your TikTok Ads Account
      </h2>

      <p className="text-gray-600 text-center mb-8">
        Connect securely via OAuth 2.0 to unlock advanced ad creation features
      </p>

      {/* Feature preview - NOW CLICKABLE */}
      <div className="space-y-4 mb-8">
        {/* Feature 1 - Clickable */}
        <div
          onClick={() => handleFeatureClick("upload custom music tracks")}
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
        >
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
              <Upload className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Upload Custom Music</h3>
            <p className="text-sm text-gray-600 mt-1">
              Add your own audio files to create unique ads
            </p>
          </div>
          <Lock className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
        </div>

        {/* Feature 2 - Clickable */}
        <div
          onClick={() => handleFeatureClick("access TikTok's music library")}
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
        >
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center group-hover:from-blue-200 group-hover:to-cyan-200 transition-colors">
              <Music className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              Music Library Access
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Use licensed music from TikTok's commercial library
            </p>
          </div>
          <Lock className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
        </div>

        {/* Feature 3 - Clickable */}
        <div
          onClick={() => handleFeatureClick("create ads without music")}
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
        >
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-colors">
              <Ban className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Music-Free Ads</h3>
            <p className="text-sm text-gray-600 mt-1">
              Create ads without background music when needed
            </p>
          </div>
          <Lock className="w-4 h-4 text-gray-400 group-hover:text-green-500" />
        </div>
      </div>

      {/* Benefits list */}
      <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Benefits of connecting:
        </h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"></div>
            <span>Create ads with smart music validation</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"></div>
            <span>Access TikTok's ad performance analytics</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"></div>
            <span>Manage multiple ad campaigns in one place</span>
          </li>
        </ul>
      </div>

      {/* Connect button */}
      <button
        onClick={handleOAuth}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        <div className="flex items-center justify-center gap-2">
          <Music className="w-5 h-5" />
          Connect TikTok Account
        </div>
      </button>

      {/* Footer note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          By connecting, you agree to TikTok's{" "}
          <a
            href="https://www.tiktok.com/legal/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 hover:underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://www.tiktok.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 hover:underline"
          >
            Privacy Policy
          </a>
        </p>
        <p className="text-xs text-gray-400 mt-2">
          🔒 Your data is encrypted and securely transmitted
        </p>
      </div>
    </div>
  );
};

export default TikTokOAuth;
