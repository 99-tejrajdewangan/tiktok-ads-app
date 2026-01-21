import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { mockOAuthCallback } from '../../services/authService';
import LoadingSpinner from '../UI/LoadingSpinner';
import { CheckCircle, XCircle } from 'lucide-react';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState('');

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (errorParam) {
        setStatus('error');
        const errorMessage = errorDescription || 
          errorParam === 'access_denied' ? 'Access was denied. Please try again.' :
          errorParam === 'invalid_scope' ? 'Invalid permissions requested.' :
          'Authorization failed.';
        setError(errorMessage);
        return;
      }

      if (!code) {
        setStatus('error');
        setError('No authorization code received from TikTok');
        return;
      }

      try {
        // Store the code temporarily for debugging
        localStorage.setItem('tiktok_auth_code', code);
        
        // Exchange code for access token
        const tokenData = await mockOAuthCallback(code);
        
        if (!tokenData.access_token) {
          throw new Error('No access token received');
        }
        
        // Store token and update auth state
        login(tokenData.access_token);
        
        // Clean up
        localStorage.removeItem('tiktok_auth_code');
        
        setStatus('success');
        
        // Redirect to home after delay
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);
        
      } catch (err) {
        setStatus('error');
        setError(err.message || 'Failed to complete authorization');
        console.error('OAuth error:', err);
      }
    };

    processCallback();
  }, [searchParams, navigate, login]);

  const handleRetry = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    alert('Support contact would be implemented in production');
  };

  if (status === 'processing') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <LoadingSpinner size="large" />
        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          Completing Authorization...
        </h2>
        <p className="text-gray-600 text-center max-w-md">
          Please wait while we connect your TikTok Ads account.
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Successfully Connected!
        </h2>
        <p className="text-gray-600 text-center max-w-md mb-8">
          Your TikTok Ads account has been connected successfully. You'll be redirected to create your first ad.
        </p>
        <div className="animate-pulse text-sm text-gray-500">
          Redirecting...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
        <XCircle className="w-10 h-10 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Connection Failed
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-4">
        {error}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={handleRetry}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-600 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={handleContactSupport}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Contact Support
        </button>
      </div>
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This is a demo application. In production, this would connect to TikTok's real OAuth endpoint.
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;