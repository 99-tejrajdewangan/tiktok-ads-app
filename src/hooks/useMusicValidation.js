import { useState, useCallback, useRef } from 'react';
import { validateMusicId } from '../services/mockApi';
import { ERROR_MESSAGES } from '../utils/errorMessages';

export const useMusicValidation = () => {
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const debounceTimer = useRef(null);

  const validateExistingMusic = useCallback(async (musicId, objective) => {
    if (!musicId || musicId.trim().length < 3) {
      setValidationResult({ valid: false, reason: 'invalid_format' });
      return { valid: false };
    }

    setValidating(true);
    setValidationError(null);

    try {
      // Add delay for realistic API call simulation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const isValid = await validateMusicId(musicId);
      
      if (isValid) {
        setValidationResult({ 
          valid: true, 
          musicId,
          message: 'Music ID is valid and ready to use'
        });
        return { valid: true, musicId };
      } else {
        setValidationResult({ 
          valid: false, 
          reason: 'not_found',
          message: ERROR_MESSAGES.music.invalid_id
        });
        return { valid: false, reason: 'not_found' };
      }
    } catch (error) {
      const errorObj = {
        type: 'api_error',
        code: 'VALIDATION_FAILED',
        message: ERROR_MESSAGES.music.validation_failed,
        details: error
      };
      
      setValidationError(errorObj);
      setValidationResult({ valid: false, reason: 'api_error' });
      
      return { valid: false, reason: 'api_error', error: errorObj };
    } finally {
      setValidating(false);
    }
  }, []);

  const debouncedValidate = useCallback((musicId, objective) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    return new Promise((resolve) => {
      debounceTimer.current = setTimeout(async () => {
        const result = await validateExistingMusic(musicId, objective);
        resolve(result);
      }, 500); // 500ms debounce
    });
  }, [validateExistingMusic]);

  const validateCustomMusic = useCallback((file) => {
    if (!file) {
      return { valid: false, reason: 'no_file' };
    }

    // Check file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/aac'];
    if (!validTypes.includes(file.type)) {
      return { 
        valid: false, 
        reason: 'invalid_type',
        message: 'Please upload MP3, WAV, or AAC files only'
      };
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { 
        valid: false, 
        reason: 'file_too_large',
        message: 'File size must be less than 10MB'
      };
    }

    // Generate mock music ID
    const mockMusicId = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    setValidationResult({
      valid: true,
      musicId: mockMusicId,
      message: 'Custom music uploaded successfully',
      fileName: file.name,
      fileSize: file.size
    });

    return { 
      valid: true, 
      musicId: mockMusicId,
      fileInfo: {
        name: file.name,
        size: file.size,
        type: file.type
      }
    };
  }, []);

  const validateNoMusic = useCallback((objective) => {
    if (objective === 'conversions') {
      return {
        valid: false,
        reason: 'not_allowed_for_conversions',
        message: ERROR_MESSAGES.music.required_for_conversions
      };
    }
    
    return { valid: true, reason: 'no_music_selected' };
  }, []);

  const resetValidation = useCallback(() => {
    setValidating(false);
    setValidationResult(null);
    setValidationError(null);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
  }, []);

  const getValidationStatus = useCallback(() => {
    if (validating) return 'validating';
    if (validationResult?.valid) return 'valid';
    if (validationResult && !validationResult.valid) return 'invalid';
    return 'idle';
  }, [validating, validationResult]);

  return {
    validating,
    validationResult,
    validationError,
    validateExistingMusic,
    debouncedValidate,
    validateCustomMusic,
    validateNoMusic,
    resetValidation,
    getValidationStatus
  };
};