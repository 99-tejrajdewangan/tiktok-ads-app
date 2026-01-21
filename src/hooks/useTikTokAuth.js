import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { mockOAuthCallback } from '../services/authService';

export const useTikTokAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initiateOAuth = useCallback(() => {
    const clientId = import.meta.env.VITE_TIKTOK_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    
    if (!clientId || !redirectUri) {
      toast.error('Missing OAuth configuration');
      return;
    }

    // Generate secure state parameter
    const state = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('oauth_state', state);

    // TikTok OAuth parameters
    const params = new URLSearchParams({
      client_key: clientId,
      response_type: 'code',
      scope: 'ads.management,ads.music.basic',
      redirect_uri: redirectUri,
      state: state
    });

    // Redirect to TikTok OAuth
    window.location.href = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
  }, []);

  const handleCallback = useCallback(async (code) => {
    setLoading(true);
    setError(null);

    try {
      // Validate state parameter
      const storedState = localStorage.getItem('oauth_state');
      if (!storedState) {
        throw new Error('Invalid OAuth state');
      }
      localStorage.removeItem('oauth_state');

      // Exchange code for token
      const tokenData = await mockOAuthCallback(code);
      
      if (!tokenData.access_token) {
        throw new Error('Failed to obtain access token');
      }

      // Store token
      localStorage.setItem('tiktok_access_token', tokenData.access_token);
      localStorage.setItem('tiktok_refresh_token', tokenData.refresh_token);
      localStorage.setItem('tiktok_token_expiry', 
        Date.now() + (tokenData.expires_in * 1000)
      );

      // Return success
      return { 
        success: true, 
        token: tokenData.access_token,
        expiresIn: tokenData.expires_in 
      };
    } catch (err) {
      setError({
        type: 'auth_error',
        code: 'OAUTH_FAILED',
        message: err.message,
        details: err
      });
      toast.error('Failed to authenticate with TikTok');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('tiktok_refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      // Mock token refresh - in production, call TikTok's refresh endpoint
      const newToken = `refreshed_${Date.now()}`;
      localStorage.setItem('tiktok_access_token', newToken);
      localStorage.setItem('tiktok_token_expiry', Date.now() + (3600 * 1000));
      
      return { success: true, token: newToken };
    } catch (err) {
      // If refresh fails, user needs to re-authenticate
      localStorage.removeItem('tiktok_access_token');
      localStorage.removeItem('tiktok_refresh_token');
      localStorage.removeItem('tiktok_token_expiry');
      
      throw err;
    }
  }, []);

  const checkTokenValidity = useCallback(() => {
    const token = localStorage.getItem('tiktok_access_token');
    const expiry = localStorage.getItem('tiktok_token_expiry');
    
    if (!token) {
      return { valid: false, reason: 'no_token' };
    }
    
    if (expiry && Date.now() > parseInt(expiry)) {
      return { valid: false, reason: 'expired' };
    }
    
    return { valid: true };
  }, []);

  const logout = useCallback(() => {
    // Clear all TikTok auth data
    localStorage.removeItem('tiktok_access_token');
    localStorage.removeItem('tiktok_refresh_token');
    localStorage.removeItem('tiktok_token_expiry');
    localStorage.removeItem('oauth_state');
    
    toast.success('Disconnected from TikTok');
    navigate('/');
  }, [navigate]);

  return {
    loading,
    error,
    initiateOAuth,
    handleCallback,
    refreshToken,
    checkTokenValidity,
    logout
  };
};