// Form validation utilities
export const validateCampaignName = (name) => {
  const errors = [];
  
  if (!name || name.trim().length === 0) {
    errors.push('Campaign name is required');
  } else if (name.trim().length < 3) {
    errors.push('Campaign name must be at least 3 characters');
  } else if (name.length > 100) {
    errors.push('Campaign name cannot exceed 100 characters');
  } else if (!/^[a-zA-Z0-9\s\-_.,:;!?()@&$#%]+$/.test(name)) {
    errors.push('Campaign name contains invalid characters');
  }
  
  return errors;
};

export const validateAdText = (text) => {
  const errors = [];
  const maxLength = 100;
  
  if (!text || text.trim().length === 0) {
    errors.push('Ad text is required');
  } else if (text.trim().length < 10) {
    errors.push('Ad text should be at least 10 characters');
  } else if (text.length > maxLength) {
    errors.push(`Ad text cannot exceed ${maxLength} characters`);
  }
  
  // Check for excessive emojis (more than 5)
  const emojiCount = (text.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length;
  if (emojiCount > 5) {
    errors.push('Too many emojis. Please use 5 or fewer.');
  }
  
  return errors;
};

export const validateMusicId = (musicId, musicOption) => {
  const errors = [];
  
  if (musicOption === 'existing') {
    if (!musicId || musicId.trim().length === 0) {
      errors.push('Music ID is required for existing music');
    } else if (musicId.length < 5) {
      errors.push('Music ID must be at least 5 characters');
    } else if (!/^[0-9a-zA-Z_-]+$/.test(musicId)) {
      errors.push('Music ID contains invalid characters');
    }
  }
  
  return errors;
};

export const validateMusicSelection = (musicOption, objective) => {
  const errors = [];
  
  if (objective === 'conversions' && musicOption === 'none') {
    errors.push('Music is required for Conversion campaigns');
  }
  
  return errors;
};

export const validateFormData = (formData) => {
  const errors = [];
  
  // Validate required fields
  errors.push(...validateCampaignName(formData.campaignName));
  errors.push(...validateAdText(formData.adText));
  
  if (!formData.objective) {
    errors.push('Campaign objective is required');
  }
  
  if (!formData.cta) {
    errors.push('Call-to-action is required');
  }
  
  // Validate music selection
  errors.push(...validateMusicSelection(formData.musicOption, formData.objective));
  
  // Validate music ID if using existing music
  if (formData.musicOption === 'existing') {
    errors.push(...validateMusicId(formData.musicId, formData.musicOption));
  }
  
  return errors;
};

export const validateFileUpload = (file) => {
  const errors = [];
  
  if (!file) {
    errors.push('Please select a file to upload');
    return errors;
  }
  
  // Check file type
  const allowedTypes = [
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/x-wav',
    'audio/aac',
    'audio/m4a'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('Invalid file type. Please upload MP3, WAV, or AAC files.');
  }
  
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }
  
  return errors;
};

// Field-specific validation rules for React Hook Form
export const validationRules = {
  campaignName: {
    required: 'Campaign name is required',
    minLength: {
      value: 3,
      message: 'Campaign name must be at least 3 characters'
    },
    maxLength: {
      value: 100,
      message: 'Campaign name cannot exceed 100 characters'
    },
    pattern: {
      value: /^[a-zA-Z0-9\s\-_.,:;!?()@&$#%]+$/,
      message: 'Only letters, numbers, spaces, and basic punctuation are allowed'
    }
  },
  
  adText: {
    required: 'Ad text is required',
    minLength: {
      value: 10,
      message: 'Ad text should be at least 10 characters'
    },
    maxLength: {
      value: 100,
      message: 'Ad text cannot exceed 100 characters'
    },
    validate: (value) => {
      const emojiCount = (value.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length;
      if (emojiCount > 5) {
        return 'Too many emojis. Please use 5 or fewer.';
      }
      return true;
    }
  },
  
  objective: {
    required: 'Please select a campaign objective'
  },
  
  cta: {
    required: 'Please select a call-to-action'
  },
  
  musicId: {
    required: (data) => data.musicOption === 'existing' ? 'Music ID is required' : false,
    minLength: {
      value: 5,
      message: 'Music ID must be at least 5 characters'
    },
    pattern: {
      value: /^[0-9a-zA-Z_-]+$/,
      message: 'Music ID can only contain letters, numbers, hyphens, and underscores'
    }
  }
};