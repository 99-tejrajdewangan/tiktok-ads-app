import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockOAuthCallback } from '../services/mockApi';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const OAuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState('');

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setStatus('error');
        setError(decodeURIComponent(errorParam));
        return;
      }

      if (!code) {
        setStatus('error');
        setError('No authorization code received');
        return;
      }

      try {
        // Mock token exchange
        const tokenData = await mockOAuthCallback(code);
        
        // Store token and login
        login(tokenData.access_token);
        
        setStatus('success');
        
        // Redirect after delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (err) {
        setStatus('error');
        setError(err.message);
      }
    };

    processCallback();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="card p-8 max-w-md w-full text-center">
        {status === 'processing' && (
          <>
            <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Connecting to TikTok...</h2>
            <p className="text-gray-600">Completing OAuth authorization</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Connected Successfully!</h2>
            <p className="text-gray-600 mb-4">Your TikTok Ads account is now connected</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Connection Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallbackPage;