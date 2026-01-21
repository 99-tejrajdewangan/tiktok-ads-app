import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { mockSubmitAd } from '../services/mockApi';
import { validateFormData } from '../utils/validation';
import { ERROR_MESSAGES } from '../utils/errorMessages';

export const useAdSubmission = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [adData, setAdData] = useState(null);
  const navigate = useNavigate();

  const submitAd = useCallback(async (formData, accessToken) => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Validate form data
      const validationErrors = validateFormData(formData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]);
      }

      // Check token validity
      if (!accessToken) {
        throw new Error(ERROR_MESSAGES.auth.invalid_token);
      }

      // Simulate API call
      const result = await mockSubmitAd(formData, accessToken);

      if (!result.success) {
        // Handle specific error types
        switch (result.error.code) {
          case 'INVALID_TOKEN':
            setSubmitError({
              type: 'auth_error',
              ...result.error,
              actionable: true,
              action: {
                type: 'reconnect',
                label: 'Reconnect TikTok Account',
                onClick: () => {
                  localStorage.removeItem('tiktok_access_token');
                  navigate('/');
                }
              }
            });
            break;

          case 'GEO_RESTRICTED':
            setSubmitError({
              type: 'api_error',
              ...result.error,
              actionable: false
            });
            break;

          case 'INVALID_MUSIC_ID':
            setSubmitError({
              type: 'validation_error',
              ...result.error,
              actionable: true,
              action: {
                type: 'fix_field',
                label: 'Fix Music ID',
                field: 'musicId'
              }
            });
            break;

          default:
            setSubmitError(result.error);
        }
        return { success: false, error: result.error };
      }

      // Success case
      setSubmitSuccess(true);
      setAdData(result.data);
      
      // Show success toast
      toast.success('Ad submitted successfully!');
      
      // Log to analytics (mock)
      console.log('Ad created:', {
        adId: result.data.adId,
        campaignName: formData.campaignName,
        objective: formData.objective,
        timestamp: new Date().toISOString()
      });

      return { success: true, data: result.data };
    } catch (error) {
      const errorObj = {
        type: 'api_error',
        code: 'SUBMISSION_FAILED',
        message: error.message || ERROR_MESSAGES.general.submission_failed,
        details: error
      };
      
      setSubmitError(errorObj);
      toast.error('Failed to submit ad');
      
      return { success: false, error: errorObj };
    } finally {
      setSubmitting(false);
    }
  }, [navigate]);

  const retrySubmission = useCallback(async (formData, accessToken) => {
    setSubmitError(null);
    return await submitAd(formData, accessToken);
  }, [submitAd]);

  const resetSubmission = useCallback(() => {
    setSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
    setAdData(null);
  }, []);

  return {
    submitting,
    submitError,
    submitSuccess,
    adData,
    submitAd,
    retrySubmission,
    resetSubmission
  };
};