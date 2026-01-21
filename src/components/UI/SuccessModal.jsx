import React from 'react';
import { X, CheckCircle, ExternalLink, Copy } from 'lucide-react';
import { createPortal } from 'react-dom';

const SuccessModal = ({ isOpen, onClose, successData }) => {
  if (!isOpen) return null;

  const handleCopyAdId = () => {
    navigator.clipboard.writeText(successData.adId);
    alert('Ad ID copied to clipboard!');
  };

  const handleViewInDashboard = () => {
    // In production, this would redirect to TikTok Ads Manager
    window.open('https://ads.tiktok.com/', '_blank');
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          {/* Success icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Ad Created Successfully!
          </h2>
          
          {/* Message */}
          <p className="text-gray-600 text-center mb-6">
            Your TikTok ad is being reviewed and will go live soon.
          </p>
          
          {/* Success details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ad ID:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                  {successData.adId}
                </code>
                <button
                  onClick={handleCopyAdId}
                  className="p-1 hover:bg-gray-200 rounded"
                  title="Copy Ad ID"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {successData.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Estimated Review:</span>
              <span className="text-sm font-medium text-gray-900">
                {successData.estimatedReviewTime}
              </span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleViewInDashboard}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-600 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              View in TikTok Ads Manager
            </button>
            
            <button
              onClick={onClose}
              className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Create Another Ad
            </button>
          </div>
          
          {/* Help text */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              You'll receive an email notification once your ad is approved.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SuccessModal;