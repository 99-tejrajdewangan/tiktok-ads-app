import React from "react";
import {
  AlertTriangle,
  X,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

const ErrorBanner = ({ error, onDismiss }) => {
  const getErrorIcon = () => {
    switch (error?.type) {
      case "auth_error":
        return <ShieldAlert className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getErrorColor = () => {
    switch (error?.type) {
      case "auth_error":
        return "bg-red-50 border-red-200 text-red-800";
      case "validation_error":
        return "bg-amber-50 border-amber-200 text-amber-800";
      case "api_error":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const handleAction = () => {
    if (error.actionable && error.action) {
      switch (error.action.type) {
        case "reconnect":
          window.location.href = "/";
          break;
        case "refresh":
          window.location.reload();
          break;
        case "review_permissions":
          alert("In production, this would open permissions settings");
          break;
        default:
          break;
      }
    }
  };

  if (!error) return null;

  return (
    <div
      className={`relative rounded-lg border p-4 mb-6 ${getErrorColor()} animate-fade-in`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getErrorIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium">
              {error.type === "auth_error"
                ? "Authentication Error"
                : error.type === "validation_error"
                  ? "Validation Error"
                  : error.type === "api_error"
                    ? "API Error"
                    : "Error"}
            </h3>
            {error.code && (
              <span className="text-xs px-2 py-1 bg-white/50 rounded">
                Code: {error.code}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm">{error.message}</p>

          {error.field && (
            <div className="mt-2 text-sm">
              <strong>Affected field:</strong> {error.field}
            </div>
          )}

          {error.actionable && error.action && (
            <div className="mt-3">
              <button
                onClick={handleAction}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-current rounded-md hover:bg-opacity-90 transition-colors"
              >
                {error.action.type === "reconnect" && (
                  <RefreshCw className="w-4 h-4" />
                )}
                {error.action.type === "review_permissions" && (
                  <ExternalLink className="w-4 h-4" />
                )}
                {error.action.label}
              </button>
            </div>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 hover:bg-white/50 rounded transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Debug info for developers */}
      {process.env.NODE_ENV === "development" && error.details && (
        <details className="mt-3 pt-3 border-t border-current/20">
          <summary className="text-xs cursor-pointer hover:underline">
            Technical Details
          </summary>
          <pre className="mt-2 text-xs bg-black/10 p-2 rounded overflow-auto max-h-32">
            {JSON.stringify(error.details, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};

export default ErrorBanner;
